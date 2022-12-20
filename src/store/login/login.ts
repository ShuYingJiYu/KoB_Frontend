import { Module } from 'vuex'
import { IloginState } from './types'
import { IRootState } from '../types'
import localCache from '@/utils/cache'
import { accountLoginRequest, userInfoRequest } from '../../service/login/login'
import router from '@/router'
const loginModule: Module<IloginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      is_login: false
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeLogin(state, is_login: boolean) {
      state.is_login = is_login
    }
  },
  actions: {
    async accountLoginAction({ commit }, playload: any) {
      //实现登录逻辑
      const loginResult = await accountLoginRequest(playload)
      const { token } = loginResult.data
      commit('changeToken', token)
      //对携带的token进行缓存
      localCache.setCache('token', token)
      const userInfoResult = await userInfoRequest()
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('is_login', true)
      commit('changeLogin', true)
      // const botListResult = await GetListBotRequest()
      // console.log(botListResult)
      // commit('changeBotList', botListResult)
      // localCache.setCache('botList', botListResult)

      //跳到首页
      router.push('/main/homepage')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const is_login = localCache.getCache('is_login')
      if (is_login === true) {
        commit('changeLogin', is_login)
      } else {
        commit('changeLogin', false)
      }
    },
    clearLoginstate({ commit }) {
      commit('changeToken', '')
      commit('changeUserInfo', {})
      commit('changeLogin', false)
      // commit('changeBotList', {})
    }
  }
}

export default loginModule
