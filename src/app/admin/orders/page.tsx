import OrdersContainer from '@/modules/admin/orders/orders-container'
import OrdersTabs from '@/modules/admin/orders/orders-tabs'
import { ToogleLimit } from '@/modules/shared/filters'

export default function Page() {
  return (
    <>
      <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
        <div className="space-y-2 max-sm:w-full">
          <ToogleLimit />
        </div>
      </section>
      <OrdersTabs />
      <section>
        <OrdersContainer />
      </section>
    </>
  )
}
