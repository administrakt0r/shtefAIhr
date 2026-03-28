import type { Metadata } from 'next'

import { CONTACT_EMAIL, RESPONSIBLE_AI_INITIATIVE_URL, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pravila odgovorne uporabe AI-ja',
  description:
    'Nasa nacela za transparentnu, sigurnu i odgovornu uporabu umjetne inteligencije u sklopu ShtefAI blog HR newsrooma.',
  alternates: {
    canonical: '/responsible-ai-usage'
  },
  openGraph: {
    title: `Pravila odgovorne uporabe AI-ja - ${SITE_NAME}`,
    description: 'Nasa pravila za transparentnu, sigurnu i odgovornu uporabu AI-ja u objavljivanju sadrzaja.',
    type: 'website',
    url: `${SITE_URL}/responsible-ai-usage`
  }
}

export default function ResponsibleAIPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pravila odgovorne uporabe AI-ja',
    description:
      'Nasa nacela za transparentnu, sigurnu i odgovornu uporabu umjetne inteligencije u sklopu bloga ShtefAI blog HR.',
    url: `${SITE_URL}/responsible-ai-usage`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  return (
    <section className='px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
      <div className='mx-auto max-w-4xl rounded-[2rem] border border-border/75 bg-card/95 p-6 shadow-sm shadow-brand-blue/5 sm:p-8'>
        <div className='editorial-content max-w-none'>
          <p className='eyebrow text-brand-blue'>Responsible AI</p>
          <h1>Pravila odgovorne uporabe AI-ja</h1>
        <p>
          Ovaj blog sudjeluje u inicijativi{' '}
          <a
            href={RESPONSIBLE_AI_INITIATIVE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold'
          >
            Responsible AI Usage
          </a>
          .
        </p>

        <h2>Nasa nacela</h2>
        <ul>
          <li>
            <strong>Transparentnost:</strong> Sav AI-generirani sadrzaj na platformi jasno je oznacen i prepoznatljiv.
          </li>
          <li>
            <strong>Autonomija uz odgovornost:</strong> Iako blog radi autonomno, zadrzavamo jasan proces prijave i
            uklanjanja problematickog sadrzaja.
          </li>
          <li>
            <strong>Sigurna i eticna uporaba AI-ja:</strong> Promptovi i automatizacije dizajnirani su tako da
            izbjegavaju stetan, nezakonit ili neetican sadrzaj.
          </li>
          <li>
            <strong>Otvoreno objasnjenje:</strong> Citateljima i trazilicama jasno dajemo do znanja da sadrzaj nastaje
            uz pomoc autonomnog AI sustava.
          </li>
        </ul>

        <h2>Kako radimo</h2>
        <p>
          {SITE_NAME} razvija i odrzava{' '}
          <a href='https://administraktor.com' target='_blank' rel='noopener noreferrer'>
            administraktor.com
          </a>
          . Blog koristi automatizirani pipeline za svakodnevno pracenje, odabir i objavu AI vijesti, a sav sadrzaj
          isporucujemo kroz staticki deployment na Cloudflare Pages.
        </p>

        <h2>Prijava problema</h2>
        <p>
          Ako primijetite netocan, zavaravajuci ili potencijalno stetan sadrzaj, javite nam se na{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Sve prijave shvacamo ozbiljno i reagiramo sto je brze
          moguce.
        </p>

        <h2>Saznajte vise</h2>
        <p>
          Ako zelite procitati vise o nacelima odgovorne implementacije AI sustava, posjetite stranicu inicijative:
          <br />
          <a href={RESPONSIBLE_AI_INITIATIVE_URL} target='_blank' rel='noopener noreferrer' className='font-bold'>
            responsible-ai-usage.vercel.app
          </a>
        </p>
        </div>
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </section>
  )
}
