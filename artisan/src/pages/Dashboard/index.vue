<!--主页-->
<template>
  <div class="Dashboard">
    <ns-particles :color="particlesColor" class="ns-particles"></ns-particles>
  </div>
</template>

<script>

  export default {
    name: 'Dashboard',
    data() {
      return {
        particlesColor: '#a9abae',
      };
    },
    created() {
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
