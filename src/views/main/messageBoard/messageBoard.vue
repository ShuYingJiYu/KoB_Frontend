<template>
  <div class="messageboard">
    <content-base></content-base>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentBase from '@/components/content-base'
export default defineComponent({
  name: 'messageBoard',
  components: {
    ContentBase
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
