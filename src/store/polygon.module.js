import PolygonService from '@/common/PolygonService'

const initialState = {
  regioes: [],
  zonasDeRestricao: []
}

export const state = Object.assign({}, initialState)

const getters = {
  regioes (state) {
    return state.regioes
  },
  zonasDeRestricao (state) {
    return state.zonasDeRestricao
  }
}

const actions = {
  GET_REGIOES (context) {
    return PolygonService.geRegioes()
      .then(({ data }) => {
        context.commit('SET_REGIOES', data.regioes)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  GET_ZONA_RESTRICAO (context) {
    return PolygonService.geZonasRestricao()
      .then(({ data }) => {
        context.commit('SET_ZONA_RESTRICAO', data.zonaRestricao)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  CREATE_REGIOES (context, latLongs) {
    return PolygonService.createRegiao(latLongs)
      .then(({ data }) => {
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  CREATE_ZONA_RESTRICAO (context, latLongs) {
    return PolygonService.createZonaRestricao(latLongs)
      .then(({ data }) => {
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  CLEAN_ZONA_RESTRICAO (context) {
    context.commit('CLEAN_ZONA_RESTRICAO')
  },
  CLEAN_REGIOES (context) {
    context.commit('CLEAN_REGIOES')
  },
  EDIT_ZONA_RESTRICAO (context, obj) {
    return PolygonService.updateZonaRestricao(obj.id, obj.latLong)
      .then(({ data }) => {
        context.commit('UPDATE_ZONA_RESTRICAO', obj)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  EDIT_REGIAO (context, obj) {
    return PolygonService.updateRegiao(obj.id, obj.latLong)
      .then(({ data }) => {
        context.commit('UPDATE_REGIAO', obj)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  }
}

const mutations = {
  SET_REGIOES (state, regioes) {
    state.regioes = regioes
  },
  SET_ZONA_RESTRICAO (state, zonaRestricao) {
    state.zonasDeRestricao = zonaRestricao
  },
  UPDATE_REGIAO (state, regiaoUpdate) {
    state.regioes.map(regiao => {
      if (regiao.id === regiaoUpdate.id) {
        regiao.polygons[0] = regiaoUpdate.latLong
      }
    })
  },
  UPDATE_ZONA_RESTRICAO (state, zonaRestricaoUpdate) {
    state.zonasDeRestricao.map(zonaRestricao => {
      if (zonaRestricao.id === zonaRestricaoUpdate.id) {
        zonaRestricao.polygons[0] = zonaRestricaoUpdate.latLong
      }
    })
  },
  CLEAN_ZONA_RESTRICAO (state) {
    state.zonasDeRestricao = []
  },
  CLEAN_REGIOES (state) {
    state.regioes = []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
