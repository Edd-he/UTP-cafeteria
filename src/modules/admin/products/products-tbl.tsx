'use client'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineUnfoldMore } from 'react-icons/md'
import { useState } from 'react'
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

import TableSkeleton from '../skelletons/table-skeleton'
import { DeleteProductDialog } from './delete-product-dialog'

import { Product } from '@/modules/shared/interfaces/products.interfaces'
import { useGetData } from '@/modules/shared/hooks/use-get-data'

type SortConfig = {
  key: keyof Product
  order: 'asc' | 'desc'
}

type Props = {
  query: string
  status: string
  page: number
  limit: number
}

export default function ProductsTbl({ query, status, page, limit }: Props) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    order: 'asc',
  })
  const {
    data: products,
    setData,
    loading,
    refresh,
    error,
  } = useGetData<Product[]>(
    `/api/products?page=${page}&query=${query}&status=${status}&limit=${limit}`,
  )
  const [open, setOpen] = useState(false)
  const [productDelete, setProductDelete] = useState<Product | null>(null)
  const [productsCount] = useState(limit)

  const handleRefresh = () => {
    refresh()
  }

  const handleOpenChange = (newState: boolean) => {
    setOpen(newState)
  }

  const handleSort = (key: keyof Product) => {
    const order =
      sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

    setSortConfig({ key, order })
    if (!products) return
    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1
      }

      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1
      }

      return 0
    })

    setData(sortedData)
  }

  if (error) toast.error(error)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Administra tus productos y visualiza su rendimiento de ventas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="table-auto text-center w-full text-sm ">
          <thead className=" border-b relative w-full">
            <tr className="h-16 w-full">
              <td className="max-w-20">
                <Button onClick={() => handleSort('id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td className="max-w-96">
                <Button onClick={() => handleSort('name')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>
              <td className="max-sm:hidden">Estado</td>
              <td className="max-sm:hidden">
                <Button onClick={() => handleSort('price')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Precio
                </Button>
              </td>
              <td className="max-lg:hidden">Descuento</td>
              <td className="max-lg:hidden">Creado</td>
              <td className="max-lg:hidden">Modificado</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="max-sm:text-xs relative">
            {loading ? (
              <TableSkeleton rows={Math.min(limit, productsCount)} />
            ) : products && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50  duration-300 relative h-24"
                >
                  <td className=" rounded-l-lg">{product.id}</td>

                  <td className=" ">{product.name}</td>
                  <td
                    className={`max-sm:hidden  text-shadow-lg ${
                      product.status
                        ? 'text-green-500 shadow-green-500/50'
                        : 'text-red-500 shadow-red-500/50'
                    }`}
                  >
                    {product.status ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="max-sm:hidden">
                    S/ {parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="max-lg:hidden">
                    S/ {parseFloat(product.discount).toFixed(2)}
                  </td>
                  <td className="max-lg:hidden">{product.created}</td>
                  <td className="max-lg:hidden">{product.updated}</td>
                  <td className="rounded-r-lg space-x-2 ">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="flex flex-col gap-2 items-start text-sm w-auto "
                      >
                        {/* <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
												<AiOutlineInfoCircle size={18} /> Información
											</Link> */}
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
        <Pagination totalPages={3} />
      </CardFooter>
      <DeleteProductDialog
        open={open}
        product={productDelete}
        handleOpenChange={handleOpenChange}
        handlRefresh={handleRefresh}
      />
    </Card>
  )
}
