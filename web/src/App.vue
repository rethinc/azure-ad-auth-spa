<script setup></script>

<template>
  <h1>Home</h1>
  <h2>Menu</h2>
  <ul>
    <li><RouterLink to="/persons">Persons</RouterLink></li>
    <li><RouterLink to="/timeslots">Timeslots</RouterLink></li>
  </ul>
  <RouterView />
</template>

<style lang="scss">
@import 'assets/styles/global.scss';
</style>
