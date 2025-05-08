'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { SHOP_LINKS } from '@/config/links'

export function MobileNavegation() {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const index = SHOP_LINKS.findIndex((link) => link.href === pathname)
    setActiveIndex(index !== -1 ? index : 0)
  }, [pathname])

  return (
    <footer className="w-full fixed bottom-0 grid grid-cols-4 bg-background border-t border-border sm:hidden h-16">
      <span
        className="absolute top-0 h-1 w-1/4 bg-red-500 transition-transform duration-300"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {SHOP_LINKS.map((link, index) => {
        const Icon = link.icon
        return (
          <Link
            key={index}
            href={link.href}
            prefetch={true}
            onClick={() => setActiveIndex(index)}
            className={`w-full flex-center flex-col gap-1 text-xs p-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              activeIndex === index
                ? 'bg-secondary '
                : 'active:bg-primary/10 hover:bg-secondary'
            }`}
          >
            <Icon size={20} />
            {link.label}
          </Link>
        )
      })}
    </footer>
  )
}
