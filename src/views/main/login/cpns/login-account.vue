<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password="false" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '../../../../utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAccount = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //判断是否记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
          //开始登录
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      loginAccount,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
