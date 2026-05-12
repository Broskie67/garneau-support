<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getAssignementSlaClass, getResolutionSlaClass } from '@/utils/slaUtils'
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const currentTime = ref(new Date())
let slaInterval = null

const assignmentSla = computed(() => {
  return getAssignementSlaClass(props.ticket, currentTime.value)
})

const resolutionSla = computed(() => {
  return getResolutionSlaClass(props.ticket, currentTime.value)
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
    <div class="sla-item" :class="assignmentSla">
      <span class="sla-symbol"></span>
    </div>
    <div class="sla-item" :class="resolutionSla">
      <span class="sla-symbol"></span>
    </div>
  </div>
</template>

<style scoped>
.sla-indicator {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
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

@media screen and (max-width: 768px) {
  .sla-indicator {
    align-items: flex-start;
  }

  .sla-item {
    padding: 4px 8px;
    font-size: 0.72rem;
  }

  .sla-symbol {
    width: 7px;
    height: 7px;
  }
}
</style>