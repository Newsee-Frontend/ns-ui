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
    methods: {},
    created() {
      let getUrlParam = (name) => {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        }
      };

      const id = getUrlParam('id');
      console.log(id);


    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
