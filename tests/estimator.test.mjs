// Run: node --experimental-strip-types --test tests/*.test.mjs
// Pins the estimator arithmetic that goes to the customer's technical team for
// sign-off (docs/ESTIMATOR-FORMULA.md). If a number here changes, the sign-off
// document must change with it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../src/data/products.ts';
import {
  catalogueFrom,
  estimate,
  estimateMessage,
  normaliseInput,
  postMakeUp,
} from '../src/lib/estimator.ts';

const cat = catalogueFrom(products);
const row = (e, key) => e.rows.filter((r) => r.key === key);
const qty = (e, key) => row(e, key).reduce((a, r) => a + r.qty, 0);

test('catalogue weights come from the brochure tables', () => {
  assert.equal(cat.verticalKg['3.00'], 13.5);
  assert.equal(cat.verticalKg['0.50'], 2.25);
  assert.equal(cat.ledgerKg['1.80'], 7.4);
  assert.equal(cat.ledgerKg['1.20'], 5.1);
  assert.equal(cat.ledgerKg['2.00'], 8.2);
});

test('posts are made up of 3.0 m standards plus one shorter piece', () => {
  assert.deepEqual(postMakeUp(6), [3, 3]);
  assert.deepEqual(postMakeUp(7.5), [3, 3, 1.5]);
  assert.deepEqual(postMakeUp(2), [2]);
  assert.deepEqual(postMakeUp(10.5), [3, 3, 3, 1.5]);
});

test('worked example A: access, 10 x 1 bays of 1.8 m, 6 m', () => {
  const e = estimate({ type: 'access', bayM: 1.8, baysLong: 10, baysWide: 1, heightM: 6 }, cat);
  assert.equal(e.posts, 22);
  assert.equal(e.lifts, 3);
  assert.equal(e.ledgerLevels, 4);
  assert.equal(qty(e, 'vertical'), 44);
  assert.equal(qty(e, 'ledger'), 124); // (10*2 + 1*11) * 4
  assert.equal(qty(e, 'baseJack'), 22);
  assert.equal(qty(e, 'uHead'), 0);
  assert.equal(qty(e, 'platform'), 60); // 10 bays * 6 platforms across 1.8 m
  assert.equal(qty(e, 'toeBoard'), 22); // 2 * (10 + 1)
  assert.equal(qty(e, 'ladder'), 3);
  assert.equal(e.knownKg, 1511.6); // 44*13.5 + 124*7.4
});

test('worked example B: access, 6 x 2 bays of 1.5 m, 7.5 m', () => {
  const e = estimate({ type: 'access', bayM: 1.5, baysLong: 6, baysWide: 2, heightM: 7.5 }, cat);
  assert.equal(e.posts, 21);
  assert.equal(e.lifts, 4);
  assert.deepEqual(e.levelHeightsM, [0.5, 2, 4, 6, 7.5]);
  assert.deepEqual(
    row(e, 'vertical').map((r) => [r.size, r.qty]),
    [['3.0 m', 42], ['1.5 m', 21]]
  );
  assert.equal(qty(e, 'ledger'), 160); // (6*3 + 2*7) * 5
  assert.equal(qty(e, 'platform'), 60); // 12 bays * 5
  assert.equal(qty(e, 'toeBoard'), 16);
  assert.equal(qty(e, 'ladder'), 4);
  assert.equal(e.knownKg, 1716.75); // 42*13.5 + 21*6.75 + 160*6.3
});

test('worked example C: support (formwork), 4 x 4 bays of 1.2 m, 4 m', () => {
  const e = estimate({ type: 'support', bayM: 1.2, baysLong: 4, baysWide: 4, heightM: 4 }, cat);
  assert.equal(e.posts, 25);
  assert.equal(e.lifts, 2);
  assert.deepEqual(
    row(e, 'vertical').map((r) => [r.size, r.qty]),
    [['3.0 m', 25], ['1.0 m', 25]]
  );
  assert.equal(qty(e, 'ledger'), 120); // (4*5 + 4*5) * 3
  assert.equal(qty(e, 'baseJack'), 25);
  assert.equal(qty(e, 'uHead'), 25);
  assert.equal(qty(e, 'platform'), 0);
  assert.equal(qty(e, 'toeBoard'), 0);
  assert.equal(qty(e, 'ladder'), 0);
  assert.equal(e.knownKg, 1062); // 25*13.5 + 25*4.5 + 120*5.1
});

test('inputs are snapped into the supported range', () => {
  const i = normaliseInput({ bayM: 1.3, baysLong: 99, baysWide: 0, heightM: 6.2, type: 'x' });
  assert.equal(i.bayM, 1.8);
  assert.equal(i.baysLong, 20);
  assert.equal(i.baysWide, 1);
  assert.equal(i.heightM, 6);
  assert.equal(i.type, 'access');
});

test('no component without a brochure weight is put into the tonnage', () => {
  const e = estimate({}, cat);
  for (const r of e.rows) {
    if (r.key === 'vertical' || r.key === 'ledger') assert.notEqual(r.unitKg, null);
    else assert.equal(r.totalKg, null);
  }
  assert.ok(e.unweighed.includes('Steel walkway platform'));
});

test('the enquiry message is labelled indicative and carries no price', () => {
  const msg = estimateMessage(estimate({}, cat), 'Site in Peenya');
  assert.match(msg, /^INDICATIVE MATERIAL ESTIMATE/);
  assert.match(msg, /confirmed by the technical team after a site visit/);
  assert.match(msg, /Notes from the visitor: Site in Peenya/);
  assert.doesNotMatch(msg, /₹|Rs\.?\s?\d|INR|price|rate/i);
  assert.ok(msg.length < 5000, 'fits the /api/contact message limit');
});

test('the tonnage line in the enquiry says it is partial and names what is left out', () => {
  const msg = estimateMessage(estimate({}, cat));
  const line = msg.split('\n').find((l) => /tonnage/i.test(l));
  assert.match(line, /^PARTIAL tonnage, verticals \+ ledgers only/);
  assert.match(line, /NOT included: .*Steel walkway platform/);
  assert.match(line, /do not plan transport on this figure/);
});
