<script setup lang="ts"></script>

<template>
  <h1>Home</h1>
  <h2>Menu</h2>
  <ul>
    <li><RouterLink to="/persons">Persons</RouterLink></li>
  </ul>
</template>

<style scoped lang="scss">
@import '../../assets/styles/colors';

p {
  color: $primary;
}
</style>
