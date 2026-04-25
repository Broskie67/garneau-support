<script setup>

</script>

<template>
  <header>
    <div class="app-header">
      <h1 class="app-header-title">
        <router-link to="/">
          Garneau Support
        </router-link>
      </h1>

      <nav class="app-header-nav">
        <ul class="app-header-menu">
          <li><router-link to="/about">S'inscrire</router-link></li>
          <li><router-link to="/contact">Se connecter</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: var(--color-primary-dark);
    color: white;
  }

  .app-header a {
    color: white;
    text-decoration: none;
  }

  .app-header a:hover,
  .app-header a.route-link-active {
    color: var(--color-accent);
  }

  nav ul {
    list-style: none;
    padding: 0;
  }

  nav li {
    display: inline-block;
    margin-right: 20px;
  }
</style>