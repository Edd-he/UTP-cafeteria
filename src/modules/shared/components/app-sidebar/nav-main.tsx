'use client'

import { IconType } from 'react-icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/components/ui/sidebar'

type Props = {
  variant: 'admin' | 'cliente'
  links: {
    href: string
    label: string
    icon?: IconType
  }[]
}

export function NavMain({ links, variant }: Props) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (variant === 'admin') {
      const index = links.findIndex((link) => pathname.startsWith(link.href))
      setActiveIndex(index !== -1 ? index : 0)
    } else {
      const index = links.findIndex((link) => pathname === link.href)
      setActiveIndex(index !== -1 ? index : 0)
    }
  }, [pathname, links])

  const itemHeight = 56
  const gap = activeIndex === 0 ? 0 : 4
  return (
    <SidebarGroup className="relative px-0">
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu className="relative">
        <span
          className="absolute right-0 top-0 w-1 h-14 bg-red-500 transition-transform duration-300  z-10"
          style={{
            transform: `translateY(${activeIndex * itemHeight + gap * activeIndex}px)`,
          }}
        />

        {links.map((link, index) => (
          <SidebarMenuItem key={index} className="h-14 ">
            <SidebarMenuButton
              asChild
              tooltip={link.label}
              className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:mx-1"
              variant={'asChild'}
            >
              <Link
                href={link.href}
                onClick={() => setActiveIndex(index)}
                prefetch={true}
                className={`w-full rounded h-full flex items-center gap-4 tracking-wide p-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 duration-200 transition-all ${
                  index === activeIndex
                    ? 'bg-blue-light/10'
                    : 'active:bg-blue-light/10 hover:bg-secondary'
                }`}
              >
                {link.icon && <link.icon />}
                {link.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
