<template>
  <div class="botInfo">
    <el-col>
      <el-row :gutter="10">
        <el-col :xs="4" :sm="3">
          <el-card class="box-card">
            <el-avatar
              shape="square"
              :size="100"
              fit="fill"
              :src="photo"
            ></el-avatar>
          </el-card>
          <div class="avatar-btn">
            <el-button type="primary" round>修改头像</el-button>
          </div>
        </el-col>
        <el-col :xs="12" :sm="20">
          <content-base>
            <PageContent
              :contentTableConfig="contentTableConfig"
              pageName="bot"
              @new-btn-click="handleNewData"
              @edit-btn-click="handleEditData"
            ></PageContent>
          </content-base>
          <page-modal
            :defaultInfo="defaultInfo"
            ref="pageModalRef"
            pageName="bot"
            :modalConfig="modalConfig"
          ></page-modal>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import HyTable from '@/base-ui/table'
import PageModal from '@/components/page-modal'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content-config'
import { useStore } from '@/store'
import ContentBase from '@/components/content-base'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'botInfo',
  components: {
    HyTable,
    ContentBase,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const photo = computed(() => store.state.login.userInfo.photo)
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      photo,
      contentTableConfig,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped>
.avatar-btn {
  padding: 10px;
}
</style>
