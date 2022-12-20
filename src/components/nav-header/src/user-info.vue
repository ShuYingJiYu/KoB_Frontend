<template>
  <div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar size="small" :src="is_login ? photo : baseimg" />
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-item v-if="is_login" command="a">
            <el-icon><User /></el-icon>我的Bot
          </el-dropdown-item>
          <el-dropdown-item v-if="!is_login" divided command="b">
            <el-icon><Postcard /></el-icon>登录/注册
          </el-dropdown-item>
          <el-dropdown-menu>
            <el-dropdown-item v-if="is_login" divided command="c">
              <el-icon><CircleClose /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const baseimg =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.username)
    const photo = computed(() => store.state.login.userInfo.photo)
    const is_login = computed(() => store.state.login.is_login)
    const handleCommand = (command: string | number | object) => {
      switch (command) {
        case 'a':
          router.push({
            path: '/main/botinfo'
          })
          break
        case 'b':
          router.push({
            path: '/main/login'
          })
          break
        case 'c':
          localCache.clearCache()
          store.dispatch('login/clearLoginstate')
          store.dispatch('bot/clearBot')
          router.push('/')
          break
      }
    }
    return {
      name,
      photo,
      handleCommand,
      is_login,
      baseimg
    }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
  }
}
</style>
