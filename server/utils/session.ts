import type { H3Event } from 'h3'
import cookieSignature from 'cookie-signature'
import { getUserById } from '~~/server/utils/auth'

export const serialize = (obj: any) => {
  const value = Buffer.from(JSON.stringify(obj), 'utf-8').toString('base64')
  const length = Buffer.byteLength(value)
  if (length > 4096) throw new Error('Session value is too long')
  return value
}

export const deserialize = (value: string) => {
  return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'))
}

export const sign = (value: string, secret: string) => {
  return cookieSignature.sign(value, secret)
}

export function unsign(value: string, secret: string) {
  return cookieSignature.unsign(value, secret)
}

export const getSession = async (event: H3Event) => {
  const config = useRuntimeConfig()
  const cookie = getCookie(event, config.cookieName)
  if (!cookie) return null
  const unsignedSession = unsign(cookie, config.cookieSecret)
  if (!unsignedSession) return null
  const session = deserialize(unsignedSession)
  return getUserById(session.userId)
}
