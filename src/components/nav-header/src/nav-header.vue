<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Fold v-show="isFold === false" />
      <Expand v-show="isFold === true" />
    </el-icon>
    <div class="content">
      <div><bread-crumb></bread-crumb></div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import BreadCrumb from '../../../components/bread-crumb'
export default defineComponent({
  components: {
    UserInfo,
    BreadCrumb
  },
  emits: ['foldChange'], //第一步传递事件
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      handleFoldClick,
      isFold
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
