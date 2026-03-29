import { describe, it } from 'node:test'
import assert from 'node:assert'
import { assertUniqueSlugs, blogPosts } from './blog-posts.ts'
import type { BlogPost } from '../../lib/blog.ts'

describe('assertUniqueSlugs', () => {
  it('should not throw an error when all post slugs are unique', () => {
    // The existing blogPosts array should already have unique slugs.
    assert.doesNotThrow(() => assertUniqueSlugs(blogPosts))
  })

  it('should throw an error when duplicate post slugs are present', () => {
    const duplicatePosts = [
      ...blogPosts,
      { ...blogPosts[0], id: 999 } // Duplicate the first post (including its slug)
    ] as BlogPost[]

    const duplicateSlug = blogPosts[0].slug

    assert.throws(
      () => assertUniqueSlugs(duplicatePosts),
      new Error(`Duplicate Croatian post slug detected: ${duplicateSlug}`)
    )
  })
})
