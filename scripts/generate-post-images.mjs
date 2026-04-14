import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { loadBlogPosts, rootDir } from './load-blog-data.mjs'

const publicDir = path.join(rootDir, 'public')
const outputDir = path.join(publicDir, 'images', 'posts')
const sharedOgPath = path.join(publicDir, 'images', 'og-image.png')
const logoPath = path.join(publicDir, 'shteflogo.svg')

const newsPresets = [
  {
    backgroundStart: '#fff7f1',
    backgroundEnd: '#ffe0d6',
    accent: '#d40c1a',
    accentTwo: '#153a75',
    panel: 'rgba(255,255,255,0.78)',
    heroPanel: 'rgba(16,24,40,0.92)',
    glowOne: 'rgba(212, 12, 26, 0.16)',
    glowTwo: 'rgba(21, 58, 117, 0.18)'
  },
  {
    backgroundStart: '#fff7ed',
    backgroundEnd: '#ffd8c2',
    accent: '#c8102e',
    accentTwo: '#0f4c81',
    panel: 'rgba(255,255,255,0.8)',
    heroPanel: 'rgba(15,23,42,0.93)',
    glowOne: 'rgba(200, 16, 46, 0.15)',
    glowTwo: 'rgba(15, 76, 129, 0.18)'
  },
  {
    backgroundStart: '#fffaf2',
    backgroundEnd: '#ffe7d1',
    accent: '#db1f29',
    accentTwo: '#0b5cad',
    panel: 'rgba(255,255,255,0.82)',
    heroPanel: 'rgba(17,24,39,0.93)',
    glowOne: 'rgba(219, 31, 41, 0.15)',
    glowTwo: 'rgba(11, 92, 173, 0.17)'
  }
]

const analysisPresets = [
  {
    backgroundStart: '#fff6d6',
    backgroundEnd: '#ffd55a',
    accent: '#0f2442',
    accentTwo: '#d40c1a',
    panel: 'rgba(255,248,220,0.76)',
    heroPanel: 'rgba(11,22,41,0.95)',
    glowOne: 'rgba(255, 213, 90, 0.24)',
    glowTwo: 'rgba(212, 12, 26, 0.16)'
  },
  {
    backgroundStart: '#fff4c7',
    backgroundEnd: '#ffd24f',
    accent: '#102a4a',
    accentTwo: '#be123c',
    panel: 'rgba(255,249,221,0.78)',
    heroPanel: 'rgba(15,23,42,0.95)',
    glowOne: 'rgba(255, 210, 79, 0.24)',
    glowTwo: 'rgba(190, 18, 60, 0.16)'
  }
]

const sitePreset = newsPresets[0]

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

const getTitleTextSvg = ({
  title,
  x,
  firstLineY,
  fill = '#ffffff',
  fontFamily = "'Arial', 'Helvetica Neue', sans-serif",
  shadowFilter = 'url(#title-shadow)'
}) => {
  const lines = getTitleLines(title)
  const fontSize = getTitleFontSize(lines)
  const lineHeight = Math.round(fontSize * 1.18)

  return lines
    .map(
      (line, index) => `
  <text
    x="${x}"
    y="${firstLineY + index * lineHeight}"
    font-family="${fontFamily}"
    font-size="${fontSize}"
    font-weight="800"
    fill="${fill}"
    letter-spacing="-1.2"
    filter="${shadowFilter}"
  >${escapeXml(line)}</text>`
    )
    .join('')
}

const getNewsPostSvg = ({ title, logoDataUri, preset, subtitle }) => {
  const lines = getTitleLines(title)
  const fontSize = getTitleFontSize(lines)
  const lineHeight = Math.round(fontSize * 1.18)
  const firstLineY = 320 - ((lines.length - 1) * lineHeight) / 2

  return `<?xml version="1.0" encoding="UTF-8"?>
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
      <feDropShadow dx="0" dy="14" stdDeviation="22" flood-color="rgba(7, 15, 29, 0.22)" />
    </filter>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#bg-gradient)" />
  <circle cx="1015" cy="100" r="190" fill="${preset.glowOne}" filter="url(#blur-64)" />
  <circle cx="1030" cy="560" r="240" fill="${preset.glowTwo}" filter="url(#blur-64)" />
  <circle cx="155" cy="520" r="200" fill="${preset.glowOne}" filter="url(#blur-64)" />
  <rect x="72" y="62" width="474" height="78" rx="39" fill="${preset.panel}" stroke="rgba(255,255,255,0.32)" />
  <rect x="94" y="79" width="44" height="44" rx="14" fill="rgba(255,255,255,0.34)" />
  <image href="${logoDataUri}" x="103" y="84" width="26" height="26" />
  <text x="160" y="104" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="24" font-weight="800" fill="${preset.accent}">
    Umjetna Inteligencija Blog
  </text>
  <text x="160" y="126" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="16" font-weight="600" fill="rgba(16,24,40,0.72)">
    ${escapeXml(subtitle)}
  </text>
  <rect x="72" y="176" width="188" height="42" rx="21" fill="${preset.accent}" />
  <text x="104" y="203" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="1.8">AI VIJESTI</text>
  <rect x="72" y="236" width="962" height="286" rx="38" fill="${preset.heroPanel}" />
  <rect x="1030" y="236" width="98" height="286" rx="28" fill="${preset.accentTwo}" opacity="0.92" />
  ${getTitleTextSvg({ title, x: 110, firstLineY })}
  <line x1="72" y1="552" x2="1128" y2="552" stroke="rgba(20,20,20,0.12)" />
  <text x="72" y="589" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="18" font-weight="600" fill="rgba(20,20,20,0.72)">
    umjetnainteligencijablog.pages.dev
  </text>
  <text x="1128" y="589" text-anchor="end" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="22" font-weight="700" fill="${preset.accentTwo}">
    Hrvatski AI blog
  </text>
</svg>`
}

