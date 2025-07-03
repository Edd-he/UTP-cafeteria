import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/modules/auth/auth-options'
import MyOrdersContainer from '@/modules/shop/my-orders/my-orders-container'

type SearchParams = {
  query?: string
  page?: string
  limit?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}
export default async function Page({ searchParams }: Props) {
  const session = await getServerSession(authOptions)

  const { query, page, limit } = await searchParams
  const queryValue = query || ''
  const currentPage = Number(page) || 1
  const limitValue = Number(limit) || 10

  if (!session) {
    redirect('/')
  }

  const { access } = session.tokens
  const { id } = session.user
  return (
    <div className="p-5 max-sm:pb-24">
      <h1 className="text-3xl font-bold mb-5">MIS ORDENES</h1>
      <MyOrdersContainer
        query={queryValue}
        page={currentPage}
        limit={limitValue}
        access={access}
        userId={id}
      />
    </div>
  )
}
