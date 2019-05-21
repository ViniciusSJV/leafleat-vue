<template>
  <div class="menu-pointer map-main-menu-content transparent">
    <div id="tags">

      <div><input id="tag-typer" v-on:keypress.enter.prevent="createTag($event)" type="text" placeholder="Adicionar etiqueta..."></div>

      <span v-if="tagsPa && tagsPa.length" v-for="tag of tagsPa" :key="tag.id" v-on:click="removeTag($event, tag.id)" class="tag"><span class="close">×</span><label class="text">{{tag.name}}</label></span>

    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookmarkTags',
  props: {
    idMarker: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'tagsPa'
    ])
  },
  created () {
    this.GET_TAGS_BY_ID_PA(this.idMarker)
  },
  methods: {
    ...mapActions([
      'GET_TAGS_BY_ID_PA'
    ]),
    createTag: function (event) {
      const tag = event.currentTarget.value
      if (tag.length > 0) {
        const elementHtml = '<span class="tag"><span class="close">&times;</span><span class="text">' + tag + ' </span></span>'
        document.getElementById(event.currentTarget.id).parentElement.insertAdjacentHTML('beforeend', elementHtml)
        event.currentTarget.value = ''
      }
    },
    removeTag: function (event, idTag) {
      event.currentTarget.remove()
    }
  }
}

</script>

<style>

#tags {
    padding: 10px;
    background: #ffffff;
    margin: auto;
}

#tags input[type='text'] {
    padding: 5px 8px 3px 8px;
    border: solid;
    border-color: #dbdbdb;
    border-width: thin;
    margin-bottom: 15px;
    box-sizing: border-box;
    color: #333;
    font-size: 14px;
    line-height: 18px;
    width: 100%;
}

.tag {
    display: inline-block;
    max-width: 100px;
    background: #FF9800;
    color: #FFF;
    cursor: pointer;
    padding: 5px 10px;
    margin: 2px 6px 8px 20px;
    font: normal 16px sans-serif;
    position: relative;
    box-shadow: 4px 4px 5px #9E9E9E;
    -webkit-transform-origin: 0% 50%;
    -webkit-animation: swing 1s;
    -o-animation: swing 1s;
    animation: swing 1s;
}

.tag .text {
  max-width: 100px;
  white-space: nowrap;
  display: inline-flex;
  overflow: hidden;
}

.tag:before {
    content: "";
    position: absolute;
    width: 0;
    background: inherit;
    height: 8px;
    border: 10px solid #fafafa;
    border-right-color: transparent;
    -webkit-border-radius: 10px 0 0 10px;
    -moz-border-radius: 10px 0 0 10px;
    border-radius: 10px 0 0 10px;
    left: -20px;
    top: 0;
}

.tag .close {
    position: absolute;
    background: inherit;
    left: -4px;
    z-index: 3;
    visibility: hidden;
}

.tag:hover .close {
    visibility: visible;
}

.tag:after {
    content: "";
    width: 6px;
    height: 6px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background: #FFF;
    position: absolute;
    left: -3px;
    top: 12px;
    box-shadow: inset 1px 1px 0 #CCC;
}

</style>
