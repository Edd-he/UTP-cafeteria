import SalesTbl from '@/modules/admin/sales/sales-tbl'
import { SearchByName, ToogleLimit } from '@/modules/shared/filters'

export default function Page({ searchParams }: any) {
  const query = searchParams?.query || ''
  const limit = Number(searchParams?.limit) || 5
  const currentPage = Number(searchParams?.page) || 1
  const status = searchParams?.statusSale || 'all'

  return (
    <>
      <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
        <div className="space-y-2 max-sm:w-full">
          <SearchByName className="sm:w-96 " />
          <ToogleLimit />
        </div>
      </section>

      <SalesTbl
        page={currentPage}
        limit={limit}
        query={query}
        status={status}
      />
    </>
  )
}
