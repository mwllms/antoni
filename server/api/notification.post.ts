import * as webPush from 'web-push'
// @ts-ignore
webPush.default.setVapidDetails('https://example.com/', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { subscription, payload, ttl } = body
  const options = {
    TTL: ttl,
  }
  // @ts-ignore
  await webPush.default
    .sendNotification(subscription, payload, options)
    .then(function () {
      console.log('success')
    })
    .catch(function (error: any) {
      return createError({
        message: error,
        statusCode: 500,
      })
    })
})
