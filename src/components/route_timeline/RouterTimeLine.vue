<template>

  <div class="time-line" v-bind:style="{ height: this.height }">

    <button class="btn-size-edit" v-on:mousedown="sizeTimeLine($event)"><i class="fas fa-angle-double-up"></i></button>

    <div class="router-menu-timeline">

      <ul class="block-hours">

        <div class="datetime-select timeline-route">
          <route-date v-bind:idMarker="this.idMarker"></route-date>
        </div>

        <li class="hours">
          <span>00:00</span>
        </li>
        <li class="hours">
          <span>00:30</span>
        </li>
        <li class="hours">
          <span>01:00</span>
        </li>
        <li class="hours">
          <span>01:30</span>
        </li>
        <li class="hours">
          <span>02:00</span>
        </li>
        <li class="hours">
          <span>02:30</span>
        </li>
        <li class="hours">
          <span>03:00</span>
        </li>
        <li class="hours">
          <span>03:30</span>
        </li>
        <li class="hours">
          <span>04:00</span>
        </li>
        <li class="hours">
          <span>04:30</span>
        </li>
        <li class="hours">
          <span>05:00</span>
        </li>
        <li class="hours">
          <span>05:30</span>
        </li>
        <li class="hours">
          <span>06:00</span>
        </li>
        <li class="hours">
          <span>06:30</span>
        </li>
        <li class="hours">
          <span>07:00</span>
        </li>
        <li class="hours">
          <span>07:30</span>
        </li>
        <li class="hours">
          <span>08:00</span>
        </li>
        <li class="hours">
          <span>08:30</span>
        </li>
        <li class="hours">
          <span>09:00</span>
        </li>
        <li class="hours">
          <span>09:30</span>
        </li>
        <li class="hours">
          <span>10:00</span>
        </li>
        <li class="hours">
          <span>10:30</span>
        </li>
        <li class="hours">
          <span>11:00</span>
        </li>
        <li class="hours">
          <span>11:30</span>
        </li>
        <li class="hours">
          <span>12:00</span>
        </li>
        <li class="hours">
          <span>12:30</span>
        </li>
        <li class="hours">
          <span>13:00</span>
        </li>
        <li class="hours">
          <span>13:30</span>
        </li>
        <li class="hours">
          <span>14:00</span>
        </li>
        <li class="hours">
          <span>14:30</span>
        </li>
        <li class="hours">
          <span>15:00</span>
        </li>
        <li class="hours">
          <span>15:30</span>
        </li>
        <li class="hours">
          <span>16:00</span>
        </li>
        <li class="hours">
          <span>16:30</span>
        </li>
        <li class="hours">
          <span>17:00</span>
        </li>
        <li class="hours">
          <span>17:30</span>
        </li>
        <li class="hours">
          <span>18:00</span>
        </li>
        <li class="hours">
          <span>18:30</span>
        </li>
        <li class="hours">
          <span>19:00</span>
        </li>
        <li class="hours">
          <span>19:30</span>
        </li>
        <li class="hours">
          <span>20:00</span>
        </li>
        <li class="hours">
          <span>20:30</span>
        </li>
        <li class="hours">
          <span>21:00</span>
        </li>
        <li class="hours">
          <span>21:30</span>
        </li>
        <li class="hours">
          <span>22:00</span>
        </li>
        <li class="hours">
          <span>22:30</span>
        </li>
        <li class="hours">
          <span>23:00</span>
        </li>
        <li class="hours">
          <span>23:30</span>
        </li>
        <li class="hours">
          <span>24:00</span>
        </li>
      </ul>

      <div class="time-line-list" v-for="route of routers" :key="route.idRouter" v-bind:id="route.idRouter">

        <div class="time-line-truck">

          <div class="inline">
            <div class="info-truck">
              <div class="truck-div" v-on:click="openModalFrota(route.idRouter)">
                <i class="fas fa-truck"></i>
                <label>{{ route.placa_veiculo }}</label>
              </div>
            </div>

            <div class="progress-route">
              <i class="fas fa-hourglass-half"></i>
              <div id="time">
                <div class="progressPorcent" v-bind:class="{ 'danger': route.porcent_tempo >= 100, 'alert': route.porcent_tempo > 90 && route.porcent_tempo < 100 }" v-bind:style="{ width: route.porcent_tempo + '%' }" >{{route.porcent_tempo}}%</div>
              </div>

              <i class="fas fa-weight-hanging"></i>
              <div id="weight">
                <div class="progressPorcent" v-bind:class="{ 'danger': route.porcent_dimensao >= 100, 'alert': route.porcent_dimensao > 90 && route.porcent_dimensao < 100 }" v-bind:style="{ width: route.porcent_dimensao + '%' }" >{{route.porcent_dimensao}}%</div>
              </div>
            </div>

            <i v-on:click="idActionMenuOpen = route.idRouter" class="fas fa-ellipsis-v menu-toogle"></i>
          </div>

          <label class="router-info-route">Atendimentos: {{route.qtd_atendimentos}}</label>
          <label class="router-info-route">Distancia total: {{route.km_total}} km</label>

        </div>

        <div class="time-line-action" v-bind:class="{ 'menuOpen': idActionMenuOpen == route.idRouter }">
          <i v-if="route.is_deleted_route" class="fas fa-lock-open"></i>
          <i v-if="!route.is_deleted_route" class="fas fa-lock"></i>
          <i class="fas fa-exchange-alt"></i>
          <i class="fas fa-address-card"></i>
          <i v-bind:style="{ color: route.color }" v-on:click="openModalColorRouter(route)" class="fas fa-palette"></i>
          <i class="fas fa-eye" v-if="route.show" v-on:click="focusRouter(route.idRouter, $event)"></i>
          <i class="fas fa-eye-slash" v-if="!route.show" v-on:click="focusRouter(route.idRouter, $event)"></i>
          <i class="fas fa-trash-alt"></i>
        </div>

        <div class="time-line-content" v-bind:class="{ 'close-route': route.is_deleted_route }">
          <div class="inicio-rota"
            v-bind:style="{ left: calcLeft(route.inicio_rota) }"
            v-on:mouseover="openModalRouter(route)"
            v-on:mouseleave="closeModalRouter()"
            v-on:click="focusRouteMap(route.polylines)">
            <i v-bind:style="{ backgroundColor: route.color }" class="fas fa-truck"></i>
          </div>

          <div class="route-road"
            v-bind:style="{ borderColor: route.color, left: calcLeft(route.inicio_rota), width: calcWidth(route.tempo) }"
            v-on:mouseover="openModalRouter(route)"
            v-on:mouseleave="closeModalRouter()">
          </div>

          <time-list
            v-bind:markers="route.markers"
            v-bind:color="route.color"
            v-bind:closeRoute="route.is_deleted_route" >
          </time-list>

          <div class="fim-rota" v-bind:style="{ left: calcFinalRota(route.inicio_rota, route.tempo) }"
            v-on:mouseover="openModalRouter(route)"
            v-on:mouseleave="closeModalRouter()">
            <i v-bind:style="{ backgroundColor: route.color }" class="fas fa-flag-checkered"></i>
          </div>
        </div>

      </div>

      <router-script-loading v-if="loading" v-bind:width="1500" v-bind:height="250"></router-script-loading>

    </div>

    <services-without-route></services-without-route>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import RouteDate from '@/components/route_date/RouteDate.vue'
