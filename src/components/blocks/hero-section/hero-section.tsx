import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { BlogPost } from '@/lib/blog'
import { comparePostsByPublishedAt, formatPostDisplayDate } from '@/lib/blog'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  const [leadPost, ...latestPosts] = [...blogData].sort(comparePostsByPublishedAt).slice(0, 4)

  return (
    <section
      id='home'
      className='border-b border-border/70 bg-[linear-gradient(180deg,rgba(10,51,114,0.08),transparent_38%),linear-gradient(135deg,rgba(198,31,50,0.08),transparent_55%)] pt-10 pb-10 sm:pt-14 sm:pb-14'
    >
      <div className='mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)] lg:px-8'>
        <div className='rounded-[2rem] border border-border/80 bg-card/92 p-6 shadow-sm shadow-brand-blue/5 sm:p-8 lg:p-10'>
          <div className='flex flex-wrap items-center gap-3'>
            <Badge variant='outline' className='rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-primary'>
              Hrvatska | Regija | AI
            </Badge>
            <span className='text-muted-foreground text-xs font-medium uppercase tracking-[0.16em]'>Ažurirano svaki dan</span>
          </div>

          <div className='mt-6 max-w-3xl space-y-5'>
            <h1 className='font-serif text-4xl leading-none tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl'>
              AI vijesti i analize koje odmah objašnjavaju što je važno za Hrvatsku i regiju.
            </h1>
            <p className='max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg'>
              Pratimo OpenAI, Anthropic, Google, regulativu, ulaganja i stvarne AI proizvode kako bismo iz dana u dan
              pretvarali buku u čitljiv kontekst.
            </p>
          </div>

          {leadPost ? (
            <Link href={`/blog-detail/${leadPost.slug}`} className='group mt-8 block'>
              <Card className='overflow-hidden border-primary/12 bg-background/90 py-0 shadow-none transition-colors hover:border-primary/35'>
                <CardContent className='grid gap-5 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-center'>
                  <div className='space-y-3'>
                    <div className='flex flex-wrap items-center gap-3'>
                      <span className='rounded-full bg-brand-blue/12 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-blue'>
                        U fokusu
                      </span>
                      <time
                        dateTime={leadPost.publishedOn}
                        className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground'
                      >
                        <CalendarDaysIcon className='size-4' />
                        {formatPostDisplayDate(leadPost)}
                      </time>
                    </div>
                    <h2 className='font-serif text-2xl leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl'>
                      {leadPost.title}
                    </h2>
                    <p className='max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base'>{leadPost.description}</p>
                  </div>

                  <div className='flex items-center justify-between gap-3 border-t border-border/70 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5'>
                    <div className='space-y-1 text-right'>
                      <p className='text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
                        Vrijeme čitanja
                      </p>
                      <p className='text-lg font-semibold text-foreground'>{leadPost.readTime} min</p>
                    </div>
                    <span className='inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary'>
                      Pročitaj sada
                      <ArrowUpRightIcon className='size-4' />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : null}
        </div>

        <aside className='rounded-[2rem] border border-border/80 bg-card/88 p-5 shadow-sm shadow-brand-blue/5 sm:p-6'>
          <div className='flex items-center justify-between gap-3 border-b border-border/80 pb-4'>
            <div>
              <p className='text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-blue'>Brzo na stol</p>
              <h2 className='mt-2 font-serif text-2xl tracking-tight text-foreground'>Najsvježije objave</h2>
            </div>
            <Image src='/shteflogo.svg' alt='ShtefAI newsroom simbol' width={32} height={32} className='h-8 w-8 rounded-sm opacity-90' />
          </div>

          <div className='mt-4 space-y-3'>
            {latestPosts.length > 0 ? (
              latestPosts.map(item => (
                <Link key={item.id} href={`/blog-detail/${item.slug}`} className='group block rounded-[1.25rem] border border-transparent bg-background/85 p-4 transition-all hover:border-brand-blue/20 hover:bg-background'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0 space-y-2'>
                      <div className='flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground'>
                        <span>{item.category}</span>
                        <span className='h-1 w-1 rounded-full bg-border' />
                        <time dateTime={item.publishedOn}>{formatPostDisplayDate(item)}</time>
                      </div>
                      <h3 className='line-clamp-3 text-base leading-6 font-semibold text-foreground transition-colors group-hover:text-primary'>
                        {item.title}
                      </h3>
                    </div>
                    <ArrowUpRightIcon className='mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary' />
                  </div>
                </Link>
              ))
            ) : (
              <div className='rounded-[1.25rem] border border-dashed border-border bg-background/70 p-4'>
                <p className='text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-blue'>Novi početak arhiva</p>
                <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                  Današnje generacije upravo otvaraju novi niz objava. Sljedeći članci pojavljivat će se ovdje kako budu objavljeni.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default HeroSection
