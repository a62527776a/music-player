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
  display: flex;
  flex: 5;
  -webkit-app-region: drag;
  justify-content: center;
  align-items: center;
}
</style>
