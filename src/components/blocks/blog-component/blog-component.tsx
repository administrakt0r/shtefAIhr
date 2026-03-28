'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon
} from 'lucide-react'

import { blogPosts } from '@/assets/data/blog-posts'
import { comparePostsByPublishedAt, formatPostDisplayDate, type BlogPost } from '@/lib/blog'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const getAvailableBlogPosts = () => blogPosts

const BlogGrid = ({ posts, onCategoryClick }: { posts: BlogPost[]; onCategoryClick: (category: string) => void }) => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <Card
          key={post.id}
          className='group h-full overflow-hidden border-border/75 bg-card/95 py-0 shadow-sm shadow-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/10'
        >
          <CardContent className='flex h-full flex-col gap-4 px-5 py-5'>
            <Link href={`/blog-detail/${post.slug}`} className='block overflow-hidden rounded-[1.4rem] border border-border/60'>
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                width={1200}
                height={630}
                sizes='(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'
                className='aspect-[1200/630] h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]'
              />
            </Link>

            <div className='flex items-center justify-between gap-3'>
              <div className='text-muted-foreground flex min-w-0 items-center gap-2 text-sm'>
                <CalendarDaysIcon className='size-4 shrink-0' />
                <time dateTime={post.publishedOn}>{formatPostDisplayDate(post)}</time>
              </div>
              <button
                type='button'
                className='rounded-full bg-brand-blue/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue transition-colors hover:bg-brand-blue/18'
                onClick={() => onCategoryClick(post.category)}
              >
                {post.category}
              </button>
            </div>

            <div className='flex flex-1 flex-col gap-3'>
              <Link href={`/blog-detail/${post.slug}`} className='block'>
                <h3 className='line-clamp-3 font-serif text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary'>
                  {post.title}
                </h3>
              </Link>
              <p className='line-clamp-3 text-sm leading-6 text-muted-foreground'>{post.description}</p>
            </div>

            <div className='mt-auto flex items-center justify-between border-t border-border/70 pt-4'>
              <div className='space-y-1'>
                <span className='text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>Autor</span>
                <p className='text-sm font-semibold text-foreground'>{post.author}</p>
              </div>
              <Button
                size='icon'
                className='rounded-full border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                asChild
              >
                <Link href={`/blog-detail/${post.slug}`}>
                  <ArrowRightIcon className='size-4 -rotate-45' />
                      <span className='sr-only'>Pročitaj više: {post.title}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const Blog = () => {
  const allCategoryLabel = 'Sve objave'
  const [selectedTab, setSelectedTab] = useState(allCategoryLabel)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 9

  const availableBlogPosts = getAvailableBlogPosts()
  const nonFeaturedPosts = availableBlogPosts.filter(post => !post.featured).sort(comparePostsByPublishedAt)

  const uniqueCategories = [...new Set(nonFeaturedPosts.map(post => post.category))]
  const categories = [allCategoryLabel, ...uniqueCategories]

  const filteredPosts = nonFeaturedPosts.filter(post => {
    const matchesCategory = selectedTab === allCategoryLabel || post.category === selectedTab
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return matchesCategory
    }

    const matchesSearch =
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleTabChange = (tab: string) => {
    setCurrentPage(1)
    setSelectedTab(tab)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className='py-10 sm:py-16 lg:py-20' id='categories'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-12 lg:px-8'>
        <div className='space-y-4'>
          {selectedTab === allCategoryLabel && !searchQuery ? (
            <p className='text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-blue'>Redakcijski pregled</p>
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='#'
                    onClick={event => {
                      event.preventDefault()
                      setSelectedTab(allCategoryLabel)
                      setSearchQuery('')
                      setCurrentPage(1)
                    }}
                  >
                    Sve objave
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{searchQuery ? `Pretraga: ${searchQuery}` : selectedTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <h2 className='font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl'>
            Najnovije AI vijesti, analize i potezi koji mijenjaju tržište.
          </h2>
          <p className='max-w-3xl text-base leading-7 text-muted-foreground md:text-lg'>
            Svakodnevno filtriramo hype, objave modela, ulaganja, regulativu i AI proizvode kako biste brzo vidjeli
            što zaista vrijedi pratiti.
          </p>
        </div>

        <div className='flex flex-col gap-6 lg:gap-8'>
          <div className='flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center'>
            <ScrollArea className='w-full rounded-full border border-border/75 bg-card/90 lg:w-auto'>
              <div className='flex p-1.5'>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedTab === category ? 'secondary' : 'ghost'}
                    size='sm'
                    onClick={() => handleTabChange(category)}
                    className={`rounded-full px-4 text-xs font-semibold uppercase tracking-[0.14em] ${
                      selectedTab === category ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className='relative w-full lg:max-w-sm'>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4'>
                <SearchIcon className='size-4' />
                <span className='sr-only'>Pretraži</span>
              </div>
              <Input
                type='text'
                placeholder='Pretraži teme, tvrtke i analize'
                value={searchQuery}
                onChange={event => {
                  setSearchQuery(event.target.value)
                  setCurrentPage(1)
                }}
                className='h-12 rounded-full border-border/80 bg-card/90 pr-10 pl-11'
              />
              {searchQuery ? (
                <button
                  type='button'
                  onClick={() => {
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-4'
                >
                  <XIcon className='size-4' />
                  <span className='sr-only'>Očisti pretragu</span>
                </button>
              ) : null}
            </div>
          </div>

          {paginatedPosts.length > 0 ? (
            <div className='space-y-10'>
              <BlogGrid posts={paginatedPosts} onCategoryClick={handleTabChange} />

              {totalPages > 1 ? (
                <div className='flex items-center justify-center gap-2 pt-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className='size-4' />
                    <span className='sr-only'>Prethodna stranica</span>
                  </Button>

                  <div className='flex items-center gap-2'>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                      <Button
                        key={pageNumber}
                        variant={pageNumber === currentPage ? 'default' : 'outline'}
                        className='h-10 min-w-10 rounded-full px-3'
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant='outline'
                    size='icon'
                    className='rounded-full'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className='size-4' />
                    <span className='sr-only'>Sljedeća stranica</span>
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <Card className='border-border/75 bg-card/95 py-0 shadow-sm shadow-brand-blue/5'>
              <CardContent className='space-y-3 px-6 py-10 text-center'>
                <p className='text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-brand-blue'>Nema rezultata</p>
                <h3 className='font-serif text-2xl tracking-tight text-foreground'>
                  Nismo pronašli objave za trenutačni upit.
                </h3>
                <p className='mx-auto max-w-xl text-sm leading-6 text-muted-foreground'>
                  Pokušajte s nazivom tvrtke, modela ili šire teme poput regulative, AI agenata ili ulaganja.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog
