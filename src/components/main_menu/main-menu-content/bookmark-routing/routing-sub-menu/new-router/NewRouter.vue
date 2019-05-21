route-info<template>

  <div class="routes-sub-menu">

  <div class="title-routes-sub-menu">
    <h3>Criar rota manual</h3>
    <i v-on:click="closeSubMenuRouter();" class="fas fa-times"></i>
  </div>

  <ul id="new-router" class="routes-menu" v-if="frota && frota.length && !loadingFrota">
    <li v-for="veiculo of frota" :key="veiculo.id">
      <div class="route-info">
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

        <div class="form-submit">
          <input type="submit" value="Criar rota">
        </div>
      </div>
    </li>
  </ul>

  <p v-if="error && error.length" class="error-http">{{error}}</p>

  <p v-if="frota.length == 0" class="error-http">Não existe veiculos disponiveis</p>

  <loading-default v-if="loadingFrota"></loading-default>

</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingDefault from '@/components/utils/LoadingDefault.vue'

export default {
  name: 'NewRouter',
  components: {
    LoadingDefault
  },
  props: {
    idCd: {
      type: Number
    }
  },
  data () {
    return {
      dataRota: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters([
      'frota',
      'loadingFrota'
    ])
  },
  created () {
    this.GET_FROTA_BY_ID_CD(this.idCd)
  },
  methods: {
    ...mapActions([
      'GET_FROTA_BY_ID_CD'
    ]),
    closeSubMenuRouter () {
      this.$emit('closeSubMenuRouter')
    }
  }
}

</script>

<style>

.title-routes-sub-menu {
  background-color: white;
  display: flex;
  align-items: center;
  padding: 8px;
  position: relative;
  z-index: 1;
}

.title-routes-sub-menu h3 {
  color: #565f63;
  margin: 10px 0px;
}

.title-routes-sub-menu i {
  position: absolute;
  color: #565f63;
  right: 0px;
  margin-right: 13px;
  cursor: pointer;
  font-weight: 700;
}

.routes-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

#new-router.routes-menu li {
  cursor: auto;
}

.routes-menu li {
  padding: 10px 15px;
  border-bottom: .1px solid #dedede;
  margin-bottom: 1px;
  background-color: white;
  cursor: pointer;
}

.routes-menu li .route-info {
  width: 100%;
  margin-bottom: 5px;
}

.route-info .info {
  display: inline-flex;
  align-items: center;
}

.route-info i {
  margin-right: 5px;
  margin-left: 0px;
  color: #565f63;
  float: right;
}

.route-info label {
  color: #565f63;
  font-size: 14px;
}

.placa {
  text-transform: uppercase;
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

.truck-info.size {
  margin-bottom: 10px;
}

.truck-info .truck-dimension {
  display: inline-flex;
  align-items: center;
  margin-top: 5px;
}

.truck-dimension .sub-title {
  font-weight: 600;
  font-size: 14px;
}

.form-submit {
  padding: 0 13px 30px 13px;
}

.form-submit input[type='submit'] {
  border: 1px solid #4CAF50;
  cursor: pointer;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  height: 27px;
  padding: 0 8px;
  line-height: 27px;
  border-radius: 2px;
  transition: all 0.218s;
  background-color: #4CAF50;
  display: inline-block;
  box-sizing: content-box;
  float: right;
  margin: 0;
  min-width: 54px;
  background-image: -webkit-linear-gradient(#8BC34A,#8bc34a73);
  background-image: linear-gradient(#8BC34A,#8bc34a73);
}

</style>
