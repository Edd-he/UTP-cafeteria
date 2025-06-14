import { MdShoppingCart } from 'react-icons/md'
import Link from 'next/link'
import { Button } from '@shared/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@shared/components/ui/card'
import { CartTable } from '@shop/cart/cart-table'

import { CartDetails } from '@/modules/shop/cart/cart-details'
import PayOrderButton from '@/modules/shop/cart/pay-order-button'

export default function Page() {
  return (
    <>
      <main className="relative size-full flex max-xl:flex-col gap-5 max-sm:pb-24 max-xl:pt-5">
        <div className="w-full relative xl:h-[calc(100vh-60px)] flex flex-col gap-5 xl:p-5">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-lg flex gap-2 items-center">
                A punto de realizar tu pedido
              </CardTitle>
              <CardDescription>
                Confirma las cantidades de cada producto que desees.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-[600px] w-full ">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <MdShoppingCart size={28} />
                Tu carrito
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto h-[500px] w-full scrollbar-thin scrollbar-track-background scrollbar-thumb-primary relative">
              <CartTable />
            </CardContent>
          </Card>
        </div>

        <Card className="xl:h-[calc(100vh-60px)] xl:max-w-screen-xs w-full xl:border-none xl:rounded-none xl:shadow-none">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
            <CardDescription>
              Asegúrate de revisar todos los detalles antes de continuar con el
              pago.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative flex flex-col gap-10 border-t-2 border-border p-6">
            <CartDetails />
          </CardContent>
          <CardFooter className="p-6 flex flex-col gap-5">
            <Button variant={'outline'} asChild className="w-full">
              <Link href={'/shop'}>Continuar Comprando</Link>
            </Button>
            <PayOrderButton className="w-full" />
          </CardFooter>
        </Card>
      </main>
    </>
  )
}
