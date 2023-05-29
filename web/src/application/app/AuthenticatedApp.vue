<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { provideAccessToken } from '@/application/app/authentication/AccessToken.provider'
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'

const initialized = ref(false)

onMounted(async () => {
  const authenticationService = await useAuthenticationService()
  provideAccessToken(await authenticationService.getAccessToken())
  initialized.value = true
})
</script>

<template>
  <template v-if="initialized">
    <RouterView />
  </template>
  <template v-else>
    <h3>Loading...</h3>
  </template>
</template>

<style lang="scss">
@import '../../assets/styles/global';
</style>
