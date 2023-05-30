import {
  AuthenticationService,
  useAuthenticationService,
} from '@/application/app/authentication/AuthenticationService'

export interface Authentication {
  getAccessToken: () => Promise<string>
  getUserName: () => Promise<string | undefined>
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

  return {
    getAccessToken,
    getUserName,
  }
}

export const useAuthentication = () =>
  authentication(useAuthenticationService())
