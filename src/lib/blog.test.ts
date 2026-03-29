import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';

import { comparePostsByPublishedAt } from './blog';

type PartialSortablePost = {
  id: number;
  publishedOn: string;
  publishedTime?: string;
};

describe('comparePostsByPublishedAt', () => {
  it('sorts posts with different dates (newer first)', () => {
    const olderPost = { id: 1, publishedOn: '2023-01-01', publishedTime: '12:00' } as PartialSortablePost;
    const newerPost = { id: 2, publishedOn: '2023-01-02', publishedTime: '12:00' } as PartialSortablePost;

    // newerPost should come before olderPost (negative value)
    assert.ok(comparePostsByPublishedAt(newerPost, olderPost) < 0);

    // olderPost should come after newerPost (positive value)
    assert.ok(comparePostsByPublishedAt(olderPost, newerPost) > 0);
  });

  it('sorts posts with same dates but different times (newer first)', () => {
    const olderPost = { id: 1, publishedOn: '2023-01-01', publishedTime: '10:00' } as PartialSortablePost;
    const newerPost = { id: 2, publishedOn: '2023-01-01', publishedTime: '14:00' } as PartialSortablePost;

    assert.ok(comparePostsByPublishedAt(newerPost, olderPost) < 0);
    assert.ok(comparePostsByPublishedAt(olderPost, newerPost) > 0);
  });

  it('falls back to sorting by ID (descending) when date and time are identical', () => {
    const lowerIdPost = { id: 1, publishedOn: '2023-01-01', publishedTime: '12:00' } as PartialSortablePost;
    const higherIdPost = { id: 2, publishedOn: '2023-01-01', publishedTime: '12:00' } as PartialSortablePost;

    // higherIdPost should come before lowerIdPost
    assert.ok(comparePostsByPublishedAt(higherIdPost, lowerIdPost) < 0);
    assert.ok(comparePostsByPublishedAt(lowerIdPost, higherIdPost) > 0);
  });

  it('handles missing publishedTime by falling back to default time (08:00)', () => {
    // Both are logically at 2023-01-01 08:00
    const postWithNoTime = { id: 1, publishedOn: '2023-01-01' } as PartialSortablePost;
    const postWithDefaultTime = { id: 2, publishedOn: '2023-01-01', publishedTime: '08:00' } as PartialSortablePost;

    // Since times are identical (default), it falls back to ID sort
    // id: 2 comes before id: 1
    assert.ok(comparePostsByPublishedAt(postWithDefaultTime, postWithNoTime) < 0);
    assert.ok(comparePostsByPublishedAt(postWithNoTime, postWithDefaultTime) > 0);

    // Test against a later time on the same day
    const postLater = { id: 3, publishedOn: '2023-01-01', publishedTime: '09:00' } as PartialSortablePost;

    assert.ok(comparePostsByPublishedAt(postLater, postWithNoTime) < 0);
    assert.ok(comparePostsByPublishedAt(postWithNoTime, postLater) > 0);

    // Test against an earlier time on the same day
    const postEarlier = { id: 4, publishedOn: '2023-01-01', publishedTime: '07:00' } as PartialSortablePost;

    assert.ok(comparePostsByPublishedAt(postWithNoTime, postEarlier) < 0);
    assert.ok(comparePostsByPublishedAt(postEarlier, postWithNoTime) > 0);
  });
});
