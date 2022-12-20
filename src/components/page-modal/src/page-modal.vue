<template>
  <div class="page-modal">
    <el-dialog
      :title="Object.keys(props.defaultInfo).length ? '编辑Bot' : '新建Bot'"
      v-model="dialogVisible"
      width="60%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <!-- <div>
        <VAceEditor
          v-model:value="codeDate"
          lang="c_cpp"
          theme="textmate"
          style="height: 300px"
        />
      </div> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { VAceEditor } from 'vue3-ace-editor'
import ace from 'ace-builds'
import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm,
    VAceEditor
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    ace.config.set(
      'basePath',
      'https://cdn.jsdelivr.net/npm/ace-builds@' +
        require('ace-builds').version +
        '/src-noconflict/'
    )
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const codeDate = ref('')
    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue)
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑

    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户')
        console.log(formData.value.title)
        store.dispatch('bot/editPageDataAction', {
          UpdateBotDetail: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        store.dispatch('bot/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
      props,
      codeDate
    }
  }
})
</script>

<style scoped></style>
