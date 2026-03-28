import { blogPosts } from '@/assets/data/blog-posts'

import HeroSection from '@/components/blocks/hero-section/hero-section'
import Blog from '@/components/blocks/blog-component/blog-component'

import { comparePostsByPublishedAt, getPostIsoDateTime } from '@/lib/blog'
import { SITE_APP_ICON_192_PATH, SITE_LANGUAGE_TAG, SITE_NAME, SITE_SHORT_DESCRIPTION, SITE_URL } from '@/lib/site'

const Home = () => {
  const sortedPosts = [...blogPosts].sort(comparePostsByPublishedAt)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: SITE_NAME,
        description: SITE_SHORT_DESCRIPTION,
        url: SITE_URL,
        inLanguage: SITE_LANGUAGE_TAG,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}${SITE_APP_ICON_192_PATH}`
          },
          sameAs: ['https://administraktor.com', 'https://llm.kiwi', 'https://wpineu.com']
        }
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/#blog`,
        name: SITE_NAME,
        description: 'Dnevne AI vijesti, analize i kontekst za Hrvatsku, regiju i siri tech sektor.',
        url: SITE_URL,
        inLanguage: SITE_LANGUAGE_TAG,
        isPartOf: { '@id': `${SITE_URL}#website` },
        blogPost: sortedPosts.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          url: `${SITE_URL}/blog-detail/${post.slug}`,
          datePublished: getPostIsoDateTime(post),
          author: {
            '@type': 'Person',
            name: post.author
          },
          image: `${SITE_URL}${post.imageUrl}`
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Naslovnica',
            item: SITE_URL
          }
        ]
      }
    ]
  }

  return (
    <div>
      <HeroSection blogData={blogPosts} />
      <Blog />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default Home
