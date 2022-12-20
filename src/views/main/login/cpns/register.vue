<template>
  <div class="register">
    <el-form label-width="80px" :model="URegisterUser" :rules="registerRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="URegisterUser.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <div class="get-code">
          <el-input
            v-model="URegisterUser.password"
            show-password="false"
            placeholder="请输入密码"
          />
        </div>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmedPassword">
        <div class="get-confirmcode">
          <el-input
            v-model="URegisterUser.confirmedPassword"
            show-password="false"
            placeholder="请再次输入密码"
          />
        </div>
      </el-form-item>
      <el-radio
        v-model="form.radio"
        label="1"
        size="large"
        @click.prevent="radioChange(form.radio)"
        @click="handleRadioClick"
        >同意用户手册</el-radio
      >
    </el-form>
    <el-button
      :disabled="disable.disabled"
      type="primary"
      class="login-button"
      @click="handleRegisterClick"
      >立即注册</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ref } from 'vue'
import { accountRegisterRequest } from '@/service/register/register'
import router from '@/router'
import { ElMessage } from 'element-plus'
export default defineComponent({
  props: {
    registerUser: {
      type: Object,
      required: true
    },
    registerRules: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    'update:registerUser'(playload: Object) {
      return playload !== undefined
    },
    'update:registerRules'(playload: Object) {
      return playload !== undefined
    },
    'update-show'(playload: boolean) {
      return playload !== undefined
    }
  },
  setup(props: any, context: any) {
    const disable = reactive({
      disabled: true
    })
    const radioState = reactive({
      form: {
        radio: '0'
      },
      radioChange(value: any) {
        if (value === '1') {
          radioState.form.radio = '0'
          return
        }
        radioState.form.radio = '1'
      }
    })
    const URegisterUser: any = computed({
      get: () => props.registerUser,
      set: (val) => {
        context.emit('update:registerUser', val)
      }
    })
    const URegisterRules = computed({
      get: () => props.registerUser,
      set: (val) => {
        context.emit('update:registerRules', val)
      }
    })
    const handleRadioClick = () => {
      if (radioState.form.radio === '1') {
        disable.disabled = false
      } else {
        disable.disabled = true
      }
    }
    const isShow = ref(true)
    const handleRegisterClick = async () => {
      const registerResult = await accountRegisterRequest(URegisterUser.value)
      if (registerResult.error_message === 'success') {
        isShow.value = false
        ElMessage({
          showClose: true,
          message: '注册成功，请使用此账号点击用户登录页面进行登录',
          type: 'success'
        })
        context.emit('update-show', isShow.value)
        router.push('/main/login')
      } else if (registerResult.error_message === '用户名已存在') {
        ElMessage({
          showClose: true,
          message: '用户名已存在',
          type: 'error'
        })
        URegisterUser.value = {}
      }
    }
    return {
      URegisterUser,
      URegisterRules,
      disable,
      ...toRefs(radioState),
      handleRadioClick,
      handleRegisterClick
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.get-confirmcode {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>
