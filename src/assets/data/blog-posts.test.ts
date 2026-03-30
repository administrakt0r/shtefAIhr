import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { assertUniqueBlogPosts, slugifyCroatian } from './blog-posts.ts';

describe('slugifyCroatian function', () => {
  it('handles basic lowercasing and trimming', () => {
    assert.equal(slugifyCroatian('  Hello World  '), 'hello-world');
    assert.equal(slugifyCroatian('TEST'), 'test');
  });

  it('replaces spaces and invalid characters with dashes', () => {
    assert.equal(slugifyCroatian('hello world'), 'hello-world');
    assert.equal(slugifyCroatian('hello_world!@#'), 'hello-world');
    assert.equal(slugifyCroatian('hello.world?'), 'hello-world');
  });

  it('removes extra dashes', () => {
    assert.equal(slugifyCroatian('hello   world'), 'hello-world');
    assert.equal(slugifyCroatian('hello---world'), 'hello-world');
  });

  it('strips leading and trailing dashes', () => {
    assert.equal(slugifyCroatian('---hello world---'), 'hello-world');
    assert.equal(slugifyCroatian('  - hello - '), 'hello');
  });

  it('replaces "đ" with "dj"', () => {
    assert.equal(slugifyCroatian('đakovo'), 'djakovo');
    assert.equal(slugifyCroatian('ĐAKOVO'), 'djakovo');
    assert.equal(slugifyCroatian('Međimurje'), 'medjimurje');
  });

  it('removes diacritics from other Croatian characters', () => {
    assert.equal(slugifyCroatian('čćšž'), 'ccsz');
    assert.equal(slugifyCroatian('ČĆŠŽ'), 'ccsz');
    assert.equal(slugifyCroatian('čamac ćup šuma žaba'), 'camac-cup-suma-zaba');
  });

  it('handles numbers and keeps them', () => {
    assert.equal(slugifyCroatian('123 test 456'), '123-test-456');
    assert.equal(slugifyCroatian('godina 2024!'), 'godina-2024');
  });

  it('handles empty strings and only special characters', () => {
    assert.equal(slugifyCroatian(''), '');
    assert.equal(slugifyCroatian('   '), '');
    assert.equal(slugifyCroatian('!@#$%^&*()'), '');
    assert.equal(slugifyCroatian('---'), '');
  });

  it('handles complex real-world titles', () => {
    assert.equal(
      slugifyCroatian('Google predstavlja Gemini 3.1 Flash Live za glasovni AI'),
      'google-predstavlja-gemini-3-1-flash-live-za-glasovni-ai'
    );
    assert.equal(
      slugifyCroatian('Što donosi novi zakon o umjetnoj inteligenciji u EU?'),
      'sto-donosi-novi-zakon-o-umjetnoj-inteligenciji-u-eu'
    );
    assert.equal(
      slugifyCroatian('Zašto je đumbir dobar za zdravlje - top 10 razloga!'),
      'zasto-je-djumbir-dobar-za-zdravlje-top-10-razloga'
    );
  });
});

describe('assertUniqueBlogPosts', () => {
  it('throws when ids are duplicated', () => {
    assert.throws(
      () =>
        assertUniqueBlogPosts([
          { id: 1, slug: 'a', contentSlug: 'a' },
          { id: 1, slug: 'b', contentSlug: 'b' },
        ] as never),
      /Duplicate blog post id detected: 1/
    );
  });

  it('throws when slugs are duplicated', () => {
    assert.throws(
      () =>
        assertUniqueBlogPosts([
          { id: 1, slug: 'a', contentSlug: 'a' },
          { id: 2, slug: 'a', contentSlug: 'b' },
        ] as never),
      /Duplicate blog post slug detected: a/
    );
  });

  it('throws when content slugs are duplicated', () => {
    assert.throws(
      () =>
        assertUniqueBlogPosts([
          { id: 1, slug: 'a', contentSlug: 'shared' },
          { id: 2, slug: 'b', contentSlug: 'shared' },
        ] as never),
      /Duplicate blog post contentSlug detected: shared/
    );
  });
});
