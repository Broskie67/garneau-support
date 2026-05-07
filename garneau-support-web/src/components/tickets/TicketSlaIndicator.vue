<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const currentTime = ref(new Date())
let slaInterval = null

const getHoursSinceCreation = (createdAt) => {
  return (currentTime.value - new Date(createdAt)) / (1000 * 60 * 60)
}

const getAssignmentDelay = (priority) => {
  if(priority === 'Critique') return 0.5
  if(priority === 'Haute') return 2
  if(priority === 'Moyenne') return 8
  if(priority === 'Basse') return 24
} 

const getResolutionDelay = (priority) => {
  if(priority === 'Critique') return 4
  if(priority === 'Haute') return 8
  if(priority === 'Moyenne') return 24
  if(priority === 'Basse') return 72
}

const assignmentSla = computed(() => {
  if(props.ticket.assigned_to !== null) {
    return {
      message: 'Prise en charge respectée',
      className: 'sla-ok'
    }
  }

  const hoursSinceCreation = getHoursSinceCreation(props.ticket.created_at)
  const maxHour = getAssignmentDelay(props.ticket.priority)

  if(hoursSinceCreation > maxHour) {
    return {
      className: 'sla-danger'
    }
  }

  return {
    className: 'sla-warning'
  }
})

const resolutionSla = computed(() => {
  if(props.ticket.status === 'Résolu' || props.ticket.status === 'Fermé'){
    return {
      className: 'sla-ok'
    }
  }

  const hoursSinceCreation = getHoursSinceCreation(props.ticket.created_at)
  const maxHour = getResolutionDelay(props.ticket.priority)

  if(hoursSinceCreation > maxHour) {
    return {
      className: 'sla-danger'
    }
  }

  if(props.ticket.assigned_to !== null) {
    return {
      className: 'sla-info'
    }
  }
  return {
    className: 'sla-warning'
  }
})

onMounted(() => {
 slaInterval = setInterval(() => {
  currentTime.value = new Date()
 }, 60000)
})

onUnmounted(() => {
  clearInterval(slaInterval)
})
</script>

<template>
  <div class="sla-indicator">
    <div class="sla-item" :class="assignmentSla.className">
      <span class="sla-symbol"></span>
    </div>
    <div class="sla-item" :class="resolutionSla.className">
      <span class="sla-symbol"></span>
    </div>
  </div>
</template>

<style scoped>
.sla-indicator {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sla-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
}

.sla-symbol {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.sla-ok {
  background-color: #dcfce7;
  color: #166534;
}

.sla-ok .sla-symbol {
  background-color: #22c55e;
}

.sla-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.sla-warning .sla-symbol {
  background-color: #f59e0b;
}

.sla-danger {
  background-color: #fee2e2;
  color: #991b1b;
}

.sla-danger .sla-symbol {
  background-color: #ef4444;
}

.sla-info {
  background-color: #dbeafe;
  color: #1e40af;
}

.sla-info .sla-symbol {
  background-color: #3b82f6;
}
</style>