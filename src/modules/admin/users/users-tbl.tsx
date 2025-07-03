'use client'
import { useEffect, useState } from 'react'
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
import useSWR from 'swr'

import TableSkeleton from '../../shared/skeletons/table-skeleton'
import { DeleteUserDialog } from './delete-user-dialog'

import Pagination from '@/modules/shared/components/ui/pagination'
import { Button } from '@/modules/shared/components/ui/button'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { BACKEND_URL } from '@/lib/constants'
import { User } from '@/modules/shared/types'
import { fetcher } from '@/lib/http/fetcher'

type Props = {
  query: string
  status: string
  page: number
  limit: number
}
type GetUsers = {
  data: User[]
  total: number
  totalPages: number
}
export default function UserTbl({ page, limit, status, query }: Props) {
  const GET_URL = `${BACKEND_URL}/usuarios/obtener-administradores?page=${page}&query=${query}&enable=${status}&page_size=${limit}`

  const { data, error, isLoading, mutate } = useSWR<GetUsers>(GET_URL, fetcher)

  const { data: users, updateData, sort } = useSortableData<User>()

  const [userDelete, setUserDelete] = useState<User | null>(null)
  const [count, setCount] = useState(limit)
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newState: boolean) => {
    setOpen(newState)
  }

  useEffect(() => {
    if (data) {
      updateData(data.data)
      setCount(data.total)
    }
  }, [data])

  if (error) toast.error(error.message)

  return (
    <Card x-chunk="users-table">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Administra los permisos de tus usuarios
        </CardDescription>
        <CardDescription>Total de Usuarios: {count}</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="table-auto text-center text-sm w-full relative">
          <thead className=" border-b relative w-full">
            <tr className="h-16">
              <td className="max-lg:hidden">
                <Button onClick={() => sort('id')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Id
                </Button>
              </td>
              <td>
                <Button onClick={() => sort('dni')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Dni
                </Button>
              </td>
              <td>
                <Button onClick={() => sort('nombre')} variant={'ghost'}>
                  <HiOutlineArrowsUpDown />
                  Nombre
                </Button>
              </td>

              <td className="max-lg:hidden">Estado</td>

              <td className="max-md:hidden">Correo</td>
              <td className="max-xl:hidden">Creado</td>
              <td className="max-xl:hidden">Actualizado</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="text-xs relative">
            {isLoading ? (
              <TableSkeleton rows={Math.min(limit, count)} />
            ) : users && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/50 duration-200 relative h-14 border-t"
                >
                  <td className="rounded-l-lg max-lg:hidden">{user.id}</td>
                  <td className="rounded-l-lg">{user.dni}</td>
                  <td>{`${user.nombre} ${user.apellidos}`}</td>
                  <td
                    className={`max-lg:hidden text-shadow-lg ${user.habilitado ? 'text-green-500 shadow-green-500/50' : 'text-red-500 shadow-red-500/50'}`}
                  >
                    {user.habilitado ? 'Activo' : 'Inactivo'}
                  </td>
                  <td className="max-md:hidden">{user.correo}</td>
                  <td className="max-xl:hidden">{user.creado}</td>
                  <td className="max-xl:hidden">{user.actualizado}</td>
                  <td className="rounded-r-lg space-x-2">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded hover:bg-background duration-200">
                        <MdOutlineUnfoldMore size={20} />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="flex flex-col gap-2 items-start max-w-40 p-2 text-xs"
                      >
                        <Link
                          href={`/admin/users/edit/${user.id}`}
                          className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm"
                        >
                          <FiEdit size={18} /> Editar
                        </Link>
                        <button
                          onClick={() => {
                            setUserDelete(user), handleOpenChange(true)
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
        <Pagination totalPages={data?.totalPages ?? 0} />
      </CardFooter>
      <DeleteUserDialog
        open={open}
        user={userDelete}
        handleOpenChange={handleOpenChange}
        handleRefresh={mutate}
      />
    </Card>
  )
}
