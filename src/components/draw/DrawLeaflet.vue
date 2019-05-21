<template>

</template>

<script>
// eslint-disable-next-line
import L from 'leaflet'
// eslint-disable-next-line
import LeafletDraw from 'leaflet-draw'

import { mapActions } from 'vuex'

import MarkerType from '@/enums/MarkerType'
import LayerType from '@/enums/LayerType'
import PolygonType from '@/enums/PolygonType'

L.drawLocal.draw.toolbar.buttons.polygon = ''
L.drawLocal.draw.toolbar.undo.text = 'Deletar ultimo ponto'
L.drawLocal.draw.toolbar.finish.text = 'Finalizar'
L.drawLocal.draw.toolbar.actions.text = 'Cancelar'
L.drawLocal.draw.toolbar.buttons.marker = ''
L.drawLocal.draw.handlers.marker.tooltip.start = 'Clique para criar o marcador'
L.drawLocal.draw.handlers.polygon.tooltip.start = 'Clique para iniciar o desenho do poligono'
L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Clique para continuar o desenho do poligono'
L.drawLocal.draw.handlers.polygon.tooltip.end = 'Clique no primeiro ponto para fechar o poligono'
L.drawLocal.edit.toolbar.actions.save.text = 'Salvar'
L.drawLocal.edit.toolbar.actions.save.title = 'Salvar as mudanças.'
L.drawLocal.edit.toolbar.actions.cancel.text = 'Cancelar'
L.drawLocal.edit.toolbar.actions.cancel.title = 'Cancelar a edição, descartar as mudanças.'
L.drawLocal.edit.toolbar.buttons.edit = ''
L.drawLocal.edit.toolbar.buttons.editDisabled = ''
L.drawLocal.edit.toolbar.buttons.remove = ''
L.drawLocal.edit.toolbar.buttons.removeDisabled = ''
L.drawLocal.edit.handlers.edit.tooltip.text = 'Arraste os pontos para modificar o poligono.'
L.drawLocal.edit.handlers.edit.tooltip.subtext = 'Clicando no cancelar, descarta as mudanças.'
L.drawLocal.edit.handlers.remove.tooltip.text = 'Clique no poligono para remover.'

export default {
  name: 'DrawLeaflet',
  props: {
    mapRef: {
      type: Object
    },
    polygonEdit: {
      type: Object
    }
  },
  data () {
    return {
      map: '',
      editableLayers: '',
      idPolygonSelected: '',
      typePolygonSelected: '',
      polygonSourceTarget: ''
    }
  },
  watch: {
    polygonEdit () {
      this.polygonSourceTarget = this.polygonEdit.polygonSourceTarget
      this.idPolygonSelected = this.polygonEdit.idPolygonSelected
      this.typePolygonSelected = this.polygonEdit.typePolygonSelected
      if (this.polygonSourceTarget !== '') {
        this.editableLayers.addLayer(this.polygonSourceTarget)
      }
    }
  },
  mounted () {
    this.map = this.mapRef

    this.editableLayers = new L.FeatureGroup()
    this.map.addLayer(this.editableLayers)

    const optionsRegianAndPontoAtendimento = {
      position: 'topleft',
      draw: {
        polyline: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        polygon: {
          allowIntersection: true,
          shapeOptions: {
            color: '#3388ff',
            fillColor: '#3388ff',
            opacity: 1
          }
        },
        marker: {
          icon: this.getIconMarker(MarkerType.PA),
          repeatMode: true
        }
      }
    }

    const optionsZonaRestricaoAndCentroDistribuicao = {
      position: 'bottomleft',
      draw: {
        polyline: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        polygon: {
          allowIntersection: true,
          shapeOptions: {
            color: '#f90404',
            fillColor: '#f90404',
            opacity: 1
          }
        },
        marker: {
          icon: this.getIconMarker(MarkerType.CD)
        }
      },
      edit: {
        featureGroup: this.editableLayers,
        remove: true
      }
    }

    const drawControlRegianAndPontoAtendimento = new L.Control.Draw(optionsRegianAndPontoAtendimento)
    this.map.addControl(drawControlRegianAndPontoAtendimento)

    const drawControlZonaRestricaoAndCentroDistribuicao = new L.Control.Draw(optionsZonaRestricaoAndCentroDistribuicao)
    this.map.addControl(drawControlZonaRestricaoAndCentroDistribuicao)

    this.initDrawCreated()
    this.initDrawEdited()
    this.initDrawDeleted()
  },
  methods: {
    ...mapActions([
      'CREATE_CD',
      'CREATE_PA',
      'CREATE_REGIOES',
      'CREATE_ZONA_RESTRICAO',
      'EDIT_ZONA_RESTRICAO',
      'EDIT_REGIAO'
    ]),
    getHtmlIcon: function (type) {
      switch (type) {
        case MarkerType.CD:
          return `
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
        case MarkerType.PA:
          return `
              <svg style="top: -45px; position: relative;" class="e-marker" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72 130.7" width="36">
                <defs>
                  <clipPath id="circle">
                    <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                  </clipPath>
                </defs>

                <path style="fill: #0078a8; stroke: #202223; stroke-width: 1px;" class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
                  C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
                  c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
                  S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
                <path style="fill: white;" class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                <i class="fas fa-user-circle"></i>
              </svg>`
      }
    },
    initDrawCreated: function () {
      this.map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer
        const type = e.layerType

        this.saveNewObjMap(type, layer)
        layer.addTo(this.map)

      }.bind(this), false)
    },
    initDrawEdited: function () {
      this.map.on(L.Draw.Event.EDITED, function (e) {
        const layers = e.layers
        layers.eachLayer(function (layer) {
          this.editPolygon(layer)
        }.bind(this), false)
      }.bind(this), false)
    },
    initDrawDeleted: function () {
      this.map.on(L.Draw.Event.DELETED, function (e) {
        const layers = e.layers
        layers.eachLayer(function (layer) {
          this.deletePolygon(layer)
        }.bind(this), false)
      }.bind(this), false)
    },
    saveNewObjMap: function (type, layer) {
      switch (type) {
        case LayerType.marker:
          if (layer.options.icon.options.html === this.getHtmlIcon(MarkerType.CD)) {
            this.CREATE_CD(this.getLatLong(layer))
          } else if (layer.options.icon.options.html === this.getHtmlIcon(MarkerType.PA)) {
            this.CREATE_PA(this.getLatLong(layer))
          }
          break
        case LayerType.polygon:
          if (layer.options.color === '#3388ff') { // regiao
            this.CREATE_REGIOES(this.getLatLongs(layer))
          } else if (layer.options.color === '#f90404') { // zona restricao
            this.CREATE_ZONA_RESTRICAO(this.getLatLongs(layer))
          }
          break
      }
    },
    editPolygon: function (layer) {
      switch (this.typePolygonSelected) {
        case PolygonType.zona_restricao:
          this.EDIT_ZONA_RESTRICAO({ 'id': this.idPolygonSelected, 'latLong': this.getLatLongs(layer) })
          break
        case PolygonType.regiao:
          this.EDIT_REGIAO({ 'id': this.idPolygonSelected, 'latLong': this.getLatLongs(layer) })
          break
      }
      this.editableLayers.removeLayer(layer)
      layer.addTo(this.map)
      this.typePolygonSelected = ''
      this.idPolygonSelected = ''
      this.polygonSourceTarget = ''
    },
    deletePolygon: function (layer) {
      switch (this.typePolygonSelected) {
        case PolygonType.zona_restricao:
          // this.DELETE_ZONA_RESTRICAO(this.idPolygonSelected)
          break
        case PolygonType.regiao:
          // this.DELETE_REGIAO(this.idPolygonSelected)
          break
      }
      this.editableLayers.removeLayer(layer)
      this.typePolygonSelected = ''
      this.idPolygonSelected = ''
      this.polygonSourceTarget = ''
    },
    getLatLongs: function (layer) {
      const coordinates = []
      const latlngs = layer.getLatLngs()[0]

      for (var i = 0; i < latlngs.length; i++) {
        coordinates.push({ 'lat': latlngs[i].lat, 'lng': latlngs[i].lng })
      }

      return coordinates
    },
    getLatLong: function (layer) {
      const latlng = layer.getLatLng()
      return { 'lat': latlng.lat, 'lng': latlng.lng }
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

                <path style="fill: #0078a8; stroke: #202223; stroke-width: 1px;" class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
                  C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
                  c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
                  S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
                <path style="fill: white;" class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                <i class="fas fa-user-circle"></i>
              </svg>`
          break
      }

      return L.divIcon({ html: iconMarker, iconSize: [30, 30], popupAnchor: [0, -20] })
    }
  }
}

