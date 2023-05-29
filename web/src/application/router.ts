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
    const authenticationService = await useAuthenticationService()
    if (await authenticationService.isAuthenticated()) {
      return next()
    } else {
      console.log('Preventing access to', to.path)
      return next({ path: '/login' })
    }
  },
  children: appRoutes,
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    appRoute,
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { path: '/app' },
    },
  ],
})
