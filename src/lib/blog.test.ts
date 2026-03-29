import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { formatDisplayDate } from './blog.ts';

describe('formatDisplayDate utility function', () => {
  it('formats standard dates correctly', () => {
    assert.equal(formatDisplayDate('2023-10-15'), '15.10.2023.');
    assert.equal(formatDisplayDate('2024-12-31'), '31.12.2024.');
  });

  it('formats dates with leading zeros by stripping them out', () => {
    assert.equal(formatDisplayDate('2024-01-05'), '5.1.2024.');
    assert.equal(formatDisplayDate('2023-09-09'), '9.9.2023.');
    assert.equal(formatDisplayDate('2022-11-01'), '1.11.2022.');
  });
});
