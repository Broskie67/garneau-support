<script setup>
import { useAuthStore } from '@/stores/authStore'
import TicketClientActions from '@/components/actions/TicketClientActions.vue';
import TicketTechActions from '@/components/actions/TicketTechActions.vue';
import TicketAdminActions from '@/components/actions/TicketAdminActions.vue';
import TicketCommentSection from '@/components/tickets/comments/TicketCommentSection.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="detail-page">
    <div class="detail-column">
      <TicketClientActions v-if="authStore.user?.role === 'client'" />
      <TicketTechActions v-if="authStore.user?.role === 'technicien'" />
      <TicketAdminActions v-if="authStore.user?.role === 'admin'" /> 
    </div>
    <aside class="comment-column">
      <TicketCommentSection />
    </aside>
  </div>
</template>

<style scoped>
.detail-page {
  display: grid;
  grid-template-columns: 760px 420px;
  gap: 4rem;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 2rem 100px;
}

.detail-column,
.comment-column {
  width: 100%;
  min-width: 0;
}

.comment-column {
  position: sticky;
  top: 120px;
}

@media (max-width: 1100px) {
  .detail-page {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .comment-column {
    position: static;
    width: 100%;
  }
}
</style>
