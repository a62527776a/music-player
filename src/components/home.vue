<template>
  <div>
    <div class="hello">
      <div style="thumb">
        thumb
      </div>
      <v-playbar></v-playbar>
      <v-sliderbar
        v-on:search="openSearchBar"></v-sliderbar>
    </div>
    <div class="search-bar">
      <mu-text-field hintText="搜索歌曲" v-model="searchKeyCode" @change="searchSong" fullWidth /><br/>
    </div>
    {{resultsong}}
  </div>
</template>

<script>
import ipcRenderer from 'electron'

export default {
  name: 'hello',
  data () {
    return {
      msg: '',
      resultsong: Array,
      searchKeyCode: ''
    }
  },
  methods: {
    openSearchBar () {
      ipcRenderer.ipcRenderer.send('search-song', '哈哈')
    },
    searchSong () {
      this.baseService.search(this.searchKeyCode, 1).then((result) => {
        console.log(result)
        this.resultsong = result.result.songs
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style="less" scoped>
.hello {
  display: flex;
  height: 50px;
  padding: 10px 0;
  flex: 1;
  .thumb {
    height: 50px;
    width: 50px;
  }
}
</style>
