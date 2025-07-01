'use server'

import { redirect, RedirectType } from 'next/navigation'

export async function redirectAdmin() {
  redirect('/admin/orders', RedirectType.push)
}

export async function redirectShop() {
  redirect('/shop', RedirectType.push)
}
