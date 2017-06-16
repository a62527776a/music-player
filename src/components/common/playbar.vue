<template>
  <div @mouseover="isHover = true" @mouseout="isHover = false" class="playerbar">
    <audio></audio>
    <div class="music-info" :class="{notHover : isHover}">
      123123
    </div>
    <div class="controls-bar" :class="{isHover : isHover}">
      <div class="dragBlock" style="left: 0"></div>
      <div class="dragBlock" style="right: 0"></div>
      <mu-icon value="fast_rewind" @click="switchSong('rewind')" color="red"/>
      <mu-icon value="play_circle_filled" @click="isPlay" color="red"/>
      <mu-icon value="fast_forward" @click="switchSong('forward')" color="red"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerbar',
  data () {
    return {
      isHover: false
    }
  },
  methods: {
    isPlay () {
      window.alert('isPlay')
    },
    switchSong (val) {
      window.alert(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.playerbar {
  display: flex;
  flex: 5;
  justify-content: center;
  align-items: center;
  height: 30px;
  position: relative;
  transition: all 0.5s;
}
.controls-bar {
  opacity: 0;
  z-index: 5;
  position: absolute;
  width: 80%;
  padding-top: 5px;
  transition: all 0.5s;
}
.dragBlock {
  -webkit-app-region: drag;
  position: absolute;
  width: 35px;
  height: 30px;
}
.music-info {
  z-index: 1;
  opacity: 1;
}
.isHover {
  opacity: 1;
}
.notHover {
  opacity: 0;
}
</style>
