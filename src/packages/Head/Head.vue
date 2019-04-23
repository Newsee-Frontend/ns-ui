<template>
  <!--top nav-->
  <div class="Head clear">
    <!--logo-->

    <div class="header-left header-logo fl">
      <slot name="header-logo"></slot>
    </div>

    <!--customer-module-->
    <div class="header-customer-module fl">
      <slot name="header-custom"></slot>
    </div>

    <!--right-->
    <div class="header-right fr clear">

      <!--screenfull button-->
      <div class="header-item fl">
        <Screenfull></Screenfull>
      </div>
      <!--change skin-->
      <div class="header-item fl">
        <Skin></Skin>
      </div>
      <!--user modle dropdown-->
      <div class="header-item fl">
        <slot name="user-dropdown"></slot>
      </div>

    </div>
  </div>

</template>
<script>
  import Skin from '../Skin/Skin';
  import Screenfull from '../Screenfull/Screenfull';

  export default {
    name: 'Head',
    components: {
      Skin,
      Screenfull
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>
