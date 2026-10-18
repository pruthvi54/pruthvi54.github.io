/**
 * Booking backend for the "Book a call" window on the website. Runs inside the owner's Google account
 * as a Google Apps Script web app (see SETUP.md). Nothing else is needed: no Cal.com, no server.
 *
 * - Free hours: events titled "Bookable" or "Bookable hours" in the main calendar (and any events in a calendar named
 *   CONFIG.BOOKABLE_CALENDAR, if it exists).
 * - Busy time: every other timed event in the main calendar, except ones shown as "Free", cancelled or declined.
 * - A request becomes a "Pending: <name>" event in the main calendar (so the slot is held) and an
 *   email to the owner with Accept / Decline buttons. Accept invites the guest with a Google Meet link;
 *   Decline deletes the hold and tells the guest.
 */

const CONFIG = {
  BOOKABLE_CALENDAR: 'Bookable hours', // name of the calendar whose events are your free hours
  SLOT_MINUTES: 30,                     // length of a call
  MIN_NOTICE_HOURS: 12,                 // earliest a call can be booked, from now
  HORIZON_DAYS: 28,                     // how far ahead visitors can book
  MAX_REQUESTS_PER_HOUR: 12,            // simple spam limit across all visitors
  OWNER_TIME_ZONE: 'Asia/Tokyo',        // used in the emails you receive
  SITE_URL: 'https://pruthvi54.github.io/'
};

