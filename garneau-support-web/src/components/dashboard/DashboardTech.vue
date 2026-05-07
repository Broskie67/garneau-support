<script setup>
import { computed, ref, onMounted, onUnmounted} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import TicketTable from '@/components/tickets/TicketTable.vue'
import FilterBar from '../commun/FilterBar.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const errorMessage = ref('')
const successMessage = ref('')

const newTicketIds = ref([])
const newAssignationMessage = ref('')
let knownTicketIdsList = []
let knownTicketsList = []
let isFirstLoad = true
let refresh = null

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
const closedFilter = ref({
  search: '',
  status: '',
  category: '',
  assignedTo: ''
})

const getTickets = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getTechTickets(authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const refreshTicket = async () => {
  await getTickets()

  const currentTickets = filteredAssignedTickets.value || []
  const currentIds = currentTickets.map(ticket => ticket.id)

  if (isFirstLoad) {
    knownTicketIdsList = currentIds
    knownTicketsList = currentTickets
    isFirstLoad = false
    return
  }

  const newTicketsCreated = currentTickets.filter(ticket =>
    !knownTicketIdsList.includes(ticket.id) && ticket.assigned_to === null
  )

  const newAssignedTicket = currentTickets.filter(currentTicket => {
    const oldTicket = knownTicketsList.find(oldTicket =>
      oldTicket.id === currentTicket.id
    )

    return oldTicket &&
      oldTicket.assigned_to !== authStore.user.id &&
      currentTicket.assigned_to === authStore.user.id
  })

  if (newAssignedTicket.length > 0) {
    newTicketIds.value = newAssignedTicket.map(ticket => ticket.id)
    newAssignationMessage.value = 'Nouvelle assignation'
  }
  
  if (newTicketsCreated.length > 0) {
    newTicketIds.value = newTicketsCreated.map(ticket => ticket.id)

  }

  knownTicketIdsList = currentIds
  knownTicketsList = currentTickets
}

const selfAssignTicket = async (ticketId) => {
   if (!authStore.token) {
    return
  }

  try {
    await ticketStore.selfAssignTicket(ticketId, authStore.token)
    successMessage.value = 'l\'incident vous a été attribué avec succès'
    setTimeout(() => {
      successMessage.value = ''
    }, 4000)

  } catch (error) {
    errorMessage.value = error.message
  }
}

const updateActiveFilters = (newFilters) => {
  activeFilters.value = newFilters
}

const updateCloseFilters = (newFilters) => {
  closedFilter.value = newFilters
}

const getAssignedActiveTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket =>
    (ticket.assigned_to === authStore.user.id || ticket.assigned_to === null) && 
    ticket.status !== 'Fermé' && ticket.status !== 'Archivé'
  )
})

const filteredAssignedTickets = computed(() => {
  return getAssignedActiveTicket.value.filter(ticket => {
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
      activeFilters.value.assignedTo === 'assigned' && ticket.assigned_to === authStore.user.id ||
      activeFilters.value.assignedTo === 'unassigned' && ticket.assigned_to === null

    return matchSearch && matchStatus && matchCategory && matchAssignedTo
  })
})

const getAssignedClosedTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket => ticket.assigned_to === authStore.user.id && ticket.status === 'Fermé' )
})

const filteredAssignedClosedTicket = computed(() => {
  return getAssignedClosedTicket.value.filter(ticket => {
    const matchSearch = 
      !closedFilter.value.search || 
      ticket.title.toLowerCase().includes(closedFilter.value.search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(closedFilter.value.search.toLowerCase())

    const matchStatus =
      !closedFilter.value.status ||
      ticket.status === closedFilter.value.status

    const matchCategory =
      !closedFilter.value.category ||
      ticket.category === closedFilter.value.category

    const matchAssignedTo =
      !closedFilter.value.assignedTo ||
      closedFilter.value.assignedTo === 'assigned' && ticket.assigned_to === authStore.user.id ||
      closedFilter.value.assignedTo === 'unassigned' && ticket.assigned_to === null

    return matchSearch && matchStatus && matchCategory && matchAssignedTo
  })
})

onMounted(async() => {
  refreshTicket()

  refresh = setInterval(() => {
    refreshTicket()
  }, 10000)
})

onUnmounted(() => {
  clearInterval(refresh)
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
    <h3>Incidents actifs</h3>
    <FilterBar
      :status-options="activeFilterOptions.status"
      @filters-changed="updateActiveFilters"/>
    <TicketTable 
      :tickets="filteredAssignedTickets" 
      :isTechnician="true"
      :new-assignation-message = "newAssignationMessage"
      :new-ticket-ids="newTicketIds"
      @self-assign-ticket="selfAssignTicket" />
  </div>
   
  
  <div class="table-closed" >
    <h3>Incidents fermés</h3>

    <FilterBar 
      :status-options="closeFilterOptions.status"
      @filters-changed="updateCloseFilters"/>
    
    <TicketTable :tickets="filteredAssignedClosedTicket" 
      :isTechnician="true"/>
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