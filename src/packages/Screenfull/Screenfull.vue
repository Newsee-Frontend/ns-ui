<template>
  <icon-svg class="screenfull-svg" :icon-class="isFullscreen?'tuichuquanping':'quanping'" @click="click"></icon-svg>
</template>

<script>
  import iconSvg from '../Icon-svg/Icon-svg'
  import screenfull from 'screenfull'

  export default {
    name: 'Screenfull',
    components: {iconSvg},
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false
        }
        screenfull.toggle()
      },
      init() {
        if (screenfull.enabled) {
          screenfull.on('change', () => {
            this.isFullscreen = screenfull.isFullscreen
          })
        }
      }
    }
  }
</script>

<style scoped>
  .screenfull-svg {
    cursor: pointer;
    width: 18px;
    height: 18px;
    margin-bottom: -1px;
  }
</style>
