<template>
  <div>
    <div class="hello">
      <div style="thumb">
        <img :src=thumb_url height="24px" width="24px" />
      </div>
      <v-playbar :musicUrl=musicUrl></v-playbar>
      <v-sliderbar
        v-on:search="openSearchBar"
        :process=downloadProcess
        :state=downloadType></v-sliderbar>
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
            v-on:downloadSong=downloadSong(item)
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
      isSearch: false,
      downloadProcess: 0,
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
        console.log(result)
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
