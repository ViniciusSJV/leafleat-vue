<template>
  <div id="map-menu-pontos" class="map-main-menu">
    <div class="map-main-menu-header">
      <div class="map-main-menu-header-close">
        <i v-on:click="closeMainMenu()" class="fas fa-times"></i>
      </div>

      <div class="map-main-menu-header-content">

        <div class="map-main-menu-header-content-title">
          <i v-if="marker.tipo === 'CD'" class="fas fa-boxes"></i>
          <i v-if="marker.tipo === 'PA'" class="fas fa-user"></i>
          <label>{{ marker.info.nome }}</label>
        </div>

        <div class="map-main-menu-header-content-group">
          <i class="fas fa-map-marker-alt"></i>
          <label>{{ montaEndereco }}</label>
        </div>

        <div v-if="marker.tipo !== 'CD'" class="map-main-menu-header-content-group">
          <i class="fas fa-phone"></i>
          <label>{{ marker.info.telefone }}</label>
        </div>

        <div class="map-main-menu-header-content-group">
          <i class="far fa-clock"></i>
          <label>{{ montaHorarios }}</label>
        </div>

      </div>

    </div>

    <map-main-menu-nav v-bind:typeMarker="marker.tipo" v-on:changeMenu="openMenu($event)"></map-main-menu-nav>

    <linked-bookmarks v-if="currentMenuOpen === 'linked-bookmarks' && marker.tipo === 'CD'" v-bind:idMarker="marker.id"></linked-bookmarks>

    <bookmark-edit v-if="currentMenuOpen === 'bookmark-edit'" v-bind:informacaoMarker="marker.info" v-bind:typeMarker="marker.tipo"></bookmark-edit>

    <bookmark-tags v-if="currentMenuOpen === 'bookmark-tags' && marker.tipo === 'PA'" v-bind:idMarker="marker.id"></bookmark-tags>

    <bookmark-abiliity v-if="currentMenuOpen === 'bookmark-abiliitys' && marker.tipo === 'PA'" v-bind:idMarker="marker.id"></bookmark-abiliity>

    <bookmark-geo-location v-if="currentMenuOpen === 'bookmark-geolocation'" v-bind:enderecoMarker="marker.endereco"></bookmark-geo-location>

    <bookmark-routing v-if="currentMenuOpen === 'bookmark-routing' && marker.tipo === 'CD'" v-bind:idMarker="marker.id" v-on:openRouterMenu="openRouterMenu"></bookmark-routing>

  </div>

</template>

<script>

import MapMainMenuNav from './main-menu-nav/MapMainMenuNav.vue'

import LinkedBookmarks from './main-menu-content/linked-bookmarks/LinkedBookmarks.vue'
import BookmarkEdit from './main-menu-content/bookmark-edit/BookmarkEdit.vue'
import BookmarkTags from './main-menu-content/bookmark-tags/BookmarkTags.vue'
import BookmarkAbiliity from './main-menu-content/bookmark-ability/BookmarkAbiliity.vue'
import BookmarkGeoLocation from './main-menu-content/bookmark-geo-location/BookmarkGeoLocation.vue'

import BookmarkRouting from './main-menu-content/bookmark-routing/BookmarkRouting.vue'

import { mapActions } from 'vuex'

export default {
  name: 'MapMainMenu',
  components: {
    MapMainMenuNav,
    LinkedBookmarks,
    BookmarkEdit,
    BookmarkTags,
    BookmarkAbiliity,
    BookmarkGeoLocation,
    BookmarkRouting
  },
  props: {
    marker: {
      type: Object
    }
  },
  computed: {
    montaEndereco: function () {
      return this.marker.endereco.rua + ', ' +
      this.marker.endereco.numero + ' - ' +
      this.marker.endereco.bairro + ', ' +
      this.marker.endereco.cidade + ' - ' +
      this.marker.endereco.estado + ', ' +
      this.marker.endereco.cep
    },
    montaHorarios: function () {
      return 'Das ' + this.marker.info.horarios.inicio_turno_a + ' às ' +
      this.marker.info.horarios.fim_turno_b
    }
  },
  data () {
    return {
      currentMenuOpen: ''
    }
  },
  created () {
    this.currentMenuOpen = ''
  },
  methods: {
    ...mapActions([
      'RESET_MAP'
    ]),
    openMenu: function (menuId) {
      if (menuId === 'linked-bookmarks') {
        this.RESET_MAP()
      }
      this.currentMenuOpen = menuId
    },
    openRouterMenu: function (idRouter) {
      this.$emit('openRouterMenuInMap', idRouter)
    },
    closeMainMenu: function () {
      this.$emit('hide')
    }
  }
}
</script>

<style>

.map-main-menu {
    width: 370px;
    max-height: 100%;
    pointer-events: auto;
    user-select: none;
    cursor: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 100000;
    top: 0px;
    background-color: transparent;
}

.transparent {
    background-color: transparent;
    top: 1px;
}

.map-main-menu-content {
    overflow-y: auto;
    position: relative;
    max-height: 100%;
    width: 100%;
    background-color: white;
}

.map-main-menu-header {
    display: inline-block;
    align-items: normal;
    background: #565f63;
}

.map-main-menu-header-close {
    color: white;
    float: right;
    padding: 15px;
    cursor: pointer;
}

.map-main-menu-header-close i {
    font-weight: 700;
}

.map-main-menu-header-content {
    min-height: 115px;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
}

.map-main-menu-header-content-title {
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
}

.map-main-menu-header-content-title label {
  white-space: nowrap;
  overflow: hidden;
}

.map-main-menu-header-content-title i {
    margin-right: 8px;
}

.map-main-menu-header-content-group {
    display: flex;
    align-items: center;
    padding: 8px 0px;
}

.map-main-menu-header-content-group i {
    font-size: 18px;
    margin-right: 8px;
}

.map-main-menu-header-content-group label {
    font-size: 14px;
}

.error-http {
    text-align: center;
    font-weight: 500;
    color: #FF5722;
}

</style>
