// On-site booking window. The Cal.com embed script is loaded only when a visitor opens it.
type CalApi = ((...args: unknown[]) => void) & { ns: Record<string, (...args: unknown[]) => void>; loaded?: boolean; q?: unknown[] };
declare global { interface Window { Cal?: CalApi } }

const EMBED_SRC = 'https://app.cal.com/embed/embed.js';
const NAMESPACE = 'book';
let embedStarted = false;
let opener: HTMLElement | null = null;

// Official Cal.com embed loader (verbatim from cal.com/docs): queues calls until embed.js loads.
function loadCal(): CalApi {
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    let p = function (a: any, ar: any) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api: any = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); }
        else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, EMBED_SRC, 'init');
  return window.Cal!;
}

function startEmbed(dialog: HTMLDialogElement) {
  if (embedStarted) return;
  const calLink = dialog.dataset.bookingLink; // Not data-cal-link: Cal.com's embed.js turns any click inside such an element into its own pop-up.
  if (!calLink) return;
  embedStarted = true;
  const Cal = loadCal();
  Cal('init', NAMESPACE, { origin: 'https://cal.com' });
  const api = Cal.ns[NAMESPACE];
  api('inline', {
    elementOrSelector: '#book-call-embed',
    calLink,
    layout: 'month_view',
    config: { layout: 'month_view', theme: 'light' }
  });
  api('ui', {
    theme: 'light',
    layout: 'month_view',
    hideEventTypeDetails: false,
    cssVarsPerTheme: { light: { 'cal-brand': '#426358' } }
  });
  const status = dialog.querySelector<HTMLElement>('.book-status');
  const done = () => { if (status) status.textContent = 'Request sent. You will receive an email once it is confirmed.'; };
  api('on', { action: 'bookingSuccessful', callback: done });
  api('on', { action: 'bookingSuccessfulV2', callback: done });
  api('on', { action: 'linkReady', callback: () => dialog.querySelector('.book-loading')?.remove() });
}

function open(dialog: HTMLDialogElement, trigger: HTMLElement) {
  opener = trigger;
  dialog.showModal();
  document.documentElement.classList.add('dialog-open');
  startEmbed(dialog);
}

function init() {
  const dialog = document.querySelector<HTMLDialogElement>('#book-call');
  if (!dialog || typeof dialog.showModal !== 'function') return; // Links keep working without the dialog.
  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element).closest<HTMLElement>('[data-book-call]');
    if (!trigger || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    open(dialog, trigger);
  });
  dialog.querySelector('[data-book-close]')?.addEventListener('click', () => dialog.close());
  // Clicking the dimmed backdrop (outside the panel) closes the window.
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    opener?.focus();
  });
  if (location.hash === '#book') open(dialog, document.querySelector('[data-book-call]') ?? document.body);
}

init();
export {};
