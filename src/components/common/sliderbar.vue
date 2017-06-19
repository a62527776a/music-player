<template>
  <div class="sliderbar">
    <canvas ref="downloadProcess" height="24" width="24"></canvas>
    <mu-icon value="search" @click="search" color="#aaa"/>
  </div>
</template>

<script>
export default {
  name: 'slider-bar',
  data () {
    return {
      msg: ''
    }
  },
  watch: {
    state: function (val) {
      if (val === 'init') this.drawProcess()
    }
  },
  props: {
    process: {
      type: Number,
      default: 0
    },
    state: {
      type: String,
      default: ''
    }
  },
  methods: {
    search () {
      this.$emit('search')
    },
    drawProcess () {
      const canvas = this.$refs.downloadProcess
      let ctx = canvas.getContext('2d')
      let ctxWidth = canvas.width
      let ctxHeight = canvas.height
      let radius = 5
      ctx.beginPath()
      ctx.fillStyle = '#eee'
      ctx.strokeStyle = '#eee'
      ctx.lineWidth = 5
      let draw = () => {
        if (radius === 10) {
          radius--s
        } else if (radius === 3) {
          radius++
        }
        ctx.fillRect(0, 0, ctxWidth, Math.floor(ctxHeight * (this.process / 100)))
        ctx.arc(ctxHeight / 2, ctxWidth / 2, radius, 0, 360, false)
        ctx.stroke()
        ctx.closePath()
        requestAnimationFrame(draw)
      }
      requestAnimationFrame(draw)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sliderbar {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
