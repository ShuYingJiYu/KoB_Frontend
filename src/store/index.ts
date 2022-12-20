import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import bot from './bot/bot'
import pk from './pk/pk'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    bot,
    pk
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
