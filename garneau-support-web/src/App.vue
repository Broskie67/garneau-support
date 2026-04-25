<script setup>
  import { RouterView } from 'vue-router';
  import NavBar from './components/navBar.vue';
  import HomeView from './view/HomeView.vue';

</script>

<template>
  <body>
    <RouterView />
    <NavBar />
    <HomeView />

    <footer>
      <p> Nathan Milot, ASP 2026. All rights reserved.</p>
    </footer>
  </body>
</template>

<style scoped></style>
