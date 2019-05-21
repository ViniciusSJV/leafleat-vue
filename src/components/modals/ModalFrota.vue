<template>
  <div>
    <modal-focus-default v-if="modalFrotaOpen">
      <div style="width: 100%;" slot="header">
        <span>Selecione um veiculo</span>
        <div class="search-frota"><input v-model="search" type="text"> <i class="fas fa-search"></i></div>
      </div>
      <div slot="body">
        <ul class="frotas" v-if="frota && frota.length && !loadingFrota">
          <li
            v-for="veiculo of filteredFrota" :key="veiculo.id"
            v-bind:class="{ selected: veiculo.id == selected }"
            v-on:click="selectFrota(veiculo.id)">

            <div class="frota-progress-info">
              <div class="info">
                <i class="fas fa-truck"></i>
                <label class="placa">{{ veiculo.placa }}</label>
              </div>
              <div class="truck-info">
                <div>
                  <span>Motorista:</span>
                  <label>{{ veiculo.motorista }}</label>
                </div>
                <div>
                  <span>Custo:</span>
                  <label>R${{ veiculo.custo }}</label>
                </div>
                <div>
                  <span>Custo por Km:</span>
                  <label>R${{ veiculo.custo_por_km }}</label>
                </div>
              </div>
              <div class="truck-info" v-if="veiculo.dimencoes && veiculo.dimencoes.length">
                <span>Dimenções:</span>
              </div>

              <div class="truck-dimension">
                <div :key="index" v-if="veiculo.dimencoes && veiculo.dimencoes.length" v-for="(dimencao, index) of veiculo.dimencoes">
                  <label class="sub-title">{{ dimencao.nome_dimensao }} :</label>
                  <label>{{ dimencao.valor }}</label>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <p v-if="frota.length == 0" class="error-http">Não existe veiculos disponiveis</p>

        <loading-default v-if="loadingFrota"></loading-default>

      </div>
      <div slot="footer">
        <input class="actionModal" type="submit" value="OK">
        <input class="closeModal" v-on:click="closeModalFrota()" type="submit" value="Fechar">
      </div>
    </modal-focus-default>
  </div>
</template>

<script>
import ModalFocusDefault from './ModalFocusDefault.vue'
import LoadingDefault from '@/components/utils/LoadingDefault.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ModalFocusDefault,
    LoadingDefault
  },
  data () {
    return {
      search: '',
      selected: undefined
    }
  },
  props: {
    idRoute: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'frota',
      'loadingFrota',
      'modalFrotaOpen'
    ]),
    filteredFrota: function () {
      return this.frota.filter((veiculo) => {
        return veiculo.placa.toLowerCase().match(this.search.toLowerCase()) ||
          veiculo.motorista.toLowerCase().match(this.search.toLowerCase()) ||
          veiculo.custo.toString().match(this.search)
      })
    }
  },
  methods: {
    ...mapActions([
      'CLOSE_MODAL_FROTA',
      'RESET_FROTA_SELECTED',
      'SET_FROTA_SELECTED'
    ]),
    selectFrota: function (idFrota) {
      this.selected = idFrota
      this.SET_FROTA_SELECTED(idFrota)
    },
    closeModalFrota: function () {
      this.RESET_FROTA_SELECTED()
      this.CLOSE_MODAL_FROTA()
    }
  }
}
</script>

<style>

.frotas {
    list-style: none;
    padding: 0;
    margin: 0;
}

.search-frota {
    display: block;
    position: relative;
    text-align: center;
    background-color: white;
    width: 100%;
    height: 30px;
    margin-top: 8px;
}

.search-frota input {
    background-color: hsla(0,0%,100%,.3);
    border-radius: 3px;
    border: none;
    color: #607D8B;
    float: left;
    font-size: 13px;
    height: 30px;
    padding-left: 10px;
    padding-right: 30px;
    width: calc(100% - 40px);
}

.search-frota i {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 7px !important;
    z-index: 2;
    color: #33b5e5;
    font-weight: bold;
}

.frota-progress-info {
  padding: 15px;
  border-bottom: 1px solid #9e9e9e66;
}

.frotas li {
  cursor: pointer;
  user-select: none;
}

.frotas li.selected {
  background-color: #9e9e9e38;
}

.frota-progress-info label {
    color: #565f63;
    font-size: 14px;
}

.frota-progress-info .info {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 5px;
}

.frota-progress-info .info i {
    margin-right: 5px;
    color: #565f63;
    float: right;
    cursor: pointer;
}

.truck-info {
    padding: 5px 0px;
}

.truck-info span {
    color: #607d8bb0;
    text-decoration: underline;
    cursor: auto;
    font-size: 14px;
}

.modal-backdrop {
  top: 0;
  right: 0;
}

.modal {
  overflow-x: auto;
}

.closeModal {
  background-color: white;
  border: 2px solid #4285f4;
  color: #4285f4;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  height: 27px;
  padding: 0 8px;
  text-transform: uppercase;
  line-height: 27px;
  border-radius: 2px;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
  display: inline-block;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  margin: 0;
  padding: 7px 30px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

.actionModal {
  border: 1px solid #4285f4;
  background-color: #4285f4;
  cursor: pointer;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  height: 27px;
  padding: 0 8px;
  text-transform: uppercase;
  line-height: 27px;
  border-radius: 2px;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
  display: inline-block;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  margin: 0;
  padding: 8px 30px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

.actionModal:hover, .closeModal:hover {
  box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
}
</style>
