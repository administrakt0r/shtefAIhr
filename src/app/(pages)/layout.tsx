import type { ReactNode } from 'react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

import type { NavigationSection } from '@/components/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  {
    title: 'Naslovnica',
    href: '/#home'
  },
  {
    title: 'Vijesti i analize',
    href: '/#categories'
  },
  {
    title: 'O projektu',
    href: '/about'
  }
]

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex h-full w-full min-w-0 flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>{children}</main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default PagesLayout
