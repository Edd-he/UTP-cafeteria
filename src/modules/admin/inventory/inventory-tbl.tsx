'use client'

import { MdOutlineUnfoldMore } from 'react-icons/md'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import Pagination from '@shared/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/components/ui/popover'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { toast } from 'sonner'
import useSWR from 'swr'

import TableSkeleton from '../../shared/skeletons/table-skeleton'
import { ChangeStockDialog } from './change-stock/change-stock-dialog'
import GenerateInventoryButton from './generate-inventory-button'

import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { ProductInventory } from '@/modules/shared/types/inventory.interfaces'
import { fetcher } from '@/lib/http/fetcher'

type Props = {
  query: string
  page: number
  limit: number
}

type GetProductsInventory = {
  data: ProductInventory[]
  total: number
  totalPages: number
}

export default function InventoryTbl({ query, page, limit }: Props) {
  const GET_URL = `${BACKEND_URL}/inventario/obtener-inventario-hoy?page_size=${limit}&page=${page}&query=${query}`

  const { data, error, isLoading, mutate } = useSWR<GetProductsInventory>(
    GET_URL,
    fetcher,
  )

  const {
    data: products,
    sort,
    updateData,
  } = useSortableData<ProductInventory>()

  const [count, setCount] = useState(limit)
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<ProductInventory>()

  useEffect(() => {
    if (data) {
      updateData(data.data)
      setCount(data.total)
    }
  }, [data])

  if (error) toast.error(error.message)

  return (
    <Card x-chunk="products-table">
      <CardHeader>
        <CardTitle>Inventario</CardTitle>
        <CardDescription>
          Genera el inventario y administra las entradas y salidas de tus
          productos.
        </CardDescription>

        <CardDescription>Productos en Inventario: {count}</CardDescription>

        <GenerateInventoryButton
          onSuccess={mutate}
          className="max-w-40 ml-auto"
        />
      </CardHeader>
      <CardContent>
        <table className="table-auto text-sm  text-center w-full relative">
          <thead className="border-b  w-full relative">
            <tr className="h-16 w-full">
              <td>
                <Button onClick={() => sort('producto_id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => sort('nombre_producto')}
                  variant={'ghost'}
                >
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>
              <td>
                <Button onClick={() => sort('stock')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Stock
                </Button>
              </td>
              <td>Ultima Entrada</td>
              <td className="max-lg:hidden">Ultimo Salida</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="text-xs relative">
            {products && isLoading ? (
              <TableSkeleton rows={Math.min(limit, count)} />
            ) : products && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 duration-200 relative h-14 border-t"
                >
                  <td className=" rounded-l-lg">{product.producto_id}</td>
                  <td>{product.nombre_producto}</td>
                  <td
                    className={`text-shadow-lg ${
                      product.stock < 5
                        ? 'text-red-500 shadow-red-500/50'
                        : product.stock <= 10
                          ? 'text-yellow-500 shadow-yellow-500/50'
                          : 'text-green-500 shadow-green-500/50'
                    }`}
                  >
                    {product.stock}
                  </td>
                  <td className="max-lg:hidden">
                    {product.ultima_entrada !== null
                      ? product.ultima_entrada
                      : 'NO HAY REGISTRO'}
                  </td>
                  <td className="max-lg:hidden">
                    {product.ultima_salida !== null
                      ? product.ultima_salida
                      : 'NO HAY REGISTRO'}
                  </td>
                  <td className="rounded-r-lg space-x-2 ">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded hover:bg-background duration-200">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="lex flex-col gap-2 items-start max-w-40 p-2 text-xs"
                      >
                        <button
                          className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"
                          onClick={() => {
                            setOpen(true)
                            setProduct(product)
                          }}
                        >
                          Actualizar Stock
                        </button>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="relative h-24">
                <td colSpan={9} className="text-center py-4">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
      <CardFooter>
        <Pagination totalPages={data?.totalPages ?? 0} />
      </CardFooter>
      <ChangeStockDialog
        product={product}
        open={open}
        setOpen={setOpen}
        refresh={mutate}
      />
    </Card>
  )
}
