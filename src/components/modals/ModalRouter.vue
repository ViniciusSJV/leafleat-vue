<template>
  <div>
    <modal-default v-if="modalRouterOpen">
      <div slot="header">
        <div><label>{{ this.routerModal.placa_veiculo }}</label></div>
      </div>
      <div slot="body">

        <div class="body-div">
          <label>Atendimentos:</label>
          <div><span>{{ this.routerModal.qtd_atendimentos }}</span></div>
        </div>

        <div class="body-div">
          <label>Distancia:</label>
          <div><span>{{ this.routerModal.km_total }} km</span></div>
        </div>

        <div class="body-div">
          <label>Tempo:</label>
          <div><span>{{ this.routerModal.tempo }} min ({{ getTempoEmHoras(this.routerModal.tempo) }}hrs Aprox.)</span></div>
          <div class="progress-modal">
            <div id="time">
              <div class="progressPorcent" v-bind:class="{ 'danger': this.routerModal.porcent_tempo >= 100, 'alert': this.routerModal.porcent_tempo > 90 && this.routerModal.porcent_tempo < 100 }" v-bind:style="{ width: this.routerModal.porcent_tempo + '%' }" >{{this.routerModal.porcent_tempo}}%</div>
            </div>
          </div>
        </div>

        <div v-if="this.routerModal.dimensoes.entrega.length" class="body-div">
          <label>Dimenção:</label>
          <div>
            <span>{{ this.routerModal.dimensoes.entrega[0].nome_dimensao }} {{ this.routerModal.dimensoes.entrega[0].valor }}</span>
          </div>
          <div class="progress-modal">
            <div id="weight">
              <div class="progressPorcent" v-bind:class="{ 'danger': this.routerModal.porcent_dimensao >= 100, 'alert': this.routerModal.porcent_dimensao > 90 && this.routerModal.porcent_dimensao < 100 }" v-bind:style="{ width: this.routerModal.porcent_dimensao + '%' }" >{{this.routerModal.porcent_dimensao}}%</div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer">
          <div class="body-div"><label>Custo fixo: </label><span>R${{ this.routerModal.custo_fixo }}</span></div>
          <div class="body-div"><label>Custo variavel: </label><span>R${{ this.routerModal.custo_variavel }}</span></div>
      </div>
    </modal-default>
  </div>
</template>

<script>
import ModalDefault from './ModalDefault.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    ModalDefault
  },
  computed: {
    ...mapGetters([
      'routerModal',
      'modalRouterOpen'
    ])
  },
  methods: {
    getTempoEmHoras: function (tempo) {
      if (tempo > 60) {
        let horas = tempo / 60
        return Math.round(horas)
      }

      return tempo
    }
  }
}
</script>
