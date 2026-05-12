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
          <li><router-link to="/dashboard">Tableau de bord</router-link></li>
          <li><router-link to="/tickets/create">Créer un ticket</router-link></li>
          <li>
            <router-link to="/profile" class="profile-link">
              <span class="profile-greeting">Bonjour {{ authStore.user.first_name }}!</span>
              <span class="profile-label">Votre profil</span>
            </router-link>
          </li>
          <li><a href="#" class="btn-deconnection" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'technicien'">
          <li><router-link to="/dashboard">Tableau de bord</router-link></li>
          <li><router-link to="/profile" class="profile-link">
              <span class="profile-greeting">Bonjour {{ authStore.user.first_name }}!</span>
              <span class="profile-label">Votre profil</span>
            </router-link>
          </li>
          <li><a href="#" class="btn-deconnection" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
        <ul class="app-header-menu" v-if="authStore.user.role === 'admin'">
          <li><router-link to="/dashboard">Tableau de bord</router-link></li>
          <li><router-link to="/admin/users">Liste des utilisateurs</router-link></li>
          <li><router-link to="/admin/technicians/create">Créer un technicien</router-link></li>
          <li><router-link to="/profile">Profil</router-link></li>
          <li><a href="#" class="btn-deconnection" @click.prevent="logout">Se déconnecter</a></li>
        </ul>
      </nav>
      <nav class="app-header-nav" v-else>
        <ul class="app-header-menu">
          <li><router-link to="/signin">Se connecter</router-link></li>
          <li><router-link to="/signup">S'inscrire</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    width: 100%;
    background-color: var(--color-primary-dark);
  }

  .app-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 16px;
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
    margin: 0;
  }

  .app-header-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  nav li {
    font-size: 17px;
  }

  .profile-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    color: white;
    padding: 8px 14px;
    border-radius: 10px;
    text-align: center;
  }

  .btn-deconnection{
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
  .app-header {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .app-header-menu {
    flex-direction: column;
    gap: 12px;
  }
}
 
</style>