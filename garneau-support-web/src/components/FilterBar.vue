<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()

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
      <option value="Ouvert">Ouvert</option>
      <option value="Assigné">Assigné</option>
      <option value="En cours">En cours</option>
      <option value="En attente">En attente</option>
      <option value="Résolu">Résolu</option>
      <option value="Fermé">Fermé</option>
      <option value="Archivé">Archivé</option>
    </select>

    <select v-model="filters.category" class="filter-select">
      <option value="">Toutes les catégories</option>
      <option value="hardware">Matériel</option>
      <option value="software">Logiciel</option>
      <option value="network">Réseau</option>
      <option value="account">Compte</option>
      <option value="other">Autre</option>
    </select>

    <select v-model="filters.assignedTo" class="filter-select">
      <option value="">Assigné à</option>
      <option value="">Non assigné</option>
      <option value="">{{ authStore.user.first_name }}</option>
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