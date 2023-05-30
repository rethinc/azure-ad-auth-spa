import {
  AuthenticationService,
  useAuthenticationService,
} from '@/application/app/authentication/AuthenticationService'

export interface Authentication {
  getAccessToken: () => Promise<string>
  getUserName: () => Promise<string | undefined>
  logOut: () => Promise<void>
}

const authentication = (
  authenticationServie: AuthenticationService
): Authentication => {
  const getAccessToken = (): Promise<string> => {
    return authenticationServie.getAccessToken()
  }

  const getUserName = (): Promise<string | undefined> => {
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

export const useAuthentication = () =>
  authentication(useAuthenticationService())
