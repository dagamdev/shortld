import type { APIContext } from 'astro'
import { createJsonRes, handleError } from '@/lib/api'
import { Prisma } from '@/lib/prisma'

export async function GET ({ locals, url }: APIContext) {
  const userId = locals.user?.id
  const count = Boolean(url.searchParams.get('count'))

  if (userId === undefined) {
    return createJsonRes({
      error: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'unauthorized'
    })
  }

  try {
    const baseConfig = {
      where: {
        link: {
          userId
        }
      }
    }
    const clicks = await (count
      ? Prisma.click.count(baseConfig)
      : Prisma.click.findMany({
        ...baseConfig,
        orderBy: {
          createdAt: 'asc'
        }
      }))

    return createJsonRes(clicks)
  } catch (error) {
    return handleError(error)
  }
}
