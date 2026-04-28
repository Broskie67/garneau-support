<script setup>
import {useRouter} from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout();
  router.push({ name: 'signin'})
}

</script>

<template>
  <header>
    <div class="app-header">
      <h1 class="app-header-title">
        <router-link to="/">
          Garneau Support
        </router-link>
      </h1>
      <nav class="app-header-nav" v-if="authStore.isConnected">
        <ul class="app-header-menu" v-if="authStore.user.role === 'client'">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/">Tableau de bord</router-link></li>
          <li><router-link to="/">Créer un ticket</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><a href="#" class="btn-deconnction" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'technicien'">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/">Tableau de bord</router-link></li>
          <li><router-link to="/profile">Profil</router-link></li>
          <li><a href="#" class="btn-deconnction" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'admin'">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/admin/users">Liste des utilisateurs</router-link></li>
          <li><router-link to="/">Créer un technicien</router-link></li>
          <li><router-link to="/profile">Profil</router-link></li>
          <li><a href="#" class="btn-deconnction" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
      </nav>
      <nav class="app-header-nav" v-else>
        <ul class="app-header-menu">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/signin">Se connecter</router-link></li>
          <li><router-link to="/signup">S'inscrire</router-link></li>
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
    font-size: 17px;
    margin-right: 20px;
  }

  .btn-deconnexion{
    text-decoration: none;
  }
</style>