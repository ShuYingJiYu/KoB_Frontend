<template>
  <div class="messageboard">
    <content-base>
      <el-row :gutter="12">
        <el-col :xs="24" :sm="18">
          <el-alert
            title="欢迎来到 KOB "
            type="success"
            description="你可以创建游戏桌来进行对局。"
            center
          />
          <home-picture />
          <home-message />
        </el-col>
        <el-col :xs="24" :sm="6">
          <home-notice />
        </el-col>
      </el-row>
    </content-base>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentBase from '@/components/content-base'
import HomeMessage from '@/common/home/home-message'
import HomePicture from '@/common/home/home-picture'
import HomeNotice from '@/common/home/home-notice'
export default defineComponent({
  name: 'messageBoard',
  components: {
    ContentBase,
    HomeMessage,
    HomePicture,
    HomeNotice
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
