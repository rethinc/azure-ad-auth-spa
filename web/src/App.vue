<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Environment, loadEnvironment } from '@/Environment'
import InitializedApp from '@/InitializedApp.vue'

const environment = ref<Environment>()

onMounted(async () => {
  environment.value = await loadEnvironment()
})
</script>

<template>
  <InitializedApp v-if="environment" :environment="environment">
    <RouterView />
  </InitializedApp>
</template>

<style lang="scss">
@import 'assets/styles/global.scss';
</style>
