import { getFullUserAccount } from '~~/server/utils/auth'

export default defineEventHandler((event): any => {
  const authUser = event.context.user
  const user = getFullUserAccount(authUser.id)
  return user
})
