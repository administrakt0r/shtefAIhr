import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { loadBlogPosts, rootDir } from './load-blog-data.mjs'

const publicDir = path.join(rootDir, 'public')
const outputDir = path.join(publicDir, 'images', 'posts')
const sharedOgPath = path.join(publicDir, 'images', 'og-image.png')
const logoPath = path.join(publicDir, 'shteflogo.svg')

const presets = [
  {
    backgroundStart: '#f8f4fa',
    backgroundEnd: '#ebe0f7',
    accent: '#7c3aed',
    ink: '#141414',
    glowOne: 'rgba(124, 58, 237, 0.16)',
    glowTwo: 'rgba(195, 71, 217, 0.18)'
  },
  {
    backgroundStart: '#f5eef8',
    backgroundEnd: '#f4dff7',
    accent: '#8b2fc9',
    ink: '#1a1a1a',
    glowOne: 'rgba(139, 47, 201, 0.16)',
    glowTwo: 'rgba(118, 80, 216, 0.16)'
  },
  {
    backgroundStart: '#f7f0fb',
    backgroundEnd: '#e8daf5',
    accent: '#6f41d8',
    ink: '#151515',
    glowOne: 'rgba(111, 65, 216, 0.18)',
    glowTwo: 'rgba(184, 91, 210, 0.18)'
  },
  {
    backgroundStart: '#fcf8fd',
    backgroundEnd: '#eadcf8',
    accent: '#9a2db7',
    ink: '#181818',
    glowOne: 'rgba(154, 45, 183, 0.16)',
    glowTwo: 'rgba(124, 58, 237, 0.15)'
  }
]

const sitePreset = {
  backgroundStart: '#f9f5fb',
  backgroundEnd: '#ecdff7',
  accent: '#7c3aed',
  ink: '#141414',
  glowOne: 'rgba(124, 58, 237, 0.18)',
  glowTwo: 'rgba(195, 71, 217, 0.2)'
}

const escapeXml = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const hashString = value => {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash)
  }

  return Math.abs(hash)
}

const wrapText = (text, maxCharsPerLine) => {
  const words = text.split(/\s+/u)
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length <= maxCharsPerLine || currentLine.length === 0) {
      currentLine = nextLine
      continue
    }

    lines.push(currentLine)
    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

const getTitleLines = title => {
  const initialMaxChars = title.length > 96 ? 20 : title.length > 72 ? 24 : 28
  const lines = wrapText(title, initialMaxChars)

  if (lines.length <= 4) {
    return lines
  }

  return [...lines.slice(0, 3), lines.slice(3).join(' ')]
}

const getTitleFontSize = lines => {
  const longestLine = Math.max(...lines.map(line => line.length))

  if (lines.length >= 4 || longestLine > 30) return 48
  if (lines.length === 3 || longestLine > 24) return 56

  return 66
}

const getTitleTextSvg = title => {
  const lines = getTitleLines(title)
  const fontSize = getTitleFontSize(lines)
  const lineHeight = Math.round(fontSize * 1.18)
  const firstLineY = 320 - ((lines.length - 1) * lineHeight) / 2

  return lines
    .map(
      (line, index) => `
  <text
    x="110"
    y="${firstLineY + index * lineHeight}"
    font-family="'Roboto', Arial, Helvetica, sans-serif"
    font-size="${fontSize}"
    font-weight="800"
    fill="#ffffff"
    letter-spacing="-1.2"
    filter="url(#title-shadow)"
  >${escapeXml(line)}</text>`
    )
    .join('')
}

const getChromeTextSvg = ({ title, logoDataUri, preset, subtitle }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${preset.backgroundStart}" />
      <stop offset="100%" stop-color="${preset.backgroundEnd}" />
    </linearGradient>
    <filter id="blur-64" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="64" />
    </filter>
    <filter id="title-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="14" stdDeviation="22" flood-color="rgba(17, 10, 29, 0.22)" />
    </filter>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#bg-gradient)" />
  <circle cx="1015" cy="100" r="190" fill="${preset.glowOne}" filter="url(#blur-64)" />
  <circle cx="1030" cy="560" r="240" fill="${preset.glowTwo}" filter="url(#blur-64)" />
  <circle cx="140" cy="520" r="190" fill="${preset.glowOne}" filter="url(#blur-64)" />
  <rect x="72" y="62" width="416" height="70" rx="35" fill="rgba(255,255,255,0.52)" stroke="rgba(124,58,237,0.18)" />
  <rect x="94" y="75" width="44" height="44" rx="14" fill="rgba(124,58,237,0.12)" />
  <image href="${logoDataUri}" x="103" y="84" width="26" height="26" />
  <text x="160" y="104" font-family="'Roboto', Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="${preset.accent}">
    Umjetna Inteligencija Blog
  </text>
  <text x="160" y="126" font-family="'Roboto', Arial, Helvetica, sans-serif" font-size="16" font-weight="500" fill="rgba(20,20,20,0.76)">
    ${escapeXml(subtitle)}
  </text>
  <rect x="70" y="165" width="940" height="330" rx="34" fill="rgba(17,10,29,0.84)" />
  ${getTitleTextSvg(title)}
  <line x1="72" y1="552" x2="1128" y2="552" stroke="rgba(20,20,20,0.12)" />
  <text x="72" y="589" font-family="'Roboto', Arial, Helvetica, sans-serif" font-size="18" font-weight="500" fill="rgba(20,20,20,0.72)">
    umjetnainteligencijablog.pages.dev
  </text>
  <text x="1128" y="589" text-anchor="end" font-family="'Roboto', Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="rgba(20,20,20,0.72)">
    Hrvatski AI blog
  </text>
</svg>`

const ensureOutputDirectory = async () => {
  await fs.mkdir(outputDir, { recursive: true })
}

const removeStaleImages = async validSlugs => {
  const currentFiles = await fs.readdir(outputDir)
  const validFiles = new Set(validSlugs.map(slug => `${slug}.png`))

  await Promise.all(
    currentFiles
      .filter(fileName => fileName.endsWith('.png') && !validFiles.has(fileName))
      .map(fileName => fs.unlink(path.join(outputDir, fileName)))
  )
}

const renderPng = async (svg, outputPath) => {
  await sharp(Buffer.from(svg)).png().toFile(outputPath)
}

const generatePostImages = async () => {
  const blogPosts = await loadBlogPosts()

  await ensureOutputDirectory()

  const logoSvg = await fs.readFile(logoPath, 'utf8')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  await Promise.all(
    blogPosts.map(async post => {
      const preset = presets[hashString(post.slug) % presets.length]

      const svg = getChromeTextSvg({
        title: post.title,
        logoDataUri,
        preset,
        subtitle: post.category === 'Analiza' ? 'Komentar, kontekst i argument' : 'Vijesti koje odmah hvataju bit'
      })

      await renderPng(svg, path.join(outputDir, `${post.slug}.png`))
    })
  )

  const siteSvg = getChromeTextSvg({
    title: 'AI vijesti, analize i signal za Hrvatsku i regiju',
    logoDataUri,
    preset: sitePreset,
    subtitle: 'Dnevni pregled umjetne inteligencije'
  })

  await renderPng(siteSvg, sharedOgPath)
  await removeStaleImages(blogPosts.map(post => post.slug))
}

await generatePostImages()
