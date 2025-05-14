'use client'
import { Button } from '@shared/components/ui/button'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { notFound } from 'next/navigation'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import SaleItemsTbl from '@/modules/admin/sales/saleItems-tbl'
import { SaleItem, SaleDetails } from '@/modules/shared/interfaces'

type Props = {
  params: Promise<{ id: string }>
}

type Sale = {
  SaleDetails: SaleDetails
  SaleItems: SaleItem[]
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const saleId = parseInt(id, 10)
  const { data } = useGetData<Sale>(`/api/sales/${saleId}`)
  if (data === null) {
    notFound()
  }
  const { SaleDetails, SaleItems } = data
  return (
    <>
      <section className="w-full flex gap-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/admin/sales'}>
            <MdOutlineChevronLeft size={25} />
          </Link>
        </Button>
        <h1 className="text-3xl">Venta Registrada: {}</h1>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{SaleDetails.userName}</CardTitle>

          <CardDescription className="text-base">
            Transacción: {SaleDetails.transaction}
          </CardDescription>
          <CardDescription className="text-base">
            Importe Total: S/{SaleDetails.totalPayment}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SaleItemsTbl items={SaleItems} />
        </CardContent>
        <CardFooter>Metodo de Pago: {SaleDetails.paymentMethod}</CardFooter>
      </Card>
    </>
  )
}