/* ---------- Web app entry points ---------- */

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'accept' || p.action === 'decline') return decisionPage_(p);
  try {
    const slots = availableSlots_(new Date());
    return json_({ ok: true, durationMinutes: CONFIG.SLOT_MINUTES, slots: slots.map((d) => d.toISOString()) });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    let request;
    try { request = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, error: 'Invalid request.' }); }
    const problem = validateRequest_(request);
    if (problem) return json_({ ok: false, error: problem });
    if (!withinRateLimit_()) return json_({ ok: false, error: 'Too many requests right now. Please try again in a while.' });

    const start = new Date(request.start);
    const stillFree = availableSlots_(new Date()).some((d) => d.getTime() === start.getTime());
    if (!stillFree) return json_({ ok: false, taken: true, error: 'That time was just taken. Please choose another.' });

    const end = new Date(start.getTime() + CONFIG.SLOT_MINUTES * 60000);
    const name = request.name.trim();
    const email = request.email.trim();
    const note = (request.note || '').trim();
    const guestZone = validTimeZone_(request.timeZone) ? request.timeZone : 'UTC';

    const event = CalendarApp.getDefaultCalendar().createEvent('Pending: ' + name, start, end, {
      description: 'Call request from the website.\n\nName: ' + name + '\nEmail: ' + email + '\nGuest time zone: ' + guestZone + (note ? '\n\nNote:\n' + note : '')
    });
    event.setTag('booking', 'pending');
    event.setTag('guestName', name);
    event.setTag('guestEmail', email);
    event.setTag('guestZone', guestZone);
    const id = event.getId();
    const accept = decisionUrl_('accept', id);
    const decline = decisionUrl_('decline', id);
    event.setDescription(event.getDescription() + '\n\nAccept: ' + accept + '\nDecline: ' + decline);

    const ownerWhen = formatWhen_(start, CONFIG.OWNER_TIME_ZONE) + ' (Japan time)';
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: 'Call request: ' + name + ' — ' + ownerWhen,
      htmlBody:
        '<p><b>' + escape_(name) + '</b> (' + escape_(email) + ') asked for a ' + CONFIG.SLOT_MINUTES + '-minute call on <b>' + escape_(ownerWhen) + '</b>.</p>' +
        (note ? '<p>Note: ' + escape_(note) + '</p>' : '') +
        '<p>The time is held in your calendar as "Pending: ' + escape_(name) + '".</p>' +
        '<p><a href="' + accept + '" style="padding:10px 16px;background:#2e4a40;color:#fff;text-decoration:none;border-radius:6px">Accept</a> &nbsp; ' +
        '<a href="' + decline + '" style="padding:10px 16px;border:1px solid #2e4a40;color:#2e4a40;text-decoration:none;border-radius:6px">Decline</a></p>'
    });
    MailApp.sendEmail({
      to: email,
      subject: 'Your call request with Pruthviraj Mane',
      htmlBody:
        '<p>Hi ' + escape_(name) + ',</p><p>Thanks for your request for a ' + CONFIG.SLOT_MINUTES + '-minute call on <b>' +
        escape_(formatWhen_(start, guestZone)) + '</b> (' + escape_(guestZone) + ').</p>' +
        '<p>You will receive a Google Calendar invitation with a Google Meet link once it is confirmed.</p><p>Pruthviraj</p>'
    });
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- Accept / Decline (from the owner's email) ---------- */

// The email link opens a small page with a button, so link scanners that "visit" links can't accept or decline.
function decisionPage_(p) {
  const valid = p.id && p.token && p.token === token_(p.id);
  const action = p.action === 'accept' ? 'accept' : 'decline';
  const body = valid
    ? '<h2 style="font-family:Georgia,serif;font-weight:400">' + (action === 'accept' ? 'Accept this call?' : 'Decline this call?') + '</h2>' +
      '<button id="go" style="padding:10px 18px;font-size:16px">' + (action === 'accept' ? 'Accept and send invitation' : 'Decline and free the time') + '</button>' +
      '<p id="out" style="font-family:sans-serif"></p>' +
      '<script>document.getElementById("go").onclick=function(){this.disabled=true;document.getElementById("out").textContent="Working…";' +
      'google.script.run.withSuccessHandler(function(m){document.getElementById("out").textContent=m;})' +
      '.withFailureHandler(function(e){document.getElementById("out").textContent="Error: "+e.message;})' +
      '.decide(' + JSON.stringify(action) + ',' + JSON.stringify(p.id) + ',' + JSON.stringify(p.token) + ');};</script>'
    : '<p style="font-family:sans-serif">This link is not valid.</p>';
  return HtmlService.createHtmlOutput('<div style="max-width:520px;margin:48px auto;font-family:sans-serif">' + body + '</div>')
    .setTitle('Call request');
}

function decide(action, id, token) {
  if (token !== token_(id)) throw new Error('This link is not valid.');
  const calendar = CalendarApp.getDefaultCalendar();
  const event = calendar.getEventById(id);
  if (!event) return 'This request no longer exists (it may have been handled already).';
  const state = event.getTag('booking');
  const name = event.getTag('guestName');
  const email = event.getTag('guestEmail');
  const zone = event.getTag('guestZone') || 'UTC';
  if (state === 'confirmed') return 'Already accepted — the invitation was sent.';

  if (action === 'accept') {
    Calendar.Events.patch({
      summary: 'Call with ' + name,
      attendees: [{ email: email }],
      conferenceData: { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: 'hangoutsMeet' } } }
    }, calendar.getId(), id.replace(/@google\.com$/, ''), { conferenceDataVersion: 1, sendUpdates: 'all' });
    event.setTag('booking', 'confirmed');
    return 'Accepted. ' + name + ' has been sent a Google Calendar invitation with a Google Meet link.';
  }
  const when = formatWhen_(event.getStartTime(), zone);
  event.deleteEvent();
  MailApp.sendEmail({
    to: email,
    subject: 'About your call request',
    htmlBody: '<p>Hi ' + escape_(name) + ',</p><p>Unfortunately I can’t make <b>' + escape_(when) + '</b> (' + escape_(zone) + '). ' +
      'Please choose another time at <a href="' + CONFIG.SITE_URL + '#book">' + CONFIG.SITE_URL + '</a>.</p><p>Pruthviraj</p>'
  });
  return 'Declined. The time is free again and ' + name + ' has been told.';
}

/* ---------- Availability ---------- */

function availableSlots_(now) {
  const from = new Date(now.getTime() + CONFIG.MIN_NOTICE_HOURS * 3600000);
  const to = new Date(now.getTime() + CONFIG.HORIZON_DAYS * 86400000);
  const main = CalendarApp.getDefaultCalendar().getId();
  const items = [];
  let pageToken;
  do {
    const page = Calendar.Events.list(main, { timeMin: from.toISOString(), timeMax: to.toISOString(), singleEvents: true, maxResults: 2500, pageToken: pageToken });
    (page.items || []).forEach((e) => items.push(e));
    pageToken = page.nextPageToken;
  } while (pageToken);
  // Free hours: events titled "Bookable" in the main calendar, plus any events in the "Bookable hours" calendar.
  const windows = freeWindowsFromEvents_(items);
  CalendarApp.getCalendarsByName(CONFIG.BOOKABLE_CALENDAR).forEach((c) =>
    c.getEvents(from, to).forEach((e) => windows.push({ start: e.getStartTime(), end: e.getEndTime() })));
  return slotsFrom_(windows, busyFromEvents_(items), from, CONFIG.SLOT_MINUTES);
}

