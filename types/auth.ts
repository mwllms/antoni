import { UsersRecord } from '~~/server/utils/xata'

export interface Credentials {
  email: string | null
  password: string | null
  rememberMe: boolean
}

export interface AuthState {
  user: UsersRecord | null
  isAuthenticated: boolean
  error: string | null
}