import TimeList from './TimeList.vue'
import RouterScriptLoading from '@/components/utils/RouterScriptLoading.vue'
import ServicesWithoutRoute from '@/components/services_without_route/ServicesWithoutRoute.vue'

export default {
  name: 'RouterTimeLine',
  components: {
    TimeList,
    RouteDate,
    RouterScriptLoading,
    ServicesWithoutRoute
  },
  computed: {
    ...mapGetters([
      'routers',
      'dateSelected',
      'routersDates',
      'loading'
    ])
  },
  props: {
    idMarker: {
      type: Number
    },
    idRouter: {
      type: Number
    }
  },
  watch: {
    idRouter () {
      const elmnt = document.getElementById(this.idRouter)
      elmnt.scrollIntoView({behavior: 'smooth'})
    }
  },
  data () {
    return {
      date: '',
      height: '303px',
      idActionMenuOpen: null
    }
  },
  methods: {
    ...mapActions([
      'SET_ROUTER_MODAL',
      'CLOSE_MODAL_ROUTER',
      'SET_BOUNDS',
      'FOCUS_ROUTER',
      'FOCUS_EXCLUSIVE_ROUTER',
      'SET_COLOR_ROUTER_MODAL',
      'CLOSE_MODAL_COLOR_ROUTER',
      'OPEN_MODAL_FROTA',
      'GET_FROTA_BY_ID_CD'
    ]),
    sizeTimeLine: function () {
      document.documentElement.addEventListener('mousemove', this.changeSizeTimeLine, false)
      document.documentElement.addEventListener('mouseup', this.stopSizeTimeLine, false)
    },
    changeSizeTimeLine: function (event) {
      const mouseY = event.clientY
      const height = window.screen.height
      // 151.5 representa a metade do tamanho inicial da DIV 'time-line' 303 pixels
      this.height = (height - mouseY) - (151.5) + 'px'
    },
    stopSizeTimeLine: function () {
      document.documentElement.removeEventListener('mousemove', this.changeSizeTimeLine, false)
      document.documentElement.removeEventListener('mouseup', this.stopSizeTimeLine, false)
    },
    openModalColorRouter: function (router) {
      this.SET_BOUNDS(router.polylines)
      this.SET_COLOR_ROUTER_MODAL(router)
    },
    openModalFrota: function () {
      this.GET_FROTA_BY_ID_CD(this.idMarker)
      this.OPEN_MODAL_FROTA()
    },
    closeModalColorRouter: function () {
      this.CLOSE_MODAL_COLOR_ROUTER()
    },
    focusRouter: function (idRouter, e) {
      if (e.ctrlKey) {
        this.FOCUS_EXCLUSIVE_ROUTER(idRouter)
      } else {
        this.FOCUS_ROUTER(idRouter)
      }
    },
    openModalRouter: function (router) {
      this.SET_ROUTER_MODAL(router)
    },
    closeModalRouter: function () {
      this.CLOSE_MODAL_ROUTER()
    },
    focusRouteMap: function (latLong) {
      this.SET_BOUNDS(latLong)
    },
    calcLeft (horaMin) {
      const horaInicio = parseInt(horaMin.split(':')[0])
      const minInicio = parseInt(horaMin.split(':')[1])

      const bordas = (horaInicio * 2)

      const escalaTamanhoPorHora = (horaInicio * 2) * 50
      const escalaTamanhoPorMinuto = (minInicio * 1.666)

      const left = escalaTamanhoPorHora + escalaTamanhoPorMinuto

      let inicioRota = left + bordas
      inicioRota = inicioRota - 20

      if (inicioRota < 0) {
        inicioRota = 0
      }

      return inicioRota + 'px'
    },
    calcWidth (tempoRota) {
      const tempoEmPorporcaoPixel = (tempoRota + 30) * 1.666
      return tempoEmPorporcaoPixel + 20 + 'px'
    },
    calcFinalRota (horaMin, tempoRota) {
      const tempoEmPorporcaoPixel = (tempoRota + 30) * 1.666

      const horaInicio = parseInt(horaMin.split(':')[0])
      const minInicio = parseInt(horaMin.split(':')[1])

      const escalaTamanhoPorMinuto = (horaInicio * 2) * 50

      let left = escalaTamanhoPorMinuto + (minInicio * 1.666) + 6
      left = left + tempoEmPorporcaoPixel
      return left + 'px'
    }
  }
}

