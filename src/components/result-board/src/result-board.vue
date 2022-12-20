<template>
  <div class="result-board">
    <span class="title" v-if="loser === 'all'">Draw</span>
    <span class="title" v-else-if="loser === 'A' && parseInt(id) === a_id"
      >Lose</span
    >
    <span class="title" v-else-if="loser === 'B' && parseInt(id) === b_id"
      >Lose</span
    >
    <span class="title" v-else>Win!</span>
    <el-col :span="24" class>
      <el-button
        class="btn"
        color="rgb(38,44,60)"
        round
        size="large"
        @click="restartClick"
      >
        重新匹配
      </el-button>
    </el-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const loser = computed(() => store.state.pk.loser)
    const id = computed(() => store.state.login.userInfo.id)
    const a_id = computed(() => store.state.pk.a.a_id)
    const b_id = computed(() => store.state.pk.b.b_id)
    const restartClick = () => {
      store.dispatch('pk/updateStatusAction', 'matching')
      store.commit('pk/updateLoser', 'none')
      const opponent = reactive({
        username: '我的对手',
        photo:
          'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'
      })
      store.dispatch('pk/updateAction', opponent)
    }
    return {
      loser,
      a_id,
      id,
      b_id,
      restartClick
    }
  }
})
</script>

<style scoped lang="less">
.result-board {
  height: 30vh;
  width: 65vh;
  background-color: rgba(50, 50, 50, 0.5);
  position: absolute;
  top: 25vh;
  left: 60vh;
  .title {
    font-family: '微软雅黑';
    font-size: 60px;
    font-weight: 600;
    text-align: center;
    font-style: italic;
    color: aliceblue;
  }
  .btn {
    margin-top: 12vh;
    text-align: center;
  }
}
</style>
