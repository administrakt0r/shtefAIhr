import Image from 'next/image'

import ContactForm from '@/components/blocks/contact-us/contact-form'
import { Card, CardContent } from '@/components/ui/card'

const ContactUs = () => {
  return (
    <section className='px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
      <div className='mx-auto max-w-7xl space-y-8'>
        <div className='space-y-4 text-center'>
          <p className='text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-blue'>Kontakt redakcije</p>
          <h1 className='font-serif text-4xl tracking-tight text-foreground sm:text-5xl'>Javite nam se oko AI tema, ispravaka ili suradnje.</h1>
          <p className='mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg'>
            Ako ste primijetili netočan navod, imate prijedlog teme ili želite razgovarati o partnerstvu, pošaljite
            poruku i vratit ćemo vam se e-poštom.
          </p>
        </div>

        <Card className='overflow-hidden border-border/75 bg-card/95 py-0 shadow-sm shadow-brand-blue/5'>
          <CardContent className='grid gap-0 p-0 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]'>
            <div className='p-6 sm:p-8'>
              <ContactForm />
            </div>

            <div className='border-t border-border/75 bg-[linear-gradient(180deg,oklch(from_var(--primary)_l_c_h_/_0.12),oklch(from_var(--secondary)_l_c_h_/_0.18))] p-4 md:border-t-0 md:border-l md:p-6'>
              <div className='flex h-full flex-col justify-between gap-6 rounded-[1.6rem] border border-white/50 bg-background/80 p-4 backdrop-blur sm:p-5'>
                <div className='space-y-4'>
                  <p className='text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary'>Brzi kontakt</p>
                  <h2 className='font-serif text-2xl tracking-tight text-foreground'>Od redakcijskih pitanja do ispravaka objava.</h2>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Prioritet dajemo prijavama netočnih informacija, upitima za suradnju i konkretnim AI temama koje
                    zaslužuju obradu.
                  </p>
                </div>

                <Image
                  src='/images/contact-us.webp'
                  alt='Kontakt i urednička komunikacija ShtefAI bloga HR'
                  width={1120}
                  height={880}
                  sizes='(min-width: 768px) 26rem, 100vw'
                  className='rounded-[1.35rem] border border-border/60 object-cover'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactUs
