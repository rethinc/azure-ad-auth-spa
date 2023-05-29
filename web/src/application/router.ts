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

const root = {
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
      return next({ path: '/login' })
    }
  },
  children: appRoutes,
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    root,
    {
      path: '/',
      redirect: '/app',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { path: '/' },
    },
    {
      path: '/login',
      component: LoginPage,
    },
  ],
})
