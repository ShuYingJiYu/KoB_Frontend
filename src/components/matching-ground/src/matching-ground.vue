<template>
  <div class="matchground">
    <el-row :gutter="20" justify="center">
      <el-col :span="7">
        <div class="user-photo block">
          <el-avatar shape="circle" :size="200" fit="fill" :src="photo" />
        </div>
        <span class="title">{{ name }}</span>
      </el-col>
      <el-col :span="7">
        <div class="user-photo block">
          <el-avatar
            shape="circle"
            :size="200"
            fit="fill"
            :src="opponent_photo"
          />
        </div>
        <span class="title">{{ opponent_username }}</span>
      </el-col>
      <el-col :span="24">
        <el-select v-model="value" class="m-2" style="margin-left: -15px">
          <el-option label="亲自出马" value="-1" />
          <el-option
            v-for="item in bots"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="24">
        <div class="pk-button">
          <el-button
            class="btn"
            color="rgb(38,44,60)"
            round
            size="large"
            @click="handleGameClick"
            >{{ match_btn ? '开始匹配' : '取消' }}</el-button
          >
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { GetListBotRequest } from '@/service/bot/bot'

export default defineComponent({
  setup() {
    const store = useStore()
    const bots = ref<any[]>([])
    const name = computed(() => store.state.login.userInfo.username)
    const photo = computed(() => store.state.login.userInfo.photo)
    const opponent_username = computed(() => store.state.pk.opponent_username)
    const opponent_photo = computed(() => store.state.pk.opponent_photo)
    const match_btn = ref(true)
    const value = ref('-1')
    const handleGameClick = () => {
      if (match_btn.value) {
        match_btn.value = !match_btn.value
        store.state.pk.socket.send(
          JSON.stringify({
            event: 'start-matching',
            bot_id: value.value
          })
        )
      } else {
        match_btn.value = !match_btn.value
        store.state.pk.socket.send(JSON.stringify({ event: 'stop-matching' }))
      }
    }
    async function getBotList() {
      const botList = await GetListBotRequest('/user/bot/getlist')
      console.log(botList.data.botList)
      bots.value = botList.data.botList
    }
    getBotList()
    return {
      name,
      photo,
      opponent_photo,
      opponent_username,
      handleGameClick,
      match_btn,
      value,
      bots
    }
  }
})
</script>

<style scoped lang="less">
.matchground {
  background-color: rgba(50, 50, 50, 0.5);
  width: 100%;
  height: 70vh;
  margin: 40px auto;
  .user-photo {
    align-items: center;
    margin-top: 15vh;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #fffcf9;
    font-family: '宋体';
  }
}
.pk-button {
  padding-top: 10vh;
  .btn {
    width: 15%;
    height: 100%;
  }
}
</style>
