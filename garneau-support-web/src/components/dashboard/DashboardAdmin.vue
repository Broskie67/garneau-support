<script setup>
import { computed, ref, onMounted, onUnmounted} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import TicketTable from '@/components/tickets/TicketTable.vue'
import FilterBar from '../commun/FilterBar.vue'
import SlaTooltip from '../tickets/SlaTooltip.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const errorMessage = ref('')
const successMessage = ref('')

const activeFilterOptions = {
  status: [
    'Ouvert',
    'Assigné',
    'En cours',
    'En attente',
    'Résolu'
  ]
}

const closeFilterOptions = {
  status: [
    'Fermé'
  ]
}

const activeFilters = ref({
  search: '',
  status: '',
  category: '',
  assignedTo: ''
})

const closedFilters = ref({
  search: '',
  status: '',
  category: '',
  assignedTo: ''
})

const getAllTickets = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getAllTickets(authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const updateActiveFilters = (newFilters) => {
  activeFilters.value = newFilters
}

const updateCloseFilters = (newFilters) => {
  closedFilters.value = newFilters
}

const getActiveTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket =>
    ticket.status !== 'Fermé' && ticket.status !== 'Archivé'
  )
})

const filteredActiveTickets = computed(() => {
  return getActiveTicket.value.filter(ticket => {
    const matchSearch = 
      !activeFilters.value.search ||
      ticket.title.toLowerCase().includes(activeFilters.value.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(activeFilters.value.search.toLowerCase())

    const matchStatus =
      !activeFilters.value.status ||
      ticket.status === activeFilters.value.status 

    const matchCategory =
      !activeFilters.value.category ||
      ticket.category === activeFilters.value.category

    const matchAssignedTo =
      !activeFilters.value.assignedTo ||
      activeFilters.value.assignedTo === 'assigned' && ticket.assigned_to !== null||
      activeFilters.value.assignedTo === 'unassigned' && ticket.assigned_to === null ||
      ticket.assigned_to === activeFilters.value.assignedTo

    return matchSearch && matchStatus && matchCategory && matchAssignedTo
  })
})

const getClosedTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket => ticket.status === 'Fermé' )
})

const filteredClosedTickets = computed(() => {
  return getClosedTicket.value.filter(ticket => {
    const matchSearch = 
      !closedFilters.value.search || 
      ticket.title.toLowerCase().includes(closedFilters.value.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(closedFilters.value.search.toLowerCase())

    const matchStatus =
      !closedFilters.value.status ||
      ticket.status === closedFilters.value.status

    const matchCategory =
      !closedFilters.value.category ||
      ticket.category === closedFilters.value.category

    const matchAssignedTo =
      !closedFilters.value.assignedTo ||
      closedFilters.value.assignedTo === 'assigned' && ticket.assigned_to !== null||
      closedFilters.value.assignedTo === 'unassigned' && ticket.assigned_to === null ||
      ticket.assigned_to === closedFilters.value.assignedTo

    return matchSearch && matchStatus && matchCategory && matchAssignedTo
  })
})

onMounted(() => {
  getAllTickets()
})

onUnmounted(() =>{

})
</script>

<template>
  <h2>Tableau de bord</h2>

  <p class="error-message">
    {{ errorMessage }}
  </p>

  <p v-if="successMessage" class="success-message">
    {{ successMessage }}
  </p>

  <div class="table-active">
    <div class="flex-title-tooltip">
      <h3>Incidents actifs</h3>
      <SlaTooltip/>
    </div>
    <FilterBar
      :status-options="activeFilterOptions.status"
      @filters-changed="updateActiveFilters"/>
    <TicketTable 
      :tickets="filteredActiveTickets" 
      :isAdmin="true"/>
  </div>
   
  
  <div class="table-closed" >
    <h3>Incidents fermés</h3>

    <FilterBar 
      :status-options="closeFilterOptions.status"
      @filters-changed="updateCloseFilters"/>
    
    <TicketTable :tickets="filteredClosedTickets" 
      :isAdmin="true"/>
  </div>

</template>

<style scoped>
  .table-active {
    margin-bottom: 3rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  h3 {
    align-self: center;
  }

  .flex-title-tooltip {
    display: flex;
    justify-content: space-between;
  }

  .table-closed {
    margin-top: 1rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .success-message {
    background-color: #DCFCE7;
    color: #166534;
    border: 1px solid #86EFAC;
    padding: 12px 16px;
    border-radius: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

</style>