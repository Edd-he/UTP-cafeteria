'use client'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineUnfoldMore } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import Link from 'next/link'
import Pagination from '@shared/components/ui/pagination'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/components/ui/popover'
import { toast } from 'sonner'

import TableSkeleton from '../../shared/skeletons/table-skeleton'
import { DeleteProductFormDialog } from './delete-product-dialog'

import { Product } from '@/modules/shared/types/product.interfaces'
import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'

type Props = {
  query: string
  status: string
  page: number
  limit: number
}
type GetProducts = {
  data: Product[]
  total: number
  totalPages: number
}

export default function ProductsTbl({ query, status, page, limit }: Props) {
  const GET_URL = `${BACKEND_URL}/productos/obtener-productos?page=${page}&query=${query}&enable=${status}&page_size=${limit}`
  const {
    data: fetch,
    loading,
    refresh,
    error,
  } = useGetData<GetProducts>(GET_URL)

  const { data: products, sort, updateData } = useSortableData<Product>()
  const [open, setOpen] = useState(false)
  const [productDelete, setProductDelete] = useState<Product | null>(null)
  const [count, setCount] = useState(limit)

  const handleOpenChange = (newState: boolean) => {
    setOpen(newState)
  }

  useEffect(() => {
    if (fetch) {
      updateData(fetch.data)
      setCount(fetch.total)
    }
  }, [fetch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>Administra tus productos</CardDescription>
        <CardDescription>Total de Productos: {count}</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="table-auto text-center w-full text-sm ">
          <thead className=" border-b relative w-full">
            <tr className="h-16 w-full">
              <td className="max-w-20">
                <Button onClick={() => sort('id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td className="max-w-96">
                <Button onClick={() => sort('nombre')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>
              <td className="max-sm:hidden">Estado</td>
              <td className="max-sm:hidden">
                <Button onClick={() => sort('precio')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Precio
                </Button>
              </td>
              <td className="max-lg:hidden">Creado</td>
              <td className="max-lg:hidden">Actualizado</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="text-xs relative">
            {loading ? (
              <TableSkeleton rows={Math.min(limit, products.length)} />
            ) : products && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 duration-300 relative h-14 border-t"
                >
                  <td className=" rounded-l-lg">{product.id}</td>

                  <td className=" ">{product.nombre}</td>
                  <td
                    className={`max-sm:hidden  text-shadow-lg ${
                      product.habilitado
                        ? 'text-green-500 shadow-green-500/50'
                        : 'text-red-500 shadow-red-500/50'
                    }`}
                  >
                    {product.habilitado ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="max-sm:hidden">S/ {product.precio}</td>
                  <td className="max-lg:hidden">{product.creado}</td>
                  <td className="max-lg:hidden">{product.actualizado}</td>
                  <td className="rounded-r-lg space-x-2 ">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="flex flex-col items-start text-xs max-w-40 p-2"
                      >
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm "
                        >
                          <FiEdit size={18} /> Editar
                        </Link>
                        <button
                          onClick={() => {
                            setProductDelete(product), handleOpenChange(true)
                          }}
                          className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"
                        >
                          <RiDeleteBin6Line size={18} /> Eliminar
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
        <Pagination totalPages={fetch?.totalPages ?? 1} />
      </CardFooter>
      <DeleteProductFormDialog
        open={open}
        product={productDelete}
        handleOpenChange={handleOpenChange}
        handleRefresh={refresh}
      />
    </Card>
  )
}
