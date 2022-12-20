<template>
  <div class="playground">
    <game-map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameMap from '@/components/game-map'
export default defineComponent({
  components: {
    GameMap
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
div.playground {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
}
</style>
