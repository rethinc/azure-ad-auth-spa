import {
  AuthenticationService,
  useAuthenticationService,
} from '@/application/app/authentication/AuthenticationService'

export interface Authentication {
  getAccessToken: () => Promise<string>
}

const authentication = (
  authenticationServie: AuthenticationService
): Authentication => {
  const getAccessToken = (): Promise<string> => {
    return authenticationServie.getAccessToken()
  }

  return {
    getAccessToken,
  }
}

export const useAuthentication = () =>
  authentication(useAuthenticationService())
