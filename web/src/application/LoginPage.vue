<script setup lang="ts">
import { useAuthenticationService } from '@/application/authentication/AuthenticationService'
import { injectEnvironment } from '@/Environment.provider'

const environment = injectEnvironment()

const onLogin = async () => {
  const authenticationService = await useAuthenticationService(environment)
  await authenticationService.logIn()
}
</script>

<template>
  <h1>Login</h1>
  <button @click="onLogin">Anmelden</button>
</template>

<style scoped lang="scss"></style>
