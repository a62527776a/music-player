<template>
  <div>
    <v-msgborad :msgs=msgs></v-msgborad>
    <div class="hello">
      <mu-linear-progress class="songProcess" @click.native="changeProcess" mode="determinate" :value="$store.state.process.line"/>
      <div class="thumb">
        <img class="thumb_img" v-if="thumb_url" :src=thumb_url />
        <mu-icon class="thumb_img" v-if="!thumb_url" value="audiotrack" color="red"/>
      </div>
      <v-playbar
        :musicUrl=musicUrl
        :currentTime=currentTime
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
      <mu-list style="margin-top: -20px">
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
      msgs: [],
      resultsong: [],
      searchKeyCode: '',
      musicUrl: '',
      isLoading: false,
      isSearch: false,
      currentTime: 0,
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
    changeProcess (e) {
      if (this.musicUrl === '') {
        this.inputMsg('请等待加载...')
        return
      }
      let processLine = (e.clientX / document.body.clientWidth) * 100
      this.$store.state.process.line = processLine
      this.currentTime = this.$store.state.process.duration * (processLine / 100)
    },
    inputMsg (str) {
      this.msgs.push(str)
      setTimeout(() => {
        this.msgs.shift()
      }, 3000)
    },
    searchSong () {
      this.isLoading = true
      this.inputMsg('搜索歌曲中...')
      this.baseService.search(this.searchKeyCode, 1).then((result) => {
        this.inputMsg('搜索完成')
        this.isLoading = false
        this.resultsong = result.result.songs
      })
    },
    playProcess (arg) {
      this.songProcess = arg
    },
    downloadSong (item) {
      this.isLoading = true
      this.inputMsg('准备下载歌曲...')
      this.baseService.getMusic(item.id).then((result) => {
        this.inputMsg('开始下载')
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
      let isLoad = [true, true, true]
      this.inputMsg('获取歌曲路径中...')
      this.baseService.getMusic(item.id).then((result) => {
        this.inputMsg('获取歌曲路径成功，准备播放')
        isLoad[0] = false
        if (!isLoad[0]) {
          if (!isLoad[1]) {
            this.isLoading = false
          }
        }
        this.musicUrl = result.data[0].url
      })
      this.inputMsg('获取歌曲缩略图中...')
      this.baseService.getMusicDetail(item.id).then((result) => {
        this.inputMsg('获取缩略图成功')
        isLoad[1] = false
        if (!isLoad[0]) {
          if (!isLoad[1]) {
            this.isLoading = false
          }
        }
        this.isLoading = false
        this.thumb_url = result.songs[0].al.picUrl
      })
      // this.baseService.getMusicLrc(item.id).then((result))
    },
    analysisLrc (id) {

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
  position: relative;
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
.songProcess {
  position: absolute;
  bottom: 0;
  cursor: pointer;
  z-index: 99999;
}

</style>
