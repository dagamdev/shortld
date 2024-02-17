import { defineMiddleware } from 'astro:middleware'
import { getSession } from 'auth-astro/server'

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  console.log('middleware')
  locals.session = await getSession(request)

  return await next()
})
