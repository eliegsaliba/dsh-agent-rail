window.__ModuleLoader__.load({
  id: 'dsh-agent-rail',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const KEY = 'dsh.agent-rail.v1';
    const NS = 'local.agentRail';
    const TOAST_MS = 9000;

    const en = {
      agents: 'Agents',
      open: 'Open',
      close: 'Close',
      closeHint: 'Close this agent — the row disappears',
      closeBlocked: 'Finish the running turn before closing',
      classic: 'Classic sidebar',
      classicHint: 'Show the original workspaces, archive and history',
      restore: 'Agents',
      restoreHint: 'Show live agents instead of workspaces',
      empty: 'No agents',
      emptyHint: 'New session starts one.',
      loading: 'Loading…',
      error: 'Could not close this agent.',
      broken: 'Agents view failed',
      brokenHint: 'Nothing was changed — switch to the classic sidebar below.',
      needs: 'Needs you',
      running: 'Working',
      done: 'Finished',
      idle: 'Idle',
      needsYou: 'needs you',
      needYou: 'need you',
      alertHint: 'Open the first agent that is waiting on you',
      reasonNeeds: 'is waiting on you',
      reasonDone: 'finished while you were away',
      dismiss: 'Dismiss',
      alerts: 'Desktop alerts',
      alertsOn: 'Desktop alerts on',
      alertsOff: 'Desktop alerts',
      alertsHint: 'Show a system notification when an agent needs you while this tab is in the background',
      alertsBlockedTitle: 'Desktop alerts are off',
      alertsBlocked: 'Allow notifications for this site in the browser to turn them on.',
      sound: 'Chime',
      soundHint: 'Play a short chime when an agent finishes or needs you',
      anAgent: 'Agent',
      shortcutNew: 'New agent',
      shortcutNext: 'Next agent',
      shortcutPrevious: 'Previous agent',
      shortcutAttention: 'Go to the next agent that needs you',
      previous: 'Previous',
      previousHint: 'Closed agents — pick one to bring it back',
      resume: 'Bring back',
      now: 'now',
      subagents: 'subagents',
      subagent: 'subagent',
      jobs: 'jobs',
      job: 'job'
    };

    const css = `
      .ar-root{height:100%;width:100%;min-height:0;display:flex;flex-direction:column;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px}
      .ar-root *{box-sizing:border-box}
      .ar-head{flex:none;display:flex;align-items:center;gap:6px;padding:0 var(--dsh-sidebar-row-padding,12px) 8px;color:var(--dsw-alias-label-tertiary);min-height:20px}
      .ar-label{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase}
      .ar-count{font-size:11px;opacity:.7;margin-left:auto}
      .ar-alert{margin-left:auto;display:inline-flex;align-items:center;gap:5px;padding:2px 8px 2px 7px;border:0;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary);font:inherit;font-size:10.5px;font-weight:600;letter-spacing:.01em;cursor:pointer}
      .ar-alert:hover{background:var(--dsw-alias-bg-layer-1)}
      .ar-alert:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
      .ar-alert-dot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:ar-pulse 1.6s ease-in-out infinite}
      .ar-list{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;display:flex;flex-direction:column;gap:1px;padding:0 4px 10px 0}
      .ar-row{position:relative;display:flex;align-items:center;border-radius:9px}
      .ar-row:hover{background:var(--dsw-alias-bg-layer-1)}
      .ar-row[data-current=true]{background:var(--dsw-alias-bg-layer-2);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1)}
      .ar-row[data-current=true]::before{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%);width:3px;height:18px;border-radius:2px;background:var(--dsw-alias-brand-primary)}
      .ar-row[data-current=true] .ar-title{font-weight:600}
      .ar-open{flex:1;min-width:0;display:flex;align-items:center;gap:9px;padding:6px calc(var(--dsh-sidebar-row-padding,12px) - 2px);border:0;border-radius:9px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}
      .ar-open:disabled{cursor:default;opacity:.6}
      .ar-open:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
      .ar-avatar{flex:none;position:relative;width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-size:10.5px;font-weight:650;letter-spacing:.02em}
      .ar-row[data-current=true] .ar-avatar{background:var(--dsw-alias-bg-base);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2)}
      .ar-logo{display:block;width:15px;height:15px}
      .ar-rail-row .ar-logo{width:17px;height:17px}
      .ar-toast .ar-logo{width:14px;height:14px}
      .ar-dot{position:absolute;right:-2px;bottom:-2px;width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-label-primary);box-shadow:0 0 0 2px var(--dsw-specific-sidebar-fill,var(--dsw-alias-bg-base))}
      [data-status=needs] .ar-dot{background:var(--dsw-alias-state-error-primary)}
      [data-status=running] .ar-dot{background:var(--dsw-alias-state-warn-primary);animation:ar-pulse 1.6s ease-in-out infinite}
      [data-status=done] .ar-dot{background:var(--dsw-alias-state-success-primary)}
      .ar-row[data-status=needs] .ar-title{font-weight:600}
      @keyframes ar-pulse{0%,100%{opacity:1}50%{opacity:.35}}
      @media (prefers-reduced-motion:reduce){[data-status=running] .ar-dot,.ar-alert-dot{animation:none}}
      .ar-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
      .ar-line{display:flex;align-items:baseline;gap:6px;min-width:0}
      .ar-title{flex:0 1 auto;min-width:0;font-size:13px;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .ar-meta{display:flex;align-items:center;gap:6px;min-width:0}
      .ar-dir{display:block;flex:1;min-width:0;font-size:11px;line-height:1.4;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .ar-work{flex:none;display:flex;align-items:center;gap:5px;font-size:10px;line-height:1.4;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
      .ar-work-item{display:inline-flex;align-items:center;gap:2px}
      .ar-work-item[data-alert=true]{color:var(--dsw-alias-state-error-primary)}
      .ar-work-glyph{font-size:10px;line-height:1;opacity:.85}
      .ar-close{flex:none;width:22px;height:22px;margin-right:4px;display:flex;align-items:center;justify-content:center;border:0;border-radius:6px;background:none;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:0;transition:opacity .12s ease,background .12s ease,color .12s ease}
      .ar-row:hover .ar-close,.ar-close:focus-visible{opacity:1}
      .ar-close:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
      .ar-row:hover .ar-close:disabled{opacity:.28;background:none;cursor:default}
      @media (hover:none){.ar-close{opacity:.5}}
      .ar-empty{display:flex;flex-direction:column;gap:5px;padding:24px var(--dsh-sidebar-row-padding,12px) 0;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary)}
      .ar-empty-title{font-size:13px;color:var(--dsw-alias-label-primary)}
      .ar-error{padding:0 var(--dsh-sidebar-row-padding,12px) 8px;font-size:11px;line-height:1.45;color:var(--dsw-alias-state-error-primary)}
      .ar-prev{margin-top:7px;padding-top:5px;border-top:1px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:1px}
      .ar-prev-toggle{display:flex;align-items:center;gap:6px;width:100%;padding:5px 8px;border:0;border-radius:7px;background:none;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;text-align:left;cursor:pointer}
      .ar-prev-toggle:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
      .ar-prev-toggle:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
      .ar-prev-caret{display:inline-block;font-size:9px;line-height:1;opacity:.75;transition:transform .12s ease}
      .ar-prev-caret[data-open=true]{transform:rotate(90deg)}
      .ar-prev-row{display:flex;align-items:center;gap:9px;width:100%;padding:5px calc(var(--dsh-sidebar-row-padding,12px) - 2px);border:0;border-radius:9px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;opacity:.7}
      .ar-prev-row:hover,.ar-prev-row:focus-visible{background:var(--dsw-alias-bg-layer-1);opacity:1;outline:none}
      .ar-prev-row:disabled{cursor:default;opacity:.45}
      .ar-prev-row .ar-avatar{width:22px;height:22px;border-radius:7px;font-size:9.5px}
      .ar-ago{margin-left:auto;padding-left:6px;font-size:10px;line-height:1.4;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
      .ar-foot{flex:none;margin-top:4px;padding:4px var(--dsh-sidebar-inline-padding,8px) 2px;border-top:1px solid var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:1px}
      .ar-foot-btn{display:flex;align-items:center;gap:7px;width:100%;padding:6px 8px;border:0;border-radius:7px;background:none;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;text-align:left;cursor:pointer}
      .ar-foot-btn:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
      .ar-foot-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
      .ar-foot-dot{width:6px;height:6px;border-radius:50%;border:1px solid var(--dsw-alias-label-secondary);flex:none}
      .ar-foot-dot[data-on=true]{background:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
      .ar-rail{height:100%;display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 0;overflow-y:auto;scrollbar-width:none}
      .ar-rail-row{position:relative;flex:none;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:0;border-radius:9px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;font-weight:650;cursor:pointer}
      .ar-rail-row:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
      .ar-rail-row[data-current=true]{background:var(--dsw-alias-bg-layer-2);box-shadow:inset 0 0 0 2px var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}
      .ar-rail-row:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
      .ar-rail-empty{padding:8px 0;font-size:10px;writing-mode:vertical-rl;color:var(--dsw-alias-label-tertiary);letter-spacing:.06em}
      .ar-restore{display:flex;align-items:center;gap:8px;width:100%;padding:8px var(--dsh-sidebar-row-padding,12px);border:0;border-radius:8px;background:none;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;text-align:left;cursor:pointer}
      .ar-restore:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
      .ar-restore:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}
      .ar-restore .ar-restore-icon{flex:none;display:flex;align-items:center;justify-content:center}
      .ar-toasts{position:fixed;right:18px;top:18px;display:flex;flex-direction:column;gap:8px;width:min(320px,calc(100vw - 36px));pointer-events:none}
      .ar-toast{pointer-events:auto;display:flex;align-items:flex-start;gap:9px;padding:9px 9px 9px 11px;border-radius:12px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);border-left:3px solid var(--dsw-alias-state-error-primary);box-shadow:0 10px 30px rgba(0,0,0,.22);color:var(--dsw-alias-label-primary);font-size:12px;line-height:1.4;animation:ar-toast-in .18s var(--ds-ease-out,ease-out)}
      .ar-toast[data-kind=done]{border-left-color:var(--dsw-alias-state-success-primary)}
      @keyframes ar-toast-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
      .ar-toast-main{flex:1;min-width:0;display:flex;align-items:flex-start;gap:9px;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}
      .ar-toast-main:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px;border-radius:6px}
      .ar-toast .ar-avatar{width:22px;height:22px;border-radius:7px;font-size:9.5px}
      .ar-toast-text{display:flex;flex-direction:column;gap:1px;min-width:0}
      .ar-toast-title{font-size:12px;font-weight:550;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .ar-toast-reason{font-size:11px;color:var(--dsw-alias-label-secondary)}
      .ar-toast-close{flex:none;width:20px;height:20px;display:flex;align-items:center;justify-content:center;border:0;border-radius:5px;background:none;color:var(--dsw-alias-label-secondary);cursor:pointer}
      .ar-toast-close:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    `;

    const ICONS = {
      claude: { d: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z', color: '#D97757' },
      deepseek: { d: 'M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45', color: '#4D6BFE' },
      openai: { d: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z' },
      moonshot: { d: 'm1.053 16.91 9.538 2.55a21 20.981 0 0 0 .06 2.031l5.956 1.592a12 11.99 0 0 1-15.554-6.172m-1.02-5.79 11.352 3.035a21 20.981 0 0 0-.469 2.01l10.817 2.89a12 11.99 0 0 1-1.845 2.004L.658 15.918a12 11.99 0 0 1-.625-4.796m1.593-5.146L13.573 9.17a21 20.981 0 0 0-1.01 1.874l11.297 3.02a21 20.981 0 0 1-.67 2.362l-11.55-3.087L.125 10.26a12 11.99 0 0 1 1.499-4.285ZM6.067 1.58l11.285 3.016a21 20.981 0 0 0-1.688 1.719l7.824 2.091a21 20.981 0 0 1 .513 2.664L2.107 5.218a12 11.99 0 0 1 3.96-3.638M21.68 4.866 7.222 1.003A12 11.99 0 0 1 21.68 4.866' },
      qwen: { d: 'M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374z' },
      gemini: { d: 'M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81', color: '#8E75B2' },
      mistral: { d: 'M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z', color: '#FA520F' }
    };

    const RANK = { needs: 0, running: 1, done: 2, idle: 3 };

    function statusOf(session, status) {
      if (status !== undefined && status.pendingInteraction !== undefined && status.pendingInteraction !== null) return 'needs';
      const running = status === undefined ? session.running : status.running ?? session.running;
      if (running === true) return 'running';
      if (status !== undefined && status.completionUnread === true) return 'done';
      return 'idle';
    }

    function ago(then, now) {
      const delta = Math.max(0, now - then);
      if (delta < 60000) return 'now';
      const minutes = Math.floor(delta / 60000);
      if (minutes < 60) return minutes + 'm';
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return hours + 'h';
      return Math.floor(hours / 24) + 'd';
    }

    function initials(title) {
      const text = String(title || '').replace(/^[^\p{L}\p{N}]+/u, '').trim();
      if (text === '') return '?';
      const words = text.split(/[\s_\-·/|]+/u).filter(Boolean);
      const taken = words.length > 1 ? words[0][0] + words[1][0] : Array.from(text).slice(0, 2).join('');
      return taken.toUpperCase();
    }

    function homePath(path) {
      return String(path).replace(/^\/(?:home|Users)\/[^/]+(?=\/|$)/, '~');
    }

    function tailPath(path, max) {
      const text = homePath(path);
      const limit = max || 38;
      return text.length > limit ? '…' + text.slice(text.length - limit) : text;
    }

    function shortModel(id) {
      const text = String(id || '');
      const tail = text.slice(text.lastIndexOf('/') + 1) || text;
      return tail.length > 18 ? '…' + tail.slice(tail.length - 17) : tail;
    }

    /**
     * Running direct children that the parent row can surface without opening
     * the conversation: subagent runs and their labels. Blocked children are
     * reported separately; DSH usually escalates their request on the parent.
     */
    function childWork(list, statuses, id) {
      const cell = list.projectionsBySession && list.projectionsBySession[id];
      const catalog = cell && cell.values ? cell.values.subagentCatalog : undefined;
      if (!Array.isArray(catalog) || catalog.length === 0) return null;
      let running = 0;
      let blocked = 0;
      const labels = [];
      for (const child of catalog) {
        const status = statuses.get(child.id);
        const row = list.byId[child.id];
        const live = status === undefined ? row === undefined ? undefined : row.running : status.running ?? (row === undefined ? undefined : row.running);
        if (status !== undefined && status.pendingInteraction !== undefined && status.pendingInteraction !== null) blocked += 1;
        if (live === true) {
          running += 1;
          if (labels.length < 6) labels.push(child.label || String(child.id).slice(0, 8));
        }
      }
      if (running === 0 && blocked === 0) return null;
      return { running, blocked, labels };
    }

    function harnessOf(list, session) {
      const summary = session.projectionValues || {};
      const cell = list.projectionsBySession && list.projectionsBySession[session.id];
      const shared = (cell && cell.values) || {};
      const presetValue = summary.agentPreset !== undefined ? summary.agentPreset : shared.agentPreset;
      const selection = summary.modelSelection !== undefined ? summary.modelSelection : shared.modelSelection;
      const preset = typeof presetValue === 'string' && presetValue !== '' && presetValue !== 'default' ? presetValue : null;
      const picked = selection ? selection.next || selection.lastUsed : null;
      return { preset, model: picked && typeof picked === 'object' ? picked : null };
    }

    function chipTitle(harness) {
      const parts = [];
      if (harness.preset) parts.push(harness.preset);
      if (harness.model) {
        parts.push((harness.model.provider ? harness.model.provider + '/' : '') + harness.model.model);
        if (harness.model.reasoningEffort) parts.push(String(harness.model.reasoningEffort));
      }
      return parts.join(' · ');
    }

    /** Brand mark for the harness/model driving a row, when a mark exists locally. */
    function brandOf(harness) {
      const preset = harness.preset === null ? '' : String(harness.preset).toLowerCase();
      const model = harness.model === null ? '' : String(harness.model.model || '').toLowerCase();
      const provider = harness.model === null ? '' : String(harness.model.provider || '').toLowerCase();
      const hay = preset + ' ' + provider + ' ' + model;
      if (hay.indexOf('claude') !== -1 || hay.indexOf('anthropic') !== -1) return 'claude';
      if (hay.indexOf('deepseek') !== -1) return 'deepseek';
      if (hay.indexOf('codex') !== -1 || hay.indexOf('gpt') !== -1 || hay.indexOf('openai') !== -1) return 'openai';
      if (hay.indexOf('kimi') !== -1 || hay.indexOf('moonshot') !== -1) return 'moonshot';
      if (hay.indexOf('qwen') !== -1 || hay.indexOf('tongyi') !== -1) return 'qwen';
      if (hay.indexOf('gemini') !== -1 || hay.indexOf('google') !== -1) return 'gemini';
      if (hay.indexOf('mistral') !== -1) return 'mistral';
      return null;
    }

    /** Fallback label when the model has no local mark: the model family, not the title. */
    function modelMark(harness) {
      const id = harness.model === null ? '' : String(harness.model.model || '');
      const tail = id.slice(id.lastIndexOf('/') + 1);
      const head = tail.split(/[-_\s]/)[0];
      return head.replace(/[^0-9A-Za-z]/g, '').slice(0, 3).toUpperCase();
    }

    function logoNode(brand) {
      const icon = ICONS[brand];
      return h('svg', {className: 'ar-logo', viewBox: '0 0 24 24', 'aria-hidden': true, focusable: 'false'},
        h('path', {d: icon.d, fill: icon.color || 'currentColor'}));
    }

    function XIcon() {
      return h('svg', {width: 11, height: 11, viewBox: '0 0 12 12', 'aria-hidden': true},
        h('path', {d: 'M2.4 2.4l7.2 7.2M9.6 2.4L2.4 9.6', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round'}));
    }

    function RailIcon() {
      return h('svg', {width: 15, height: 15, viewBox: '0 0 16 16', 'aria-hidden': true},
        h('rect', {x: 1.6, y: 2.2, width: 12.8, height: 11.6, rx: 3, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.2}),
        h('path', {d: 'M5.6 4.6v6.8', stroke: 'currentColor', 'stroke-width': 1.2, 'stroke-linecap': 'round'}),
        h('circle', {cx: 3.6, cy: 6, r: .85, fill: 'currentColor'}),
        h('circle', {cx: 3.6, cy: 9, r: .85, fill: 'currentColor', opacity: .5}),
        h('path', {d: 'M8.2 6.2h3.4M8.2 9.2h2.4', stroke: 'currentColor', 'stroke-width': 1.2, 'stroke-linecap': 'round'}));
    }

    return {
      inject: ['slots', 'locale', 'layout', 'uiWorkspace', 'sessions', 'uiSession', 'shortcuts', 'jobs'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, 'en', en));
        const t = ctx.locale.bind(NS);

        // ---------------------------------------------------------------- prefs
        let prefs = { enabled: true, alerts: false, sound: true };
        try {
          const stored = JSON.parse(localStorage.getItem(KEY) || 'null');
          if (stored !== null && typeof stored === 'object') {
            if (typeof stored.enabled === 'boolean') prefs.enabled = stored.enabled;
            if (typeof stored.alerts === 'boolean') prefs.alerts = stored.alerts;
            if (typeof stored.sound === 'boolean') prefs.sound = stored.sound;
          }
        } catch {}
        const prefListeners = new Set();
        const subscribePrefs = (fn) => { prefListeners.add(fn); return () => { prefListeners.delete(fn); }; };
        const getPrefs = () => prefs;
        function savePrefs(patch) {
          prefs = { ...prefs, ...patch };
          try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch {}
          for (const fn of [...prefListeners]) fn();
          sync();
        }
        function usePrefs() { return React.useSyncExternalStore(subscribePrefs, getPrefs, getPrefs); }
        function useLocale() { return React.useSyncExternalStore((fn) => ctx.locale.subscribe(fn), () => ctx.locale.getSnapshot()); }
        function useT() { useLocale(); return t; }

        // --------------------------------------------------------------- toasts
        let toasts = [];
        let toastSeq = 0;
        const toastTimers = new Map();
        const toastListeners = new Set();
        const subscribeToasts = (fn) => { toastListeners.add(fn); return () => { toastListeners.delete(fn); }; };
        const getToasts = () => toasts;
        const emitToasts = () => { for (const fn of [...toastListeners]) fn(); };
        function dismissToast(id) {
          const timer = toastTimers.get(id);
          if (timer !== undefined) { clearTimeout(timer); toastTimers.delete(id); }
          if (!toasts.some((item) => item.id === id)) return;
          toasts = toasts.filter((item) => item.id !== id);
          emitToasts();
        }
        function pushToast(entry) {
          const id = ++toastSeq;
          toasts = [{ ...entry, id }, ...toasts].slice(0, 3);
          emitToasts();
          toastTimers.set(id, setTimeout(() => dismissToast(id), TOAST_MS));
        }
        ctx.effect(() => () => {
          for (const timer of toastTimers.values()) clearTimeout(timer);
          toastTimers.clear();
          toastListeners.clear();
          if (audioCtx !== null) { try { audioCtx.close(); } catch {} audioCtx = null; }
        });

        ctx.effect(() => {
          const warm = () => {
            if (prefs.sound === true) unlockAudio();
            window.removeEventListener('pointerdown', warm, true);
            window.removeEventListener('keydown', warm, true);
          };
          window.addEventListener('pointerdown', warm, true);
          window.addEventListener('keydown', warm, true);
          return () => {
            window.removeEventListener('pointerdown', warm, true);
            window.removeEventListener('keydown', warm, true);
          };
        });

        // ------------------------------------------------------ attention feed
        function currentIdOf(list) {
          for (const id of list.ids) {
            const row = list.byId[id];
            if (row !== undefined && ((row.retainedBy && row.retainedBy.mainView) || 0) > 0) return id;
          }
          return undefined;
        }

        let audioCtx = null;

        /** Create or wake the shared context; only a user gesture may start it. */
        function unlockAudio() {
          if (typeof window === 'undefined') return null;
          try {
            const Ctor = window.AudioContext || window.webkitAudioContext;
            if (typeof Ctor !== 'function') return null;
            if (audioCtx === null) audioCtx = new Ctor();
            if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
            return audioCtx;
          } catch { return null; }
        }

        function tone(context, frequency, at, seconds, level) {
          const osc = context.createOscillator();
          const gain = context.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(frequency, at);
          gain.gain.setValueAtTime(0.0001, at);
          gain.gain.exponentialRampToValueAtTime(level, at + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds);
          osc.connect(gain);
          gain.connect(context.destination);
          osc.start(at);
          osc.stop(at + seconds + 0.02);
        }

        /**
         * Two notes through Web Audio — no asset, no permission prompt.
         * Rising asks for you, falling says it is done. Triangular, deep and
         * long enough that laptop speakers carry it.
         */
        function chime(kind) {
          if (prefs.sound !== true) return;
          const context = unlockAudio();
          if (context === null) return;
          try {
            const start = context.currentTime + 0.02;
            const notes = kind === 'needs' ? [659.25, 987.77] : [880, 659.25];
            for (let index = 0; index < notes.length; index += 1) {
              tone(context, notes[index], start + index * 0.16, 0.34, 0.18);
            }
          } catch {}
        }

        function toggleSound() {
          const next = prefs.sound !== true;
          savePrefs({ sound: next });
          if (next) chime('done');
        }

        function announce(id, session, kind) {
          const title = session === undefined ? t('anAgent') : session.displayTitle || session.title || t('anAgent');
          const visible = typeof document !== 'undefined' && document.visibilityState === 'visible';
          if (kind === 'needs' && visible && currentIdOf(ctx.sessions.list.getSnapshot()) === id) return;
          const reason = kind === 'needs' ? t('reasonNeeds') : t('reasonDone');
          const harness = session === undefined
            ? { preset: null, model: null }
            : harnessOf(ctx.sessions.list.getSnapshot(), session);
          pushToast({ sessionId: id, title, kind, reason, brand: brandOf(harness), mark: modelMark(harness) });
          chime(kind);
          if (!prefs.alerts || typeof Notification === 'undefined' || Notification.permission !== 'granted' || visible) return;
          try {
            const note = new Notification(title, { body: reason, tag: 'dsh-agent-rail:' + id });
            note.onclick = () => {
              try { window.focus(); ctx.uiWorkspace.openSession(id); } catch {}
              note.close();
            };
          } catch {}
        }

        ctx.effect(() => {
          const list = ctx.sessions.list;
          const status = ctx.uiSession.sessionStatus;
          let prev = new Map();
          let primed = false;
          function scan() {
            const snapshot = list.getSnapshot();
            const statuses = status.getSnapshot();
            const next = new Map();
            for (const id of snapshot.ids) {
              const session = snapshot.byId[id];
              if (session === undefined || session.origin === 'subagent') continue;
              const entry = statuses.get(id);
              next.set(id, {
                key: entry !== undefined && entry.pendingInteraction !== undefined && entry.pendingInteraction !== null ? entry.pendingInteraction.key : null,
                unread: entry !== undefined && entry.completionUnread === true
              });
            }
            if (primed) {
              for (const [id, now] of next) {
                const was = prev.get(id);
                if (was === undefined) continue;
                const session = snapshot.byId[id];
                if (now.key !== null && now.key !== was.key) announce(id, session, 'needs');
                else if (now.unread && !was.unread) announce(id, session, 'done');
              }
            }
            prev = next;
            primed = true;
          }
          const offs = [list.subscribe(scan), status.subscribe(scan)];
          scan();
          return () => { for (const off of offs) off(); };
        });

        // ----------------------------------------------------------- navigation
        let nav = null;

        function navigate(step) {
          if (nav === null || nav.ids.length === 0) return;
          const index = nav.current === undefined ? -1 : nav.ids.indexOf(nav.current);
          const target = index === -1
            ? (step > 0 ? nav.ids[0] : nav.ids[nav.ids.length - 1])
            : nav.ids[Math.min(nav.ids.length - 1, Math.max(0, index + step))];
          if (target === undefined || target === nav.current) return;
          try { ctx.uiWorkspace.openSession(target); } catch {}
        }

        function newAgent() {
          try { ctx.uiWorkspace.startSession(); } catch {}
        }

        /** Cycle through the agents waiting on a human, starting after the current one. */
        function cycleNeeds() {
          if (nav === null || nav.needs.length === 0) return;
          const at = nav.current === undefined ? -1 : nav.needs.indexOf(nav.current);
          const target = nav.needs[(at + 1) % nav.needs.length];
          if (target === undefined || target === nav.current) return;
          try { ctx.uiWorkspace.openSession(target); } catch {}
        }

        // ------------------------------------------------------------ shortcuts
        ctx.effect(() => {
          function keysOf(binding, fallback) {
            try { return ctx.shortcuts.describeBinding(binding).keys; } catch { return fallback; }
          }
          const candidates = [
            { id: 'dsh-agent-rail-new', label: () => t('shortcutNew'), binding: { code: 'KeyN', modifiers: ['alt'] }, keys: ['Alt', 'N'] },
            { id: 'dsh-agent-rail-next', label: () => t('shortcutNext'), binding: { code: 'ArrowDown', modifiers: ['alt'] }, keys: ['Alt', '↓'] },
            { id: 'dsh-agent-rail-previous', label: () => t('shortcutPrevious'), binding: { code: 'ArrowUp', modifiers: ['alt'] }, keys: ['Alt', '↑'] },
            { id: 'dsh-agent-rail-attention', label: () => t('shortcutAttention'), binding: { code: 'KeyA', modifiers: ['alt'] }, keys: ['Alt', 'A'] }
          ];
          const offs = candidates.map((command) => ctx.shortcuts.registerFixed({
            id: command.id,
            label: command.label,
            keys: keysOf(command.binding, command.keys),
            bindings: [command.binding],
            group: 'application'
          }));
          const offInput = ctx.shortcuts.observeFixedInput((input) => {
            if (input.type !== 'keydown') return;
            const gesture = input.gesture;
            if (gesture.composing || gesture.defaultPrevented) return;
            if (!gesture.alt || gesture.control || gesture.meta || gesture.shift) return;
            if (input.context.modal !== null) return;
            if (input.context.region === 'terminal') return;
            if (gesture.code === 'KeyN') {
              if (gesture.repeat) return;
              input.consume();
              newAgent();
              return;
            }
            if (gesture.code === 'ArrowDown') { input.consume(); navigate(1); return; }
            if (gesture.code === 'ArrowUp') { input.consume(); navigate(-1); return; }
            if (gesture.code === 'KeyA') { if (gesture.repeat) return; input.consume(); cycleNeeds(); }
          });
          return () => { offInput(); for (const off of offs) off(); };
        });

        // --------------------------------------------------------------- layout
        let release;

        function useRows(props) {
          const sessions = props.useSessions((s) => s);
          const workspaces = props.useWorkspaces((s) => s);
          const statuses = props.useSessionStatus((s) => s);
          const panel = props.usePanelInfo((s) => s.activePanelId);

          const current = React.useMemo(() => {
            if (panel !== null) return undefined;
            return currentIdOf(sessions);
          }, [panel, sessions]);

          const archived = new Set(workspaces.archivedSessionIds || []);
          const rows = [];
          for (const id of sessions.ids) {
            const session = sessions.byId[id];
            if (session === undefined) continue;
            if (session.origin === 'subagent') continue;
            if (session.blank === true && id !== current) continue;
            if (archived.has(id)) continue;
            const status = statuses.get(id);
            const harness = harnessOf(sessions, session);
            rows.push({
              id, session, status, state: statusOf(session, status), harness,
              brand: brandOf(harness),
              children: childWork(sessions, statuses, id)
            });
          }
          rows.sort((left, right) => {
            const delta = (RANK[left.state] || 0) - (RANK[right.state] || 0);
            return delta !== 0 ? delta : (right.session.updatedAt || 0) - (left.session.updatedAt || 0);
          });

          const previous = [];
          for (const id of sessions.ids) {
            if (!archived.has(id)) continue;
            const session = sessions.byId[id];
            if (session === undefined || session.origin === 'subagent' || session.blank === true) continue;
            const harness = harnessOf(sessions, session);
            previous.push({ id, session, harness, brand: brandOf(harness), mark: modelMark(harness) });
          }
          previous.sort((left, right) => (right.session.updatedAt || 0) - (left.session.updatedAt || 0));

          return {
            rows, current, phase: sessions.phase,
            previous: previous.slice(0, 15),
            previousTotal: previous.length
          };
        }

        function useNav(rows, current) {
          const key = rows.map((row) => row.id).join('|');
          const needsKey = rows.filter((row) => row.state === 'needs').map((row) => row.id).join('|');
          React.useEffect(() => {
            nav = {
              ids: key === '' ? [] : key.split('|'),
              needs: needsKey === '' ? [] : needsKey.split('|'),
              current
            };
            return () => { nav = null; };
          }, [key, needsKey, current]);
        }

        const subscribeJobs = (fn) => ctx.jobs.state.subscribe(fn);
        const readJobs = () => ctx.jobs.state.getSnapshot();

        /**
         * Watch the background-job roster of the visible agents. The service
         * reference-counts, so a stream shared with the Jobs panel stays open
         * once; the cap keeps a long rail from opening dozens of streams.
         */
        function useJobCounts(ids) {
          const ordered = ids.slice(0, 10);
          const key = ids.slice().sort().join('|');
          const watched = React.useRef(new Map());
          React.useEffect(() => {
            const wanted = new Set(ordered);
            for (const [id, stop] of [...watched.current]) {
              if (wanted.has(id)) continue;
              watched.current.delete(id);
              try { stop(); } catch {}
            }
            for (const id of wanted) {
              if (watched.current.has(id)) continue;
              try { watched.current.set(id, ctx.jobs.watchRows(id)); } catch {}
            }
          }, [key]);
          React.useEffect(() => {
            const held = watched.current;
            return () => { for (const stop of held.values()) { try { stop(); } catch {} } held.clear(); };
          }, []);
          return React.useSyncExternalStore(subscribeJobs, readJobs, readJobs);
        }

        function AgentRow({ props, t, entry, current, busy, jobs, onOpen, onClose, registerRef }) {
          const { session: s, state, harness, children } = entry;
          const canOpen = props.useSessionAccess(s.id, 'session/follow');
          const canClose = props.useSessionAccess(s.id, 'workspace/archiveSession');
          const closable = canClose === true && state !== 'running' && state !== 'needs';
          const title = s.displayTitle || s.title || t('open');
          const dir = s.cwd ? tailPath(s.cwd) : '';
          const descriptor = chipTitle(harness);
          const hint = [t(state), descriptor, s.cwd || ''].filter(Boolean).join(' · ');
          const work = [];
          if (children !== null && children !== undefined && children.running > 0) {
            const many = children.running !== 1;
            work.push(h('span', {
              key: 'sub', className: 'ar-work-item', 'data-alert': children.blocked > 0,
              title: children.labels.join(' · ') || children.running + ' ' + t(many ? 'subagents' : 'subagent'),
              'aria-label': children.running + ' ' + t(many ? 'subagents' : 'subagent')
            },
              h('span', {className: 'ar-work-glyph', 'aria-hidden': true}, '↳'),
              String(children.running)));
          }
          if (jobs.length > 0) {
            const many = jobs.length !== 1;
            work.push(h('span', {
              key: 'job', className: 'ar-work-item',
              title: jobs.map((job) => job.label || job.kind).join(' · ') || jobs.length + ' ' + t(many ? 'jobs' : 'job'),
              'aria-label': jobs.length + ' ' + t(many ? 'jobs' : 'job')
            },
              h('span', {className: 'ar-work-glyph', 'aria-hidden': true}, '⚙'),
              String(jobs.length)));
          }
          return h('div', {
            className: 'ar-row', 'data-status': state, 'data-current': current === s.id,
            ref: (node) => registerRef(s.id, node)
          },
            h('button', {
              type: 'button', className: 'ar-open', disabled: !canOpen || busy,
              title: hint, 'aria-label': t('open') + ': ' + title,
              'aria-current': current === s.id ? 'true' : undefined,
              onClick: () => onOpen(s.id)
            },
              h('span', {className: 'ar-avatar'},
                entry.brand !== null ? logoNode(entry.brand) : (modelMark(harness) || initials(title)),
                h('i', {className: 'ar-dot'})),
              h('span', {className: 'ar-text'},
                h('span', {className: 'ar-line'},
                  h('span', {className: 'ar-title'}, title)),
                (dir !== '' || work.length > 0) && h('span', {className: 'ar-meta'},
                  dir !== '' && h('span', {className: 'ar-dir', title: homePath(s.cwd)}, dir),
                  work.length > 0 && h('span', {className: 'ar-work'}, work)))),
            h('button', {
              type: 'button', className: 'ar-close', disabled: !closable || busy,
              title: closable ? t('closeHint') : t('closeBlocked'),
              'aria-label': t('close') + ': ' + title,
              onClick: () => onClose(s.id)
            }, h(XIcon)));
        }

        function PreviousRow({ props, t, entry, busy, onResume }) {
          const { session: s } = entry;
          const canResume = props.useSessionAccess(s.id, 'workspace/unarchiveSession');
          const title = s.displayTitle || s.title || t('open');
          const dir = s.cwd ? tailPath(s.cwd) : '';
          return h('button', {
            type: 'button', className: 'ar-prev-row', disabled: busy !== null || !canResume,
            title: (s.cwd ? homePath(s.cwd) + ' · ' : '') + t('resume'),
            onClick: () => onResume(s.id)
          },
            h('span', {className: 'ar-avatar'},
              entry.brand !== null ? logoNode(entry.brand) : (entry.mark || initials(title))),
            h('span', {className: 'ar-text'},
              h('span', {className: 'ar-line'},
                h('span', {className: 'ar-title'}, title),
                h('span', {className: 'ar-ago'}, ago(s.updatedAt || 0, Date.now()))),
              dir !== '' && h('span', {className: 'ar-dir'}, dir)));
        }

        function Agents(props) {
          const t = useT();
          const prefs = usePrefs();
          const [busy, setBusy] = React.useState(null);
          const [error, setError] = React.useState('');
          const [showPrevious, setShowPrevious] = React.useState(false);
          const { rows, current, phase, previous, previousTotal } = useRows(props);
          useNav(rows, current);
          const jobState = useJobCounts(rows.map((row) => row.id));

          const rowRefs = React.useRef(new Map());
          const registerRef = React.useCallback((id, node) => {
            if (node === null || node === undefined) rowRefs.current.delete(id);
            else rowRefs.current.set(id, node);
          }, []);
          React.useEffect(() => {
            if (current === undefined) return;
            const node = rowRefs.current.get(current);
            if (node !== undefined && typeof node.scrollIntoView === 'function') node.scrollIntoView({ block: 'nearest' });
          }, [current]);

          const attention = rows.filter((row) => row.state === 'needs').length;
          const liveJobs = (id) => {
            const list = jobState !== null && jobState !== undefined && jobState.rows !== undefined ? jobState.rows[id] : undefined;
            if (!Array.isArray(list)) return [];
            const live = list.filter((job) => job.status === 'running' || job.status === 'stopping');
            return live.length === 0 ? [] : live;
          };

          const open = React.useCallback((id) => {
            try { ctx.uiWorkspace.openSession(id); } catch (reason) { setError(String(reason)); }
          }, []);

          const close = React.useCallback((id) => {
            setBusy(id);
            setError('');
            Promise.resolve(ctx.uiWorkspace.archiveSession(id)).catch((reason) => {
              setError(reason instanceof Error ? reason.message : t('error'));
            }).finally(() => { setBusy(null); });
          }, []);

          const resume = React.useCallback((id) => {
            setBusy(id);
            setError('');
            Promise.resolve(ctx.uiWorkspace.unarchiveSession(id)).then(() => {
              try { ctx.uiWorkspace.openSession(id); } catch {}
            }).catch((reason) => {
              setError(reason instanceof Error ? reason.message : t('error'));
            }).finally(() => { setBusy(null); });
          }, []);

          const body = phase !== 'ready'
            ? h('div', {className: 'ar-empty'}, t('loading'))
            : rows.length === 0
              ? h('div', {className: 'ar-empty'},
                  h('span', {className: 'ar-empty-title'}, t('empty')),
                  h('span', null, t('emptyHint')))
              : rows.map((entry) => h(AgentRow, {
                  key: entry.id, props, t, entry, current, busy, registerRef,
                  jobs: liveJobs(entry.id),
                  onOpen: open, onClose: close
                }));

          const previousSection = previousTotal > 0
            ? h('div', {className: 'ar-prev'},
                h('button', {
                  type: 'button', className: 'ar-prev-toggle', 'aria-expanded': showPrevious,
                  title: t('previousHint'), onClick: () => setShowPrevious((value) => !value)
                },
                  h('span', {className: 'ar-prev-caret', 'data-open': showPrevious}, '\u25B8'),
                  h('span', null, t('previous')),
                  h('span', {className: 'ar-count'}, String(previousTotal))),
                showPrevious === true && previous.map((entry) => h(PreviousRow, {
                  key: entry.id, props, t, entry, busy, onResume: resume
                })))
            : null;

          return h('nav', {className: 'ar-root', 'aria-label': t('agents')},
            h('style', null, css),
            h('div', {className: 'ar-head'},
              h('span', {className: 'ar-label'}, t('agents')),
              attention > 0
                ? h('button', {type: 'button', className: 'ar-alert', title: t('alertHint'), onClick: () => cycleNeeds()},
                    h('i', {className: 'ar-alert-dot'}),
                    attention + ' ' + t(attention === 1 ? 'needsYou' : 'needYou'))
                : h('span', {className: 'ar-count'}, String(rows.length))),
            error !== '' && h('p', {className: 'ar-error', role: 'alert'}, error),
            h('div', {className: 'ar-list'}, body, previousSection),
            h('div', {className: 'ar-foot'},
              h('button', {
                type: 'button', className: 'ar-foot-btn', title: t('soundHint'),
                'aria-pressed': prefs.sound === true,
                onClick: () => toggleSound()
              },
                h('span', {className: 'ar-foot-dot', 'data-on': prefs.sound === true}),
                h('span', null, t('sound'))),
              typeof Notification !== 'undefined' && h('button', {
                type: 'button', className: 'ar-foot-btn', title: t('alertsHint'), onClick: toggleAlerts,
                'aria-pressed': prefs.alerts === true
              },
                h('span', {className: 'ar-foot-dot', 'data-on': prefs.alerts === true}),
                h('span', null, t(prefs.alerts ? 'alertsOn' : 'alertsOff'))),
              h('button', {type: 'button', className: 'ar-classic', title: t('classicHint'), onClick: () => savePrefs({ enabled: false })}, t('classic'))));
        }

        function Rail(props) {
          const t = useT();
          const { rows, current, phase } = useRows(props);
          useNav(rows, current);
          if (phase !== 'ready' || rows.length === 0) {
            return h('nav', {className: 'ar-root', 'aria-label': t('agents')},
              h('style', null, css),
              h('div', {className: 'ar-rail'},
                h('span', {className: 'ar-rail-empty'}, phase === 'ready' ? t('empty') : t('loading'))));
          }
          return h('nav', {className: 'ar-root', 'aria-label': t('agents')},
            h('style', null, css),
            h('div', {className: 'ar-rail'}, rows.map((entry) => {
              const s = entry.session;
              const title = s.displayTitle || s.title || t('open');
              const descriptor = chipTitle(entry.harness);
              return h('button', {
                key: entry.id, type: 'button', className: 'ar-rail-row',
                'data-status': entry.state, 'data-current': current === s.id,
                title: [title, t(entry.state), descriptor, s.cwd ? homePath(s.cwd) : ''].filter(Boolean).join(' · '),
                'aria-label': t('open') + ': ' + title,
                onClick: () => ctx.uiWorkspace.openSession(s.id)
              }, entry.brand !== null ? logoNode(entry.brand) : (modelMark(entry.harness) || initials(title)), h('i', {className: 'ar-dot'}));
            })));
        }

        function AgentView(props) {
          return props.wide ? h(Agents, props) : h(Rail, props);
        }

        function toggleAlerts() {
          if (prefs.alerts) { savePrefs({ alerts: false }); return; }
          if (typeof Notification === 'undefined') return;
          if (Notification.permission === 'granted') { savePrefs({ alerts: true }); return; }
          if (Notification.permission === 'denied') {
            pushToast({ sessionId: null, title: t('alertsBlockedTitle'), kind: 'info', reason: t('alertsBlocked') });
            return;
          }
          Promise.resolve(Notification.requestPermission()).then((result) => {
            if (result === 'granted') savePrefs({ alerts: true });
            else pushToast({ sessionId: null, title: t('alertsBlockedTitle'), kind: 'info', reason: t('alertsBlocked') });
          }).catch(() => {});
        }

        function Restore() {
          const t = useT();
          const prefs = usePrefs();
          if (prefs.enabled) return null;
          return h('button', {
            type: 'button', className: 'ar-restore', title: t('restoreHint'),
            onClick: () => savePrefs({ enabled: true })
          }, h('span', {className: 'ar-restore-icon'}, h(RailIcon)), h('span', null, t('restore')));
        }

        function Toasts() {
          const t = useT();
          const items = React.useSyncExternalStore(subscribeToasts, getToasts, getToasts);
          return h('div', {className: 'ar-toasts', 'aria-live': 'polite'},
            h('style', null, css),
            items.map((item) => h('div', {
              key: item.id, className: 'ar-toast', 'data-kind': item.kind,
              role: item.kind === 'needs' ? 'alert' : 'status'
            },
              h('button', {
                type: 'button', className: 'ar-toast-main',
                onClick: () => {
                  if (item.sessionId !== null && item.sessionId !== undefined) {
                    try { ctx.uiWorkspace.openSession(item.sessionId); } catch {}
                  }
                  dismissToast(item.id);
                }
              },
                h('span', {className: 'ar-avatar'},
                  item.brand !== undefined && item.brand !== null ? logoNode(item.brand) : (item.mark || initials(item.title))),
                h('span', {className: 'ar-toast-text'},
                  h('span', {className: 'ar-toast-title'}, item.title),
                  h('span', {className: 'ar-toast-reason'}, item.reason))),
              h('button', {
                type: 'button', className: 'ar-toast-close', 'aria-label': t('dismiss'),
                onClick: () => dismissToast(item.id)
              }, h(XIcon)))));
        }

        /**
         * Last resort: a broken render must not blank the browser region with
         * no way back. The fallback never touches session data and only
         * unregisters this view.
         */
        class Boundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { failed: false };
          }
          static getDerivedStateFromError() { return { failed: true }; }
          componentDidCatch(error) { console.error('[dsh-agent-rail]', error); }
          render() {
            if (this.state.failed) {
              return h('div', {className: 'ar-root'},
                h('style', null, css),
                h('div', {className: 'ar-empty'},
                  h('span', {className: 'ar-empty-title'}, t('broken')),
                  h('span', null, t('brokenHint')),
                  h('button', {type: 'button', className: 'ar-classic', onClick: () => savePrefs({ enabled: false })}, t('classic'))));
            }
            return this.props.children;
          }
        }

        function Shell(props) {
          return h(Boundary, null, h(AgentView, props));
        }

        function sync() {
          if (!prefs.enabled) { if (release !== undefined) { release(); release = undefined; } return; }
          if (release !== undefined) return;
          release = ctx.slots.register({
            // The native sidebar owns its child slots; replace only its
            // workspace view. Native tools, settings and slot owners stay live.
            // Slot precedence is ascending: lower priorities render first.
            name: 'sidebar.workspaces', priority: -50
          }, Shell);
        }

        ctx.slots.inject('sidebar.workspaces', () => {
          sync();
          return () => { if (release !== undefined) { release(); release = undefined; } };
        });
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action', id: 'agent-rail-toggle', order: 40, label: () => t('restore')
        }, Restore));
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'agent-rail-alerts', order: 100, label: () => t('agents')
        }, Toasts));
      }
    };
  }
});
