<script setup>
  import { ref, onMounted } from 'vue'
  import { useAdminStore } from '@/stores/adminStore'
  import { useAuthStore } from '@/stores/authStore'

  const adminStore = useAdminStore()
  const authStore = useAuthStore()

  const errorMessage = ref('')

  const getUsers = async () => {
    if(authStore.token === null){
      return
    }

    try {
      await adminStore.getUsers(authStore.token)
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  const updateStatus = async (userId) => {
    try {
      await adminStore.changeUserStatus(userId, authStore.token)
    } catch (error) {
      errorMessage.value = error.message
    }
  }
  

  onMounted(() =>{
    getUsers()
  })

</script>

<template>
  <div class="user-list-page">
    <div class="user-list-card">
      <h2>Liste des utilisateurs</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom de famille</th>
            <th>Courriel</th>
            <th>Rôle</th>
            <th>Status</th>
            <th>Action</th>
          </tr>  
        </thead>
        <tbody >
          <tr v-for="user in adminStore.usersList" :key="user.id">
            <td>{{user.first_name}}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.is_active ? 'Actif' : 'Désactivé' }}</td>
            <td>
              <button :class="user.is_active ? 'btn-deactivate' : 'btn-activate'" @click="updateStatus(user.id)">
                {{ user.is_active ? 'Désactiver' : 'Activer' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  .user-list-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 80px;
  }
  .user-list-card {
    background: #ffffff;
    width: 800px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .btn-activate{
    padding: 6px 12px;
    border: 1px solid var(--button-secondary-border);
    border-radius: 6px;
    background-color: var(--color-success);
    color: var(--button-secondary-text);
    cursor: pointer;
  }

  .btn-deactivate {
    padding: 6px 12px;
    border: 1px solid var(--button-secondary-border);
    border-radius: 6px;
    background-color: var(--color-danger);
    color: var(--button-secondary-text);
    cursor: pointer;
  }


  .table-btn:hover {
    
    color: var(--button-primary-hover-text);
  }
</style>