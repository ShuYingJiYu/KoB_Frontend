<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/ROBOT_TXT.png" alt="logo" />
      <span v-if="!collapse" class="title">King Of Bot</span>
    </div>
    <el-menu
      v-for="item in routers"
      :key="item.meta.index"
      :default-active="item.meta.index"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="true"
      :collapse="collapse"
      @select="handleSelect"
    >
      <el-sub-menu index="1">
        <template #title>
          <div class="logo1">
            <img class="img" src="~@/assets/img/robot.png" alt="logo" />
            <span v-show="!collapse" class="title">KOB</span>
          </div>
        </template>
        <el-menu-item index="1-1">
          <span>贪吃蛇</span>
        </el-menu-item>
        <el-menu-item index="1-2" disabled>
          <span>敬请期待....</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="0">
        <el-icon><Menu /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><List /></el-icon>
        <span>对战列表</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><DataAnalysis /></el-icon>
        <span>排行榜</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><ChatDotRound /></el-icon>
        <span>讨论区</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><MessageBox /></el-icon>
        <span>留言板</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const activeIndex = ref('0')
    const router = useRouter()
    const handleSelect = (activeIndex: string) => {
      switch (activeIndex) {
        case '0':
          router.push({
            path: '/main/homePage'
          })
          break
        case '1-1':
          router.push({
            path: '/main/game/snake'
          })
          break
        case '2':
          router.push({
            path: '/main/record'
          })
          break
        case '3':
          router.push({
            path: '/main/rankList'
          })
          break
        case '4':
          router.push({
            path: '/main/discussion'
          })
          break
        case '5':
          router.push({
            path: '/main/messageBoard'
          })
          break
      }
    }
    const route = useRoute()
    const currentPath = route.path
    const routers = computed(() => {
      // 过滤掉没有meta的
      return router.currentRoute.value.matched.filter((item) => item.meta.title)
    })
    return {
      activeIndex,
      handleSelect,
      routers
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 30px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 6px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .logo1 {
    display: flex;
    margin-left: -10px;
    height: 25px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 20px;
      width: 23px;
      margin: 0 10px;
    }
    .title {
      font-size: 15px;
      font-weight: 700;
      color: white;
      margin-left: 5px;
    }
  }
  .el-menu {
    border-right: none;
    span {
      font-size: 15px;
    }
  }
  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu-item {
    margin-bottom: 15px;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
