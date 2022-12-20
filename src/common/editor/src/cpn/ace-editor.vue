<template>
  <div ref="aceEditor" class="ace-editor"></div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/ext-language_tools'
// js语法检查 worker
ace.config.setModuleUrl(
  'ace/mode/javascript_worker',
  require('file-loader?esModule=false!ace-builds/src-noconflict/worker-javascript.js')
)
// theme
ace.config.setModuleUrl(
  'ace/theme/monokai',
  require('file-loader?esModule=false!ace-builds/src-noconflict/theme-monokai.js')
)
ace.config.setModuleUrl(
  'ace/ext/language_tools',
  require('file-loader?esModule=false!ace-builds/src-noconflict/ext-language_tools.js')
)
// 代码片段
ace.config.setModuleUrl(
  'ace/snippets/javascript',
  require('file-loader?esModule=false!ace-builds/src-noconflict/snippets/javascript.js')
)
// json语法检查
ace.config.setModuleUrl(
  'ace/mode/json_worker',
  require('file-loader?esModule=false!ace-builds/src-noconflict/worker-json.js')
)

import { watch, ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'AceEditor',
  emits: ['update:value'],
  props: {
    value: {
      type: String,
      default: '',
      required: true
    },
    // 编辑器主题色
    theme: {
      type: String,
      default: 'monokai'
    },
    // 外部传入的语法类型
    language: {
      type: String,
      default: 'javascript'
    }
  },
  setup(props, { emit }) {
    let aceInstance = null
    const aceEditor = ref(null)
    const initEditor = () => {
      if (aceInstance) {
        //实例销毁
        aceInstance.destroy()
      }
      aceInstance = ace.edit(aceEditor.value, {
        maxLines: 1000, // 最大行数，超过会自动出现滚动条
        minLines: 22, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 14, // 编辑器内字体大小
        theme: 'ace/theme/' + (props.theme ? props.theme : 'monokai'), // 默认设置的主题
        mode: 'ace/mode/' + (props.language ? props.language : 'javascript'), // 默认设置的语言模式
        tabSize: 4, // 制表符设置为 4 个空格大小
        readOnly: false, //只读
        highlightActiveLine: true,
        value: props.value
      })
      ace.require('ace-builds/src-noconflict/ext-language_tools')
      aceInstance.setOptions({
        enableBasicAutocompletion: true, //
        enableSnippets: true,
        enableLiveAutocompletion: true //输入内容时，弹出补全提示框,
      })
      aceInstance.on('change', () => {
        if (emit) {
          emit('update:value', aceInstance.getValue())
        }
      })
      aceInstance.setShowPrintMargin(false) //分隔线，提示换行的
    }

    watch(
      () => props.value,
      (newProps) => {
        const position = aceInstance.getCursorPosition()
        aceInstance.getSession().setValue(newProps)
        aceInstance.clearSelection()
        aceInstance.moveCursorToPosition(position)
      }
    )
    onMounted(() => {
      initEditor()
    })
    onBeforeUnmount(() => {
      aceInstance.destroy()
    })

    return {
      aceEditor
    }
  }
}
</script>

<style scoped></style>
