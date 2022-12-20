<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight" class="bread">
      <el-breadcrumb-item
        v-for="item in routers"
        :key="item.path"
        :to="{ path: item?.path }"
        style="color: aqua"
        class="breadcrumb"
      >
        {{ item?.meta?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const routers = computed(() => {
      // 过滤掉没有meta的
      console.log(
        router.currentRoute.value.matched.filter((item) => item.meta.title)
      )
      return router.currentRoute.value.matched.filter((item) => item.meta.title)
    })
    return {
      ArrowRight,
      routers
    }
  }
})
</script>

<style scoped lang="less">
.bread {
  align-content: center;
  .breadcrumb {
    color: rgb(12, 33, 53) !important;
    font-size: 15px;
    font-weight: 700;
  }
}
</style>
