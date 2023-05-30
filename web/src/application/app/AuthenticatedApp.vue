<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'
import { useAuthentication } from '@/application/app/authentication/Authentication'
import { provideAuthentication } from '@/application/app/authentication/Authentication.provider'
import AppLayout from '@/application/app/AppLayout.vue'
import { injectEnvironment } from '@/Environment.provider'

const environment = injectEnvironment()

const initialized = ref(false)
provideAuthentication(useAuthentication(environment))

onMounted(async () => {
  const authenticationService = await useAuthenticationService(environment)
  await authenticationService.initialize()
  initialized.value = true
})
</script>

<template>
  <template v-if="initialized">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </template>
  <template v-else>
    <h3>Loading...</h3>
  </template>
</template>

<style lang="scss">
@import '../../assets/styles/global';
</style>
