import Image from 'next/image'

import { PRODUCT_CATEGORIES } from '@/lib/categories'

type Props = {
  src: string
  width: number
  height: number
  category: string | undefined
  className?: string
  alt: string
}

export default function CustomImage({
  src,
  width,
  height,
  category,
  className,
  alt,
}: Props) {
  const cat = PRODUCT_CATEGORIES.find((cat) => cat.value === category)

  return (
    <>
      {src !== 'PENDIENTE' ? (
        <Image
          src={src}
          width={width}
          height={height}
          className={className}
          alt={alt}
        />
      ) : (
        cat?.icon && (
          <cat.icon
            size={50}
            className={'text-primary-foreground/70'}
            aria-label={alt}
          />
        )
      )}
    </>
  )
}
