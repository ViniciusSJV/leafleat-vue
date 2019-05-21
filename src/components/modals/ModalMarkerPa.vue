<template>
  <div>
    <modal-default v-if="modalMarkerOpen">
      <div slot="header">
        <label>{{ this.markerModal.info.nome }}</label>
      </div>
      <div slot="body">
        <div class="body-div"><label>Endereço:</label> <div><span>{{ this.markerModal.endereco.rua }}</span></div></div>
        <div class="body-div"><label>Bairro:</label> <div><span>{{ this.markerModal.endereco.bairro }}</span></div></div>
        <div><label>Municipio:</label> <div><span>{{ this.markerModal.endereco.cidade }}/{{ this.markerModal.endereco.estado }}</span></div></div>

        <div v-if="this.markerModal.inicio_atendimento !== undefined" class="separado"><label>Chegada:</label> <div><span>  {{ montaChegada }}</span></div></div>
        <div class="separado"><label>Tempo de operação:</label> <div><span>  {{ this.markerModal.info.tempo_atendimento }} min</span></div></div>

      </div>
      <div slot="footer">
        <div v-if="this.markerModal.info.dimencoes.length != 0">
          <label>{{ this.markerModal.info.dimencoes[0].nome_dimensao }}: </label><span>{{ this.markerModal.info.dimencoes[0].valor }}</span>
        </div>
        <div v-if="this.markerModal.quant_atendimento">
          <label>Atendimentos: </label><span>{{ this.markerModal.quant_atendimento }}</span>
        </div>
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
      'markerModal',
      'modalMarkerOpen'
    ]),
    montaChegada: function () {
      const horaInicio = parseInt(this.markerModal.inicio_atendimento.split(':')[0])
      const minInicio = parseInt(this.markerModal.inicio_atendimento.split(':')[1])

      return horaInicio + 'h' + minInicio
    }
  }
}
</script>
