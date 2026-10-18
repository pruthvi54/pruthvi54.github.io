// Booking picker for the "Book a call" window, fed by the owner's Google Apps Script (tools/booking/Code.gs).
// Slots arrive as UTC instants and are shown in the visitor's own time zone (the browser's).
// Flow: pick a day -> pick a time -> name/email/note -> request. The owner accepts it from email.

type Slot = Date;
type View = 'pick' | 'form' | 'done';

const pad = (n: number) => String(n).padStart(2, '0');
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // local date
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function mountBooking(root: HTMLElement, endpoint: string, minutes: number) {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; // sent with the request
  // Shown to the visitor: the readable name, e.g. "India Standard Time" rather than "Asia/Calcutta".
  const zoneName = new Intl.DateTimeFormat([], { timeZoneName: 'long' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value || zone;
  const state = {
    slots: [] as Slot[],
    byDay: new Map<string, Slot[]>(),
    month: new Date(),
    day: '' as string,
    time: null as Slot | null,
    hour12: new Intl.DateTimeFormat([], { hour: 'numeric' }).resolvedOptions().hour12 ?? true, // follow the visitor's locale
    view: 'pick' as View,
    error: '',
    notice: ''
  };
  const timeLabel = (d: Date) => d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: state.hour12 });
  const longDate = (d: Date) => d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });

  root.innerHTML = '<p class="book-loading meta-label">Loading available times…</p>';

  async function load(keepSelection = false) {
    try {
      const response = await fetch(endpoint, { method: 'GET' });
      const data = await response.json();
      if (!data.ok) throw new Error(data.error || 'Could not load times');
      state.slots = (data.slots as string[]).map((s) => new Date(s)).filter((d) => !isNaN(d.getTime()));
      state.byDay = new Map();
      for (const s of state.slots) {
        const key = dayKey(s);
        if (!state.byDay.has(key)) state.byDay.set(key, []);
        state.byDay.get(key)!.push(s);
      }
      if (!keepSelection || !state.byDay.has(state.day)) {
        const first = state.slots[0];
        state.day = first ? dayKey(first) : '';
        state.month = first ? new Date(first.getFullYear(), first.getMonth(), 1) : new Date();
      }
      state.error = '';
    } catch {
      state.error = 'load';
    }
    render();
  }

  function calendarHtml() {
    const y = state.month.getFullYear();
    const m = state.month.getMonth();
    const first = new Date(y, m, 1);
    const days = new Date(y, m + 1, 0).getDate();
    const title = first.toLocaleDateString([], { month: 'long', year: 'numeric' });
    const now = new Date();
    const canPrev = y > now.getFullYear() || (y === now.getFullYear() && m > now.getMonth());
    const last = state.slots[state.slots.length - 1];
    const canNext = !!last && (last.getFullYear() > y || (last.getFullYear() === y && last.getMonth() > m));
    const weekdays = [...Array(7)].map((_, i) => new Date(2023, 0, 1 + i).toLocaleDateString([], { weekday: 'short' }));
    let cells = '';
    for (let i = 0; i < first.getDay(); i++) cells += '<span class="bk-day bk-day-empty" aria-hidden="true"></span>';
    for (let d = 1; d <= days; d++) {
      const key = `${y}-${pad(m + 1)}-${pad(d)}`;
      const open = state.byDay.has(key);
      const selected = key === state.day;
      const label = new Date(y, m, d).toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
      cells += `<button type="button" class="bk-day${open ? ' bk-day-open' : ''}${selected ? ' bk-day-selected' : ''}" data-day="${key}" ${open ? '' : 'disabled'} aria-pressed="${selected}" aria-label="${esc(label)}${open ? '' : ', no times'}">${d}</button>`;
    }
    return `<div class="bk-cal-head"><span class="bk-month">${esc(title)}</span>
      <span class="bk-nav"><button type="button" data-nav="-1" aria-label="Previous month" ${canPrev ? '' : 'disabled'}>‹</button><button type="button" data-nav="1" aria-label="Next month" ${canNext ? '' : 'disabled'}>›</button></span></div>
      <div class="bk-weekdays" aria-hidden="true">${weekdays.map((w) => `<span>${esc(w)}</span>`).join('')}</div>
      <div class="bk-grid">${cells}</div>`;
  }

  function timesHtml() {
    const list = state.byDay.get(state.day) || [];
    const heading = list[0] ? `${list[0].toLocaleDateString([], { weekday: 'short' })} ${list[0].getDate()}` : '';
    return `<div class="bk-times-head"><span class="bk-times-day">${esc(heading)}</span>
      <span class="bk-toggle" role="group" aria-label="Clock format"><button type="button" data-hour12="1" aria-pressed="${state.hour12}">12h</button><button type="button" data-hour12="0" aria-pressed="${!state.hour12}">24h</button></span></div>
      ${state.notice ? `<p class="bk-notice" role="status">${esc(state.notice)}</p>` : ''}
      <div class="bk-times-list">${list.map((s) => `<button type="button" class="bk-time" data-time="${s.toISOString()}">${esc(timeLabel(s))}</button>`).join('') || '<p class="bk-empty">No times on this day.</p>'}</div>`;
  }

  function infoHtml() {
    const chosen = state.time && state.view !== 'pick'
      ? `<p class="bk-chosen">${esc(longDate(state.time))}<br>${esc(timeLabel(state.time))} – ${esc(timeLabel(new Date(state.time.getTime() + minutes * 60000)))}</p>` : '';
    return `<p class="bk-host">Pruthviraj Mane</p><h3 class="bk-title">${minutes}-minute call</h3>
      <ul class="bk-facts"><li>${minutes} min</li><li>Google Meet</li><li>Your time zone: <b>${esc(zoneName)}</b></li></ul>${chosen}`;
  }

  function render() {
    if (state.error === 'load') {
      root.innerHTML = `<div class="bk-message"><p>Available times could not be loaded right now.</p>
        <p><button type="button" class="text-link bk-retry">Try again</button> or email <a class="text-link" href="mailto:pruthviraj3629@gmail.com?subject=${encodeURIComponent('Request for a 30-minute call')}">pruthviraj3629@gmail.com</a>.</p></div>`;
      root.querySelector('.bk-retry')?.addEventListener('click', () => { root.innerHTML = '<p class="book-loading meta-label">Loading available times…</p>'; load(); });
      return;
    }
    if (state.view === 'done') {
      root.innerHTML = `<div class="bk bk-single"><aside class="bk-info">${infoHtml()}</aside><section class="bk-done" role="status">
        <h3>Request sent</h3><p>You will receive a Google Calendar invitation with a Google Meet link once I confirm the time. A copy of your request is on its way to your inbox.</p></section></div>`;
      return;
    }
    if (state.view === 'form' && state.time) {
      root.innerHTML = `<div class="bk bk-single"><aside class="bk-info">${infoHtml()}<button type="button" class="bk-back text-link">← Choose another time</button></aside>
        <form class="bk-form" novalidate>
          <label>Your name<input name="name" autocomplete="name" required maxlength="80"></label>
          <label>Email<input name="email" type="email" autocomplete="email" required maxlength="120"></label>
          <label>What would you like to discuss? <span class="bk-optional">(optional)</span><textarea name="note" rows="4" maxlength="1000"></textarea></label>
          <label class="bk-hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <p class="bk-form-error" role="alert">${esc(state.error && state.error !== 'load' ? state.error : '')}</p>
          <button type="submit" class="bk-submit">Request this time</button>
        </form></div>`;
      root.querySelector('.bk-back')!.addEventListener('click', () => { state.view = 'pick'; state.error = ''; render(); });
      const form = root.querySelector<HTMLFormElement>('.bk-form')!;
      form.querySelector<HTMLInputElement>('input[name="name"]')!.focus();
      form.addEventListener('submit', submit);
      return;
    }
    if (!state.slots.length) {
      root.innerHTML = `<div class="bk bk-single"><aside class="bk-info">${infoHtml()}</aside><div class="bk-message"><p>There are no open times in the next few weeks. Please email <a class="text-link" href="mailto:pruthviraj3629@gmail.com">pruthviraj3629@gmail.com</a> to find a time.</p></div></div>`;
      return;
    }
    root.innerHTML = `<div class="bk"><aside class="bk-info">${infoHtml()}</aside><section class="bk-calendar" aria-label="Choose a day">${calendarHtml()}</section><section class="bk-times" aria-label="Choose a time">${timesHtml()}</section></div>`;
    root.querySelectorAll<HTMLButtonElement>('[data-day]').forEach((b) => b.addEventListener('click', () => { state.day = b.dataset.day!; render(); root.querySelector<HTMLButtonElement>(`[data-day="${state.day}"]`)?.focus(); }));
    root.querySelectorAll<HTMLButtonElement>('[data-nav]').forEach((b) => b.addEventListener('click', () => {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + Number(b.dataset.nav), 1);
      const firstOpen = state.slots.find((s) => s.getFullYear() === state.month.getFullYear() && s.getMonth() === state.month.getMonth());
      if (firstOpen) state.day = dayKey(firstOpen);
      render();
    }));
    root.querySelectorAll<HTMLButtonElement>('[data-hour12]').forEach((b) => b.addEventListener('click', () => { state.hour12 = b.dataset.hour12 === '1'; render(); }));
    root.querySelectorAll<HTMLButtonElement>('[data-time]').forEach((b) => b.addEventListener('click', () => { state.time = new Date(b.dataset.time!); state.view = 'form'; state.error = ''; state.notice = ''; render(); }));
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errorBox = form.querySelector<HTMLElement>('.bk-form-error')!;
    if (!fields.name.trim()) { errorBox.textContent = 'Please enter your name.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) { errorBox.textContent = 'Please enter a valid email address.'; return; }
    const button = form.querySelector<HTMLButtonElement>('.bk-submit')!;
    button.disabled = true;
    button.textContent = 'Sending…';
    errorBox.textContent = '';
    try {
      // Plain-text body keeps this a "simple" request, which Apps Script web apps accept cross-origin.
      const response = await fetch(endpoint, { method: 'POST', body: JSON.stringify({ ...fields, start: state.time!.toISOString(), timeZone: zone }) });
      const data = await response.json();
      if (data.ok) { state.view = 'done'; render(); return; }
      if (data.taken) { state.view = 'pick'; state.error = ''; state.notice = 'That time was just taken. Please choose another.'; await load(true); return; }
      errorBox.textContent = data.error || 'Something went wrong. Please try again.';
    } catch {
      errorBox.textContent = 'Could not send the request. Please check your connection and try again.';
    }
    button.disabled = false;
    button.textContent = 'Request this time';
  }

  load();
}