const FREE_TITLE_ = /^\s*bookable(\s+hours?)?\s*$/i; // "Bookable" / "Bookable hours" events mark free hours instead of busy time

// Pure: "Bookable" events in the main calendar become free windows.
function freeWindowsFromEvents_(items) {
  return items.filter((e) => e.status !== 'cancelled' && FREE_TITLE_.test(e.summary || '') && e.start && e.start.dateTime)
    .map((e) => ({ start: new Date(e.start.dateTime), end: new Date(e.end.dateTime) }));
}

// Pure: busy time = every other timed event, except ones shown as "Free", cancelled, or declined by you.
function busyFromEvents_(items) {
  return items.filter((e) => {
    if (e.status === 'cancelled' || e.transparency === 'transparent') return false;
    if (FREE_TITLE_.test(e.summary || '')) return false;
    if (!e.start || !e.start.dateTime) return false; // all-day events don't block (Google treats them as free by default)
    const me = (e.attendees || []).find((a) => a.self);
    return !(me && me.responseStatus === 'declined');
  }).map((e) => ({ start: new Date(e.start.dateTime), end: new Date(e.end.dateTime) }));
}

// Pure: cut each free window into slots, drop slots before `from` or overlapping a busy interval.
function slotsFrom_(windows, busy, from, minutes) {
  const step = minutes * 60000;
  const seen = {};
  const out = [];
  windows.forEach((w) => {
    for (let t = w.start.getTime(); t + step <= w.end.getTime(); t += step) {
      if (t < from.getTime() || seen[t]) continue;
      const overlaps = busy.some((b) => b.start.getTime() < t + step && b.end.getTime() > t);
      if (overlaps) continue;
      seen[t] = true;
      out.push(new Date(t));
    }
  });
  return out.sort((a, b) => a - b);
}

/* ---------- Helpers ---------- */

// Pure: returns an error message, or '' when the request looks valid.
function validateRequest_(r) {
  if (!r || typeof r !== 'object') return 'Invalid request.';
  if (r.website) return 'Invalid request.'; // honeypot field, invisible to people
  if (typeof r.name !== 'string' || !r.name.trim() || r.name.length > 80) return 'Please enter your name.';
  if (typeof r.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email.trim()) || r.email.length > 120) return 'Please enter a valid email address.';
  if (r.note && (typeof r.note !== 'string' || r.note.length > 1000)) return 'Please keep the note under 1000 characters.';
  if (typeof r.start !== 'string' || isNaN(new Date(r.start).getTime())) return 'Please choose a time.';
  return '';
}

function validTimeZone_(zone) {
  return typeof zone === 'string' && /^[A-Za-z_]+(\/[A-Za-z0-9_+\-]+){0,2}$/.test(zone);
}

function withinRateLimit_() {
  const cache = CacheService.getScriptCache();
  const key = 'requests-' + Math.floor(Date.now() / 3600000);
  const count = Number(cache.get(key) || 0);
  if (count >= CONFIG.MAX_REQUESTS_PER_HOUR) return false;
  cache.put(key, String(count + 1), 3700);
  return true;
}

function token_(id) {
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty('SECRET');
  if (!secret) { secret = Utilities.getUuid() + Utilities.getUuid(); props.setProperty('SECRET', secret); }
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(id, secret)).replace(/=+$/, '');
}

function decisionUrl_(action, id) {
  return ScriptApp.getService().getUrl() + '?action=' + action + '&id=' + encodeURIComponent(id) + '&token=' + token_(id);
}

function formatWhen_(date, zone) {
  return Utilities.formatDate(date, zone, "EEE d MMM yyyy, h:mm a");
}

function escape_(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor (select "authorize" and click Run) to grant permissions and check the setup.
function authorize() {
  const slots = availableSlots_(new Date());
  Logger.log('Setup OK. %s bookable slots in the next %s days. First: %s', slots.length, CONFIG.HORIZON_DAYS, slots[0] ? formatWhen_(slots[0], CONFIG.OWNER_TIME_ZONE) : 'none');
  MailApp.getRemainingDailyQuota();
}
