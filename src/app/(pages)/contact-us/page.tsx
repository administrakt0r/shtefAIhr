import type { Metadata } from 'next'

import ContactUs from '@/components/blocks/contact-us/contact-us'

import { SITE_LANGUAGE_TAG, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: `Kontakt - ${SITE_NAME}`,
  description: 'Kontaktirajte ShtefAI blog HR za upite, prijavu netocnih informacija, partnerstva ili povratne informacije.',
  alternates: {
    canonical: '/contact-us'
  },
  openGraph: {
    title: `Kontakt - ${SITE_NAME}`,
    description: 'Kontakt stranica za pitanja, prijavu netocnih informacija, partnerstva i podrsku vezanu uz ShtefAI blog HR.',
    type: 'website',
    url: `${SITE_URL}/contact-us`
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}#contact`,
      name: `Kontakt - ${SITE_NAME}`,
      description: 'Kontaktirajte ShtefAI blog HR za upite, partnerstva, povratne informacije ili prijavu netocnog sadrzaja.',
      url: `${SITE_URL}/contact-us`,
      inLanguage: SITE_LANGUAGE_TAG
    }
  ]
}

const ContactPage = () => {
  return (
    <div>
      <ContactUs />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default ContactPage
