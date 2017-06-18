<template>
  <div>
    <div class="hello">
      <div style="thumb">
        thumb
      </div>
      <v-playbar :musicUrl=musicUrl></v-playbar>
      <v-sliderbar
        v-on:search="openSearchBar"></v-sliderbar>
    </div>
    <transition name="load">
      <mu-linear-progress v-show="isLoading" />
    </transition>
    <transition name="open">
      <div class="search" v-show="isSearch">
        <div class="search-bar">
          <mu-text-field hintText="搜索歌曲" v-model="searchKeyCode" @change="searchSong" fullWidth />
        </div>
        <mu-list>
          <v-songlist
            v-for="item in resultsong"
            :key=item.id
            :item=item
            v-on:playSong=playSong(item)
            >
          </v-songlist>
        </mu-list>
      </div>
    </transition>
  </div>
</template>

<script>
import ipcRenderer from 'electron'

export default {
  name: 'hello',
  data () {
    return {
      msg: '',
      resultsong: [],
      searchKeyCode: '',
      musicUrl: '',
      isLoading: false,
      isSearch: false
    }
  },
  methods: {
    openSearchBar () {
      ipcRenderer.ipcRenderer.send('search-song', !this.isSearch)
      this.isSearch = !this.isSearch
      ipcRenderer.ipcRenderer.on('opening', (event, arg) => {
        this.isSearch = !this.isSearch
      })
      console.log(this.isSearch)
    },
    searchSong () {
      this.isLoading = true
      this.baseService.search(this.searchKeyCode, 1).then((result) => {
        this.isLoading = false
        this.resultsong = result.result.songs
      })
    },
    playSong (item) {
      this.isLoading = true
      this.baseService.getMusic(item.id).then((result) => {
        this.isLoading = false
        this.musicUrl = result.data[0].url
      })
    }
  }
}
</script>

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
.search-bar {
  position: fixed;
  top: 30px;
  height: 20px;
  width: 100%;
}
.search {
  height: 300px;
  overflow: auto;
}
.load-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.load-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.open-enter-active, .fade-leave-active {
  transition: height .5s
}
.open-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  height: 0
}

</style>
