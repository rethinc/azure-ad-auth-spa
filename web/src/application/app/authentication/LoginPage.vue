<script setup lang="ts">
import { useAuthenticationService } from '@/application/app/authentication/AuthenticationService'

const onLogin = async () => {
  const authenticationService = await useAuthenticationService()
  await authenticationService.logIn()
}
</script>

<template>
  <h1>Login</h1>
  <button @click="onLogin">Anmelden</button>
</template>

<style scoped lang="scss"></style>
