<template>
  <div id="app">
    <grid-template></grid-template>
  </div>
</template>

<script>
  import gridTemplate from './views/grid-template/index'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {gridTemplate},
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
</style>
