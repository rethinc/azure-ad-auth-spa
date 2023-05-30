import { inject, provide } from 'vue'
import { Authentication } from '@/application/authentication/Authentication'

const key = 'authentication'
export const provideAuthentication = (authentication: Authentication) => {
  provide(key, authentication)
}

export const injectAuthentication = (): Authentication => {
  const authentication = inject<Authentication>(key)
  if (!authentication) {
    throw Error('Authentication is not available.')
  }
  return authentication
}