</script>

<style>

.time-line {
  z-index: 9999999;
  bottom: 0px;
  position: absolute;
  height: 303px;
  max-height: 100%;
  width: 100%;
  display: inline-block;
  background-color: white;
}

.router-menu-timeline {
  height: calc(100% - 110px);
  width: 100%;
  display: block;
  position: relative;
  overflow-y: scroll;
}

.truck-div {
  display: inline-flex;
  align-items: center;
}

.routers-sub-menu-content {
  display: block;
  width: 20%;
  float: left;
}

.route-submenu-progress-info {
  color: #565f63;
  margin-top: 10px;
  margin-left: 10px;
  height: 50px;
}

.info-truck {
  max-width: 100px;
  min-width: 100px;
}

.info-truck i, .info-truck label {
  color: #565f63;
  cursor: pointer;
  margin-right: 5px;
}

.info-truck label {
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
}

.progress-route {
  display: flex;
  align-items: center;
  max-width: 250px;
  min-width: 250px;
}

.progress-route > div {
  width: 100px;
  height: 10px;
  margin: 1px 0px;
  background-color: #f1f1f1!important;
}

.progress-route .progressPorcent {
  background-color: #8BC34A;
  height: 100%;
  font-size: 9px;
  text-align: center;
  color: white;
  max-width: 100%;
}

