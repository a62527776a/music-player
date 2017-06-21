<template>
  <mu-list-item :title=item.name>
    <a slot="describe">
      <span 
        v-for="artists in item.artists"
        :key=artists.id>
        {{artists.name}}
      </span>
    </a>
    <mu-icon slot="right" value="play_arrow" :size=18 @click.native="playSong"/>
    <mu-icon slot="right" value="file_download" :size=18 @click.native="downloadSong"/>
  </mu-list-item>
</template>

<script>
export default {
  name: 'song-list',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: []
    }
  },
  methods: {
    playSong () {
      this.$emit('playSong')
    },
    downloadSong () {
      this.$emit('downloadSong')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
