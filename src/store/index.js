import Vue from 'vue'
import Vuex from 'vuex'

import LoginModule from './login.module'
import BookmarkModule from './bookmark.module'
import FrotaModule from './frota.module'
import MapModule from './map.module'
import ModalModule from './modal.module'
import RoutersDateModule from './routers-date.module'
import PolygonModule from './polygon.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginModule,
    BookmarkModule,
    MapModule,
    ModalModule,
    FrotaModule,
    RoutersDateModule,
    PolygonModule
  }
})
