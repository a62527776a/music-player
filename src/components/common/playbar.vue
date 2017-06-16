<template>
  <div class="playerbar">
    playbar
  </div>
</template>

<script>
export default {
  name: 'playerbar',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style="less" scoped>
.playerbar {
  position: absolute;
  display: flex;
  bottom: 0;
  height: 40px;
  width: 100%;
  border-top: 1px solid #eee;
}
</style>
