import Link from 'next/link'
import { GithubIcon, RssIcon, SparklesIcon } from 'lucide-react'

import Logo from '@/components/logo'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <footer className='mt-8 border-t border-border/75 bg-[linear-gradient(180deg,rgba(10,51,114,0.05),transparent_45%)]'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8'>
        <div className='flex flex-col gap-5 md:flex-row md:items-start md:justify-between'>
          <div className='space-y-3'>
            <Link href='/#home' className='inline-flex'>
              <Logo className='gap-3' />
            </Link>
            <p className='max-w-xl text-sm leading-6 text-muted-foreground'>
              Dnevni AI newsroom za Hrvatsku i regiju. Pratimo modele, proizvode, regulativu, ulaganja i priče koje
              utječu na stvarni posao.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <a
              href='https://github.com/administrakt0r/shtefAIhr'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground'
            >
              <GithubIcon className='size-5' />
              <span className='sr-only'>GitHub</span>
            </a>
            <Link
              href='/rss.xml'
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground'
            >
              <RssIcon className='size-5' />
              <span className='sr-only'>RSS</span>
            </Link>
          </div>
        </div>

        <Separator />

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]'>
          <a href='https://wpineu.com' target='_blank' rel='noopener noreferrer' className='group block'>
            <div className='h-full rounded-[1.5rem] border border-primary/20 bg-primary/10 p-5 transition-all duration-300 hover:border-primary/35 hover:bg-primary/12 hover:shadow-lg hover:shadow-primary/10'>
              <p className='text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary'>Mreza</p>
              <h3 className='mt-3 font-serif text-2xl tracking-tight text-foreground'>WPinEU.com</h3>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                Inicijativa za brzu digitalnu arhitekturu i moderni WordPress hosting u Europi.
              </p>
            </div>
          </a>

          <a href='https://llm.kiwi' target='_blank' rel='noopener noreferrer' className='group block'>
            <div className='h-full rounded-[1.5rem] border border-brand-blue/20 bg-brand-blue/10 p-5 transition-all duration-300 hover:border-brand-blue/35 hover:bg-brand-blue/12 hover:shadow-lg hover:shadow-brand-blue/10'>
              <p className='text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-blue'>Alati</p>
              <h3 className='mt-3 font-serif text-2xl tracking-tight text-foreground'>LLM.kiwi</h3>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                Platforma za rad s LLM API-jima, agentima i AI workflowima bez nepotrebne operativne buke.
              </p>
            </div>
          </a>

          <Link href='/responsible-ai-usage' className='group block'>
            <div className='flex h-full flex-col justify-between rounded-[1.5rem] border border-border/80 bg-card p-5 transition-all duration-300 hover:border-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/10'>
              <div className='space-y-3'>
                <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue'>
                  <SparklesIcon className='size-5' />
                </div>
                <h3 className='font-serif text-2xl tracking-tight text-foreground'>Responsible AI Usage</h3>
                <p className='text-sm leading-6 text-muted-foreground'>
                  Pročitajte kako označavamo AI autorstvo, kako primamo prijave i kako držimo objavljivanje
                  transparentnim i odgovornim.
                </p>
              </div>
              <p className='mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary'>Pročitaj pravila</p>
            </div>
          </Link>
        </div>

        <Separator />

        <div className='flex flex-col gap-4 text-sm text-muted-foreground lg:flex-row lg:items-end lg:justify-between'>
          <p className='max-w-2xl leading-6'>
            {`(c) ${new Date().getFullYear()}`}{' '}
            <Link href='/#home' className='font-semibold text-foreground hover:text-primary'>
              Umjetna Inteligencija Blog
            </Link>{' '}
            donosi AI vijesti i analize za čitatelje koji žele brz, pregledan i SEO-čist pregled onoga što se mijenja.
          </p>

          <p className='max-w-xl leading-6 lg:text-right'>
            Ako primijetite netočnu informaciju ili želite prijaviti problematičan sadržaj, javite se na{' '}
            <a href='mailto:m@administraktor.com' className='font-semibold text-foreground hover:text-primary'>
              m@administraktor.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
