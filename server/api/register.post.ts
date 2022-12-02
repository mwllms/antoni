export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { subscription } = body
  return subscription
})
