import { TbCandy } from 'react-icons/tb'
import { LuApple } from 'react-icons/lu'
import { PiHamburgerDuotone } from 'react-icons/pi'
import { TbBottle } from 'react-icons/tb'
import { MdHelpOutline } from 'react-icons/md'
import { LuUtensils } from 'react-icons/lu'
export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    icon: PiHamburgerDuotone,
    name: 'Preparados',
    slug: 'preparados',
    value: 'PREPARADOS',
  },
  {
    id: 2,
    icon: LuApple,
    name: 'Saludables',
    slug: 'saludables',
    value: 'SALUDABLES',
  },
  { id: 3, icon: TbBottle, name: 'Bebidas', slug: 'bebidas', value: 'BEBIDAS' },
  {
    id: 4,
    icon: TbCandy,
    name: 'Snacks',
    slug: 'snacks',
    value: 'SNACKS',
  },
  {
    id: 5,
    icon: LuUtensils,
    name: 'Almuerzos',
    slug: 'almuerzos',
    value: 'ALMUERZOS',
  },
  {
    id: 6,
    icon: MdHelpOutline,
    name: 'Otros',
    slug: 'otros',
    value: 'OTROS',
  },
]
