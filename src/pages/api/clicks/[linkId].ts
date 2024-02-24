import type { APIContext } from 'astro'
import { createJsonRes, handleError } from '@/lib/api'
import { Prisma } from '@/lib/prisma'

export async function GET ({ locals, params, url }: APIContext) {
  const userId = locals.user?.id
  const { linkId } = params
  const count = Boolean(url.searchParams.get('count'))

  if (userId === undefined) {
    return createJsonRes({
      error: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'unauthorized'
    })
  }

  if (linkId === undefined) {
    return createJsonRes({
      error: 'The linkId param is undefined'
    }, {
      status: 400,
      statusText: 'bad request'
    })
  }

  try {
    const config = {
      where: {
        link: {
          id: linkId,
          userId
        }
      }
    }
    const clicks = await (count ? Prisma.click.count(config) : Prisma.click.findMany(config))

    return createJsonRes(clicks)
  } catch (error) {
    return handleError(error)
  }
}
