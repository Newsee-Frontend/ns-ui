<!-- canvas background component -->
<template>
  <div class="canvas-back">
    <glittering-stars :width="width" :height="height" v-if="type === 'stars'"></glittering-stars>
    <spot-wave :width="width" :height="height" :particleCount="particleCount" :background="background"
               :particle="particle" v-if="type === 'wave'"></spot-wave>
    <slot></slot>
  </div>
</template>
<script>
  import glitteringStars from "./glittering-stars/glittering-stars.vue";
  import spotWave from "./spot-wave/spot-wave.vue";

  export default {
    name: 'canvas-back',
    props: {
      type: {type: String, default: 'wave'},
      width: {type: Number, default: 900},
      height: {type: Number, default: 900},
      particleCount: {type: Number, default: 30000},
      background: {type: Number, default: 0x000000},
      particle: {type: Number, default: 0x477cc2},
    },
    data() {
      return {}
    },
    components: {glitteringStars, spotWave},
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
