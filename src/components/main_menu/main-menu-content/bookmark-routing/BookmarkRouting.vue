<template>

  <div class="menu-pointer map-main-menu-content transparent">

    <div v-show="currentSubMenuRouterOpen === '' && !loading" class="bookmark-routing-date">
      <route-date v-bind:idMarker="idMarker"></route-date>
    </div>

    <routing-sub-menu v-if="currentSubMenuRouterOpen === '' && !loading" v-on:changeSubMenuRouter="openSubMenuRoute($event)"></routing-sub-menu>

    <new-router v-if="currentSubMenuRouterOpen === 'new-router'" v-bind:idCd="idMarker"  v-on:closeSubMenuRouter="closeSubMenuRouter()"></new-router>

    <settings-router v-if="currentSubMenuRouterOpen === 'settings-router'" v-bind:idMarker="idMarker"  v-on:closeSubMenuRouter="closeSubMenuRouter()"></settings-router>

    <script-router v-if="currentSubMenuRouterOpen === 'script-router'" v-bind:idMarker="idMarker"  v-on:closeSubMenuRouter="closeSubMenuRouter()"></script-router>

    <color-router v-if="currentSubMenuRouterOpen === 'color-router'" v-bind:idCd="idMarker" v-on:closeSubMenuRouter="closeSubMenuRouter()"></color-router>

    <div class="out-router" v-if="currentSubMenuRouterOpen === '' && !loading">
      <div>
        <span>{{ mapMarkersPA.length }} pontos não roteirizados</span>

        <i class="fas fa-eye-slash" v-if="!markersForaDasRotasVisiveis" v-on:click="mostrarMarkersForaDasRotas"></i>
        <i class="fas fa-eye" v-if="markersForaDasRotasVisiveis" v-on:click="mostrarMarkersForaDasRotas"></i>
      </div>
    </div>

    <ul class="routes-menu" v-if="(routers && routers.length) && currentSubMenuRouterOpen === '' && !loading">

      <li v-for="router of routers" :key="router.idRouter">

        <div class="route-progress-info">
          <i class="fas fa-trash-alt"></i>
          <i class="fas fa-eye-slash" v-if="!router.show" v-on:click="focusRouter(router.idRouter, $event)"></i>
          <i class="fas fa-eye" v-if="router.show" v-on:click="focusRouter(router.idRouter, $event)"></i>
          <i v-bind:style="{ color: router.color }" v-on:click="openModalColorRouter(router)" class="fas fa-palette"></i>
          <i v-on:click="openRouterMenu(router.idRouter)" class="fas fa-code-branch"></i>
          <i class="fas fa-address-card"></i>
          <i class="fas fa-exchange-alt"></i>
          <i v-if="router.is_deleted_route" class="fas fa-lock-open"></i>
          <i v-if="!router.is_deleted_route" class="fas fa-lock"></i>

          <div class="info">
            <i class="fas fa-truck"></i>
            <label>{{router.placa_veiculo}}</label>
            <i v-if="!router.is_deleted_route" v-on:click="openModalFrota(router.idRouter)" class="fas fa-sync"></i>
          </div>

          <div class="progress">
            <i class="fas fa-hourglass-half"></i>
            <div id="time">
              <div class="progressPorcent" v-bind:class="{ 'danger': router.porcent_tempo >= 100, 'alert': router.porcent_tempo > 90 && router.porcent_tempo < 100 }" v-bind:style="{ width: router.porcent_tempo + '%' }" >{{router.porcent_tempo}}%</div>
            </div>

            <i class="fas fa-weight-hanging"></i>
            <div id="weight">
              <div class="progressPorcent" v-bind:class="{ 'danger': router.porcent_dimensao >= 100, 'alert': router.porcent_dimensao > 90 && router.porcent_dimensao < 100 }" v-bind:style="{ width: router.porcent_dimensao + '%' }" >{{router.porcent_dimensao}}%</div>
            </div>
          </div>

        </div>

        <label class="router-info quant_atendimentos">Atendimentos: {{router.qtd_atendimentos}}</label>
        <label class="router-info">Distancia total: {{router.km_total}} km</label>

      </li>

    </ul>

    <router-script-loading v-if="loading" v-bind:width="370" v-bind:height="370"></router-script-loading>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import RouteDate from '@/components/route_date/RouteDate.vue'
import RoutingSubMenu from './routing-sub-menu/RoutingSubMenu.vue'
import NewRouter from './routing-sub-menu/new-router/NewRouter.vue'
import SettingsRouter from './routing-sub-menu/settings-router/SettingsRouter.vue'
import ScriptRouter from './routing-sub-menu/script-router/ScriptRouter.vue'

