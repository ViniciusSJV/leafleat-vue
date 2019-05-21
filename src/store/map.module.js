import MarkersService from '@/common/MarkersService'
import RoutersService from '@/common/RoutersService'

// eslint-disable-next-line
import L from 'leaflet'

const initialState = {
  idSelectedMarkerCD: '',
  routers: [],
  mapMarkersPA: [],
  mapMarkersCD: [],
  bounds: {},
  error: '',
  loading: false
}

export const state = Object.assign({}, initialState)

const getters = {
  idSelectedMarkerCD (state) {
    return state.idSelectedMarkerCD
  },
  loading (state) {
    return state.loading
  },
  mapMarkersPA (state) {
    return state.mapMarkersPA
  },
  loadMore (state) {
    return state.loadMore
  },
  mapMarkersCD (state) {
    return state.mapMarkersCD
  },
  routers (state) {
    state.routers.map(router => {
      router.color = createColor()
    })
    return state.routers
  },
  bounds (state) {
    return state.bounds
  }
}

const actions = {
  SET_SELECTED_MARKER_CD (context, idMarker) {
    context.commit('SET_SELECTED_MARKER_CD', idMarker)
  },
  GET_MAP_CD (context, idCliente) {
    return MarkersService.getAllCd(idCliente)
      .then(({ data }) => {
        context.commit('SET_MAP_MARKERS_CD', data.mapMarkers)
        context.commit('SET_NEW_BOUNDS', getLatLong(data.mapMarkers))
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },

  GET_MAP_PA (context, idCd) {
    context.commit('UPDATE_LOADING')
    return MarkersService.getAllPa(idCd)
      .then(({ data }) => {
        context.commit('SET_MAP_MARKERS_PA', data.mapMarkers)

        if (data.mapMarkers.length) {
          context.commit('SET_NEW_BOUNDS', getLatLong(data.mapMarkers))
        }

        context.commit('UPDATE_LOADING')
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },

  GET_ROUTERS (context, paramenters) {
    context.commit('UPDATE_LOADING')
    return RoutersService.getAllRoutersDayByIdMarker(paramenters.idMarker, paramenters.date)
      .then(({ data }) => {
        context.commit('SET_ROUTERS', data.routers)
        context.commit('SET_MAP_MARKERS_PA', data.markerswithoutrouter)
        context.commit('SET_NEW_BOUNDS', getLatLongRouter(data.routers))
        context.commit('UPDATE_LOADING')
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },

  SHOW_MARKERS_OUT_ROUTER (context) {
    return context.commit('UPDATE_VISIBILITY_MARKERS_PA')
  },

  FOCUS_ROUTER (context, idRouter) {
    context.commit('UPDATE_FOCUS_ROUTERS', idRouter)
  },

  FOCUS_EXCLUSIVE_ROUTER (context, idRouter) {
    context.commit('UPDATE_FOCUS_EXCLUSIVE_ROUTER', idRouter)
  },

  RESET_MAP (context) {
    context.commit('RESET_MAP')
  },

  SET_BOUNDS (context, bounds) {
    context.commit('SET_NEW_BOUNDS', bounds)
  },

  CHANGE_COLOR_ROUTER (context, routerColor) {
    context.commit('CHANGE_COLOR_ROUTER', routerColor)
  }
}

const mutations = {
  SET_SELECTED_MARKER_CD (state, markerId) {
    state.idSelectedMarkerCD = markerId
  },
  SET_MAP_MARKERS_CD (state, mapMarkers) {
    state.mapMarkersCD = mapMarkers
  },
  SET_MAP_MARKERS_PA (state, mapMarkers) {
    state.mapMarkersPA = mapMarkers
  },
  SET_ROUTERS (state, routers) {
    state.routers = routers
  },
  UPDATE_VISIBILITY_MARKERS_PA (state) {
    state.mapMarkersPA.map(marker => {
      marker.show = !marker.show
    })
  },
  UPDATE_FOCUS_ROUTERS (state, idRouter) {
    state.routers.map(route => {
      if (route.idRouter === idRouter) {
        route.show = !route.show
        if (route.show) state.bounds = L.latLngBounds(route.polylines)
      }
    })
  },
  UPDATE_FOCUS_EXCLUSIVE_ROUTER (state, idRouter) {
    state.routers.map(route => {
      if (route.idRouter === idRouter) {
        route.show = true
        if (route.show) state.bounds = L.latLngBounds(route.polylines)
      } else {
        route.show = false
      }
    })
  },
  RESET_MAP (state) {
    state.mapMarkersPA = []
    state.routers = []
    state.loading = false
  },
  SET_NEW_BOUNDS (state, bounds) {
    if (bounds.length) {
      state.bounds = L.latLngBounds(bounds)
    }
  },
  UPDATE_LOADING (state) {
    state.loading = !state.loading
  },
  CHANGE_COLOR_ROUTER (state, routerColor) {
    state.routers.map(router => {
      if (router.idRouter === routerColor.id) {
        router.color = routerColor.color
        // unico geito de atualizar um polyline no mapa
        router.show = false
        router.show = true
      }
    })
  }
}

function getLatLong (mapMarkes) {
  let latLngBounds = []
  mapMarkes.map(marker => {
    latLngBounds.push(marker.endereco.latLng)
  })
  return latLngBounds
}

function getLatLongRouter (routers) {
  let latLngBounds = []
  routers.map(router => {
    if (router.polylines.length) {
      latLngBounds.push(router.polylines)
    }
  })
  return latLngBounds
}

function createColor () {
  const hex = '0123456789ABCDEF'
  let color = '#'
  for (var i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}

export default {
  state,
  mutations,
  actions,
  getters
}
