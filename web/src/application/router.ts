import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
} from 'vue-router'
import PersonsPage from '@/application/app/persons/PersonsPage.vue'
import TimeslotsPage from '@/application/app/timeslots/TimeslotsPage.vue'
import AuthenticatedApp from '@/application/app/AuthenticatedApp.vue'
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'
import LoginPage from '@/application/app/authentication/LoginPage.vue'

const root = {
  path: '/',
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
  children: [],
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    root,
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/persons',
      component: PersonsPage,
    },
    {
      path: '/timeslots',
      component: TimeslotsPage,
    },
  ],
})
