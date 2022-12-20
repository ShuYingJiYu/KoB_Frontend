import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'normalize.css'
import './assets/css/index.less'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  config: {
    toc: {
      includeLevel: [10, 4]
    }
  }
})
VMdPreview.use(githubTheme, {
  Hljs: hljs
})
const app = createApp(App)
setupStore()
app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(VueMarkdownEditor)
app.use(VMdPreview)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
