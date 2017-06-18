<template>
  <mu-list-item :title=item.name>
    <a slot="describe">
      <span 
        v-for="artists in item.artists"
        :key=artists.id>
        {{artists.name}}
      </span>
    </a>
    <mu-icon slot="right" value="add" @click.native="playSong"/>
    <mu-icon slot="right" value="play_arrow" @click.native="playSong"/>
    <mu-icon slot="right" value="file_download" @click.native="playSong"/>
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
      type: Array,
      default: []
    }
  },
  methods: {
    playSong () {
      this.$emit('playSong')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
