<template>
  <div>
    <div class="main">
      <el-container class="main-content">
        <el-aside :width="isCollapse ? '60px' : '210px'">
          <nav-menu :collapse="isCollapse" />
        </el-aside>
        <el-container class="page">
          <el-header class="page-header">
            <nav-header @fold-change="handleFoldChange" /><!--接收事件-->
          </el-header>
          <el-main class="page-content">
            <router-view />
            <FooterMenu />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import FooterMenu from '@/components/footer-menu'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    FooterMenu
  },
  setup() {
    const isCollapse = ref(false) //处理事件
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      handleFoldChange,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.page-content {
  background-image: url(../../assets/img/background.jpeg);
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
}
</style>
