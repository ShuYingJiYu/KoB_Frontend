import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IPkState } from './types'
const pkModule: Module<IPkState, IRootState> = {
  namespaced: true,
  state() {
    return {
      status: 'matching',
      socket: null,
      opponent_username: '',
      opponent_photo: '',
      gamemap: null,
      a: {
        a_id: 0,
        a_sx: 0,
        a_sy: 0
      },
      b: {
        b_id: 0,
        b_sx: 0,
        b_sy: 0
      },
      gameObject: null,
      loser: 'none' //all A B
    }
  },
  mutations: {
    updateSocket(state, socket: any) {
      state.socket = socket
    },
    updateOpponent(state, opponent) {
      state.opponent_photo = opponent.photo
      state.opponent_username = opponent.username
    },
    updateStatus(state, status: string) {
      state.status = status
    },
    updateGamemap(state, game) {
      state.gamemap = game.map
      state.a.a_id = game.a_id
      state.a.a_sx = game.a_sx
      state.a.a_sy = game.a_sy
      state.b.b_id = game.b_id
      state.b.b_sx = game.b_sx
      state.b.b_sy = game.b_sy
    },
    updateGameObject(state, gameObject: any) {
      state.gameObject = gameObject
    },
    updateLoser(state, loser: string) {
      state.loser = loser
    }
  },
  getters: {},
  actions: {
    async updateAction({ commit }, payload: any) {
      console.log(payload)
      commit('updateOpponent', payload)
    },
    async updateSocketAction({ commit }, payload: any) {
      commit('updateSocket', payload)
    },
    async updateStatusAction({ commit }, payload: any) {
      commit('updateStatus', payload)
    },
    async updateGamemapAction({ commit }, payload: any) {
      commit('updateGamemap', payload)
    }
  }
}
export default pkModule
