import * as msal from '@azure/msal-browser'
import {
  BrowserCacheLocation,
  PublicClientApplication,
} from '@azure/msal-browser'
import { Environment } from '@/Environment'

let instance: PublicClientApplication | null = null

export const useMsal = (environment: Environment): PublicClientApplication => {
  if (instance != null) {
    return instance
  }

  const loginUrl = `${environment.get('VITE_FRONTEND_APP_URL')}/login`
  const msalConfig = {
    auth: {
      clientId: '3f22301d-51a2-4374-b364-583d93122ab5',
      authority:
        'https://login.microsoftonline.com/3e5afe5d-334d-44b2-b3be-a3123c377985',
      redirectUri: loginUrl,
      postLogoutRedirectUri: loginUrl,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: false,
    },
  }

  instance = new msal.PublicClientApplication(msalConfig)

  return instance
}
