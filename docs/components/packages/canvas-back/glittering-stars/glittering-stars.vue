<!-- spot wave background component -->
<template>
  <div class="glittering-star" :style="{width:width+'px',height:height+'px'} ">
    <canvas id="glittering-star_canvas"></canvas>
    <slot></slot>
  </div>
</template>
<script>
  import {starsBuild, getSvgNode} from './glittering-stars'

  export default {
    name: 'glittering-stars',
    props: {
      width: {type: Number, default: 300},
      height: {type: Number, default: 300},
    },
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      let app = new starsBuild('glittering-star_canvas');
      app.run();

      window.addEventListener('resize', function () {
        const starBack = getSvgNode('glittering-star');
        const canvas = getSvgNode('glittering-star_canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        starBack.style.width = window.innerWidth + 'px';
        starBack.style.height = window.innerHeight + 'px';
      }, false);
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .glittering-star {
    position: relative;
    background-image: radial-gradient(ellipse farthest-corner at center top, rgba(17, 17, 17, 0.91) 0%, rgba(0, 0, 0, 0.89) 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, rgba(17, 17, 17, 0.91) 0%, rgba(0, 0, 0, 0.89) 100%);
    cursor: move;
    overflow: hidden;
    #glittering-star_canvas {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      /*bottom: 0;*/
      /*right: 0;*/
    }
  }
</style>
