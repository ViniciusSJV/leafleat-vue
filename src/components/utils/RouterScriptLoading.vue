<template>

  <div>
    <canvas id="canvasScriptRouter" v-bind:width="this.width" v-bind:height="this.height">Seu browser não suporta a tag Canvas do HTML5.</canvas>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RouterScriptLoading',
  data () {
    return {
      ctx: null,
      color: ['#57b05a', '#f2d210', '#5269d2', '#cc1715', '#182a64', '#34e4c2', '#004e62', '#fb5b11', '#9a0717', '#ffa0c4'],
      linhas: []
    }
  },
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  mounted () {
    const display = document.getElementById('canvasScriptRouter')
    this.ctx = display.getContext('2d')

    const width = display.width
    const height = display.height
    this.ctx.globalCompositeOperation = 'overlay'

    this.ctx.beginPath()
    this.ctx.arc(width / 2, height / 2, 8, 0, 2 * Math.PI)
    this.ctx.fillStyle = '#565f63'
    this.ctx.fill()

    for (var i = 0; i < 10; i++) {
      this.linhas.push({ oldX: width / 2, oldY: height / 2, x: width / 2, y: height / 2 })
    }

    requestAnimationFrame(this.frame)
  },
  methods: {
    frame: function () {
      if (this.loading) {
        for (var i = 0; i < this.linhas.length; i++) {
          this.integrate(this.linhas[i])
          this.draw(this.linhas[i], this.color[i])
        }
        requestAnimationFrame(this.frame)
      } else {
        cancelAnimationFrame(this.frame)
      }
    },
    integrate: function (linha) {
      const direction = this.getDirection(linha)
      linha.oldX = linha.x
      linha.oldY = linha.y
      linha.x = direction.x
      linha.y = direction.y
    },
    draw: function (linha, cor) {
      this.ctx.strokeStyle = cor
      this.ctx.lineWidth = 1.5
      this.ctx.shadowOffsetX = 2
      this.ctx.shadowOffsetY = 2
      this.ctx.shadowBlur = 2
      this.ctx.shadowColor = 'rgba(158, 158, 158, 0.38)'
      this.ctx.beginPath()
      this.ctx.moveTo(linha.oldX, linha.oldY)
      this.ctx.lineTo(linha.x, linha.y)
      this.ctx.stroke()
    },
    getDirection: function (linha) {
      return {
        x: linha.x + this.getRandomValue(),
        y: linha.y + this.getRandomValue()
      }
    },
    getRandomValue: function () {
      const random = Math.random()

      if (random > 0.5) {
        return -7
      } else {
        return 7
      }
    }
  }
}
</script>
