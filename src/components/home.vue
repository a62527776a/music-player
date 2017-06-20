<template>
  <div>
    <div class="hello">
      <div class="thumb">
        <img class="thumb_img" v-if="thumb_url" :src=thumb_url />
        <mu-icon class="thumb_img" v-if="!thumb_url" value="audiotrack" color="red"/>
      </div>
      <v-playbar
        :musicUrl=musicUrl
        :music_info=music_info></v-playbar>
      <v-sliderbar
        v-on:search="openSearchBar"
        :process=downloadProcess
        :state=downloadType></v-sliderbar>
    </div>
    <transition name="load">
      <mu-linear-progress class="loadBar" v-show="isLoading" />
    </transition>
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
          v-on:downloadSong=downloadSong(item)
          >
        </v-songlist>
      </mu-list>
    </div>
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
      isSearch: false,
      downloadProcess: 0,
      music_info: {
        name: ''
      },
      downloadType: '',
      thumb_url: ''
    }
  },
  methods: {
    openSearchBar () {
      ipcRenderer.ipcRenderer.send('search-song', !this.isSearch)
      this.isSearch = !this.isSearch
      ipcRenderer.ipcRenderer.on('opening', (event, arg) => {
        this.isSearch = !this.isSearch
      })
    },
    searchSong () {
      this.isLoading = true
      this.baseService.search(this.searchKeyCode, 1).then((result) => {
        this.isLoading = false
        this.resultsong = result.result.songs
      })
    },
    downloadSong (item) {
      this.isLoading = true
      this.baseService.getMusic(item.id).then((result) => {
        this.isLoading = false
        ipcRenderer.ipcRenderer.send('download-song', result.data[0].url)
      })
      this.downloading()
    },
    downloading () {
      ipcRenderer.ipcRenderer.on('download-song', (event, arg) => {
        this.downloadProcess = arg.process
        this.downloadType = arg.type
      })
    },
    playSong (item) {
      this.music_info = item.album
      this.isLoading = true
      let isLoad = [true, true]
      this.baseService.getMusic(item.id).then((result) => {
        if (!isLoad[0]) {
          if (!isLoad[1]) {
            this.isLoading = false
          }
        }
        this.musicUrl = result.data[0].url
      })
      this.baseService.getMusicDetail(item.id).then((result) => {
        isLoad[1] = false
        if (!isLoad[0]) {
          if (!isLoad[1]) {
            this.isLoading = false
          }
        }
        this.isLoading = false
        this.thumb_url = result.songs[0].al.picUrl
      })
    }
  }
}
</script>

<style style="less" scoped>
.hello {
  display: flex;
  height: 50px;
  overflow:hidden;
  padding: 10px 5px 0 0;
  flex: 1;
  .thumb {
    overflow: hidden;
  }
}
.loadBar {
  position: fixed;
  top: 0;
  background: white;
}
.thumb_img {
  height: 50px;
  width: 50px;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: normal;
}
.search-bar {

}
.search {
  height: 300px;
  overflow: auto;
  margin: 0 10px;
}
.search::-webkit-scrollbar {
  background: white;
  display: block;
  width: 3px
}
.search::-webkit-scrollbar-thumb {
  background: #ddd;
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
