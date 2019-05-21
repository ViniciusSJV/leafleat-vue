<template>
  <div class="map-main-menu-actions">
    <ul>
      <li v-show="typeMarker === 'CD'">
        <a data-menu-id="bookmark-routing" class="btn-pointer custom-button"
        v-on:click="activateButton($event)">
          <i class="fas fa-road"></i>
        </a>
      </li>
      <li v-show="typeMarker === 'CD'">
        <a data-menu-id="linked-bookmarks" class="btn-pointer custom-button"
        v-on:click="activateButton($event)">
          <i class="fas fa-user"></i>
        </a>
      </li>
      <li v-show="typeMarker === 'PA'">
        <a data-menu-id="bookmark-tags" class="btn-pointer custom-button"
        v-on:click="activateButton($event)">
          <i class="fas fa-tags"></i>
        </a>
      </li>
      <li v-show="typeMarker === 'PA'">
        <a data-menu-id="bookmark-abiliitys" class="btn-pointer custom-button"
        v-on:click="activateButton($event)">
          <i class="fas fa-star"></i>
        </a>
      </li>
      <li>
        <a data-menu-id="bookmark-edit" class="btn-pointer custom-button"
          v-on:click="activateButton($event)">
          <i class="fas fa-pen"></i>
        </a>
      </li>
      <li>
        <a data-menu-id="bookmark-geolocation" class="btn-pointer custom-button"
        v-on:click="activateButton($event)">
          <i class="material-icons">edit_location</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'MapMainMenuNav',
  props: {
    typeMarker: {
      type: String,
      validator: (val) => ['CD', 'PA'].includes(val)
    }
  },
  methods: {
    activateButton (event) {
      const element = event.currentTarget
      const btnsPointer = document.querySelectorAll('.selected');
      [].forEach.call(btnsPointer, function (btn) {
        if (element !== btn) {
          btn.classList.remove('selected')
        }
      })
      element.classList.toggle('selected')
      const menuId = element.getAttribute('data-menu-id')
      this.$emit('changeMenu', menuId)
    }
  }
}
</script>

<style scoped>

.map-main-menu-actions {
  padding: 0px 10px;
  border-bottom: 1px #9e9e9e4a solid;
  background-color: white;
  display: inline-block;
  align-items: center;
}

.map-main-menu-actions ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}

.map-main-menu-actions li {
  float: right;
  position: relative;
  display: inline;
  text-align: center;
  text-decoration: none;
  line-height: 55px;
}

.custom-button {
  position: relative;
  padding: 0px 10px;
  margin-right: 6px;
  font-size: 32px;
  box-shadow: 3px 2px 4px #9e9e9e;
  cursor: pointer;
  background-color: white;
  border-radius: 50px;
  font-family: 'Roboto', sans-serif;
  border-right: 4px #565f63 solid;
  border-bottom: 4px #565f63 solid;
  transition-duration: 0.2s;
  user-select: none;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.custom-button:hover {
  border-right: 1px #565f63 solid;
  border-bottom: 1px #565f63 solid;
  border: 1px solid #565f63;
  box-shadow: none;
}

.custom-button.selected, .custom-button.selected:hover {
  box-shadow: inset 2px 2px 10px #565f63;
  border: none;
  pointer-events: none;
  top: 2px;
}

.custom-button i.fas, .custom-button i.far {
  font-size: 22px;
  top: -3px;
  position: relative;
  min-width: 30px;
}

.custom-button i {
  color: #565f63;
}

.btn-pointer .material-icons {
  font-size: 30px;
  top: 5px;
  position: relative;
}

</style>
