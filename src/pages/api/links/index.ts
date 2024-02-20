import { createJsonRes, handleError, generateCode } from '@/lib/api'
import { Prisma } from '@/lib/prisma'
import type { APIContext } from 'astro'

export async function GET ({ locals }: APIContext) {
  const { user } = locals

  try {
    if (user === null) {
      return createJsonRes({
        error: 'Unauthorized'
      }, {
        status: 401,
        statusText: 'unauthorized'
      })
    }

    const links = await Prisma.link.findMany({
      where: {
        userId: user.id
      }
    })

    return createJsonRes(links)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST ({ request }: APIContext) {
  try {
    const body = await request.json()
    const { link, userId } = body

    if (link === undefined) {
      return createJsonRes({
        error: 'link property missing in request body',
        properties: {
          link: 'type string url',
          userId: 'type string uuid'
        }
      }, {
        status: 400,
        statusText: 'bad request'
      })
    }

    if (userId === undefined) {
      return createJsonRes({
        error: 'userId property missing in request body',
        properties: {
          link: 'type string url',
          userId: 'type string uuid'
        }
      }, {
        status: 400,
        statusText: 'bad request'
      })
    }

    const url = new URL(link as string)
    const code = generateCode()

    const newLink = await Prisma.link.create({
      data: {
        url: url.href,
        userId,
        code
      }
    })

    return createJsonRes(newLink)
  } catch (error) {
    return handleError(error)
  }
}
