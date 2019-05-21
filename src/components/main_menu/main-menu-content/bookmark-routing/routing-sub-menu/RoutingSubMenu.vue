<template>

<div id="sub-menu-router">
  <div class="routing">
    <div class="routing-icon-div">
      <div class="routing-icon" data-menu-id="new-router" v-on:click="activateButtonSubMenuRouter($event);">
        <i class="fas fa-truck"></i>
      </div>
      <div class="routing-icon" data-menu-id="settings-router" v-on:click="activateButtonSubMenuRouter($event);">
        <i class="fas fa-cogs"></i>
      </div>
      <div class="routing-icon" data-menu-id="script-router" v-on:click="activateButtonSubMenuRouter($event);">
        <i class="fas fa-bolt"></i>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'RoutingSubMenu',
  methods: {
    activateButtonSubMenuRouter (event) {
      const element = event.currentTarget
      const menuId = element.getAttribute('data-menu-id')
      this.$emit('changeSubMenuRouter', menuId)
    }
  }
}
</script>

<style>

.routing {
    text-align: center;
}

.routing-icon {
    height: 40px;
    width: 40px;
    margin: 10px;
    border-radius: 100%;
    background-color: #565f63;
    color: white;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    box-shadow: inset 0 -0.0625em 0.125em rgba(0,0,0,0.75),
                inset 0 0.125em 0.125em -0.0625em rgba(255,255,255,0.4),
                0 0 0.03125em 0.0625em rgba(0,0,0,0.6),
                0 0.0625em 0.25em 0.03125em rgba(0,0,0,0.5);
}

.routing-icon i {
    margin: 0 auto;
    user-select: none;
}

.fas {
  font-size: 18px;
}

.routing-icon-div {
  display: inline-flex;
}

</style>
