<template>
  <div class="hello">
    <div style="thumb">
      thumb
    </div>
    <v-playbar></v-playbar>
    <v-sliderbar></v-sliderbar>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
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
