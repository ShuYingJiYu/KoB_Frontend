<template>
  <div>
    <el-card shadow="always">
      <p>
        欲查规则？点击
        <el-link type="primary" href="#" class="card-link">游戏规则</el-link>
        进入游戏一览。
      </p>
      <p>
        参加比赛？点击
        <el-link type="primary" href="#" class="card-link">比赛</el-link>
        进入小组一览。
      </p>
      <p>
        提交程序？点击
        <el-link type="primary" href="#" class="card-link">程序</el-link>
        或顶栏按钮管理你的 Bot。
      </p>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
