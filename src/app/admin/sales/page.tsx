import SalesTbl from '@/modules/admin/sales/sales-tbl'
import {
  SearchByName,
  ToogleLimit,
  TooglePaymentMethod,
} from '@/modules/shared/filters'

type SearchParams = {
  query?: string
  page?: string
  limit?: string
  method?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}
export default async function Page({ searchParams }: Props) {
  const { query, page, method, limit } = await searchParams
  const queryValue = query || ''
  const currentPage = Number(page) || 1
  const methodValue = method || 'all'
  const limitValue = Number(limit) || 5
  return (
    <>
      <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
        <div className="space-y-2 max-sm:w-full">
          <SearchByName className="sm:w-96 " />
          <ToogleLimit />
          <TooglePaymentMethod />
        </div>
      </section>

      <SalesTbl
        page={currentPage}
        limit={limitValue}
        query={queryValue}
        method={methodValue}
      />
    </>
  )
}
