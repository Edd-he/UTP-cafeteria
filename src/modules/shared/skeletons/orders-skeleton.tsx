import { Skeleton } from '@shared/components/ui/skeleton'

type Props = {
  count: number
}

export default function OrdersSkeleton({ count }: Props) {
  const ordersCount = Array(count).fill(null)

  return (
    <>
      {ordersCount.map((_, index) => (
        <Skeleton key={index} className="h-70 w-full bg-white" />
      ))}
    </>
  )
}
