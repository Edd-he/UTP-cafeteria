//Iconos de admin
import { FiUsers } from 'react-icons/fi'
import {
  MdOutlineInventory2,
  MdOutlinePayment,
  MdStoreMallDirectory,
  MdOutlineShoppingCart,
} from 'react-icons/md'
import { FaUsersGear } from 'react-icons/fa6'
import { IoShieldHalfSharp } from 'react-icons/io5'
import { BsBoxSeam } from 'react-icons/bs'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BiPurchaseTag } from 'react-icons/bi'
//Iconos de Cliente
import { PiUserCheckLight } from 'react-icons/pi'
import { TbMoneybag } from 'react-icons/tb'

export const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: AiOutlineLineChart },
  { label: 'Productos', href: '/admin/products', icon: BsBoxSeam },
  { label: 'Clientes', href: '/admin/customers', icon: FiUsers },
  { label: 'Inventario', href: '/admin/inventory', icon: MdOutlineInventory2 },
  { label: 'Proveedores', href: '/admin/providers', icon: FaUsersGear },
  { label: 'Usuarios', href: '/admin/users', icon: IoShieldHalfSharp },
  { label: 'Ventas', href: '/admin/sales', icon: MdOutlinePayment },
  { label: 'Compras', href: '/admin/purchases', icon: BiPurchaseTag },
]

export const SHOP_LINKS = [
  { label: 'Tienda', href: '/shop', icon: MdStoreMallDirectory },
  { label: 'Carrito', href: '/shop/cart', icon: MdOutlineShoppingCart },
  { label: 'Compras', href: '/shop/purchases', icon: TbMoneybag },
  { label: 'Cuenta', href: '/shop/profile', icon: PiUserCheckLight },
]
