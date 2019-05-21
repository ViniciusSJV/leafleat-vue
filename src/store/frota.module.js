import FrotaService from '@/common/FrotaService'

const initialState = {
  frota: {},
  loadingFrota: false,
  idFrotaSelected: 0
}

export const state = Object.assign({}, initialState)

const getters = {
  frota (state) {
    return state.frota
  },
  loadingFrota (state) {
    return state.loadingFrota
  },
  idFrotaSelected (state) {
    return state.idFrotaSelected
  }
}

const actions = {
  GET_FROTA_BY_ID_CD (context, id) {
    context.commit('UPDATE_LOADING_FROTA')
    return FrotaService.getFrotaCd(id)
      .then(({ data }) => {
        context.commit('SET_FROTA_CD', data.frota)
        context.commit('UPDATE_LOADING_FROTA')
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  SET_FROTA_SELECTED (context, idFrota) {
    context.commit('SET_FROTA_SELECTED', idFrota)
  },
  RESET_FROTA_SELECTED (context) {
    context.commit('RESET_FROTA_SELECTED')
  }
}

const mutations = {
  SET_FROTA_CD (state, frota) {
    state.frota = frota
  },
  UPDATE_LOADING_FROTA (state) {
    state.loadingFrota = !state.loadingFrota
  },
  SET_FROTA_SELECTED (state, idFrota) {
    state.idFrotaSelected = idFrota
  },
  RESET_FROTA_SELECTED (state) {
    state.idFrotaSelected = 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
