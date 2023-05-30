import {
  AuthenticationResult,
  PublicClientApplication,
} from '@azure/msal-browser'
import { useMsal } from '@/msal.use'

export interface AuthenticationService {
  initialize: () => Promise<void>
  getAccessToken: () => Promise<string>
  getUserName: () => Promise<string | undefined>
  isAuthenticated: () => Promise<boolean>
  logIn: () => Promise<void>
  setLoginTargetPath: (fullPath: string) => void
  getAndClearLoginTargetPath: () => string | null
}

const authenticationService = (
  msal: PublicClientApplication
): AuthenticationService => {
  const tokenRequest = {
    scopes: ['api://3f22301d-51a2-4374-b364-583d93122ab5/user_impersonation'],
    forceRefresh: false,
  }

  const initialize = async (): Promise<void> => {
    await msal.initialize()
  }

  const getAuthenticationResult =
    async (): Promise<AuthenticationResult | null> => {
      const resultFromCallback = await msal.handleRedirectPromise()
      if (resultFromCallback !== null) {
        return resultFromCallback
      }
      try {
        return await msal.acquireTokenSilent(tokenRequest)
      } catch (e) {
        await logIn()
        return null // dead code as logIn() will navigate away
      }
    }

  const getAccessToken = async (): Promise<string> => {
    const authenticationResult = await getAuthenticationResult()
    if (authenticationResult !== null) {
      return authenticationResult.accessToken
    }
    return '' // dead code as getAuthenticationResult() navigate away if there's no token
  }

  const getUserName = async (): Promise<string | undefined> => {
    const authenticationResult = await getAuthenticationResult()
    if (authenticationResult !== null) {
      return authenticationResult.account?.username
    }
    return '' // dead code as getAuthenticationResult() navigate away if there's no token
  }

  const logIn = async (): Promise<void> => {
    await msal.handleRedirectPromise()
    await msal.acquireTokenRedirect(tokenRequest)
  }

  const isAuthenticated = async (): Promise<boolean> => {
    const redirectResponse = await msal.handleRedirectPromise()
    if (redirectResponse?.accessToken !== undefined) {
      return true
    }
    try {
      await msal.acquireTokenSilent(tokenRequest)
      return true
    } catch (e) {
      return false
    }
  }

  const loginTargetPathKey = 'AuthenticationService.loginTargetPath'

  const setLoginTargetPath = (fullPath: string): void =>
    sessionStorage.setItem(loginTargetPathKey, fullPath)

  const getAndClearLoginTargetPath = (): string | null => {
    const fullPath = sessionStorage.getItem(loginTargetPathKey)
    sessionStorage.removeItem(loginTargetPathKey)
    return fullPath
  }

  return {
    initialize,
    getAccessToken,
    getUserName,
    isAuthenticated,
    logIn,
    setLoginTargetPath,
    getAndClearLoginTargetPath,
  }
}

export const useAuthenticationService = (): AuthenticationService => {
  return authenticationService(useMsal())
}
