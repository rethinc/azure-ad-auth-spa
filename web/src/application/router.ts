import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
} from 'vue-router'
import AuthenticatedApp from '@/application/app/AuthenticatedApp.vue'
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'
import LoginPage from '@/application/app/authentication/LoginPage.vue'
import { appRoutes } from '@/application/app/routes'

const appRoute = {
  path: '/app',
  component: AuthenticatedApp,
  beforeEnter: async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
  ) => {
    const authenticationService = useAuthenticationService()
    if (await authenticationService.isAuthenticated()) {
      const loginTargetPath = authenticationService.getAndClearLoginTargetPath()
      if (loginTargetPath !== null) {
        return next({ path: loginTargetPath })
      } else {
        return next()
      }
    } else {
      authenticationService.setLoginTargetPath(to.fullPath)
      return next({ path: '/login' })
    }
  },
  children: appRoutes,
}

const loginRoute = {
  path: '/login',
  component: LoginPage,
  beforeEnter: async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
  ) => {
    console.log('entering /login')
    const authenticationService = useAuthenticationService()
    if (await authenticationService.isAuthenticated()) {
      console.log('redirecting to app')
      return next({ path: '/app' })
    } else {
      console.log('staying on /login')
      return next()
    }
  },
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    appRoute,
    loginRoute,
    {
      path: '/:pathMatch(.*)*',
      redirect: { path: '/app' },
    },
  ],
})
