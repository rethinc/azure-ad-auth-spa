import { InteractionRequiredAuthError } from '@azure/msal-common'
import { PublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@/msal.use'

interface AuthenticationService {
  getAccessToken: () => Promise<string>
  isAuthenticated: () => Promise<boolean>
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
        await msal.acquireTokenRedirect(tokenRequest)
      }
    }
    return ''
  }

  const isAuthenticated = async (): Promise<boolean> => {
    try {
      await msal.acquireTokenSilent(tokenRequest)
      return true
    } catch (e) {
      return false
    }
  }

  const setLoginTargetPath = (fullPath: string): void => {
    sessionStorage.setItem('AuthenticationService.loginTargetPath', fullPath)
  }

  const getAndClearLoginTargetPath = (): string | null => {
    const fullPath = sessionStorage.getItem(
      'AuthenticationService.loginTargetPath'
    )
    sessionStorage.removeItem('AuthenticationService.loginTargetPath')
    return fullPath
  }

  return {
    getAccessToken,
    isAuthenticated,
    setLoginTargetPath,
    getAndClearLoginTargetPath,
  }
}

export const useAuthenticationService =
  async (): Promise<AuthenticationService> => {
    return authenticationService(await useMsal())
  }
