<template>
  <div @mouseover="isHover = true" @mouseout="isHover = false" class="playerbar">
    <audio :src="musicUrl" ref="audio"></audio>
    <div class="music-info" :class="{notHover : isHover}">
      <template v-if="music_info.name !== ''">{{music_info.name}} - <span v-for="item in music_info.artists">{{item.name}}</span></template>
      <template v-if="music_info.name === ''">听音乐，用酷我</template>
    </div>
    <div class="controls-bar" :class="{isHover : isHover}">
      <div class="dragBlock" style="left: 0"></div>
      <mu-icon class="controls-icon" v-if="!isPlayer" value="play_circle_filled" @click="isPlay" color="rgba(255, 0, 0, 0.7)"/>
      <mu-icon class="controls-icon" v-if="isPlayer" value="pause_circle_filled" @click="isPlay" color="rgba(255, 0, 0, 0.7)"/>
      <mu-icon class="controls-icon" value="volume_up" @click="" color="red"/>
      <v-volumebar></v-volumebar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerbar',
  data () {
    return {
      isHover: false,
      isPlayer: false
    }
  },
  props: {
    musicUrl: {
      type: String,
      default: '123'
    },
    music_info: {
      type: Object,
      default: {}
    }
  },
  methods: {
    isPlay () {
      this.isPlayer = !this.isPlayer
      this.isPlayer ? this.$refs.audio.play() : this.$refs.audio.pause()
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
