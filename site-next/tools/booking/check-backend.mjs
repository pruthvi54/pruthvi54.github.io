// Runs the pure parts of Code.gs (slot generation, request validation) in Node, without Google.
// Usage: node tools/booking/check-backend.mjs   (exits non-zero on failure)
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context);
const { slotsFrom_, validateRequest_, validTimeZone_, freeWindowsFromEvents_, busyFromEvents_ } = context;

const at = (iso) => new Date(iso);
const iso = (dates) => Array.from(dates, (d) => d.toISOString()); // copy out of the sandbox realm

// A 10:00–12:00 window gives four 30-minute slots.
assert.deepEqual(iso(slotsFrom_([{ start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T03:00:00Z') }], [], at('2026-10-18T00:00:00Z'), 30)),
  ['2026-10-19T01:00:00.000Z', '2026-10-19T01:30:00.000Z', '2026-10-19T02:00:00.000Z', '2026-10-19T02:30:00.000Z']);

// A busy 10:15–10:45 removes the two slots it touches.
assert.deepEqual(iso(slotsFrom_([{ start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T03:00:00Z') }],
  [{ start: at('2026-10-19T01:15:00Z'), end: at('2026-10-19T01:45:00Z') }], at('2026-10-18T00:00:00Z'), 30)),
  ['2026-10-19T02:00:00.000Z', '2026-10-19T02:30:00.000Z']);

// Busy time that only touches a slot's edge does not remove it.
assert.equal(slotsFrom_([{ start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T02:00:00Z') }],
  [{ start: at('2026-10-19T00:00:00Z'), end: at('2026-10-19T01:00:00Z') }], at('2026-10-18T00:00:00Z'), 30).length, 2);

// Slots before the minimum-notice time are dropped; a too-short window gives nothing.
assert.equal(slotsFrom_([{ start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T03:00:00Z') }], [], at('2026-10-19T02:00:00Z'), 30).length, 2);
assert.equal(slotsFrom_([{ start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T01:20:00Z') }], [], at('2026-10-18T00:00:00Z'), 30).length, 0);

// Overlapping free windows don't produce duplicate slots, and output is sorted.
const merged = slotsFrom_([
  { start: at('2026-10-19T02:00:00Z'), end: at('2026-10-19T03:00:00Z') },
  { start: at('2026-10-19T01:00:00Z'), end: at('2026-10-19T02:30:00Z') }
], [], at('2026-10-18T00:00:00Z'), 30);
assert.deepEqual(iso(merged), ['2026-10-19T01:00:00.000Z', '2026-10-19T01:30:00.000Z', '2026-10-19T02:00:00.000Z', '2026-10-19T02:30:00.000Z']);

// Request validation.
const good = { name: 'Ada', email: 'ada@example.com', start: '2026-10-19T01:00:00.000Z', note: '' };
assert.equal(validateRequest_(good), '');
assert.notEqual(validateRequest_({ ...good, website: 'spam' }), '');
assert.notEqual(validateRequest_({ ...good, name: ' ' }), '');
assert.notEqual(validateRequest_({ ...good, email: 'not-an-email' }), '');
assert.notEqual(validateRequest_({ ...good, start: 'tomorrow' }), '');
assert.notEqual(validateRequest_({ ...good, note: 'x'.repeat(1001) }), '');
assert.equal(validTimeZone_('Asia/Kolkata'), true);
assert.equal(validTimeZone_('America/Argentina/Buenos_Aires'), true);
assert.equal(validTimeZone_('<script>'), false);

// Main-calendar events: "Bookable" is free time, other events are busy, unless Free / cancelled / declined / all-day.
const ev = (summary, start, end, extra = {}) => ({ summary, start: { dateTime: start }, end: { dateTime: end }, ...extra });
const items = [
  ev('Bookable', '2026-10-22T10:00:00+09:00', '2026-10-22T22:30:00+09:00'),
  ev('Astroscale Update', '2026-10-22T10:00:00+09:00', '2026-10-22T12:00:00+09:00'),
  ev('Lunch (shown as free)', '2026-10-22T12:00:00+09:00', '2026-10-22T13:00:00+09:00', { transparency: 'transparent' }),
  ev('Declined meeting', '2026-10-22T13:00:00+09:00', '2026-10-22T14:00:00+09:00', { attendees: [{ self: true, responseStatus: 'declined' }] }),
  ev('Cancelled', '2026-10-22T14:00:00+09:00', '2026-10-22T15:00:00+09:00', { status: 'cancelled' }),
  { summary: 'Holiday', start: { date: '2026-10-22' }, end: { date: '2026-10-23' } }
];
assert.equal(freeWindowsFromEvents_(items).length, 1);
assert.equal(freeWindowsFromEvents_([ev('Bookable Hours', '2026-10-23T10:00:00+09:00', '2026-10-23T22:30:00+09:00')]).length, 1); // the owner's actual title
assert.equal(busyFromEvents_([ev('bookable hour', '2026-10-23T10:00:00+09:00', '2026-10-23T22:30:00+09:00')]).length, 0);
assert.equal(freeWindowsFromEvents_([ev('Not bookable meeting', '2026-10-23T10:00:00+09:00', '2026-10-23T11:00:00+09:00')]).length, 0);
const busy = busyFromEvents_(items);
assert.equal(busy.length, 1); // only Astroscale blocks
const thursday = slotsFrom_(freeWindowsFromEvents_(items), busy, at('2026-10-21T00:00:00Z'), 30);
assert.equal(thursday[0].toISOString(), '2026-10-22T03:00:00.000Z'); // first slot 12:00 Tokyo
assert.equal(thursday.length, 21); // 12:00–22:30 = 21 half-hour slots

console.log('Code.gs pure functions: all checks passed');
