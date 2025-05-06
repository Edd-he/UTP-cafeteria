import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'

import { CATEGORIES } from '@/lib/categories'

export default function GridCategories() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 grid-flow-row gap-[2px] bg-secondary">
      {CATEGORIES.map((category, index) => {
        const Icon = category.icon
        return (
          <Link
            href={`/shop/category/${category.slug}`}
            key={index}
            className="bg-neutral-50 flex-center flex-col gap-5 h-32 hover:bg-secondary hover:text-primary duration-200"
          >
            <ViewTransition name={`category-icon-${category.slug}`}>
              <Icon size={40} />
            </ViewTransition>
            <ViewTransition
              key={category.id}
              name={`category-${category.slug}`}
            >
              <h2>{category.name}</h2>
            </ViewTransition>
          </Link>
        )
      })}
    </div>
  )
}
