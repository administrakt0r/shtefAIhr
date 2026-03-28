import fs from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aibloghr.pages.dev'
const siteName = 'ShtefAI blog HR'

const siteDescription =
  'ShtefAI blog HR svakodnevno donosi AI vijesti, analize i kontekst za Hrvatsku, regiju i siri tech sektor.'

const blogPostsPath = path.join(rootDir, 'src', 'assets', 'data', 'blog-posts.tsx')
const blogUtilsPath = path.join(rootDir, 'src', 'lib', 'blog.ts')
const outputPath = path.join(rootDir, 'public', 'rss.xml')

const escapeXml = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const loadBlogPosts = async () => {
  const source = await fs.readFile(blogPostsPath, 'utf8')

  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    },
    fileName: blogPostsPath
  }).outputText

  const cjsModule = { exports: {} }

  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    require: specifier => {
      throw new Error(`Unsupported import while generating RSS: ${specifier}`)
    }
  }

  vm.runInNewContext(compiled, sandbox, { filename: 'blog-utils.js' })

  if (!Array.isArray(cjsModule.exports.blogPosts)) {
    throw new Error('Unable to load blog posts for RSS generation.')
  }

  return cjsModule.exports.blogPosts
}

const loadBlogUtils = async () => {
  const source = await fs.readFile(blogUtilsPath, 'utf8')

  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    },
    fileName: blogUtilsPath
  }).outputText

  const cjsModule = { exports: {} }

  const sandbox = {
    exports: cjsModule.exports,
    module: cjsModule,
    require: specifier => {
      throw new Error(`Unsupported import while generating RSS: ${specifier}`)
    }
  }

  vm.runInNewContext(compiled, sandbox, { filename: 'blog-posts.js' })

  if (
    typeof cjsModule.exports.comparePostsByPublishedAt !== 'function' ||
    typeof cjsModule.exports.getPostRssDate !== 'function'
  ) {
    throw new Error('Unable to load blog helpers for RSS generation.')
  }

  return cjsModule.exports
}

const blogPosts = await loadBlogPosts()
const { comparePostsByPublishedAt, getPostRssDate } = await loadBlogUtils()
const sortedPosts = [...blogPosts].sort(comparePostsByPublishedAt)

const itemsXml = sortedPosts
  .map(post => {
    const postUrl = `${siteUrl}/blog-detail/${post.slug}`

    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${escapeXml(postUrl)}</link>
      <guid>${escapeXml(postUrl)}</guid>
      <pubDate>${getPostRssDate(post)}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
    </item>`
  })
  .join('')

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${escapeXml(siteUrl)}</link>
    <language>hr-HR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(`${siteUrl}/images/og-image.png`)}</url>
      <title>${escapeXml(siteName)}</title>
      <link>${escapeXml(siteUrl)}</link>
    </image>${itemsXml}
  </channel>
</rss>
`

await fs.writeFile(outputPath, rssXml, 'utf8')

console.log(`Generated ${path.relative(rootDir, outputPath)}`)
