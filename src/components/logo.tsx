import Image from 'next/image'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src='/shteflogo.svg'
        alt='ShtefAI blog HR logo'
        width={32}
        height={32}
        className='h-8 w-8 rounded-sm'
        priority
      />
      <div className='flex flex-col leading-none'>
        <span className='text-[0.7rem] font-medium tracking-[0.22em] uppercase text-brand-blue'>AI newsroom</span>
        <span className='text-foreground text-[1.15rem] font-semibold tracking-tight'>ShtefAI blog HR</span>
      </div>
    </div>
  )
}

export default Logo
