#!/usr/bin/env node
/**
 * Manifest and packaging guards for the published bundle. No dependencies:
 * this runs on a clean checkout in CI as well as before a release.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const fail = (message) => problems.push(message);
const read = (file) => readFileSync(join(root, file), 'utf8');

let pkg;
try {
  pkg = JSON.parse(read('package.json'));
} catch (error) {
  fail(`package.json is not valid JSON: ${error.message}`);
}

if (pkg !== undefined) {
  if (pkg.private === true) fail('package.json still has "private": true — npm publish would refuse');
  if (typeof pkg.name !== 'string' || pkg.name === '') fail('package.json needs a name');
  if (typeof pkg.version !== 'string' || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(pkg.version)) fail('package.json needs a semver version');
  if (pkg.license !== 'MIT') fail('package.json license should be MIT');
  if (pkg.dsh?.bundle?.patch === undefined) fail('package.json needs dsh.bundle.patch');
  if (pkg.dsh?.client?.platform !== 'web') fail('package.json needs dsh.client.platform = "web"');
  if (pkg.exports?.['./client'] === undefined) fail('package.json needs the "./client" export');

  const patch = pkg.dsh?.bundle?.patch;
  if (typeof patch === 'string' && !existsSync(join(root, patch))) fail(`bundle patch ${patch} does not exist`);
  if (typeof patch === 'string') {
    const yaml = read(patch);
    if (!yaml.includes(`name: ${pkg.name}`)) fail(`bundle patch should insert the row named ${pkg.name}`);
  }

  for (const entry of pkg.files ?? []) {
    if (!entry.includes('*')) {
      if (!existsSync(join(root, entry))) fail(`files entry ${entry} does not exist`);
      continue;
    }
    const [dir, pattern] = entry.split('/');
    const suffix = pattern.replace('*', '');
    const found = existsSync(join(root, dir)) && readdirSync(join(root, dir)).some((name) => name.endsWith(suffix));
    if (!found) fail(`files entry ${entry} matches nothing`);
  }
}

const client = read('client.js');
if (!client.startsWith('window.__ModuleLoader__.load(')) fail('client.js must start with the module loader call');
if (!/['"]dsh-agent-rail['"]/.test(client)) fail('client.js module id must equal the package name');
if (!/apply\(ctx\)/.test(client)) fail('client.js must define apply(ctx)');
if (read('index.js').includes('export async function')) fail('index.js should export a synchronous apply()');

for (const file of ['locale/en.json', 'locale/zh.json']) {
  try {
    const locale = JSON.parse(read(file));
    if (typeof locale.meta?.title !== 'string' || locale.meta.title === '') fail(`${file} needs meta.title`);
    if (typeof locale.meta?.description !== 'string' || locale.meta.description === '') fail(`${file} needs meta.description`);
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
  }
}

// A public package must not ship whoever built it.
const shipped = ['client.js', 'index.js', 'README.md', 'cordis.patch.yml', 'package.json', 'locale/en.json', 'locale/zh.json'];
for (const file of shipped) {
  const text = read(file);
  if (/\/home\/[A-Za-z0-9._-]+\//.test(text)) fail(`${file} contains an absolute home path`);
  if (/C:\\\\Users\\\\/.test(text)) fail(`${file} contains an absolute Windows path`);
}

if (problems.length > 0) {
  console.error(`agent rail check failed (${problems.length}):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log('agent rail check passed');
