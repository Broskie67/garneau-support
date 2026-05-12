<script setup>
import { computed, ref, onMounted, onUnmounted} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import TicketTable from '@/components/tickets/TicketTable.vue'
import FilterBar from '../commun/FilterBar.vue'
import SlaTooltip from '../commun/SlaTooltip.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const errorMessage = ref('')
const successMessage = ref('')

const newAssignedTicketIds = ref(
  JSON.parse(localStorage.getItem('newAssignedTicketIds')) || []
)

const newCreatedTicketIds = ref(
  JSON.parse(localStorage.getItem('newCreatedTicketIds')) || []
)
const newAssignationMessage = ref('')
let knownTicketIdsList = []
let knownTicketsList = []
let isFirstLoad = true
let refresh = null

const saveNotifications = () => {
  localStorage.setItem('newAssignedTicketIds', JSON.stringify(newAssignedTicketIds.value))
  localStorage.setItem('newCreatedTicketIds', JSON.stringify(newCreatedTicketIds.value))
}

const removeNewAssignationNotification = (ticketId) => {
  newAssignedTicketIds.value = newAssignedTicketIds.value.filter(id => id !== ticketId)
  saveNotifications()
}

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
    newAssignedTicket.forEach(ticket => {
      if(!newAssignedTicketIds.value.includes(ticket.id)){
        newAssignedTicketIds.value.push(ticket.id)
      }
    })
    newAssignationMessage.value = 'Nouvelle assignation'
    saveNotifications()
  }
  
  if (newTicketsCreated.length > 0) {
    newTicketsCreated.forEach(ticket => {
      if(!newCreatedTicketIds.value.includes(ticket.id)){
        newCreatedTicketIds.value.push(ticket.id)
      }
    })
    newAssignationMessage.value = 'Nouvelle assignation'
    saveNotifications()
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

    newCreatedTicketIds.value = newCreatedTicketIds.value.filter(id => id !== ticketId)
    saveNotifications()
    successMessage.value = 'l\'incident vous a été attribué avec succès'
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
    <div class="flex-title-tooltip">
      <h3>Incidents actifs</h3>
      <SlaTooltip/>
    </div>
    <p v-if="newAssignationMessage" class="success-message">
      {{ newAssignationMessage }}
    </p>
    
    <FilterBar
      :status-options="activeFilterOptions.status"
      @filters-changed="updateActiveFilters"/>
    <TicketTable 
      :tickets="filteredAssignedTickets" 
      :isTechnician="true"
      :new-assigned-ticket-ids="newAssignedTicketIds"
      :new-created-ticket-ids="newCreatedTicketIds"
      @self-assign-ticket="selfAssignTicket"
      @view-detail="removeNewAssignationNotification" 
    />
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
    width: 1300px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  h3 {
    align-self: center;
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

  .flex-title-tooltip {
    display: flex;
    justify-content: space-between;
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