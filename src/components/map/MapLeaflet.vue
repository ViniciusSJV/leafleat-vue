<template>
  <div class="map">

    <l-map ref="map" :zoom="zoom" :center="center" :bounds="bounds">

      <l-control-layers :position="layersPosition"/>

      <l-tile-layer v-for="tileProvider in tileProviders"
        :key="tileProvider.key" layerType="base"
        :name="tileProvider.name" :visible="tileProvider.visible"
        :url="tileProvider.url" :attribution="tileProvider.attribution" />

        <l-marker v-for="markerCD of mapMarkersCD"
          v-on:click="openMainMenuMap(markerCD)"
          :key="markerCD.id"
          :draggable="markerCD.endereco.draggable"
          :lat-lng="markerCD.endereco.latLng"
          :icon="getIconMarker(markerCD.tipo)">
        </l-marker>

      <l-cluster :options="{maxClusterRadius: 30}">

        <l-marker  v-for="markerPA of mapMarkersPA"
          v-on:click="openMainMenuMap(markerPA)"
          v-on:mouseover="openModalMarker(markerPA)"
          v-on:mouseleave="closeModalMarker()"
          :key="markerPA.id"
          :draggable="markerPA.endereco.draggable"
          :visible="markerPA.show"
          :lat-lng="markerPA.endereco.latLng"
          :icon="getIconMarker(markerPA.tipo)">
        </l-marker>

      </l-cluster>

        <div v-for="(item, index) in routers" :key="index" >

          <l-cluster :options="{maxClusterRadius: 30}">

              <l-marker v-for="marker in item.markers"
                v-on:click="openMainMenuMap(marker)"
                v-on:mouseover="openModalMarker(marker)"
                v-on:mouseleave="closeModalMarker()"
               :key="marker.id"
               :draggable="marker.endereco.draggable"
               :visible="item.show"
               :lat-lng="marker.endereco.latLng"
               :icon="getIconMarkerRouter(item.color, marker.ordem, marker.info.tipo_servico)">
             </l-marker>

          </l-cluster>

          <l-polyline
            v-on:click="openRouterMenuMap(item.idRouter)"
            v-on:mouseover="openModalRouter($event, item)"
            v-on:mouseleave="closeModalRouter($event)"
            :key="item.idRouter"
            :visible="item.show"
            :lat-lngs="item.polylines"
            :weight="weight"
            :color="item.color"
            :opacity="opacity">
          </l-polyline>
        </div>

      <draw-leaflet v-bind:mapRef="this.mapRef" v-bind:polygonEdit="{typePolygonSelected: this.typePolygonSelected, idPolygonSelected: this.idPolygonSelected, polygonSourceTarget: this.polygonSourceTarget}"></draw-leaflet>

      <l-polygon
        v-for="zonaRestricao in zonasDeRestricao" :key="zonaRestricao.id"
        :lat-lngs="zonaRestricao.polygons[0]"
        :color="'#f90404'"
        :fillColor="'#f90404'"
        v-on:click="editPolygon($event, zonaRestricao.id, 'zona_restricao')">
      </l-polygon>

      <l-polygon
        v-for="regiao in regioes" :key="regiao.id"
        :lat-lngs="regiao.polygons[0]"
        :color="'#3388ff'"
        :fillColor="'#3388ff'"
        v-on:click="editPolygon($event, regiao.id, 'regiao')">
      </l-polygon>

    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlLayers, LMarker, LPopup, LPolyline, LPolygon } from 'vue2-leaflet'
import LCluster from 'vue2-leaflet-markercluster'

import DrawLeaflet from '@/components/draw/DrawLeaflet.vue'

import { mapGetters, mapActions } from 'vuex'

import MarkerType from '@/enums/MarkerType'

// eslint-disable-next-line
import L from 'leaflet'

const attribution = '&copy; Powered by <a href="http://agileprocess.com.br" target="_blank" title="Agile Process. Boost yourself">Agile Process</a>'

const tileProviders = [
  {
    key: 'padrao',
    name: 'Padrão',
    visible: true,
    attribution: attribution,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    key: 'amarelo',
    name: 'Padrão Amarelo',
    visible: false,
    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: attribution
  },
  {
    key: 'satelite',
    name: 'Satélite',
    visible: false,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: attribution
  }
]

