<template>

<div id="header">

  <div class="header-menu">
    <i v-on:click="openNavMenu()" class="fas fa-bars"></i>
  </div>

  <div class="header-search">
    <input type="text">
    <i class="fas fa-search"></i>
  </div>

  <div class="header-btn-group">

    <div class="header-btn">
      <i class="fas fa-bell"></i>
    </div>
    <div class="header-btn">
      <div class="header-user-btn">
        <span>J</span>
      </div>
    </div>

  </div>

</div>

</template>

<script>

export default {
  name: 'HeaderMap',
  methods: {
    openNavMenu: function () {
      this.$emit('openNavMenu')
    }
  }
}

</script>

<style>

#header {
    background: rgba(0,0,0,0.3);
    overflow: hidden;
    padding: 4px 0px;
    position: absolute;
    z-index: 100000;
    height: 35px;
    width: 100%;
    align-items: center;
    display: inline-flex;
}

.header-menu {
    position: absolute;
    left: 0;
    width: 40px;
    text-align: center;
    transition: .1s ease;
    z-index: 2;
}

.header-search {
    display: block;
    position: absolute;
    text-align: center;
    left: 35%;
    z-index: 2;
}

.header-btn-group {
    position: absolute;
    right: 0;
}

.header-menu i {
    color: white;
    cursor: pointer;
}

.header-search input {
    background-color: hsla(0,0%,100%,.3);
    border-radius: 3px;
    border: none;
    color: white;
    float: left;
    font-size: 13px;
    height: 30px;
    margin: 0;
    min-height: 30px;
    padding-right: 32px;
    padding-left: 8px;
    line-height: 19px;
    transition: width .15s;
    width: 300px;
    z-index: 1;
}

.header-search i {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 7px !important;
    transition: background 85ms,color 85ms;
    z-index: 2;
    color: white;
    font-weight: bold;
}

.header-btn {
    transition: .1s ease;
    border-radius: 3px;
    color: #fff;
    display: block;
    float: left;
    font-weight: 700;
    margin-right: 35px;
    min-width: 32px;
    padding: 0;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.header-btn {
    transition: .1s ease;
    border-radius: 3px;
    color: #fff;
    display: block;
    float: left;
    font-weight: 700;
    margin-right: 35px;
    min-width: 32px;
    padding: 0;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.header-btn i, .header-btn span {
    font-size: 25px;
    line-height: 32px;
}

.header-user-btn {
    border-radius: 50%;
    background: #2196f3;
    text-align: center;
    font-weight: normal;
    border: 1px solid white;
}

</style>
