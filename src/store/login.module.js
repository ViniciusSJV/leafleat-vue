import JwtService from '@/common/jwt.service'
import ApiService from '@/common/Api'

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  errors (state) {
    return state.errors
  }
}

const actions = {
  LOGIN (context, credentials) {
    return new Promise(resolve => {
      const payload = JSON.stringify({username: credentials.username, password: credentials.password})
      ApiService.post('users/login', payload)
        .then(({ data }) => {
          context.commit('SET_AUTH', data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR', response.data.errors)
        })
    })
  },
  LOGOUT (context) {
    context.commit('PURGE_AUTH')
  },
  FORM_ERROR (context, error) {
    context.commit('SET_ERROR', error)
  },
  CHECK_AUTH (context) {
    if (JwtService.getToken()) {
      ApiService.get('user')
        .then(({ data }) => {
          context.commit('SET_AUTH', data.user)
        })
        .catch(({ response }) => {
          context.commit('SET_ERROR', response.data.errors)
        })
    } else {
      context.commit('PURGE_AUTH')
    }
  }
}

const mutations = {
  SET_ERROR (state, error) {
    state.errors = error
  },
  SET_AUTH (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  PURGE_AUTH (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
