import { inject, provide } from 'vue'
import { Environment } from '@/Environment'

const key = 'environment'
export const provideEnvironment = (environment: Environment) => {
  provide(key, environment)
}

export const injectEnvironment = (): Environment => {
  const environment = inject<Environment>(key)
  if (!environment) {
    throw Error('Environment is not available.')
  }
  return environment
}
