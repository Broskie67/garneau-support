<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useAdminStore } from '@/stores/adminStore';

const authStore = useAuthStore()
const adminStore = useAdminStore()

defineProps({
  statusOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filters-changed'])

const filters = ref({
  search: '',
  status: '',
  category: '',
  priority: '',
  assignedTo: ''
})

const resetFilters = () => {
  filters.value = {
    search: '',
    status: '',
    category: '',
    assignedTo: ''
  }

  emit('filters-changed', filters.value)
}

watch(filters, () => {
  emit('filters-changed', filters.value)
}, { deep: true })

onMounted(async () => {
  await adminStore.getUsers(authStore.token)
})
</script>

<template>
  <div class="filter-bar">
    <input 
      v-model="filters.search"
      class="filter-input" 
      type="text"
      placeholder="Rechercher un incident"
    >
    <select v-model="filters.status" class="filter-select">
      <option value="">Tous les statuts</option>
      <option 
        v-for="status in statusOptions" 
        :key="status" 
        :value="status"
      >
        {{ status }}
      </option>
    </select>

    <select v-model="filters.category" class="filter-select">
      <option value="">Toutes les catégories</option>
      <option value="Matériel">Matériel</option>
      <option value="Logiciel">Logiciel</option>
      <option value="Réseau">Réseau</option>
      <option value="Accès et comptes">Accès et comptes</option>
      <option value=" Courriel"> Courriel</option>
      <option value="Impression">Impression</option>
      <option value="Sécurité">Sécurité</option>
      <option value="Téléphonie">Téléphonie</option>
      <option value="Autre">Autre</option>
    </select>


    <select v-model="filters.assignedTo" class="filter-select" v-if="authStore.user.role === 'technicien' ">
      <option value="">Assigné à</option>
      <option value="unassigned">Non assigné</option>
      <option value="assigned">{{ authStore.user.first_name }}</option>
    </select>
    <select v-model="filters.assignedTo" class="filter-select" v-if="authStore.user.role === 'admin' ">
      <option value="">Assigné à</option>
      <option value="unassigned">Non assigné</option>
      <option 
        v-for="user in adminStore.usersList.filter(user => user.role === 'technicien')"
        :key="user.id" 
        :value="user.id">
        {{ user.first_name }}
      </option>
    </select>


    <button @click="resetFilters" class="filter-reset">
      Réinitialiser
    </button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 18px;
  background: #F8FAFC;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 14px;
}

.filter-input,
.filter-select {
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #0F172A;
  font-size: 0.95rem;
}

.filter-input {
  min-width: 280px;
  flex: 1;
}

.filter-select {
  min-width: 150px;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent);
}

.filter-reset {
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #334155;
  cursor: pointer;
  font-weight: 600;
}

.filter-reset:hover {
  background: #F1F5F9;
}</style>