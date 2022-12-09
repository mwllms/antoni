import { getSession } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  let isAuth = false
  if (!event.node.req.url?.includes('signin') && event.node.req.url?.includes('/api/')) isAuth = true
  const user = await getSession(event)
  if (isAuth && !user) {
    throw createError({
      message: 'You are not authorized',
      statusCode: 401,
    })
  }
  if (user) event.context.user = user
})
