<template>
  <div class="snake">
    <play-grounnd v-if="status === 'playing'"></play-grounnd>
    <matching-ground v-if="status === 'matching'"></matching-ground>
    <ResultBoard v-if="loser !== 'none'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import PlayGrounnd from '@/components/play-ground'
import MatchingGround from '@/components/matching-ground'
import { onMounted, onUnmounted } from 'vue'
import ResultBoard from '@/components/result-board'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    PlayGrounnd,
    MatchingGround,
    ResultBoard
  },
  name: 'snake',
  setup() {
    const store = useStore()
    const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.login.token}`
    store.commit('pk/updateLoser', 'none')
    const status = computed(() => store.state.pk.status)
    const loser = computed(() => store.state.pk.loser)
    console.log(store.state.pk)
    let socket: WebSocket | null = null
    const opponent = reactive({
      username: '我的对手',
      photo:
        'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'
    })
    store.dispatch('pk/updateAction', opponent)
    socket = new WebSocket(socketUrl)
    socket.onopen = () => {
      console.log('Connect!')
      store.dispatch('pk/updateSocketAction', socket)
      const game = store.state.pk.gameObject
      console.log(game)
    }
    socket.onmessage = (msg: any) => {
      const data = JSON.parse(msg.data)
      console.log(data)
      //matching success
      if (data.event === 'start-matching') {
        opponent.username = data.opponent_username
        opponent.photo = data.opponent_photo
        store.dispatch('pk/updateAction', opponent)
        ElMessage({
          showClose: true,
          message: '匹配成功,正在创建地图,即将进入游戏界面！',
          type: 'success'
        })
        setTimeout(() => {
          store.dispatch('pk/updateStatusAction', 'playing')
          ElMessage({
            showClose: true,
            message: '地图创建成功，请开始你的游戏！',
            type: 'success'
          })
        }, 1000)
        store.dispatch('pk/updateGamemapAction', data.game)
      } else if (data.event === 'move') {
        console.log(data)
        setTimeout(() => {
          const game = store.state.pk.gameObject
          console.log(game)
          const [snake0, snake1] = game.snakes
          snake0.set_direction(data.a_direction)
          snake1.set_direction(data.b_direction)
        }, 1200)
      } else if (data.event === 'result') {
        console.log(data)
        const game = store.state.pk.gameObject
        console.log(game)
        const [snake0, snake1] = game.snakes
        if (data.loser === 'all' || data.loser === 'A') {
          snake0.status = 'die'
        }
        if (data.loser === 'all' || data.loser === 'B') {
          snake1.status = 'die'
        }
        store.commit('pk/updateLoser', data.loser)
      }
    }
    socket.onclose = () => {
      console.log('disconnected!')
      const game = store.state.pk.gameObject
      console.log(game)
    }
    onUnmounted(() => {
      if (socket) {
        store.dispatch('pk/updateStatusAction', 'matching')
        socket.close()
      }
    })
    return {
      status,
      loser
    }
  }
})
</script>

<style scoped lang="less"></style>
