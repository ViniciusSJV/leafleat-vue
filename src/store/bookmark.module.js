import BookmarkService from '@/common/BookmarkService'

const initialState = {
  tagsPa: [],
  abiliityPa: []
}

export const state = Object.assign({}, initialState)

const getters = {
  tagsPa (state) {
    return state.tagsPa
  },
  abiliityPa () {
    return state.abiliityPa
  }
}

const actions = {
  GET_TAGS_BY_ID_PA (context, idPa) {
    return BookmarkService.getTagsFromPa(idPa)
      .then(({ data }) => {
        context.commit('SET_TAGS', data.tags)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  },
  GET_ABILITY_BY_ID_PA (context, idPa) {
    return BookmarkService.getAbilityFromPa(idPa)
      .then(({ data }) => {
        context.commit('SET_ABILITY', data.ability)
      })
      .catch(({response}) => {
        // context.commit(SET_ERROR, response.data.errors)
      })
  }
}

const mutations = {
  SET_TAGS (state, tags) {
    state.tagsPa = tags
  },
  SET_ABILITY (state, ability) {
    state.abiliityPa = ability
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
