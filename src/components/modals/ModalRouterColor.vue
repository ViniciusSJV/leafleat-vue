<template>
  <div>
    <modal-default v-if="modalRouterColorOpen">
      <div slot="header">
        <span>Selecione uma cor para a rota</span>
      </div>
      <div slot="body">
        <color-router v-on:colorChange="colorChange"></color-router>
      </div>
      <div slot="footer">
        <input class="actionModal" v-on:click="changeRouterColor()" type="submit" value="Salvar">
        <input class="closeModal" v-on:click="closeModalColorRouter()" type="submit" value="Fechar">
      </div>
    </modal-default>
  </div>
</template>

<script>
import ModalDefault from './ModalDefault.vue'
import ColorRouter from '@/components/utils/color-router/ColorRouter.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ModalDefault,
    ColorRouter
  },
  computed: {
    ...mapGetters([
      'routerColorModal',
      'modalRouterColorOpen'
    ])
  },
  data () {
    return {
      selectedColor: ''
    }
  },
  methods: {
    ...mapActions([
      'CLOSE_MODAL_COLOR_ROUTER',
      'CHANGE_COLOR_ROUTER'
    ]),
    closeModalColorRouter: function () {
      this.CLOSE_MODAL_COLOR_ROUTER()
    },
    changeRouterColor: function () {
      const routerColor = {
        id: this.routerColorModal.idRouter,
        color: this.selectedColor
      }
      this.CHANGE_COLOR_ROUTER(routerColor)
    },
    colorChange: function (hex) {
      this.selectedColor = hex
    }
  }
}
</script>

<style>

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
