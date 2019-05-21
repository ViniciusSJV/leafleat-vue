<template>
  <div class="datetime-route">
    <date-picker
      v-model="date"
      lang="pt-br"
      format="DD/MM/YYYY"
      :disabled-days="this.routersDates"
      :not-before="this.fistRouter"
      :not-after="this.lastRouter"
      :disabled="loading"
      placeholder="Pesquisar rotas por data de execução"
      @change="this.getRouters">
    </date-picker>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'RouteDate',
  components: {
    DatePicker
  },
  props: {
    idMarker: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'idSelectedMarkerCD',
      'routersDates',
      'fistRouter',
      'lastRouter',
      'dateSelected',
      'loading'
    ])
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    ...mapActions([
      'SET_SELECTED_MARKER_CD',
      'GET_DATAS_ROTAS_CRIADAS_ID_CD',
      'GET_ROUTERS',
      'RESET_MAP',
      'RESET_PA_MAP',
      'SET_DATE_SELECTED',
      'CLEAN_DATE_SELECTED'
    ]),
    getRouters: function () {
      this.SET_DATE_SELECTED(this.date)
      this.RESET_MAP()

      let dd = this.date.getDate()
      let mm = this.date.getMonth() + 1 // Janeiro é 0!
      const yyyy = this.date.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }

      const dateRoute = yyyy + '-' + mm + '-' + dd
      const parameters = {'idMarker': this.idMarker, 'date': dateRoute}
      this.GET_ROUTERS(parameters)
    }
  },
  created () {
    if (this.idMarker !== this.idSelectedMarkerCD) {
      this.SET_SELECTED_MARKER_CD(this.idMarker)
      this.GET_DATAS_ROTAS_CRIADAS_ID_CD(this.idMarker)
      this.date = ''
    } else {
      this.date = this.dateSelected
    }
  },
  watch: {
    idMarker () {
      this.GET_DATAS_ROTAS_CRIADAS_ID_CD(this.idMarker)
      this.CLEAN_DATE_SELECTED()
      this.date = ''
    }
  }
}

</script>

<style>

.datetime-route .mx-input {
  font-size: 16px;
  color: #565f63;
  height: 40px;
  margin-top: 0px;
  border-radius: 0px;
  border: none;
  box-shadow: none;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}

.datetime-route .mx-datepicker {
  width: 100%;
}

.datetime-route .mx-calendar {
  width: 100%;
}

.datetime-route .mx-calendar-content {
  width: 100%;
}

.datetime-route .mx-calendar-content .cell:not(.disabled) {
  color: white !important;
  background-color: #03A9F4 !important;
  border: 1px solid white;
}

.mx-calendar-content .cell:not(.disabled).actived {
  background-color: #FF9800 !important;
}

</style>
