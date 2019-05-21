<template>

<div class="routes-sub-menu">

  <div class="title-routes-sub-menu">
    <h3>Configurações roteirização</h3>
    <i v-on:click="closeSubMenuRouter();" class="fas fa-times"></i>
  </div>

  <form class="form">

    <div class="form-group">
      <div>
        <span class="title">Velocidade</span>
        <div>
          <input type="text" placeholder="KM/Hora">
        </div>
      </div>
    <div>
      <span class="title">Processar por</span>
      <div>
        <input type="text" placeholder="? min">
      </div>
    </div>
    <div>
      <span class="title">Percentual carga</span>
      <div>
        <input type="text" placeholder="?%">
      </div>
      </div>
    </div>

    <div class="form-group-switch piece">
      <div>
        <span class="title">Forçar rota aberta</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div>
        <span class="title">Priorizar por data</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-group-switch piece">
      <div>
        <span class="title">Apenas correções</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div>
        <span class="title">Manter rotas atuais</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-group-switch">
      <div>
        <span class="title">Fundir serviços</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div>
        <span class="title">Limitar jornada de trabalho</span>
        <div>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div>
        <span class="title">Roteirizar por agrupamento</span>
        <div>
          <label class="switch">
            <input id="agrupamento" v-on:click="openGroupOrder" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>

    <div id="radio-agrupamento" class="form-group radio-group" v-bind:class="{ close: !groupOrderOpen }">
      <label class="title">Ordenar eventos por:</label>
      <div>
        <label class="radio">
          <input id="radio1" type="radio" name="radios" checked="">
          Melhor Ordem<span class="outer"><span class="inner"></span></span>
        </label>
      </div>
      <div>
        <label class="radio">
          <input id="radio1" type="radio" name="radios">
          Entregas<span class="outer"><span class="inner"></span></span>
        </label>
      </div>
      <div>
        <label class="radio">
          <input id="radio1" type="radio" name="radios">
          Coletas<span class="outer"><span class="inner"></span></span>
        </label>
      </div>
    </div>

    <div class="form-submit">
      <input type="submit" value="Salvar">
    </div>

  </form>

</div>

</template>

<script>

export default {
  name: 'SettingsRouter',
  props: {
    id_marker: {
      type: Number
    }
  },
  data () {
    return {
      error: '',
      groupOrderOpen: false
    }
  },
  methods: {
    closeSubMenuRouter () {
      this.$emit('closeSubMenuRouter')
    },
    openGroupOrder () {
      this.groupOrderOpen = this.groupOrderOpen !== true
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

.form {
    padding: 6px;
    background-color: white;
}

.form-group {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #9e9e9e52;
    margin-bottom: 10px;
}

.form-group-switch {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #9e9e9e52;
  margin-bottom: 10px;
}

.form-group.piece {
    border: none;
    margin: 0;
    padding: 0;
}

.form-group > div, .form-group-switch > div {
    margin: 5px;
}

.form-group-switch > div {
    min-width: 110px;
}

.form-group .title, .form-group-switch .title {
    width: 100%;
    line-height: normal;
    font-size: 14px;
    color: #565f63;
    float: left;
    word-wrap: break-word;
}

.form-group input[type='text'] {
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

#radio-agrupamento {
    max-height: 353px;
    opacity: 1;
    transition-property: opacity,max-height;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.0,0.0,0.2,1);
}

#radio-agrupamento.close {
    max-height: 0px;
    opacity: 0;
    overflow: hidden;
}

.radio-group {
    display: block !important;
}

.radio-group .title {
    width: 100%;
    line-height: normal;
    color: #565f63;
    word-wrap: break-word;
}

#radio-agrupamento .radio {
    display: inline-block;
    padding-right: 20px;
    font-size: 14px;
    line-height: normal;
    cursor: pointer;
    margin-top: 10px;
    color: #565f63;
}

#radio-agrupamento .radio input[type="radio"] {
    height: 1px;
    width: 1px;
    opacity: 0;
}

#radio-agrupamento .radio .outer {
    height: 20px;
    width: 20px;
    display: block;
    float: left;
    margin: 3px 0px 0px 10px;
    border: 3px solid #9E9E9E;
    border-radius: 50%;
    position: relative;
    top: -8px;
    background-color: #fff;
}

#radio-agrupamento .radio input:checked + .outer {
    border: 3px solid #2196f3;
}

#radio-agrupamento .radio .inner {
    transition: all 0.25s ease-in-out;
    height: 16px;
    width: 16px;
    -webkit-transform: scale(0);
    transform: scale(0);
    display: block;
    margin: 2px;
    border-radius: 50%;
    background-color: #2196f3;
    opacity: 0;
}

#radio-agrupamento .radio input:checked + .outer .inner {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

#radio-agrupamento .radio:hover .inner{
    -webkit-transform: scale(.5);
    transform: scale(.5);
    opacity: .5;
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
