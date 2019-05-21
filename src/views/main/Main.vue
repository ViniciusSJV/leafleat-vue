<template>
  <section>
    <map-leaflet v-on:openMainMenuMap="openMainMenu" v-on:openRouterMenuMap="openRouterMenuInMap"></map-leaflet>

    <header-map v-on:openNavMenu="openNavMenu"></header-map>

    <transition name="bounce">
      <nav-menu v-show="navMenuOpen" v-on:openNavMenu="openNavMenu"></nav-menu>
    </transition>

    <transition name="bounce">
      <map-main-menu v-bind:marker="selectedMarker" v-if="mainMenuOpened" @hide="mainMenuOpened = false" v-on:openRouterMenuInMap="openRouterMenuInMap"></map-main-menu>
    </transition>

    <transition name="bounce-router">
      <router-time-line v-bind:idRouter="idRouter" v-bind:idMarker="selectedMarker.id" v-if="routerMenuOpened"></router-time-line>
    </transition>

    <modal-marker-pa></modal-marker-pa>

    <modal-router></modal-router>

    <modal-router-color></modal-router-color>

    <modal-frota></modal-frota>

  </section>
</template>

<script>

import HeaderMap from '@/components/header/HeaderMap.vue'
import NavMenu from '@/components/nav_menu/NavMenu.vue'
import MapMainMenu from '@/components/main_menu/MapMainMenu.vue'
import RouterTimeLine from '@/components/route_timeline/RouterTimeLine.vue'
import MapLeaflet from '@/components/map/MapLeaflet.vue'
import MapMenu from '@/components/map_menu/MapMenu.vue'
import ModalMarkerPa from '@/components/modals/ModalMarkerPa.vue'
import ModalRouter from '@/components/modals/ModalRouter.vue'
import ModalRouterColor from '@/components/modals/ModalRouterColor.vue'
import ModalFrota from '@/components/modals/ModalFrota.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    MapMainMenu,
    MapLeaflet,
    MapMenu,
    HeaderMap,
    RouterTimeLine,
    ModalMarkerPa,
    ModalRouter,
    ModalRouterColor,
    NavMenu,
    ModalFrota
  },
  data () {
    return {
      mainMenuOpened: false,
      routerMenuOpened: false,
      navMenuOpen: false,
      idRouter: null,
      selectedMarker: null
    }
  },
  computed: {
    ...mapGetters([
      'idSelectedMarkerCD'
    ])
  },
  created () {
    this.GET_MAP_CD(1)
  },
  methods: {
    ...mapActions([
      'GET_MAP_CD',
      'SET_SELECTED_MARKER_CD'
    ]),
    openMainMenu: function (marker) {
      this.selectedMarker = marker
      this.mainMenuOpened = true
      this.routerMenuOpened = false
    },
    openRouterMenuInMap: function (idRouter) {
      this.idRouter = idRouter
      this.mainMenuOpened = false
      this.routerMenuOpened = true
    },
    openNavMenu: function () {
      this.navMenuOpen = !this.navMenuOpen
    }
  }
}
</script>

<style>

.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    left: -370px;
  }
  100% {
    left: 0px;
  }
}

.bounce-router-enter-active {
  animation: bounce-router-in .3s;
}
.bounce-router-leave-active {
  animation: bounce-router-in .3s reverse;
}
@keyframes bounce-router-in {
  0% {
    bottom: -300px;
  }
  100% {
    bottom: 0px;
  }
}

.bounce-router-right-enter-active {
  animation: bounce-in-right .3s;
}
.bounce-router-right-leave-active {
  animation: bounce-in-right .3s reverse;
}
@keyframes bounce-in-right {
  0% {
    right: -330px;
  }
  100% {
    right: 0px;
  }
}

</style>
