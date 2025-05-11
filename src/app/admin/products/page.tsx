import Link from 'next/link'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Button } from '@shared/components/ui/button'
import { ToogleStatus, SearchByName, ToogleLimit } from '@shared/filters'
import ProductsTbl from '@admin/products/products-tbl'

export default function Page({ searchParams }: any) {
  const query = searchParams?.query || ''
  const limit = Number(searchParams?.limit) || 5
  const currentPage = Number(searchParams?.page) || 1
  const status = searchParams?.status || 'all'

  return (
    <>
      <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
        <div className="space-y-2 max-sm:w-full">
          <SearchByName className="sm:w-96 " />
          <ToogleLimit />
          <ToogleStatus />
        </div>

        <Button asChild>
          <Link
            href={'/admin/products/create'}
            className="max-sm:w-full flex gap-2 "
          >
            <IoAddCircleOutline size={30} /> Agregar Producto
          </Link>
        </Button>
      </section>

      <ProductsTbl
        page={currentPage}
        limit={limit}
        query={query}
        status={status}
      />
    </>
  )
}
