'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { MailIcon, MenuIcon } from 'lucide-react'

import type { NavigationSection } from '@/components/blocks/menu-navigation'
import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import { ModeToggle } from '@/components/layout/mode-toggle'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScrollState)
    handleScrollState()

    return () => {
      window.removeEventListener('scroll', handleScrollState)
    }
  }, [])

  useEffect(() => {
    const handleSectionTracking = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (sections.length === 0) {
        if (activeSection !== '') {
          setActiveSection('')
        }

        return
      }

      let foundSection = false

      for (const section of sections) {
        const element = section as HTMLElement
        const { offsetTop, offsetHeight } = element

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (element.id !== activeSection) {
            setActiveSection(element.id)
          }

          foundSection = true
          break
        }
      }

      if (!foundSection && activeSection !== '') {
        setActiveSection('')
      }
    }

    handleSectionTracking()
    window.addEventListener('scroll', handleSectionTracking, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleSectionTracking)
    }
  }, [activeSection])

  return (
    <header
      className={cn(
        'bg-background sticky top-0 z-50 h-16 w-full transition-all duration-300',
        { 'shadow-sm': isScrolled },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <Link href='/#home'>
          <Logo />
        </Link>

        <MenuNavigation
          navigationData={navigationData}
          activeSection={activeSection}
          className='max-lg:hidden'
        />

        <div className='flex gap-3'>
          <ModeToggle />
          <Button variant='outline' className='max-sm:hidden' asChild>
            <Link href='/contact-us'>Kontakt</Link>
          </Button>

          <div className='flex gap-3'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline' size='icon' className='sm:hidden' asChild>
                  <Link href='/contact-us'>
                    <MailIcon />
                    <span className='sr-only'>Kontakt</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Kontakt</TooltipContent>
            </Tooltip>

            <MenuDropdown
              align='end'
              navigationData={navigationData}
              activeSection={activeSection}
              trigger={
                <Button variant='outline' size='icon' className='lg:hidden'>
                  <MenuIcon />
                  <span className='sr-only'>Izbornik</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
