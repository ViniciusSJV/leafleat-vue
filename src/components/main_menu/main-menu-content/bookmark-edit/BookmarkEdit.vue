<template>
  <div class="menu-pointer map-main-menu-content transparent">
    <form id="form-edit" class="form" @submit.prevent="checkForm" method="post">

      <div class="radio-tipo-servico" v-if="typeMarker !== 'CD'">
        <div>
          <label class="radio">
            <input id="tipo-servico" type="radio" name="radios" v-model="informacao.tipo_servico" value="E">
            Entrega<span class="outer"><span class="inner"></span></span>
          </label>
        </div>

        <div>
          <label class="radio">
            <input id="tipo-servico" type="radio" name="radios" v-model="informacao.tipo_servico" value="C">
            Coleta<span class="outer"><span class="inner"></span></span>
          </label>
        </div>
      </div>

      <div v-if="typeMarker !== 'CD'" class="form-block">
        <span class="title">Codigo</span>
        <div class="input-block">
          <input id="cnpj" placeholder="Código" type="text" v-model="informacao.codigo" >
        </div>
      </div>

      <div v-if="typeMarker === 'CD'" class="form-block">
        <span class="title">Codigo</span>
        <div class="input-block">
        <input id="codigo" placeholder="Codigo" type="text" v-model="informacao.codigo" >
        </div>
      </div>

      <div v-if="typeMarker !== 'CD'" class="form-block">
        <span class="title">Cód. Cliente</span>
        <div class="input-block">
        <input id="codigo" placeholder="Codigo do cliente" type="text" v-model="informacao.codigo_cliente" >
        </div>
      </div>

      <div v-if="typeMarker !== 'CD'" class="form-block">
        <span class="title">Cód. Rastreio</span>
        <div class="input-block">
        <input id="codigo" placeholder="Codigo rastreio" type="text" v-model="informacao.rastreio" >
        </div>
      </div>

      <div class="form-block">
        <span class="title" v-if="typeMarker === 'CD'">Nome</span>
        <span class="title" v-if="typeMarker !== 'CD'">Razão</span>
        <div class="input-block">
          <input v-if="typeMarker === 'CD'" id="razao" placeholder="Nome" type="text" v-model="informacao.nome" >
          <input v-if="typeMarker !== 'CD'" id="razao" placeholder="Razão" type="text" v-model="informacao.nome" >
        </div>
      </div>

      <div v-if="typeMarker === 'CD'" class="form-block">
        <span class="title">Rastreio</span>
        <div class="input-block">
        <input id="codigo" placeholder="Nome local rastreio" type="text" v-model="informacao.rastreio" >
        </div>
      </div>

      <div v-if="typeMarker !== 'CD'" class="form-block">
        <span class="title">Contato</span>
        <div class="input-block">
          <input id="phone" placeholder="Contato" type="text" v-model="informacao.contato" >
        </div>
      </div>

      <div v-if="typeMarker !== 'CD'" class="form-block">
        <span class="title">Telefone</span>
        <div class="input-block">
          <input id="phone" placeholder="Telefone principal" type="text" v-model="informacao.telefone" >
        </div>
      </div>

      <div v-if="typeMarker === 'CD'" class="form-block">
        <span class="title">Atendimentos</span>

        <div>
          <div class="time-block">
            <date-picker @change="this.changeHourAtendimentoInicial" v-model="inicioAtendimento" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Iniciar as"></date-picker>

            <date-picker @change="this.changeHourAtendimentoFinal" v-model="finalAtendimento" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Encerrar as"></date-picker>
          </div>
        </div>

      </div>

      <div class="form-block">
        <span class="title">Horários</span>

        <div>
          <div class="time-block">
            <date-picker @change="this.changeHourInicioTurnoA" v-model="inicoTurnoA" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Inicio turno A"></date-picker>

            <date-picker @change="this.changeHourFimTurnoA" v-model="finalTurnoA" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Fim turno A"></date-picker>
          </div>
        </div>

        <div>
          <div class="time-block">
            <date-picker @change="this.changeHourInicioTurnoB" v-model="inicoTurnoB" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Inicio turno B"></date-picker>

            <date-picker @change="this.changeHourFimTurnoB" v-model="finalTurnoB" lang="pt-br" type="time" format="HH:mm:ss" placeholder="Fim turno B"></date-picker>
          </div>
        </div>

      </div>

      <div class="form-submit">
        <input type="submit" value="Salvar">
      </div>

    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapActions } from 'vuex'

