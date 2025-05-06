import { ReactNode } from 'react'
import Image from 'next/image'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen flex">
      <div className=" max-lg:hidden w-1/2 flex-center bg-secondary">
        <Image alt="logo" height={874} width={516} src={'/shop-logo.png'} />
      </div>
      <div className=" w-full lg:w-1/2 flex-center">{children}</div>
    </main>
  )
}
