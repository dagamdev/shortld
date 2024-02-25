import type { APIContext } from 'astro'
import { createJsonRes, handleError } from '@/lib/api'
import { Prisma } from '@/lib/prisma'

export async function GET ({ params, locals }: APIContext) {
  const { id } = params

  if (id === undefined) {
    return createJsonRes({
      error: 'The id param is undefined'
    }, {
      status: 400,
      statusText: 'bad request'
    })
  }

  if (locals.user === null) {
    return createJsonRes({
      error: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'unauthorized'
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

export async function PATCH ({ request, params, locals }: APIContext) {
  const { id } = params

  if (id === undefined) {
    return createJsonRes({
      error: 'The id param is undefined'
    }, {
      status: 400,
      statusText: 'bad request'
    })
  }

  if (locals.user === null) {
    return createJsonRes({
      error: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'unauthorized'
    })
  }

  try {
    const body = await request.json()
    const { url, code }: {
      url?: string
      code?: string
    } = body

    if (url === undefined && code === undefined) {
      return createJsonRes({
        error: 'Invalid update request. Valid parameters are required.',
        fields: {
          url: '?String url',
          code: '?String unique'
        }
      }, {
        status: 400,
        statusText: 'bad request'
      })
    }

    if (url !== undefined && typeof url !== 'string') {
      return createJsonRes({
        error: 'Incorrect parameter type',
        fields: {
          url: '?String url',
          code: '?String unique'
        }
      }, {
        status: 400,
        statusText: 'bad request'
      })
    }

    if (code !== undefined && typeof code !== 'string') {
      return createJsonRes({
        error: 'Incorrect parameter type',
        fields: {
          url: '?String url',
          code: '?String unique'
        }
      }, {
        status: 400,
        statusText: 'bad request'
      })
    }

    if (url !== undefined) {
      new URL(url)
    }

    const updatedLink = await Prisma.link.update({
      where: {
        id
      },
      data: {
        url,
        code
      }
    })

    return createJsonRes(updatedLink)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE ({ params, locals }: APIContext) {
  const { id } = params

  if (id === undefined) {
    return createJsonRes({
      error: 'The id param is undefined'
    }, {
      status: 400,
      statusText: 'bad request'
    })
  }

  if (locals.user === null) {
    return createJsonRes({
      error: 'Unauthorized'
    }, {
      status: 401,
      statusText: 'unauthorized'
    })
  }

  try {
    await Prisma.link.delete({
      where: {
        id
      }
    })

    return new Response(null, {
      status: 204,
      statusText: 'no content'
    })
  } catch (error) {
    console.log('Error -- ', error)
    return handleError(error)
  }
}