.progress-route .progressPorcent.danger {
  background-color: #FF5722 !important;
}

.progress-route .progressPorcent.alert {
  background-color: #FFC107 !important;
}

.progress-route i {
  margin-right: 7px;
  color: #565f63;
}

.route-submenu-progress-info i {
  margin-right: 5px;
}

.route-road {
  position: absolute;
  margin-left: 2px;
  border-style: solid;
  border-width: 3px;
}

.btn-size-edit {
  height: 10px;
  z-index: 999999;
  width: 100%;
  cursor: n-resize;
  background-color: #9c9c9c8f;
  position: fixed;
}

.btn-size-edit i {
  font-size: 20px;
  top: -25px;
  position: absolute;
  color: white;
  background-color: #c7c7c7;
  border-radius: 20%;
  padding: 5px 10px;
}

.time-line .time-line-list {
  margin: 0 0px;
  position: relative;
  list-style: none;
  padding: 0px;
  height: 45px;
  min-width: 2500px;
  border-bottom: 1px solid #9e9e9e6e;
  display: inline-flex;
  align-items: center;
  margin-left: 370px;
}

.time-line-content {
  display: inline-flex;
  align-items: center;
}

.router-info-route {
  font-size: 12px;
  font-family: inherit;
  color: #9E9E9E;
  margin: 0px 5px;
}

.time-line-content.close-route > .timelist > .time-line-list-item > .item {
  background-image: none;
  cursor: no-drop;
}

.time-line-truck {
  left: -370px;
  position: relative;
  width: 370px;
  height: 47px;
  border-bottom: 1px solid #9e9e9e6e;
}

.inline {
  display: inline-flex;
  align-items: center;
  margin: 5px 0px 0px 5px;
}

i.menu-toogle {
  float: right;
  margin-left: 10px;
  top: 7px;
  position: relative;
  cursor: pointer;
}

.time-line-action {
  opacity: 0;
  max-width: 0px;
  position: absolute;
  border: 2px solid #565f63;
  border-radius: 5px;
  margin-left: 15px;
  z-index: 5;
    background-color: white;
}

.router-info-timeline {
    font-size: 12px;
    font-family: inherit;
    color: #9E9E9E;
    margin-left: 5px;
}

.time-line-action::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 101%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.menuOpen {
  opacity: 1;
  max-width: max-content;
  padding: 5px 10px;
}

.time-line-action i {
  margin-right: 5px;
  color: #565f63;
  cursor: pointer;
}

.hours {
  height: 40px;
  width: 50px;
  text-align: center;
  border-left: 1px solid white;
  display: grid;
  place-items: center center;
  background-color: #05a092;
}

.block-hours {
  padding: 0;
  padding-top: 8px;
  margin: 0;
  z-index: 9999;
  padding-left: 370px;
  border-bottom: 1px solid #9e9e9e6e;
  background-color: white;
  position: sticky;
  top: 0px;
  display: inline-flex;
  align-items: center;
}

.hours span {
  color: white;
}

.inicio-rota, .fim-rota {
  list-style: none;
  position: absolute;

}

.fim-rota i {
  color: white;
  left: 5px;
  position: relative;
  font-size: 18px;
  padding: 4px 8px;
  box-shadow: 1px 1px 1px black;
  border-radius: 3px;
}

.inicio-rota i {
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 16px;
  padding: 4px 8px;
  box-shadow: 1px 1px 1px black;
  border-radius: 3px;
  z-index: 99;
}

.datetime-select {
  position: absolute;
  left: 0px;
  margin: 0px 0px;
  width: 370px;
}

.timeline-route .mx-datepicker-popup {
  position: absolute !important;
  top: 0px !important;
  width: 100%;
}

</style>
