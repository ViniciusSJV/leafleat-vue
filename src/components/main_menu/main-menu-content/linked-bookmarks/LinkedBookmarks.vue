<template>
  <div class="menu-pointer map-main-menu-content transparent">
    <ul  v-if="mapMarkersPA && mapMarkersPA.length && !loading" class="pointer-info" id="pointer-info">

      <li v-for="PA of mapMarkersPA" :key="PA.id" v-on:click="changeBounds(PA)">
        <div>
          <i class="fas fa-user"></i>
        </div>
        <div>
          <label>{{PA.info.nome}}</label>
          <label>{{ PA.info.codigo_cliente }}</label>
        </div>
      </li>

    </ul>

    <div class="empty" v-if="mapMarkersPA.length === 0 && !loading">
      <h1>Não há pontos neste centro</h1>
      <p>Não foram encontrados pontos de atendimentos para este centro de distribuição.</p>
    </div>

    <loading-default v-if="loading"></loading-default>

  </div>
</template>

<script>
import LoadingDefault from '@/components/utils/LoadingDefault.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LinkedBookmarks',
  components: {
    LoadingDefault
  },
  props: {
    idMarker: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'mapMarkersPA',
      'loading'
    ])
  },
  created () {
    this.GET_MAP_PA(this.idMarker)
  },
  watch: {
    idMarker () {
      this.GET_MAP_PA(this.idMarker)
    }
  },
  methods: {
    ...mapActions([
      'GET_MAP_PA',
      'SET_BOUNDS'
    ]),
    changeBounds: function (pa) {
      let latLngBounds = []
      latLngBounds.push(pa.endereco.latLng)
      this.SET_BOUNDS(latLngBounds)
      pa.selecionado = true
    }
  }
}

</script>

<style scoped>

.pointer-info {
    list-style: none;
    padding: 0;
    margin: 0;
}

.pointer-info li {
    padding: 10px 15px;
    align-items: center;
    display: flex;
    border-bottom: .1px solid #dedede;
    margin-bottom: 1px;
    background-color: white;
    cursor: pointer;
}

.pointer-info li div {
    display: inline-grid;
    cursor: pointer;
}

.pointer-info i {
    color: #565f63;
    font-size: 30px;
    margin-right: 10px;
    cursor: pointer;
}

.pointer-info label {
  color: #565f63;
  cursor: pointer;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 360px;
}

.empty {
  padding: 0px 35px;
  text-align: center;
  color: #8a6d3b;
}

</style>