import RouterScriptLoading from '@/components/utils/RouterScriptLoading.vue'

export default {
  name: 'BookmarkRouting',
  components: {
    RoutingSubMenu,
    NewRouter,
    SettingsRouter,
    ScriptRouter,
    RouterScriptLoading,
    RouteDate
  },
  props: {
    idMarker: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'idSelectedMarkerCD',
      'routers',
      'loading',
      'mapMarkersPA'
    ])
  },
  data () {
    return {
      currentSubMenuRouterOpen: '',
      markersForaDasRotasVisiveis: true
    }
  },
  created () {
    if (this.idMarker !== this.idSelectedMarkerCD) {
      this.RESET_MAP()
    }
  },
  watch: {
    idMarker () {
      this.RESET_MAP()
    }
  },
  methods: {
    ...mapActions([
      'FOCUS_ROUTER',
      'FOCUS_EXCLUSIVE_ROUTER',
      'SET_BOUNDS',
      'SHOW_MARKERS_OUT_ROUTER',
      'CLOSE_MODAL_COLOR_ROUTER',
      'SET_COLOR_ROUTER_MODAL',
      'RESET_MAP',
      'GET_FROTA_BY_ID_CD',
      'OPEN_MODAL_FROTA'
    ]),
    openModalFrota: function (idRoute) {
      this.GET_FROTA_BY_ID_CD(this.idMarker)
      this.OPEN_MODAL_FROTA(idRoute)
    },
    focusRouter: function (idRouter, e) {
      if (e.ctrlKey) {
        this.FOCUS_EXCLUSIVE_ROUTER(idRouter)
      } else {
        this.FOCUS_ROUTER(idRouter)
      }
    },
    mostrarMarkersForaDasRotas: function () {
      this.markersForaDasRotasVisiveis = !this.markersForaDasRotasVisiveis
      this.SHOW_MARKERS_OUT_ROUTER()
    },
    openSubMenuRoute: function (subMenuId) {
      this.currentSubMenuRouterOpen = subMenuId
    },
    closeSubMenuRouter: function () {
      this.currentSubMenuRouterOpen = ''
    },
    openRouterMenu (idRouter) {
      this.$emit('openRouterMenu', idRouter)
    },
    openModalColorRouter: function (router) {
      this.SET_BOUNDS(router.polylines)
      this.SET_COLOR_ROUTER_MODAL(router)
    },
    closeModalColorRouter: function () {
      this.CLOSE_MODAL_COLOR_ROUTER()
    }
  }
}

</script>

<style>

.routes-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.routes-menu li {
    padding: 5px 5px;
    border-bottom: .1px solid #dedede;
    margin-bottom: 1px;
    background-color: white;
}

.routes-menu li .route-progress-info {
    width: 100%;
}

.route-progress-info i {
    margin-right: 5px;
    color: #565f63;
    float: right;
    cursor: pointer;
}

.fa-weight-hanging {
  font-size: 15px;
}

.route-progress-info .info {
    display: inline-flex;
    align-items: center;
    margin-bottom: 5px;
}

.info i.arrow {
    left: 10px;
    position: relative;
    top: 13px;
}

.route-progress-info label {
    color: #565f63;
    margin-right: 5px;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
}

.progress {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px 0px;
}

.progress > div {
    width: 100%;
    height: 10px;
    margin: 1px 0px;
    background-color: #f1f1f1!important;
}

.progress .progressPorcent {
    background-color: #8BC34A;
    height: 100%;
    font-size: 9px;
    text-align: center;
    color: white;
    max-width: 100%;
}

.progressPorcent.danger {
  background-color: #FF5722 !important;
}

.progressPorcent.alert {
  background-color: #FFC107 !important;
}

.router-info {
  font-size: 12px;
  font-family: inherit;
  color: #9E9E9E;
}

#quant_atendimentos {
  margin-right: 10px;
}

.router-color {
  padding: 10px;
  border-radius: 50%;
  margin-left: 10px;
  box-shadow: 3px 3px 3px #9E9E9E;
}

.out-router {
  text-align: center;
  padding: 15px 0px;
}

.out-router > div {
  display: inline-flex;
  align-items: center;
}

.out-router span {
  margin-right: 10px;
  color: #565f63;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}

.out-router i {
  color:#565f63;
  cursor: pointer;
}

.fa-weight-hanging {
  margin-left: 5px !important;
}

.bookmark-routing-date .mx-datepicker-popup{
  top: 190px !important;
  position: fixed;
  width: 370px;
}

</style>
