<template>
  <div @mouseover="isHover = true" @mouseout="isHover = false" class="playerbar">
    <audio :src="musicUrl" ref="audio"></audio>
    <div class="music-info" :class="{notHover : isHover}">
      <template v-if="music_info.name !== ''">{{music_info.name}} - <span v-for="item in music_info.artists">{{item.name}}</span></template>
      <template v-if="music_info.name === ''">听音乐，用酷我</template>
    </div>
    <div class="dragBlock" style="left: 0">
      <mu-icon value="blur_on" color="#bbb" />
    </div>
    <div class="controls-bar" :class="{isHover : isHover}">
      <mu-icon class="controls-icon" v-if="!isPlayer" value="play_circle_filled" @click="isPlay" color="rgba(255, 0, 0, 0.7)"/>
      <mu-icon class="controls-icon" v-if="isPlayer" value="pause_circle_filled" @click="isPlay" color="rgba(255, 0, 0, 0.7)"/>
      <mu-icon @click="volBar = !volBar" :class="{ active:volBar }" class="controls-icon volume_up" value="volume_up" color="rgba(255, 0, 0, 0.7)"/>
      <v-volumebar v-show="volBar" v-on:changVolume="changVolume"></v-volumebar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerbar',
  data () {
    return {
      isHover: false,
      isPlayer: false,
      volBar: false,
      timer: Function
    }
  },
  watch: {
    'musicUrl': function (val) {
      this.$store.state.process.duration = this.$refs.audio.duration
    },
    'isPlayer': function (val) {
      if (!this.$store.state.process.duration) {
        this.$store.state.process.duration = this.$refs.audio.duration
      }
      if (val) {
        this.timer = setInterval(() => {
          this.$store.state.process.line = (this.$refs.audio.currentTime / this.$store.state.process.duration) * 100
        }, 500)
      } else {
        clearInterval(this.timer)
      }
    },
    'currentTime': function (val) {
      this.$refs.audio.currentTime = val
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
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    isPlay () {
      this.isPlayer = !this.isPlayer
      this.isPlayer ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    changVolume (arg) {
      this.$refs.audio.volume = arg
    },
    mouseover () {
      // this.volBar = boolean
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
.controls-icon {
  transition: all 0.5s;
}
.controls-icon:hover {
  color: rgba(255, 0, 0, 1) !important;
}
.active {
  color: rgba(255, 0, 0, 1) !important;
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
  width: 50px;
  height: 30px;
  top: 3px;
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
