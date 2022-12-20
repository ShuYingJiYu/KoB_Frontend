<template>
  <AceEditor
    v-model:value="aceEditor.content"
    @update:value="aceEditor.content = $event"
    :theme="aceEditor.theme"
    :language="aceEditor.language"
  ></AceEditor>
</template>

<script>
import AceEditor from './cpn/ace-editor'
import { reactive, watch } from 'vue'

export default {
  name: 'WarlockHome',
  components: { AceEditor },
  setup() {
    const aceEditor = reactive({
      content: '',
      theme: 'monokai',
      language: 'javascript'
    })

    watch(
      () => aceEditor.content,
      (newContent) => {
        console.log(newContent)
      }
    )
    return {
      aceEditor
    }
  }
}
</script>

<style scoped>
.ace {
  position: relative !important;
  border: 1px solid lightgray;
  margin: auto;
  height: auto;
  width: 100%;
}
</style>
