<script setup>
import { useCommentStore } from '@/stores/commentStore';
import { useAuthStore } from '@/stores/authStore';
import TicketCommentItem from './TicketCommentItem.vue';

const commentStore = useCommentStore()
const authStore = useAuthStore()

const filterComment = () => {
  if (authStore.user?.role === 'client') {
    return commentStore.commentList.filter(comment => comment.type === 'Public')
  }

  return commentStore.commentList
}
</script>

<template>
  <div>
    <p v-if="commentStore.commentList.length === 0">
      Aucun commentaire pour cet incident.
    </p>

    <div
      v-for="comment in filterComment()" 
      :key="comment.id"
      class="comment-item"
    >
      <TicketCommentItem :comment="comment" />
    </div>
  </div>
</template>

<style scoped>

</style>