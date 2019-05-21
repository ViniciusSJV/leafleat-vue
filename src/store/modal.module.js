const initialState = {
  markerModal: {},
  routerModal: {},
  routerColorModal: {},
  modalMarkerOpen: false,
  modalRouterOpen: false,
  modalFrotaOpen: false,
  modalRouterColorOpen: false
}

export const state = Object.assign({}, initialState)

const getters = {
  markerModal (state) {
    return state.markerModal
  },
  routerModal (state) {
    return state.routerModal
  },
  routerColorModal (state) {
    return state.routerColorModal
  },
  modalMarkerOpen (state) {
    return state.modalMarkerOpen
  },
  modalRouterOpen (state) {
    return state.modalRouterOpen
  },
  modalRouterColorOpen (state) {
    return state.modalRouterColorOpen
  },
  modalFrotaOpen (state) {
    return state.modalFrotaOpen
  }
}

const actions = {
  SET_MARKER_MODAL (context, markerModal) {
    context.commit('SET_MARKER_MODAL', markerModal)
  },
  SET_ROUTER_MODAL (context, routerModal) {
    context.commit('SET_ROUTER_MODAL', routerModal)
  },
  SET_COLOR_ROUTER_MODAL (context, router) {
    context.commit('SET_COLOR_ROUTER_MODAL', router)
  },
  CLOSE_MODAL_MARKER (context) {
    context.commit('CLOSE_MODAL_MARKER')
  },
  CLOSE_MODAL_ROUTER (context) {
    context.commit('CLOSE_MODAL_ROUTER')
  },
  CLOSE_MODAL_COLOR_ROUTER (context) {
    context.commit('CLOSE_MODAL_COLOR_ROUTER')
  },
  OPEN_MODAL_FROTA (context) {
    context.commit('OPEN_MODAL_FROTA')
  },
  CLOSE_MODAL_FROTA (context) {
    context.commit('CLOSE_MODAL_FROTA')
  }
}

const mutations = {
  SET_MARKER_MODAL (state, markerModal) {
    state.markerModal = markerModal
    state.modalMarkerOpen = true
  },
  SET_ROUTER_MODAL (state, routerModal) {
    state.routerModal = routerModal
    state.modalRouterOpen = true
  },
  SET_COLOR_ROUTER_MODAL (state, router) {
    state.routerColorModal = router
    state.modalRouterColorOpen = true
  },
  OPEN_MODAL_FROTA (state) {
    state.modalFrotaOpen = true
  },
  CLOSE_MODAL_MARKER (state) {
    state.modalMarkerOpen = false
  },
  CLOSE_MODAL_ROUTER (state) {
    state.modalRouterOpen = false
  },
  CLOSE_MODAL_COLOR_ROUTER (state) {
    state.modalRouterColorOpen = false
  },
  CLOSE_MODAL_FROTA (state) {
    state.modalFrotaOpen = false
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
