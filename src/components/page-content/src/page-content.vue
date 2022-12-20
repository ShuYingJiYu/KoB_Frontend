<template>
  <div class="page-content">
    <HyTable :listData="dataList" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick" size="medium"
          >新建Bot</el-button
        >
        <el-button @click="getPageData"
          ><el-icon><Refresh /></el-icon
        ></el-button>
      </template>
      <template #status>
        <el-button plain size="small" type="success">{{ '查看' }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ scope.row.updateAt }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button size="mini" type="text" @click="handleEditClick(scope.row)"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-popconfirm
            title="你确定要删除这个Bot?"
            confirm-button-text="删除"
            confirm-button-type="danger"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#fb5430"
            @confirm="handleDeleteClick(scope.row)"
            ><template #reference>
              <el-button size="mini" type="text"
                ><el-icon><Delete /></el-icon>删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    const getPageData = () => {
      store.dispatch('bot/getPageListAction', {
        pageName: props.pageName
      })
    }

    getPageData()
    const dataList = computed(() =>
      store.getters[`bot/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)
    const handleDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch('bot/deletePageDataAction', {
        bot_id: item.id
      })
      ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      handleDeleteClick,
      getPageData,
      handleNewClick,
      handleEditClick,
      InfoFilled
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
