/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client'
import { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineUnfoldMore } from 'react-icons/md'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/components/ui/popover'
import { toast } from 'sonner'

import TableSkeleton from '../skelletons/table-skeleton'

import Pagination from '@/modules/shared/components/ui/pagination'
import { Button } from '@/modules/shared/components/ui/button'
import { User } from '@/modules/shared/interfaces'
import { useGetData } from '@/modules/shared/hooks/use-get-data'

type SortConfig = {
  key: keyof User
  order: 'asc' | 'desc'
}

type Props = {
  query: string
  status: string
  page: number
  limit: number
}

export default function UserTbl({ page, limit, status, query }: Props) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'id',
    order: 'asc',
  })
  const { data: users, setData, loading, error } = useGetData<User[]>('')
  const [usersCount] = useState(limit)

  const handleSort = (key: keyof User) => {
    const order =
      sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key, order })
    if (users === null) return
    const sortedData = [...users].sort((a, b) => {
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
    <Card x-chunk="users-table">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Administra los permisos de tus usuarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="table-auto text-center text-sm w-full relative">
          <thead className=" border-b relative w-full">
            <tr className="h-16">
              <td className="max-lg:hidden">
                <Button onClick={() => handleSort('id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td>
                <Button onClick={() => handleSort('dni')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Dni
                </Button>
              </td>
              <td>
                <Button onClick={() => handleSort('name')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>

              <td className="max-lg:hidden">Estado</td>

              <td className="max-md:hidden">Correo</td>
              <td className="max-xl:hidden">Creado</td>
              <td className="max-xl:hidden">Modificado</td>
              <td></td>
            </tr>
          </thead>
          <tbody className=" max-sm:text-xs relative">
            {loading ? (
              <TableSkeleton rows={Math.min(limit, usersCount)} />
            ) : users && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 duration-200 relative h-24"
                >
                  <td className="rounded-l-lg max-lg:hidden">{user.id}</td>
                  <td className="rounded-l-lg">{user.dni}</td>
                  <td>{`${user.name} ${user.lastName}`}</td>
                  <td
                    className={`max-lg:hidden text-shadow-lg ${user.status ? 'text-green-500 shadow-green-500/50' : 'text-red-500 shadow-red-500/50'}`}
                  >
                    {user.status ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="max-md:hidden">{user.email}</td>
                  <td className="max-xl:hidden">{user.created}</td>
                  <td className="max-xl:hidden">{user.updated}</td>
                  <td className="rounded-r-lg space-x-2">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded hover:shadow-xl hover:shadow-pressed/50 hover:bg-background duration-200">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="flex flex-col gap-2 items-start text-sm"
                      >
                        {/* <Link href={`/admin/users/${user.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                        <AiOutlineInfoCircle size={18} /> Información
                                                    </Link> */}
                        <Link
                          href={`/admin/users/edit/${user.id}`}
                          className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm"
                        >
                          <FiEdit size={18} /> Editar
                        </Link>
                        <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
                          <RiDeleteBin6Line size={18} />
                          Eliminar
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
        <Pagination totalPages={5} />
      </CardFooter>
    </Card>
  )
}
