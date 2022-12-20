<template>
  <div class="login-panel">
    <h1 class="title">King of Bot</h1>
    <el-tabs v-model="currentTab" type="border-card" stretch>
      <el-tab-pane name="account">
        <!--插槽-->
        <template #label>
          <span>
            <el-icon> <User /></el-icon>
            账号登录
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
        <div class="account-control">
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>
        <el-button type="primary" class="login-button" @click="handleLoginClick"
          >立即登录</el-button
        >
      </el-tab-pane>
      <el-tab-pane v-if="is_show" name="phone">
        <template #label>
          <span>
            <el-icon> <Iphone /></el-icon>账号注册
          </span>
        </template>
        <register
          ref="phoneRef"
          :registerRules="registerRules"
          :registerUser="registerUser"
          @update-show="updateShow"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import Register from './register.vue'
import {
  registerUser,
  registerRules
} from '../../../../utils/registerValidator'
export default defineComponent({
  components: {
    LoginAccount,
    Register
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const currentTab = ref<string>('account')
    const is_show = ref(true)
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAccount(isKeepPassword.value)
      } else {
        console.log('acction')
      }
    }
    const updateShow = (isShow: boolean) => {
      is_show.value = isShow
    }
    return {
      accountRef,
      isKeepPassword,
      currentTab,
      handleLoginClick,
      registerUser,
      registerRules,
      updateShow,
      is_show
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
