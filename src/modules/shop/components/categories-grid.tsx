import Link from 'next/link'

import { PRODUCT_CATEGORIES } from '@/lib/categories'
import { SlideTransition } from '@/modules/shared/components/slide-transition'

export default function GridCategories() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 grid-flow-row gap-[2px] bg-secondary">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const Icon = category.icon
        return (
          <Link
            href={`/shop/category/${category.slug}`}
            key={index}
            prefetch={true}
            className="bg-background flex-center flex-col gap-5 h-32 hover:bg-secondary hover:text-primary duration-200"
          >
            <SlideTransition name={`category-icon-${category.slug}`}>
              <Icon size={40} />
            </SlideTransition>
            <SlideTransition
              key={category.id}
              name={`category-${category.slug}`}
            >
              <h2>{category.name}</h2>
            </SlideTransition>
          </Link>
        )
      })}
    </div>
  )
}
