import { AuthenticationResult } from '@azure/msal-common'
import { PublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@/msal.use'

export interface AuthenticationService {
  initialize: () => Promise<void>
  getAccessToken: () => Promise<string | null>
  isAuthenticated: () => Promise<boolean>
  handleRedirectResponse: () => Promise<AuthenticationResult | null>
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

  const getAccessToken = async (): Promise<string | null> => {
    const callbackResult = await handleRedirectResponse()
    if (callbackResult?.accessToken !== undefined) {
      return callbackResult.accessToken
    }
    try {
      const authResult = await msal.acquireTokenSilent(tokenRequest)
      return authResult.accessToken
    } catch (e) {
      return null
    }
  }

  const logIn = async (): Promise<void> => {
    await handleRedirectResponse()
    await msal.acquireTokenRedirect(tokenRequest)
  }

  const isAuthenticated = async (): Promise<boolean> => {
    const redirectResponse = await handleRedirectResponse()
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

  const handleRedirectResponse =
    async (): Promise<AuthenticationResult | null> => {
      const result = await msal.handleRedirectPromise()
      console.log('Handled redirect response. Token:', result?.accessToken)
      return result
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
    isAuthenticated,
    handleRedirectResponse,
    logIn,
    setLoginTargetPath,
    getAndClearLoginTargetPath,
  }
}

export const useAuthenticationService = (): AuthenticationService => {
  return authenticationService(useMsal())
}
