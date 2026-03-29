import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  getPostMachineDate,
  getPostIsoDateTime,
  getPostRssDate,
  formatDisplayDate,
  formatDisplayTime,
  formatPostDisplayDate,
  formatPostDisplayDateTime,
  comparePostsByPublishedAt,
  type BlogPost,
} from './blog';

describe('blog utility functions', () => {
  const mockPost1 = {
    id: 1,
    publishedOn: '2023-10-15',
    publishedTime: '14:30',
  } as BlogPost;

  const mockPost2 = {
    id: 2,
    publishedOn: '2023-10-15',
    publishedTime: '14:30',
  } as BlogPost;

  const mockPost3 = {
    id: 3,
    publishedOn: '2023-10-15',
  } as BlogPost;

  const mockPost4 = {
    id: 4,
    publishedOn: '2024-01-01',
    publishedTime: '08:00',
  } as BlogPost;

  describe('getPostMachineDate', () => {
    it('returns correct Date object with publishedTime', () => {
      const date = getPostMachineDate(mockPost1);
      assert.equal(date.getTime(), new Date(Date.UTC(2023, 9, 15, 14, 30)).getTime());
    });

    it('returns correct Date object with default time when publishedTime is missing', () => {
      const date = getPostMachineDate(mockPost3);
      assert.equal(date.getTime(), new Date(Date.UTC(2023, 9, 15, 8, 0)).getTime());
    });
  });

  describe('getPostIsoDateTime', () => {
    it('returns correct ISO string', () => {
      assert.equal(getPostIsoDateTime(mockPost1), '2023-10-15T14:30:00.000Z');
    });

    it('returns correct ISO string with default time', () => {
      assert.equal(getPostIsoDateTime(mockPost3), '2023-10-15T08:00:00.000Z');
    });
  });

  describe('getPostRssDate', () => {
    it('returns correct UTC string', () => {
      assert.equal(getPostRssDate(mockPost1), 'Sun, 15 Oct 2023 14:30:00 GMT');
    });

    it('returns correct UTC string with default time', () => {
      assert.equal(getPostRssDate(mockPost3), 'Sun, 15 Oct 2023 08:00:00 GMT');
    });
  });

  describe('formatDisplayDate', () => {
    it('formats date string correctly', () => {
      assert.equal(formatDisplayDate('2023-10-15'), '15.10.2023.');
      assert.equal(formatDisplayDate('2024-01-05'), '5.1.2024.');
    });
  });

  describe('formatDisplayTime', () => {
    it('formats time string correctly', () => {
      assert.equal(formatDisplayTime('14:30'), '14:30');
      assert.equal(formatDisplayTime('9:5'), '09:05');
    });

    it('returns null if no time string provided', () => {
      assert.equal(formatDisplayTime(undefined), null);
    });
  });

  describe('formatPostDisplayDate', () => {
    it('formats post publishedOn correctly', () => {
      assert.equal(formatPostDisplayDate(mockPost1), '15.10.2023.');
    });
  });

  describe('formatPostDisplayDateTime', () => {
    it('formats post date and time correctly', () => {
      assert.equal(formatPostDisplayDateTime(mockPost1), '15.10.2023. u 14:30');
    });

    it('formats post date correctly when time is missing', () => {
      assert.equal(formatPostDisplayDateTime(mockPost3), '15.10.2023.');
    });
  });

  describe('comparePostsByPublishedAt', () => {
    it('sorts correctly based on timestamp delta', () => {
      assert.ok(comparePostsByPublishedAt(mockPost1, mockPost4) > 0); // mockPost4 is newer, so it returns positive to sort mockPost4 before mockPost1
      assert.ok(comparePostsByPublishedAt(mockPost4, mockPost1) < 0);
    });

    it('falls back to sort by id (descending) when timestamps are identical', () => {
      // mockPost1 and mockPost2 have same timestamp
      // mockPost2 has higher ID (2) than mockPost1 (1), so it should sort before mockPost1
      assert.ok(comparePostsByPublishedAt(mockPost1, mockPost2) > 0); // Should return positive because right (2) - left (1) = 1
      assert.ok(comparePostsByPublishedAt(mockPost2, mockPost1) < 0); // Should return negative because right (1) - left (2) = -1
    });

    it('sorts posts with default time correctly', () => {
      // mockPost3 uses default time 08:00, mockPost1 is at 14:30
      // mockPost1 is newer
      assert.ok(comparePostsByPublishedAt(mockPost3, mockPost1) > 0);
      assert.ok(comparePostsByPublishedAt(mockPost1, mockPost3) < 0);
    });
  });
});
