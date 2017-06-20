<template>
  <div>
    <div key="msg" class="msg" v-for="(msg, idx) in msgs" :style="{ animationDelay: ((idx - 1) * 0.5) + 's' }">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'msg-borad',
  data () {
    return {

    }
  },
  props: {
    msgs: {
      type: Array,
      default: []
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.msg {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    animation: msg 2.5s infinite;
    animation-iteration-count: 1;
    opacity: 0;
    transform: translate3D(0, 100px, 0);
}

@keyframes msg {
    from {
        transform: translate3D(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3D(0, -100px, 0);
        opacity: 0;
    }
}
</style>
