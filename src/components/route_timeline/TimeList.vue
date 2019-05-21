<template>
  <div class="timelist">
    <div v-for="marker of this.markers" :key="marker.id" class="time-line-list-item"
        v-bind:style="{ left: calcLeft(marker.inicio_atendimento) }">
        <div class="item"
          v-bind:class="{ 'small': calcHeightIcon(marker.tempo_execusao), 'deadline-expired': serviceDeadlineExpired(marker.deadline) }"
          v-bind:style="{ color: color, width: calcWidth(marker.tempo_execusao), borderColor: color }"
          v-on:click="changeBounds(marker.endereco.latLng)"
          v-on:mouseover="setMarkerModalPa(marker)"
          v-on:mouseleave="closeModalMarkerPa()">
          {{ marker.ordem }}
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TimeList',
  props: {
    markers: {
      type: Array
    },
    color: {
      type: String
    },
    closeRoute: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'dateSelected'
    ])
  },
  methods: {
    ...mapActions([
      'SET_BOUNDS',
      'SET_MARKER_MODAL',
      'CLOSE_MODAL_MARKER'
    ]),
    changeBounds: function (latLng) {
      let latLngBounds = []
      latLngBounds.push(latLng)
      this.SET_BOUNDS(latLngBounds)
    },
    setMarkerModalPa: function (marker) {
      this.SET_MARKER_MODAL(marker)
    },
    closeModalMarkerPa: function () {
      this.CLOSE_MODAL_MARKER()
    },
    serviceDeadlineExpired (deadline) {
      const deadlineDate = new Date(deadline)
      const dateSelectedDate = new Date(this.dateSelected)

      if (deadlineDate < dateSelectedDate) {
        return true
      }
      return false
    },
    calcWidth (tempoOperacao) {
      // 1.666 representa quanto vale o pixel por minuto 1min. = 1.666px.
      const tamanho = tempoOperacao * 1.666
      return tamanho + 'px'
    },
    calcHeightIcon (tempoOperacao) {
      if (tempoOperacao < 6) {
        return true
      }
      return false
    },
    calcLeft (horaMinInicio) {
      const horaInicio = parseInt(horaMinInicio.split(':')[0])
      const minInicio = parseInt(horaMinInicio.split(':')[1])

      const bordas = (horaInicio * 3)

      const escalaTamanhoPorHora = (horaInicio * 2) * 50
      const escalaTamanhoPorMinuto = (minInicio * 1.666)

      const left = escalaTamanhoPorHora + escalaTamanhoPorMinuto

      return left + bordas + 'px'
    }
  }
}

</script>

<style>

.timelist {
  display: inline-flex;
  align-items: center;
}

.time-line-list-item {
  height: auto;
  cursor: pointer;
  position: absolute;
  display: inline-flex;
  align-items: center;
}

.item {
  border-width: 1px;
  border-style: solid;
  text-align: center;
  cursor: pointer;
  line-height: 20px;
  border-radius: 3px;
  background-color: white;
  overflow: hidden;
  box-shadow: 1px 1px 1px black;
}

.time-line-list-item .item:hover {
  font-size: 18px;
  color: white !important;
  min-width: 24px !important;
  z-index: 99999;
  background-color: #4CAF50;
  font-size: 18px;
  border-color: #4CAF50 !important;
}

.deadline-expired {
  background-image: repeating-linear-gradient(45deg, transparent 5px, transparent 7px, rgba(217, 83, 79, 1) 10px, rgba(217, 83, 79, 1) 10px), repeating-linear-gradient(-45deg, transparent 5px, transparent 9px, rgba(217, 83, 79, 1) 8px, rgba(217, 83, 79, 1) 10px);
  text-shadow: 1px 1px 1px white;
}

.small {
  font-size: 0px;
}

</style>
