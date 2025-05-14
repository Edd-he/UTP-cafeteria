import { Suspense } from 'react'

import OrdersContainer from '@/modules/admin/orders/orders-container'
import OrdersTabs from '@/modules/admin/orders/orders-tabs'
import SearchOrders from '@/modules/admin/orders/search-orders'

export default function Page() {
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
        <OrdersContainer />
      </section>
    </>
  )
}
