<template>
  <div class="sliderbar">
    <mu-icon value="search" @click="search" color="red"/>
  </div>
</template>

<script>
import ipcRenderer from 'electron'

export default {
  name: 'slider-bar',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    search () {
      ipcRenderer.ipcRenderer.send('search-song', '哈哈')
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
