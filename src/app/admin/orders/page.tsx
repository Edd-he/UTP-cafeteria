import { Suspense } from 'react'

import OrdersContainer from '@/modules/admin/orders/orders-container'
import OrdersTabs from '@/modules/admin/orders/orders-tabs'
import SearchOrders from '@/modules/admin/orders/search-orders'

type SearchParams = {
  query?: string
  page?: string
  limit?: string
  orderStatus?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}
export default async function Page({ searchParams }: Props) {
  const { query, page, limit, orderStatus } = await searchParams
  const queryValue = query || ''
  const currentPage = Number(page) || 1
  const limitValue = Number(limit) || 10
  const statusValue = orderStatus || 'EN_PROCESO'
  return (
    <>
      <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
        <div className=" relative w-full">
          <Suspense>
            <SearchOrders />
          </Suspense>
        </div>
      </section>
      <Suspense>
        <OrdersTabs />
      </Suspense>
      <section>
        <OrdersContainer
          query={queryValue}
          page={currentPage}
          limit={limitValue}
          status={statusValue}
        />
      </section>
    </>
  )
}
