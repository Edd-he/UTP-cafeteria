import { OrderCard } from './order-card'
import { Order } from './order-card'

const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-05-09',
    customer: 'María García',
    items: [
      { name: 'Laptop HP', quantity: 1, price: 899.99 },
      { name: 'Mouse inalámbrico', quantity: 1, price: 29.99 },
    ],
    total: 929.98,
    status: 'pendiente',
  },
  {
    id: 'ORD-002',
    date: '2025-05-08',
    customer: 'Juan Pérez',
    items: [
      { name: 'Monitor 27"', quantity: 2, price: 249.99 },
      { name: 'Teclado mecánico', quantity: 1, price: 89.99 },
    ],
    total: 589.97,
    status: 'en-proceso',
  },
  {
    id: 'ORD-003',
    date: '2025-05-07',
    customer: 'Ana Rodríguez',
    items: [{ name: 'Impresora láser', quantity: 1, price: 199.99 }],
    total: 199.99,
    status: 'completada',
  },
  {
    id: 'ORD-004',
    date: '2025-05-06',
    customer: 'Carlos López',
    items: [
      { name: 'Tablet Samsung', quantity: 1, price: 349.99 },
      { name: 'Funda protectora', quantity: 1, price: 24.99 },
      { name: 'Cargador rápido', quantity: 1, price: 19.99 },
    ],
    total: 394.97,
    status: 'cancelada',
  },
  {
    id: 'ORD-005',
    date: '2025-05-09',
    customer: 'Laura Martínez',
    items: [{ name: 'Auriculares Bluetooth', quantity: 2, price: 79.99 }],
    total: 159.98,
    status: 'pendiente',
  },
  {
    id: 'ORD-006',
    date: '2025-05-08',
    customer: 'Roberto Sánchez',
    items: [
      { name: 'Disco duro externo 1TB', quantity: 1, price: 89.99 },
      { name: 'Cable USB-C', quantity: 2, price: 12.99 },
    ],
    total: 115.97,
    status: 'en-proceso',
  },
  {
    id: 'ORD-007',
    date: '2025-05-07',
    customer: 'Patricia Gómez',
    items: [
      { name: 'Webcam HD', quantity: 1, price: 59.99 },
      { name: 'Micrófono USB', quantity: 1, price: 49.99 },
    ],
    total: 109.98,
    status: 'completada',
  },
  {
    id: 'ORD-008',
    date: '2025-05-06',
    customer: 'Miguel Torres',
    items: [{ name: 'Router WiFi', quantity: 1, price: 129.99 }],
    total: 129.99,
    status: 'pendiente',
  },
]
export default function OrdersContainer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order as Order} />
        ))}
      </div>
      {orders.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No se encontraron órdenes que coincidan con tu búsqueda.
        </div>
      )}
    </>
  )
}
