import { inject, provide } from 'vue'

const key = 'accessToken'
export const provideAccessToken = (accessToken: string) => {
  provide(key, accessToken)
}

export const injectEnvironment = (): string => {
  const accessToken = inject<string>(key)
  if (!accessToken) {
    throw Error('AccessToken is not available.')
  }
  return accessToken
}