</script>

<style>

@import "../../../node_modules/leaflet-draw/dist/leaflet.draw.css";

.leaflet-editing-icon {
  background-color: white !important;
  border: 1px solid #F44336 !important;
  width: 10px !important;
  height: 10px !important;
  top: 0px;
  margin-left: -7px !important;
  margin-top: -7px !important;
}

.leaflet-bottom .leaflet-draw-draw-polygon:hover:after {
  content: 'Criar uma zona de restrição';
  position: absolute;
  white-space: nowrap;
  top: 2px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-bottom .leaflet-draw-draw-marker:hover:after {
  content: 'Criar um novo centro de distribuição';
  position: absolute;
  white-space: nowrap;
  top: 32px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-top .leaflet-draw-draw-polygon:hover:after {
  content: 'Criar uma região';
  position: absolute;
  white-space: nowrap;
  top: 2px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-top .leaflet-draw-draw-marker:hover:after {
  content: 'Criar um novo ponto de atendimento';
  position: absolute;
  white-space: nowrap;
  top: 32px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-draw-draw-polygon:hover:before {
  content: "";
  position: absolute;
  top: 25%;
  right: -17%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.leaflet-draw-draw-marker:hover:before {
  content: "";
  position: absolute;
  top: 70%;
  right: -17%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.leaflet-bottom.leaflet-left > .leaflet-draw {
  position: fixed;
  top: 125px;
}

.leaflet-draw-edit-edit.leaflet-disabled:hover:after {
  content: 'Click em um poligono para abilitar essa função';
  position: absolute;
  white-space: nowrap;
  top: 2px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-draw-edit-edit:not(.leaflet-disabled):hover:after {
  content: 'Editar o poligono';
  position: absolute;
  white-space: nowrap;
  top: 2px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-draw-edit-edit:hover:before {
  content: "";
  position: absolute;
  top: 26%;
  right: -17%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.leaflet-draw-edit-remove.leaflet-disabled:hover:after {
  content: 'Click em um poligono para abilitar essa função';
  position: absolute;
  white-space: nowrap;
  top: 32px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-draw-edit-remove:not(.leaflet-disabled):hover:after {
  content: 'Remover o poligono';
  position: absolute;
  white-space: nowrap;
  top: 32px;
  left: 40px;
  background-color: #555555;
  color: white;
  padding: 0px 10px;
  border-radius: 5px;
}

.leaflet-draw-edit-remove:hover:before {
  content: "";
  position: absolute;
  top: 70%;
  right: -17%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #555 transparent transparent;
}

.leaflet-bar a.leaflet-disabled {
  cursor: no-drop !important;
}

</style>
