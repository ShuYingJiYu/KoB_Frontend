import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IBotState } from './types'
import {
  GetListBotRequest,
  RemoveBotRequest,
  AddBotRequest,
  UpdateBotRequest
} from '@/service/bot/bot'
import { ElMessage } from 'element-plus'
const botModule: Module<IBotState, IRootState> = {
  namespaced: true,
  state() {
    return {
      botList: [],
      botCount: 0
    }
  },
  mutations: {
    changeBotList(state, botList: any[]) {
      state.botList = botList
    },
    changeBotCount(state, botCount: number) {
      state.botCount = botCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'bot':
            return state.botList
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/user/${pageName}/getlist`
      // switch (pageName) {
      //   case 'bot':
      //     const pageUrl = '/user/bot/getlist'
      //     break
      // }
      // 2.对页面发送请求
      const pageResult = await GetListBotRequest(pageUrl)
      console.log(pageResult)
      // 3.将数据存储到state中
      const { botList, botCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, botList)
      commit(`change${changePageName}Count`, botCount)
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      console.log(payload.id)
      await RemoveBotRequest(payload)
      dispatch('getPageListAction', {
        pageName: 'bot'
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // await UpdateBotRequest(payload.UpdateBotDetail)
      console.log(payload)
      const updateInfo = Object.assign(payload.UpdateBotDetail, {
        bot_id: payload.id
      })
      console.log(updateInfo)
      const result = await UpdateBotRequest(updateInfo)
      if (result.success === 'Bot修改成功！') {
        ElMessage({
          showClose: true,
          message: 'Bot修改成功',
          type: 'success'
        })
      }
      dispatch('getPageListAction', {
        pageName: 'bot'
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      console.log(payload.newData)
      const result = await AddBotRequest(payload.newData)
      if (result?.error_message === '代码不能为空') {
        ElMessage({
          showClose: true,
          message: '代码不能为空',
          type: 'error'
        })
      } else if (result.success === 'bot创建成功') {
        ElMessage({
          showClose: true,
          message: 'bot创建成功',
          type: 'success'
        })
      }
      dispatch('getPageListAction', {
        pageName: 'bot'
      })
    },
    clearBot({ commit }) {
      commit('changeBotList', [])
      commit('changeBotCount', 0)
    }
  }
}
export default botModule
