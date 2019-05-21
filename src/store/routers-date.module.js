import RoutersService from '@/common/RoutersService'

const initialState = {
  routersDates: [],
  fistRouter: '',
  lastRouter: '',
  dateSelected: ''
}

export const state = Object.assign({}, initialState)

const getters = {
  routersDates (state) {
    return state.routersDates
  },
  fistRouter (state) {
    return state.fistRouter
  },
  lastRouter (state) {
    return state.lastRouter
  },
  dateSelected (state) {
    return state.dateSelected
  }
}

const actions = {
  GET_DATAS_ROTAS_CRIADAS_ID_CD (context, id) {
    return RoutersService.getDatesRouters(id)
      .then(({ data }) => {
        context.commit('SET_DATAS_ROTAS_CRIADAS_ID_CD', data.daterouters)
        context.commit('SET_FIST_ROUTE', data.fistRouter)
        context.commit('SET_LAST_ROUTE', data.lastRouter)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  SET_DATE_SELECTED (context, date) {
    context.commit('SET_DATE_SELECTED', date)
  },
  CLEAN_DATE_SELECTED (context) {
    context.commit('CLEAN_HOUR_ROUTE')
  }
}

const mutations = {
  SET_DATAS_ROTAS_CRIADAS_ID_CD (state, datasRota) {
    state.fistRouter = datasRota[0]

    let dates = []
    datasRota.map(date => {
      const parts = date.split('-')
      dates.push(new Date(parts[0], parts[1] - 1, parts[2]))
    })
    state.routersDates = dates
  },
  SET_FIST_ROUTE (state, fistRoute) {
    state.fistRouter = fistRoute
  },
  SET_LAST_ROUTE (state, lastRouter) {
    state.lastRouter = lastRouter
  },
  SET_DATE_SELECTED (state, date) {
    state.dateSelected = date
  },
  CLEAN_HOUR_ROUTE (state) {
    state.dateSelected = ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
