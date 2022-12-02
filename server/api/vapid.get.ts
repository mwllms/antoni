export default defineEventHandler((event) => {
  return process.env.VAPID_PUBLIC_KEY
})
