import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from './jwt.service'
import { API_URL } from './config'

export default {

  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['X-CSRFToken'] = JwtService.getToken()
  },

  get (resource, id = '') {
    return Vue.axios
      .get(resource + '/' + id)
      .catch((error) => {
        throw new Error('[RWV] ApiService' + error)
      })
  },

  post (resource, params) {
    return Vue.axios.post(resource, params)
  },

  put (resource, params) {
    return Vue.axios.put(resource, params)
  },

  delete (resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error('[RWV] ApiService' + error)
      })
  }
}
