<!-- canvas background component -->
<template>
  <div class="canvas-back">
    <glittering-stars :width="width" :height="height" v-if="type === 'stars'"></glittering-stars>
    <spot-wave :width="width" :height="height" :particleCount="particleCount" :background="background"
               :particle="particle" v-if="type === 'wave'"></spot-wave>
    <matrix-raindrop :canvasWidth="width" :canvasHeight="height" :fontSize="fontSize" :speed="speed"
                     :fontFamily="fontFamily" :textContent="textContent" :textColor="textColor"
                     :backgroundColor="backgroundColor" v-if="type === 'raindrop'"></matrix-raindrop>
    <slot></slot>
  </div>
</template>
<script>
  import glitteringStars from "./glittering-stars/glittering-stars.vue";
  import spotWave from "./spot-wave/spot-wave.vue";
  import matrixRaindrop from "./matrix-raindrop/matrix-raindrop";

  export default {
    name: 'canvas-back',
    props: {
      type: {type: String, default: 'wave'},
      width: {type: Number, default: 900},
      height: {type: Number, default: 900},
      particleCount: {type: Number, default: 30000},
      background: {type: Number, default: 0x000000},
      particle: {type: Number, default: 0x477cc2},
      //========== matrix-raindrop ==========
      fontSize: {type: Number},  //下落字体大小
      fontFamily: {type: String},  //字体类型
      textContent: {type: String}, //字体文本内容
      textColor: {type: String},//字体颜色
      backgroundColor: {type: String}, //canvas背景颜色，可自定义
      speed: {type: Number}   //下落速度
    },
    data() {
      return {}
    },
    components: {glitteringStars, spotWave, matrixRaindrop},
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
