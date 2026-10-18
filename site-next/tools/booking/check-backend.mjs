// Runs the pure parts of Code.gs (slot generation, request validation) in Node, without Google.
// Usage: node tools/booking/check-backend.mjs   (exits non-zero on failure)
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context);
const { slotsFrom_, validateRequest_, validTimeZone_ } = context;

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

console.log('Code.gs pure functions: all checks passed');
