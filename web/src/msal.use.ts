import * as msal from '@azure/msal-browser'
import {
  BrowserCacheLocation,
  PublicClientApplication,
} from '@azure/msal-browser'

let instance: PublicClientApplication | null = null

export const useMsal = (): PublicClientApplication => {
  if (instance != null) {
    return instance
  }

  const msalConfig = {
    auth: {
      clientId: '3f22301d-51a2-4374-b364-583d93122ab5',
      authority:
        'https://login.microsoftonline.com/3e5afe5d-334d-44b2-b3be-a3123c377985',
      redirectUri: 'http://localhost:5173/login',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: false,
    },
  }

  instance = new msal.PublicClientApplication(msalConfig)

  return instance
}
