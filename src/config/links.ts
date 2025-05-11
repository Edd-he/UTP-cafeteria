import {
  MdOutlineInventory2,
  MdOutlinePayment,
  MdStoreMallDirectory,
  MdOutlineShoppingCart,
} from 'react-icons/md'
import { LuClipboardList } from 'react-icons/lu'
import { IoShieldHalfSharp } from 'react-icons/io5'
import { BsBoxSeam } from 'react-icons/bs'
import { PiUserCheckLight } from 'react-icons/pi'
import { TbMoneybag } from 'react-icons/tb'

export const ADMIN_LINKS = [
  { label: 'Ordenes', href: '/admin/orders', icon: LuClipboardList },
  { label: 'Productos', href: '/admin/products', icon: BsBoxSeam },
  { label: 'Inventario', href: '/admin/inventory', icon: MdOutlineInventory2 },
  { label: 'Usuarios', href: '/admin/users', icon: IoShieldHalfSharp },
  { label: 'Ventas', href: '/admin/sales', icon: MdOutlinePayment },
]

export const SHOP_LINKS = [
  { label: 'Tienda', href: '/shop', icon: MdStoreMallDirectory },
  { label: 'Carrito', href: '/shop/cart', icon: MdOutlineShoppingCart },
  { label: 'Compras', href: '/shop/purchases', icon: TbMoneybag },
  { label: 'Cuenta', href: '/shop/profile', icon: PiUserCheckLight },
]
