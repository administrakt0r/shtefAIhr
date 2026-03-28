'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import { FileTextIcon, MailIcon, UserIcon } from 'lucide-react'

import { CONTACT_EMAIL } from '@/lib/site'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resolvedSubject = subject.trim() || `Upit sa ShtefAI blog HR: ${name || 'Novi kontakt'}`

    const bodyLines = [
      `Ime: ${name || '-'}`,
      `Email: ${email || '-'}`,
      '',
      'Poruka:',
      message || '-'
    ]

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(resolvedSubject)}&body=${encodeURIComponent(
      bodyLines.join('\n')
    )}`
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Label htmlFor='name'>Ime i prezime</Label>
        <div className='relative'>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Upisite ime i prezime'
            autoComplete='name'
            value={name}
            onChange={event => setName(event.target.value)}
            className='peer h-11 rounded-full pr-10'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-4'>
            <UserIcon className='size-4' />
            <span className='sr-only'>Ime</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email adresa</Label>
        <div className='relative'>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Upisite email adresu'
            autoComplete='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            className='peer h-11 rounded-full pr-10'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-4'>
            <MailIcon className='size-4' />
            <span className='sr-only'>Email</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subject'>Tema</Label>
        <div className='relative'>
          <Input
            id='subject'
            name='subject'
            type='text'
            placeholder='Npr. ispravak objave, partnerstvo ili prijedlog teme'
            value={subject}
            onChange={event => setSubject(event.target.value)}
            className='peer h-11 rounded-full pr-10'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-4'>
            <FileTextIcon className='size-4' />
            <span className='sr-only'>Tema</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Poruka</Label>
        <Textarea
          id='message'
          name='message'
          className='min-h-36 rounded-[1.5rem] border-border/80 bg-background/90 px-4 py-3'
          placeholder='Napisite sto ste primijetili, koju temu predlazete ili kako vam mozemo pomoci.'
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm leading-6 text-muted-foreground'>Klik na gumb otvara vas email klijent s pripremljenom porukom.</p>
        <Button type='submit' size='lg' className='rounded-full px-6 text-xs font-semibold tracking-[0.16em] uppercase'>
          Posalji email
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
