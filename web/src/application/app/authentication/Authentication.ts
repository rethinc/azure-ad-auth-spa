import {
  AuthenticationService,
  useAuthenticationService,
} from '@/application/app/authentication/AuthenticationService'
import { Environment } from '@/Environment'

export interface Authentication {
  getAccessToken: () => Promise<string>
  getUserName: () => Promise<string | null>
  logOut: () => Promise<void>
}

const authentication = (
  authenticationServie: AuthenticationService
): Authentication => {
  const getAccessToken = (): Promise<string> => {
    return authenticationServie.getAccessToken()
  }

  const getUserName = (): Promise<string | null> => {
    return authenticationServie.getUserName()
  }

  const logOut = (): Promise<void> => {
    return authenticationServie.logOut()
  }

  return {
    getAccessToken,
    getUserName,
    logOut,
  }
}

export const useAuthentication = (environment: Environment) =>
  authentication(useAuthenticationService(environment))
