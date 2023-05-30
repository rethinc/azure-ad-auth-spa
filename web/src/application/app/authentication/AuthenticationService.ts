import {
  AuthenticationResult,
  InteractionRequiredAuthError,
} from '@azure/msal-common'
import { PublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@/msal.use'

interface AuthenticationService {
  getAccessToken: () => Promise<string>
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

  const getAccessToken = async (): Promise<string> => {
    try {
      const redirectResponse = await msal.acquireTokenSilent(tokenRequest)
      return redirectResponse.accessToken
    } catch (e: unknown) {
      if (e instanceof InteractionRequiredAuthError) {
        await logIn()
      }
    }
    return ''
  }

  const logIn = async (): Promise<void> => {
    await handleRedirectResponse()
    await msal.acquireTokenRedirect(tokenRequest)
  }

  const isAuthenticated = async (): Promise<boolean> => {
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
    getAccessToken,
    isAuthenticated,
    handleRedirectResponse,
    logIn,
    setLoginTargetPath,
    getAndClearLoginTargetPath,
  }
}

export const useAuthenticationService =
  async (): Promise<AuthenticationService> => {
    return authenticationService(await useMsal())
  }
