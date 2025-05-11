import { PurchaseCard } from '@shop/profile/purchase-card'

import { formatDate } from '@/lib/utils'

export default async function Page() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/login')
  // }

  const sales = [
    {
      id: '1',
      transaction: 'TXN123456',
      totalAmount: 120.5,
      totalDiscount: 10,
      created: new Date('2025-04-25T10:00:00Z'),
    },
    {
      id: '2',
      transaction: 'TXN789012',
      totalAmount: 85.0,
      totalDiscount: 5,
      created: new Date('2025-04-20T14:30:00Z'),
    },
    {
      id: '3',
      transaction: 'TXN345678',
      totalAmount: 150.75,
      totalDiscount: 15.5,
      created: new Date('2025-04-15T09:15:00Z'),
    },
  ]

  return (
    <div className="pt-5 max-sm:pb-24">
      <h1 className="text-3xl font-bold mb-5">COMPRAS RECIENTES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <PurchaseCard
              key={sale.id}
              id={sale.id}
              transaction={sale.transaction}
              status="Completada"
              price={parseFloat(sale.totalAmount.toString())}
              discount={parseFloat(sale.totalDiscount.toString())}
              date={formatDate(sale.created)}
            />
          ))
        ) : (
          <p>No se han encontrado compras recientes.</p>
        )}
      </div>
    </div>
  )
}
