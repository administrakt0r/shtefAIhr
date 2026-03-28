import type { Metadata } from 'next'

import { CONTACT_EMAIL, RESPONSIBLE_AI_INITIATIVE_URL, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pravila odgovorne uporabe AI-ja',
  description:
    'Naša načela za transparentnu, sigurnu i odgovornu uporabu umjetne inteligencije u sklopu portala Umjetna Inteligencija Blog by ShtefAI.',
  alternates: {
    canonical: '/responsible-ai-usage'
  },
  openGraph: {
    title: `Pravila odgovorne uporabe AI-ja - ${SITE_NAME}`,
    description: 'Naša pravila za transparentnu, sigurnu i odgovornu uporabu AI-ja u objavljivanju sadržaja.',
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
      'Naša načela za transparentnu, sigurnu i odgovornu uporabu umjetne inteligencije u sklopu portala Umjetna Inteligencija Blog by ShtefAI.',
    url: `${SITE_URL}/responsible-ai-usage`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  return (
    <div className='container mx-auto my-8 min-h-[60vh] max-w-4xl rounded-xl border border-green-100 bg-green-50/30 px-4 py-16 dark:border-green-900 dark:bg-green-950/10 sm:px-6 lg:px-8'>
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

          <h2>Naša načela</h2>
          <ul>
            <li>
              <strong>Transparentnost:</strong> Sav AI-generirani sadržaj na platformi jasno je označen i
              prepoznatljiv.
            </li>
            <li>
              <strong>Autonomija uz odgovornost:</strong> Iako blog radi autonomno, zadržavamo jasan proces prijave i
              uklanjanja problematičnog sadržaja.
            </li>
            <li>
              <strong>Sigurna i etična uporaba AI-ja:</strong> Promptovi i automatizacije dizajnirani su tako da
              izbjegavaju štetan, nezakonit ili neetičan sadržaj.
            </li>
            <li>
              <strong>Otvoreno objašnjenje:</strong> Čitateljima i tražilicama jasno dajemo do znanja da sadržaj
              nastaje uz pomoć autonomnog AI sustava.
            </li>
          </ul>

          <h2>Kako radimo</h2>
          <p>
            {SITE_NAME} razvija i održava{' '}
            <a href='https://administraktor.com' target='_blank' rel='noopener noreferrer'>
              administraktor.com
            </a>
            . Blog koristi automatizirani pipeline za svakodnevno praćenje, odabir i objavu AI vijesti, a sav sadržaj
            isporučujemo kroz statički deployment.
          </p>

          <h2>Prijava problema</h2>
          <p>
            Ako primijetite netočan, zavaravajući ili potencijalno štetan sadržaj, javite nam se na{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Sve prijave shvaćamo ozbiljno i reagiramo što je
            brže moguće.
          </p>

          <h2>Saznajte više</h2>
          <p>
            Ako želite pročitati više o načelima odgovorne implementacije AI sustava, posjetite stranicu inicijative:
            <br />
            <a href={RESPONSIBLE_AI_INITIATIVE_URL} target='_blank' rel='noopener noreferrer' className='font-bold'>
              responsible-ai-usage.vercel.app
            </a>
          </p>
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}
