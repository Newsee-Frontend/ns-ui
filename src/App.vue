<template>
  <div id="app">
    <!--spot-wave / glittering-stars-->
    <canvas-back type="stars" :width="innerWidth" :height="innerHeight">
      <grid-template></grid-template>
    </canvas-back>
  </div>
</template>

<script>
  import canvasBack from "./components/canvas-back/index";
  import gridTemplate from './views/grid-template/index'

  export default {
    name: 'app',
    data() {
      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      }
    },
    components: {gridTemplate, canvasBack},
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    .canvas-back {
      position: relative;
    }
  }
</style>
