'use client'

import { MdOutlineUnfoldMore } from 'react-icons/md'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { useState, useEffect } from 'react'
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

import TableSkeleton from '../skelletons/table-skeleton'

import { ProductInventory } from '@/modules/shared/interfaces/products.interfaces'

type SortConfig = {
  key: keyof ProductInventory
  order: 'asc' | 'desc'
}

type Props = {
  query: string
  status: string
  page: number
  limit: number
  productId?: string
}

export default function InventoryTbl({ query, status, page, limit }: Props) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    order: 'asc',
  })
  const [products, setProducts] = useState<ProductInventory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPages, settotalPages] = useState<number>(0)
  const [refreshKey] = useState(0)
  const [productsCount, setProductsCount] = useState(limit)

  const handleSort = (key: keyof ProductInventory) => {
    const order =
      sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

    setSortConfig({ key, order })

    const sortedData = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1
      }

      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1
      }

      return 0
    })

    setProducts(sortedData)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/inventory?page=${page}&query=${query}&status=${status}&limit=${limit}`,
        )
        const { totalPages, products } = await response.json()
        settotalPages(totalPages)
        setProducts(products)
        setProductsCount(products.length)
      } catch (error) {
        console.warn('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, limit, query, status, refreshKey])

  return (
    <Card x-chunk="products-table">
      <CardHeader>
        <CardTitle>Inventario</CardTitle>
        <CardDescription>
          Administra las entradas y salidas de tus productos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="table-auto text-sm  text-center w-full relative">
          <thead className="border-b  w-full relative">
            <tr className="h-16 w-full">
              <td>
                <Button onClick={() => handleSort('id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td>
                <Button onClick={() => handleSort('name')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>
              <td className="max-lg:hidden">Estado</td>
              <td>
                <Button onClick={() => handleSort('stock')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Stock
                </Button>
              </td>
              <td className="max-lg:hidden">Ultimo Ingreso</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="max-sm:text-xs relative">
            {loading ? (
              <TableSkeleton rows={Math.min(limit, productsCount)} />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 duration-300 relative h-24"
                >
                  <td className=" rounded-l-lg">{product.id}</td>
                  <td>{product.name}</td>
                  <td
                    className={`max-lg:hidden text-shadow-lg ${
                      product.status
                        ? 'text-green-500 shadow-green-500/50'
                        : 'text-red-500 shadow-red-500/50'
                    }`}
                  >
                    {product.status ? 'Activo' : 'Inactivo'}
                  </td>
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
                    {product.lastStockEntry !== null
                      ? product.lastStockEntry
                      : 'NO HAY REGISTRO'}
                  </td>
                  <td className="rounded-r-lg space-x-2 ">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="flex flex-col gap-2 items-start text-sm"
                      ></PopoverContent>
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
        <Pagination totalPages={totalPages} />
      </CardFooter>
    </Card>
  )
}