const getAnalysisPostSvg = ({ title, logoDataUri, preset, subtitle }) => {
  const lines = getTitleLines(title)
  const fontSize = getTitleFontSize(lines)
  const lineHeight = Math.round(fontSize * 1.18)
  const firstLineY = 326 - ((lines.length - 1) * lineHeight) / 2

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${preset.backgroundStart}" />
      <stop offset="100%" stop-color="${preset.backgroundEnd}" />
    </linearGradient>
    <filter id="blur-72" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="72" />
    </filter>
    <filter id="analysis-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="26" flood-color="rgba(8, 17, 31, 0.24)" />
    </filter>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#bg-gradient)" />
  <circle cx="1025" cy="120" r="180" fill="${preset.glowOne}" filter="url(#blur-72)" />
  <circle cx="930" cy="548" r="220" fill="${preset.glowTwo}" filter="url(#blur-72)" />
  <rect x="74" y="64" width="456" height="76" rx="38" fill="${preset.panel}" stroke="rgba(8,17,31,0.08)" />
  <rect x="96" y="80" width="44" height="44" rx="14" fill="rgba(255,255,255,0.32)" />
  <image href="${logoDataUri}" x="105" y="89" width="26" height="26" />
  <text x="158" y="104" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="24" font-weight="800" fill="${preset.accent}">
    Umjetna Inteligencija Blog
  </text>
  <text x="158" y="126" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="16" font-weight="700" fill="rgba(15,36,66,0.72)">
    ${escapeXml(subtitle)}
  </text>
  <path d="M76 188H1124L1054 522H76V188Z" fill="${preset.heroPanel}" />
  <path d="M902 188H1124L1054 522H832L902 188Z" fill="${preset.accentTwo}" opacity="0.96" />
  <rect x="108" y="214" width="184" height="42" rx="8" fill="rgba(255,255,255,0.12)" />
  <text x="132" y="241" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="18" font-weight="800" fill="#ffe8a3" letter-spacing="1.8">ANALIZA</text>
  ${getTitleTextSvg({
    title,
    x: 110,
    firstLineY,
    fill: '#fef3c7',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    shadowFilter: 'url(#analysis-shadow)'
  })}
  <line x1="76" y1="552" x2="1128" y2="552" stroke="rgba(8,17,31,0.14)" />
  <text x="76" y="589" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="18" font-weight="700" fill="rgba(8,17,31,0.68)">
    umjetnainteligencijablog.pages.dev
  </text>
  <text x="1128" y="589" text-anchor="end" font-family="'Arial', 'Helvetica Neue', sans-serif" font-size="22" font-weight="800" fill="${preset.accent}">
    Stav, kontekst i argument
  </text>
</svg>`
}

const ensureOutputDirectory = async () => {
  await fs.mkdir(outputDir, { recursive: true })
}

const removeStaleImages = async validSlugs => {
  const currentFiles = await fs.readdir(outputDir)

  const validFiles = new Set(
    validSlugs.flatMap(slug => [`${slug}.png`, `${slug}.webp`])
  )

  await Promise.all(
    currentFiles
      .filter(
        fileName =>
          (fileName.endsWith('.png') || fileName.endsWith('.webp')) &&
          !validFiles.has(fileName)
      )
      .map(fileName => fs.unlink(path.join(outputDir, fileName)))
  )
}

const renderImage = async (svg, outputPath, format) => {
  const renderer = sharp(Buffer.from(svg))

  if (format === 'webp') {
    await renderer.webp({ quality: 82, effort: 6 }).toFile(outputPath)

    return
  }

  await renderer
    .png({ compressionLevel: 9, effort: 8, palette: true })
    .toFile(outputPath)
}

const generatePostImages = async () => {
  const blogPosts = await loadBlogPosts()

  await ensureOutputDirectory()

  const logoSvg = await fs.readFile(logoPath, 'utf8')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  await Promise.all(
    blogPosts.map(async post => {
      const collection =
        post.category === 'Analiza' ? analysisPresets : newsPresets

      const preset = collection[hashString(post.slug) % collection.length]

      const subtitle =
        post.category === 'Analiza'
          ? 'Komentar, kontekst i argument'
          : 'Vijesti koje odmah hvataju bit'

      const svg =
        post.category === 'Analiza'
          ? getAnalysisPostSvg({
              title: post.title,
              logoDataUri,
              preset,
              subtitle
            })
          : getNewsPostSvg({
              title: post.title,
              logoDataUri,
              preset,
              subtitle
            })

      await Promise.all([
        renderImage(svg, path.join(outputDir, `${post.slug}.png`), 'png'),
        renderImage(svg, path.join(outputDir, `${post.slug}.webp`), 'webp')
      ])
    })
  )

  const siteSvg = getNewsPostSvg({
    title: 'AI vijesti, analize i signal za Hrvatsku i regiju',
    logoDataUri,
    preset: sitePreset,
    subtitle: 'Dnevni pregled umjetne inteligencije'
  })

  await renderImage(siteSvg, sharedOgPath, 'png')
  await removeStaleImages(blogPosts.map(post => post.slug))
}

await generatePostImages()
