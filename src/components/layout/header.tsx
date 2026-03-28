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
  return (
    <header
      className={cn(
        'bg-background/92 sticky top-0 z-50 w-full border-b border-border/80 backdrop-blur supports-[backdrop-filter]:bg-background/88',
        className
      )}
    >
      <div className='mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <Link href='/#home' className='shrink-0'>
          <Logo />
        </Link>

        <MenuNavigation navigationData={navigationData} className='max-lg:hidden' />

        <div className='flex items-center gap-3'>
          <ModeToggle />
          <Button variant='outline' className='max-sm:hidden rounded-full px-5 text-xs font-semibold tracking-[0.16em] uppercase' asChild>
            <Link href='/contact-us'>Kontakt</Link>
          </Button>

          <div className='flex items-center gap-3 lg:hidden'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='outline' size='icon' className='sm:hidden rounded-full' asChild>
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
              trigger={
                <Button variant='outline' size='icon' className='rounded-full'>
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
