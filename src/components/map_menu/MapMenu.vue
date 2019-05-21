<template>

<div id="map-main-menu-action-map" class="map-menu">

  <div class="map-main-menu-actions-map">
    <ul>
      <li id="new-cd">
        <i class="fas fa-boxes"></i>
      </li>
      <li id="new-pa">
        <i class="fas fa-user-circle"></i>
      </li>
      <li id="new-toll">
        <i class="fas fa-hand-holding-usd"></i>
      </li>
      <li>
        <i class="material-icons">transfer_within_a_station</i>
      </li>
      <li id="new-restaurant">
        <i class="fas fa-utensils"></i>
      </li>
      <li id="new-gas-station">
        <i class="fas fa-gas-pump"></i>
      </li>
      <li id="new-ZMRC">
        <i class="fas fa-draw-polygon"></i>
      </li>
    </ul>
  </div>
</div>

</template>

<script>

export default {
  name: 'MapMenu'
}

</script>

<style>

#map-main-menu-action-map {
    top: 50px;
    width: auto;
}

.map-menu {
    width: 370px;
    max-height: calc(100% - 110px);
    pointer-events: auto;
    cursor: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 10000;
    top: 110px;
    background-color: transparent;
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
    transition-property: -webkit-transform,transform,left,opacity,max-height,right;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.0,0.0,0.2,1);
}

.map-main-menu-actions-map {
    margin: 0px 0px;
    margin-bottom: 2px;
    border-bottom: 1px #565f6345 solid;
    background-color: white;
    display: inline-block;
    align-items: center;
}

.map-main-menu-actions-map ul {
    list-style: none;
    overflow: hidden;
    padding: 5px 10px;
    margin: 0;
    display: inline-flex;
    align-items: center;
}

.map-main-menu-actions-map li {
    padding: 0px 10px;
    cursor: pointer;
}

.map-main-menu-actions-map li.selected i, .map-main-menu-actions-map li:hover i {
    border-bottom: 2px #03A9F4 solid;
}

.map-main-menu-actions-map li i {
  font-size: 20px;
  margin: 10px 5px;
  color: #565f63;
  border-bottom: 2px transparent solid;
}

</style>
