<template>
  <div class="sliderbar">
    <mu-icon value="search" @click="search" color="#aaa"/>
  </div>
</template>

<script>
export default {
  name: 'slider-bar',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    search () {
      this.$emit('search')
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
