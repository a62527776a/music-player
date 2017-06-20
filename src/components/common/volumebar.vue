<template>
  <div class="volume-bar">
    <i @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" class="volume-button">
      <span ref="volumeBtn"></span>
    </i>
  </div>
</template>

<script>
export default {
  name: 'volume-bar',
  data () {
    return {
      isClick: false,
      volumeX: 0,
      clientX: 0,
      cX: 0
    }
  },
  watch: {

  },
  props: {

  },
  methods: {
    mousedown (e) {
      this.isClick = true
      this.clientX = e.clientX - this.cX
    },
    mousemove (e) {
      if (this.isClick) {
        this.cX = e.clientX - this.clientX
        if (this.cX > 0 || this.cX < -45) return
        this.$refs.volumeBtn.style.transform = `translate3D(${this.cX}px, 0, 0)`
        this.$emit('changVolume', 1 + (this.cX / 45))
      }
    },
    mouseup () {
      this.isClick = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.volume-bar {
  position: absolute;
  display: inline-block;
  height: 15px;
  width: 60px;
  background: #eee;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 25px;
}
.volume-button {
  height: 15px;
  width: 60px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.5);
  display: block;
  span {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: rgba(255, 0, 0, 1);
    display: block;
    cursor: move;
    position: absolute;
    right: 0;
  }
}
</style>