export default {
  name: 'BookmarkEdit',
  components: {
    DatePicker
  },
  props: {
    informacaoMarker: {
      type: Object
    },
    typeMarker: {
      type: String
    }
  },
  data () {
    return {
      inicioAtendimento: new Date('1990-01-01 ' + this.informacaoMarker.horario_inicial_atendimento),
      finalAtendimento: new Date('1990-01-01 ' + this.informacaoMarker.horario_final_atendimento),

      inicoTurnoA: new Date('1990-01-01 ' + this.informacaoMarker.horarios.inicio_turno_a),
      finalTurnoA: new Date('1990-01-01 ' + this.informacaoMarker.horarios.fim_turno_a),
      inicoTurnoB: new Date('1990-01-01 ' + this.informacaoMarker.horarios.inicio_turno_b),
      finalTurnoB: new Date('1990-01-01 ' + this.informacaoMarker.horarios.fim_turno_b),

      informacao: this.informacaoMarker
    }
  },
  watch: {
    informacaoMarker () {
      this.informacao = this.informacaoMarker
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_INFO'
    ]),
    changeHourAtendimentoInicial: function (event) {
      this.informacaoMarker.horario_inicial_atendimento = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    changeHourAtendimentoFinal: function (event) {
      this.informacaoMarker.horario_final_atendimento = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    changeHourInicioTurnoA: function (event) {
      this.informacaoMarker.horarios.inicio_turno_a = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    changeHourFimTurnoA: function (event) {
      this.informacaoMarker.horarios.fim_turno_a = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    changeHourInicioTurnoB: function (event) {
      this.informacaoMarker.horarios.inicio_turno_b = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    changeHourFimTurnoB: function (event) {
      this.informacaoMarker.horarios.fim_turno_b = this.formatTime(event.getHours()) + ':' + this.formatTime(event.getMinutes()) + ':' + this.formatTime(event.getSeconds())
    },
    formatTime: function (time) {
      if (time < 10) {
        return '0' + time
      }
      return time
    },
    checkForm: function (e) {
      this.UPDATE_INFO(this.informacao)
    },
    validCnpj: function (cnpj) {
      var re = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g
      return re.test(cnpj)
    }
  }
}

</script>

<style>

.form {
  padding: 6px;
}

#form-edit {
    position: relative;
    max-width: 100%;
    background-color: white;
}

.form-block {
  margin: 6px 6px;
}

.form-block .title, .form-group span {
  line-height: 28px;
  color: #565f63;
  float: left;
  word-wrap: break-word;
}

.input-block {
  display: block;
}

.time-block .mx-datepicker {
    display: inline-block;
    margin-bottom: 5px;
    width: 100%;
}

.time-block .mx-datepicker-popup {
  left: 371px !important;
  bottom: -1px;
  top: auto !important;
  position: fixed !important;
}

.input-block input, .form-group input[type='text'] {
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

.radio {
    display: inline-block;
    padding-right: 20px;
    font-size: 14px;
    line-height: normal;
    cursor: pointer;
    margin-top: 10px;
    color: #565f63;
}

.radio input[type="radio"] {
    height: 1px;
    width: 1px;
    opacity: 0;
}

.radio .outer {
    height: 20px;
    width: 20px;
    display: block;
    float: left;
    margin: 3px 0px 0px 5px;
    border: 3px solid #9E9E9E;
    border-radius: 50%;
    position: relative;
    top: -8px;
    background-color: #fff;
}

.radio input:checked + .outer {
    border: 3px solid #2196f3;
}

.radio .inner {
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

.radio input:checked + .outer .inner {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}

.radio:hover .inner{
    -webkit-transform: scale(.5);
    transform: scale(.5);
    opacity: .5;
}

.radio-tipo-servico {
  display: inline-flex;
}

</style>
