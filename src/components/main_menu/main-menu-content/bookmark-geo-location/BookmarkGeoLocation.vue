<template>

  <div class="menu-pointer map-main-menu-content transparent">
    <form id="form-geoLoca" class="form" @submit.prevent="checkForm">

      <div class="form-block">
        <span class="title">Rua</span>
        <div class="input-block">
        <input id="rua" placeholder="Rua" type="text" v-model="endereco.rua" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Numero</span>
        <div class="input-block">
        <input id="numero" placeholder="Numero" type="number" v-model="endereco.numero" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Bairro</span>
        <div class="input-block">
        <input id="bairro" placeholder="Bairro" type="text" v-model="endereco.bairro" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Cidade</span>
        <div class="input-block">
        <input id="cidade" placeholder="Cidade" type="text" v-model="endereco.cidade" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Estado</span>
        <div class="input-block">
        <input id="estado" placeholder="Estado" type="text" v-model="endereco.estado" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Cep</span>
        <div class="input-block">
        <input id="cep" placeholder="Cep" type="text" v-model="endereco.cep" >
        </div>
      </div>

      <div class="form-block">
        <span class="title">Mover marcador</span>
        <div class="input-block">
          <label class="switch">
            <input v-model="endereco.draggable" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div class="form-block">
        <span class="title">Latitude</span>
        <div class="input-block">
          <input id="lat" type="text" v-model="endereco.latLng.lat" readonly>
        </div>
      </div>
      <div class="form-block">
        <span class="title">Longitude</span>
        <div class="input-block">
          <input id="long" type="text" v-model="endereco.latLng.lng" readonly>
        </div>
      </div>

      <div class="form-submit">
        <input type="submit" value="Salvar">
      </div>

    </form>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BookmarkGeoLocation',
  props: {
    enderecoMarker: {
      type: Object
    }
  },
  data () {
    return {
      endereco: this.enderecoMarker,
      error: ''
    }
  },
  watch: {
    enderecoMarker () {
      this.endereco = this.enderecoMarker
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_ADDRESS'
    ]),
    checkForm: function (e) {
      this.errorsValidate = []
      if (!this.endereco.latitude || this.endereco.latitude === '0') {
        this.errorsValidate.push('Informe a latitude.')
        return
      }
      if (!this.endereco.longitude || this.endereco.longitude === '0') {
        this.errorsValidate.push('Informe a longitude.')
        return
      }
      this.UPDATE_ADDRESS(this.endereco)
    }
  }
}

</script>

<style>

#form-geoLoca {
    background-color: white;
}

.form {
    padding: 6px;
    background-color: white;
}

.form-block {
    margin: 6px 6px;
}

.form-block .title {
    line-height: 28px;
    color: #565f63;
    float: left;
    width: 100%;
    word-wrap: break-word;
}

.input-block {
    display: block;
}

.input-block input[type='text'], .input-block input[type='number'] {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 6px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:read-only {
  background-color: #f4433614 !important;
  cursor: no-drop;
}

.form-submit {
    padding: 0 13px 30px 13px;
    margin-top: 20px;
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

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 3px;
}

.switch input[type='checkbox'] {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider.round {
    border-radius: 34px;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider.round:before {
    border-radius: 50%;
}

</style>
