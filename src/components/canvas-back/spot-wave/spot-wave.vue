<!-- spot wave background component -->
<template>
  <div class="spotWaveBack">
    <canvas id="spotWaveBack_canvas"></canvas>
    <slot></slot>
  </div>
</template>
<script>
  import ParticleWave from './spot-wave'

  export default {
    name: 'spot-wave',
    props: {
      width: {type: Number, default: 300},
      height: {type: Number, default: 300},
      particleCount: {type: Number, default: 30000},
      background: {type: Number, default: 0x000000},
      particle: {type: Number, default: 0x477cc2},
    },
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      const config = {
        colors: {
          background: this.background,
          particle: this.particle,
        },
        alpha: {
          particle: 1,
        },
        size: {
          width: this.width,
          height: this.height,
        },
        particleCount: this.particleCount
      };
      let pw = new ParticleWave(config, 'spotWaveBack_canvas');
      pw.run();
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .spotWaveBack {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #spotWaveBack_canvas {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>
