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

import SalesTbl from '@/modules/admin/sales/sales-tbl'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)

  if (!saleDetails) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se encontró la venta con el ID: {id}</p>
      </div>
    )
  }

  return (
    <>
      <section className="w-full flex gap-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/admin/sales'}>
            <MdOutlineChevronLeft size={25} />
          </Link>
        </Button>
        <h1 className="text-3xl">Venta Registrada: {saleDetails.created}</h1>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{saleDetails.userName}</CardTitle>

          <CardDescription className="text-base">
            Transacción: {saleDetails.transaction}
          </CardDescription>
          <CardDescription className="text-base">
            Importe Total: S/{saleDetails.totalPayment}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>Metodo de Pago: {saleDetails.paymentMethod}</CardFooter>
      </Card>
    </>
  )
}
