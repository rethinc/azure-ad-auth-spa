<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'
import { useAuthentication } from '@/application/app/authentication/Authentication'
import { provideAuthentication } from '@/application/app/authentication/Authentication.provider'

const initialized = ref(false)
provideAuthentication(useAuthentication())

onMounted(async () => {
  const authenticationService = await useAuthenticationService()
  await authenticationService.initialize()
  initialized.value = true
})
</script>

<template>
  <template v-if="initialized">
    <ul>
      <li><RouterLink to="/app/persons">Persons</RouterLink></li>
      <li><RouterLink to="/app/timeslots">Timeslots</RouterLink></li>
    </ul>
    <RouterView />
  </template>
  <template v-else>
    <h3>Loading...</h3>
  </template>
</template>

<style lang="scss">
@import '../../assets/styles/global';
</style>