export default {
  name: 'MapLeaflet',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LCluster,
    LPolyline,
    LControlLayers,
    DrawLeaflet,
    LPolygon
  },
  computed: {
    ...mapGetters([
      'mapMarkersCD',
      'mapMarkersPA',
      'routers',
      'bounds',
      'zonasDeRestricao',
      'regioes'
    ])
  },
  data () {
    return {
      zoom: 13,
      center: new L.LatLng(-14.8, -49.4),
      tileProviders: tileProviders,
      maxZoom: 18,
      layersPosition: 'bottomright',
      id: 'agileprocess.streets',
      opacity: 0.8,
      weight: 10,
      mapRef: '',
      typePolygonSelected: '',
      idPolygonSelected: '',
      polygonSourceTarget: ''
    }
  },
  mounted () {
    this.mapRef = this.$refs.map.mapObject
  },
  methods: {
    ...mapActions([
      'SET_MARKER_MODAL',
      'SET_ROUTER_MODAL',
      'CLOSE_MODAL_MARKER',
      'CLOSE_MODAL_ROUTER'
    ]),
    getIconMarkerRouter: function (color, ordem, tipoServico) {
      const icone = `
            <span class="ordem">` + ordem + `</span>
            <svg style="top: -45px; position: relative;" class="e-marker" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72 130.7" width="36">
                <defs>
                    <clipPath id="circle">
                        <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                    </clipPath>
                </defs>
                <path style="fill: ` + color + `; stroke: #202223; stroke-width: 1px;" class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
                  C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
                  c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
                  S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
                <path style="fill: white;" class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
            </svg>
            <span class="text-svg">` + tipoServico.toUpperCase() + `</span>`

      return L.divIcon({ html: icone, iconSize: [30, 30], popupAnchor: [0, -20] })
    },
    getIconMarker: function (tipo) {
      let iconMarker

      switch (tipo) {
        case MarkerType.CD:
          iconMarker = `
                <svg style="top: -45px; position: relative;" class="e-marker" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72 130.7" width="36">
                  <defs>
                    <clipPath id="circle">
                      <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                    </clipPath>
                  </defs>

                  <path style="fill: #565f63; stroke: #202223; stroke-width: 1px;" class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
                    C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
                    c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
                    S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
                  <path style="fill: white;" class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                  <i class="fas fa-boxes"></i>
              </svg>`
          break
        case MarkerType.PA:
          iconMarker = `
              <svg style="top: -45px; position: relative;" class="e-marker" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72 130.7" width="36">
                <defs>
                  <clipPath id="circle">
                    <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                  </clipPath>
                </defs>

                <path style="fill: #607D8B; stroke: #202223; stroke-width: 1px;" class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
                  C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
                  c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
                  S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
                <path style="fill: white;" class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                <i class="fas fa-user"></i>
              </svg>`
          break
      }

      return L.divIcon({ html: iconMarker, iconSize: [30, 30], popupAnchor: [0, -20] })
    },
    openMainMenuMap: function (marker) {
      this.$emit('openMainMenuMap', marker)
    },
    openRouterMenuMap: function (idRouter) {
      this.$emit('openRouterMenuMap', idRouter)
    },
    openModalMarker: function (marker) {
      this.SET_MARKER_MODAL(marker)
    },
    closeModalMarker: function () {
      this.CLOSE_MODAL_MARKER()
    },
    openModalRouter: function (event, router) {
      this.SET_ROUTER_MODAL(router)
      this.changeStyleRouter(event)
    },
    closeModalRouter: function (event) {
      this.CLOSE_MODAL_ROUTER()
      this.resetStyleRouter(event)
    },
    changeStyleRouter: function (event) {
      event.target.setStyle({weight: '20', opacity: '1'})
      event.target.bringToFront()
    },
    resetStyleRouter: function (event) {
      event.target.setStyle({weight: '10', opacity: '0.8'})
    },
    editPolygon: function (event, idPolygon, typePolygon) {
      this.typePolygonSelected = typePolygon
      this.idPolygonSelected = idPolygon
      this.polygonSourceTarget = event.sourceTarget
    }
  }
}
</script>

<style>

@import "../../../node_modules/leaflet/dist/leaflet.css";
@import "../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
@import "../../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";

.map {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.leaflet-marker-icon.leaflet-interactive {
    border-radius: 50%;
    text-align: center;
    background-color: transparent;
    border: none;
    z-index: 8000 !important;
}

.leaflet-marker-icon.leaflet-interactive i {
  top: -89px;
  position: relative;
  z-index: 9999;
  left: 2.5px;
  font-size: 17px;
  color: #495057;
}

.leaflet-marker-icon.leaflet-interactive .text-svg {
  top: -92px;
  position: relative;
  z-index: 9999;
  left: 2.5px;
  font-size: 17px;
  color: #565f63;
  font-weight: 700;
}

.leaflet-marker-icon.leaflet-interactive .ordem {
  background: #FFF;
  background-clip: padding-box;
  color: #000;
  border: 1px solid #3c3c3c;
  display: block;
  font: 8px/12px Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  padding: 2px 5px;
  position: absolute;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  left: 30px;
  bottom: 45px;
  z-index: 6;
  border-radius: 50%;
}

.marker-select i {
  border-color: red;
}

.marker-cluster-small div {
    background-color: #00BCD4;
    color: white;
}

.marker-cluster span {
    line-height: 30px;
    font-weight: 700;
}

.leaflet-popup-content {
    color: #565f63;
}

.leaflet-popup-content p {
    margin: 7px 0;
}

.leaflet-popup-content div {
    display: inline-grid;
}

.leaflet-control-zoom {
  display:none;
}

.leaflet-top {
    top: 40px;
    z-index: 100000;
}

.hover {
  stroke-opacity: 1;
  stroke-width: 20;
}

.pin {
  color: #565f63 !important;
  background-color: transparent !important;
  border-radius: 0% !important;
  font-size: 30px !important;
  padding: 0 !important;
  border: none !important;
}

.pin:after {
  display: none;
}

</style>
