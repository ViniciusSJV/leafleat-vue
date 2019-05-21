<template>
  <div class="menu-pointer map-main-menu-content transparent">
    <div id="abiliitys">

      <a class="abiliity" v-if="abiliityPa && abiliityPa.length" v-for="abiliity of abiliityPa" v-bind:class="{ 'abiliity-selected': abiliity.isActive }" :key="abiliity.id" v-on:click="toggleAbiliity($event, abiliity.id)">
        <div>
          <span>{{abiliity.name}}</span>
        </div>
      </a>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookmarkAbiliity',
  props: {
    idMarker: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'abiliityPa'
    ])
  },
  created () {
    this.GET_ABILITY_BY_ID_PA(this.idMarker)
  },
  methods: {
    ...mapActions([
      'GET_ABILITY_BY_ID_PA'
    ]),
    toggleAbiliity: function (event, idAbiliity) {
      event.currentTarget.classList.toggle('abiliity-selected')
      // save abiliity for marker in BD
    }
  }
}

</script>

<style>

#abiliitys {
    padding: 10px 10px;
    background: #ffffff;
}

.abiliity {
    text-decoration: none;
    cursor: pointer;
    margin-right: 8px;
    margin-bottom: 6px;
    margin-top: 2px;
    display: inline-block;
}

.abiliity div {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    background-color: white;
    border-radius: 48px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 16px;
    display: inline-block;
}

.abiliity.abiliity-selected div {
    background-color: #03A9F4;
}

.abiliity.abiliity-selected span {
    color: white;
}

.abiliity span {
    color: #3C4043;
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    text-decoration: none;
    white-space: nowrap;
    display: inline-block;
}

</style>
