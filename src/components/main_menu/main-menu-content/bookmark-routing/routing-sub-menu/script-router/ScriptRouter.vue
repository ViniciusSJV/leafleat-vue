<template>

  <div class="routes-sub-menu">

  <div class="title-routes-sub-menu">
    <h3>Roteirizar</h3>
    <i v-on:click="closeSubMenuRouter();" class="fas fa-times"></i>
  </div>

  <form class="form">
    <div class="form-group">
      <div class="route-script">
        <span class="title">Data execução</span>
        <div>
          <date-picker v-model="date" lang="pt-br" type="datetime" format="DD/MM/YYYY hh:mm:ss a" :not-before="new Date()" :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"></date-picker>
        </div>
      </div>
    </div>

    <div class="form-submit">
      <input type="submit" value="Roteirizar">
    </div>
  </form>

</div>

</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  name: 'ScriptRouter',
  components: {
    DatePicker
  },
  props: {
    id_marker: {
      type: Number
    }
  },
  data () {
    return {
      error: '',
      date: ''
    }
  },
  methods: {
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

.form-group > div {
    margin: 5px;
}

.route-script .mx-datepicker-popup {
  left: 0px !important;
  top: 190px !important;
  position: fixed;
  width: 370px;
}

.route-script .mx-datepicker-popup .mx-calendar-content,
.route-script .mx-datepicker-popup .mx-calendar {
    width: 100%;
}

.form-group .title {
    width: 100%;
    line-height: normal;
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
