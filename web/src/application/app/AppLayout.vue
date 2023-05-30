<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { injectAuthentication } from '@/application/app/authentication/Authentication.provider'

const userName = ref<string | undefined>()
const auth = injectAuthentication()

onMounted(async () => {
  userName.value = await auth.getUserName()
})
</script>

<template>
  <div v-if="userName">Logged in as {{ userName }}</div>
  <ul>
    <li><RouterLink to="/app/persons">Persons</RouterLink></li>
    <li><RouterLink to="/app/timeslots">Timeslots</RouterLink></li>
  </ul>
  <slot></slot>
</template>

<style scoped lang="scss"></style>
