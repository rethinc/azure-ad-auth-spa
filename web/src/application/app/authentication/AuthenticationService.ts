import { PublicClientApplication } from '@azure/msal-browser'
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

  const getAccessToken = async (): Promise<string> => {
    const callbackResult = await msal.handleRedirectPromise()
    if (callbackResult?.accessToken !== undefined) {
      return callbackResult.accessToken
    }
    try {
      const authResult = await msal.acquireTokenSilent(tokenRequest)
      return authResult.accessToken
    } catch (e) {
      await logIn()
      return ''
    }
  }

  const getUserName = async (): Promise<string | undefined> => {
    const callbackResult = await msal.handleRedirectPromise()
    if (callbackResult?.account?.username !== undefined) {
      return callbackResult.account.username
    }
    try {
      const authResult = await msal.acquireTokenSilent(tokenRequest)
      return authResult.account?.username ?? undefined
    } catch (e) {
      return undefined
    }
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
