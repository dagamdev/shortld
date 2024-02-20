import type { APIContext } from 'astro'
import { createJsonRes, handleError } from '@/lib/api'
import { Prisma } from '@/lib/prisma'

export async function GET ({ params }: APIContext) {
  const { id } = params

  if (id === undefined) {
    return createJsonRes({
      error: 'The id param is undefined'
    }, {
      status: 400,
      statusText: 'bad request'
    })
  }

  try {
    const link = await Prisma.link.findUnique({
      where: {
        id
      }
    })

    return createJsonRes(link)
  } catch (error) {
    return handleError(error)
  }
}
