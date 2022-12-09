import { getXataClient } from '~~/server/utils/xata'
import bcrypt from 'bcrypt'

const xata = getXataClient()

export const getUserByEmail = async (email: string) => {
  const user = await xata.db.users.select(['email', 'password']).filter({ email }).getFirst()
  return user
}

export const getUserById = async (id: string) => {
  const user = await xata.db.users.select(['email']).filter({ id }).getFirst()
  return user
}

export const getFullUserAccount = async (id: string) => {
  const user = await xata.db.users.select(['email', 'username']).filter({ id }).getFirst()
  return user
}

export const hash = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10)
}

export const verify = async (plainPassword: string, hash: string | null | undefined) => {
  if (!hash) {
    return false
  }
  return await bcrypt.compare(plainPassword, hash)
}
