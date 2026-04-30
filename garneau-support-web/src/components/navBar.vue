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
          <li><router-link to="/dashboard">Tableau de bord</router-link></li>
          <li><router-link to="/">Créer un ticket</router-link></li>
          <li>
            <router-link to="/profile" class="profile-link">
              <span class="profile-greeting">Bonjour {{ authStore.user.first_name }}!</span>
              <span class="profile-label">Votre profil</span>
            </router-link>
          </li>
          <li><a href="#" class="btn-deconnction" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'technicien'">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/dashboard">Tableau de bord</router-link></li>
          <li><router-link to="/profile"><span>Bonjour {{ authStore.user.first_name }}!</span> </router-link></li>
          <li><a href="#" class="btn-deconnction" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'admin'">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/admin/users">Liste des utilisateurs</router-link></li>
          <li><router-link to="/admin/technicians/create">Créer un technicien</router-link></li>
          <li><router-link to="/profile">Profil</router-link></li>
          <li><a href="#" class="btn-deconnection" @click.prevent="logout">Se déconnecter</a></li>
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

  .profile-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    color: white;
    padding: 8px, 14px;
    border-radius: 10px;
  }

  .btn-deconnexion{
    text-decoration: none;
  }

  @media (max-width: 960px) {
    .app-header {
      flex-direction: column;
      align-items: flex-start;
      gap:16px;
    }
    .app-header-menu {
      display: flex;
      flex-wrap: wrap;
      gap: 10px, 18px;
    }
  }

  @media (max-width: 576px) {
  .app-header {
    align-items: center;
    text-align: center;
  }

  .app-header-title {
    font-size: 1.6rem;
  }

  .app-header-menu {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  nav li {
    display: block;
    font-size: 16px;
  }
}
</style>