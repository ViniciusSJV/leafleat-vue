<template>

  <div class="nav-menu">
    <div class="header">
      <i v-on:click="openNavMenu()" class="fas fa-times"></i>
    </div>

    <ul>
      <li>
        <a v-bind:class="{ active: activeRoute }">
          <i class="fas fa-route icon"></i>
          <label style="padding-right: 1em;">Roteirização</label>
          <div class="check">
            <input checked type="checkbox" name="task_00">
            <div class="ripple-container">
              <div class="check-off"></div>
              <div class="check-on"><i class="fa fa-check"></i></div>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a v-bind:class="{ active: activeZMRC }">
          <i class="fas fa-draw-polygon icon"></i>
          <label style="padding-right: 49px;">ZMRCs</label>
          <div class="check">
            <input v-on:click="toogleZMRCs($event)" type="checkbox" name="task_00">
            <div class="ripple-container">
              <div class="check-off"></div>
              <div class="check-on"><i class="fa fa-check"></i></div>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a v-bind:class="{ active: activeRegiao }">
          <i class="fas fa-draw-polygon icon"></i>
          <label style="padding-right: 3em;">Regiões</label>
          <div class="check">
            <input v-on:click="toogleRegioes($event)" type="checkbox" name="task_00">
            <div class="ripple-container">
              <div class="check-off"></div>
              <div class="check-on"><i class="fa fa-check"></i></div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NavMenu',
  data () {
    return {
      activeRoute: true,
      activeZMRC: false,
      activeRegiao: false
    }
  },
  methods: {
    ...mapActions([
      'GET_ZONA_RESTRICAO',
      'CLEAN_ZONA_RESTRICAO',
      'GET_REGIOES',
      'CLEAN_REGIOES'
    ]),
    openNavMenu: function () {
      this.$emit('openNavMenu')
    },
    toogleZMRCs: function (event) {
      if (event.currentTarget.checked) {
        this.GET_ZONA_RESTRICAO()
      } else {
        this.CLEAN_ZONA_RESTRICAO()
      }
      this.activeZMRC = event.currentTarget.checked
    },
    toogleRegioes: function (event) {
      if (event.currentTarget.checked) {
        this.GET_REGIOES()
      } else {
        this.CLEAN_REGIOES()
      }
      this.activeRegiao = event.currentTarget.checked
    }
  }
}
</script>

<style>

.nav-menu {
  width: 200px;
  max-height: 100%;
  height: 100%;
  pointer-events: auto;
  cursor: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 100000;
  top: 0px;
  background-color: #565f63;
}

.nav-menu ul {
  list-style: none;
  display: block;
  padding: 0;
  margin: 0;
}

.nav-menu ul li {
  margin-left: 0;
  padding-left: 0;
  display: inline-block;
  width: 100%;
  border-top: 1px solid #808080;
}

.nav-menu ul li a {
  color: white;
  width: calc(100% - 20px);
  padding: 10px 10px;
  opacity: .3;
  transition: opacity .3s linear;
  display: inline-flex;
  align-items: center;
}

.nav-menu ul li a.active {
  opacity: 1;
}

.nav-menu ul li .icon {
  font-size: 2em;
  padding-right: 0.5em;
  display: inline;
  vertical-align: middle;
}

.nav-menu ul li label {
  font-size: 16px;
  padding-right: 0.5em;
}

.nav-menu .header {
  padding: 13px;
}

.nav-menu .header i {
  float: right;
  color: white;
  cursor: pointer;
}

.check {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 29px;
  height: 29px;
}

.check input[type="checkbox"] {
  opacity: 0;
  width: 24px;
  height: 24px;
  position: absolute;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}

.check input[type="checkbox"] + .ripple-container {
  position: relative;
  display: inline-block;
  width: 29px;
  height: 29px;
  pointer-events: none;
}

.check input[type="checkbox"] + .ripple-container .check-off {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0;
  top: 0;
  border-radius: 2px;
  border: 2px solid white;
}

.check input[type="checkbox"] + .ripple-container .check-on {
  transform: scale(0);
  transition: all .3s;
}

.check input[type="checkbox"]:checked + .ripple-container .check-on {
  position: absolute;
  transform: scale(1);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 25px;
  transform: scale(1);
}

.check-on {
  height: 100%;
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.check-on i {
  margin: 0 auto;
}

</style>
