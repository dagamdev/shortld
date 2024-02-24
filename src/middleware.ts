import { defineMiddleware } from 'astro:middleware'
import { getSession } from 'auth-astro/server'
import { Prisma } from './lib/prisma'

export const onRequest = defineMiddleware(async ({ locals, request, redirect, url }, next) => {
  const session = await getSession(request)
  locals.session = session

  if (typeof session?.user?.email === 'string') {
    try {
      const user = await Prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })

      if (user === null) {
        const newUser = await Prisma.user.create({
          data: {
            name: session.user.name,
            email: session.user.email
          }
        })
        locals.user = newUser
      } else locals.user = user
    } catch (error) {
      locals.user = null
    }
  }

  if (url.pathname.includes('/dashboard') && session === null) return redirect('/')

  return await next()
})
