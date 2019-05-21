<template>

  <div class="services-without-route">
    <div class="services-without-route-list">
      <div v-for="(markerPA, index) of mapMarkersPA" :key="markerPA.id"
        v-on:click="changeBounds(markerPA.endereco.latLng)"
        v-on:mouseover="setMarkerModalPa(markerPA)"
        v-on:mouseleave="closeModalMarkerPa()"
        v-bind:class="{ 'small': calcHeightIcon(markerPA.info.tempo_atendimento), 'deadline-expired': serviceDeadlineExpired(markerPA.deadline) }"
        v-bind:style="{ width: calcWidth(markerPA.info.tempo_atendimento) }">
        {{ index + 1 }}
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MapLeaflet',
  computed: {
    ...mapGetters([
      'mapMarkersPA',
      'dateSelected'
    ])
  },
  methods: {
    ...mapActions([
      'SET_BOUNDS',
      'SET_MARKER_MODAL',
      'CLOSE_MODAL_MARKER'
    ]),
    setMarkerModalPa: function (marker) {
      this.SET_MARKER_MODAL(marker)
    },
    closeModalMarkerPa: function () {
      this.CLOSE_MODAL_MARKER()
    },
    changeBounds: function (latLng) {
      let latLngBounds = []
      latLngBounds.push(latLng)
      this.SET_BOUNDS(latLngBounds)
    },
    serviceDeadlineExpired (deadline) {
      const deadlineDate = new Date(deadline)
      const dateSelectedDate = new Date(this.dateSelected)

      if (deadlineDate < dateSelectedDate) {
        return true
      }
      return false
    },
    calcHeightIcon (tempoOperacao) {
      if (tempoOperacao < 6) {
        return true
      }
      return false
    },
    calcWidth (tempoOperacao) {
      // 1.666 representa quanto vale o pixel por minuto 1min. = 1.666px.
      const tamanho = tempoOperacao * 1.666
      return tamanho + 'px'
    }
  }
}

</script>

<style>

.services-without-route {
  width: 100%;
  height: 110px;
  position: relative;
  bottom: 0;
  background-color: white;
  max-height: 120px;
  overflow-y: scroll;
}

.services-without-route-list {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 10px;
  width: calc(100% - 22px);
  border: 1px solid black;
}

.deadline-expired {
  background-image: repeating-linear-gradient(45deg, transparent 5px, transparent 7px, rgba(217, 83, 79, 1) 10px, rgba(217, 83, 79, 1) 10px), repeating-linear-gradient(-45deg, transparent 5px, transparent 9px, rgba(217, 83, 79, 1) 8px, rgba(217, 83, 79, 1) 10px);
  text-shadow: 1px 1px 1px white;
}

.services-without-route-list > div {
  border-width: 1px;
  border-style: solid;
  border-color: #607D8B;
  text-align: center;
  cursor: pointer;
  background-color: white;
  box-shadow: 1px 1px 1px black;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  font-size: 13px;
  border-radius: 3px;
}

.services-without-route-list > div:hover {
  font-size: 18px;
  color: white !important;
  min-width: 24px !important;
  z-index: 99999;
  background-color: #4CAF50;
  font-size: 18px;
  border-color: #4CAF50 !important;
}

.small {
  font-size: 0px;
}

</style>
