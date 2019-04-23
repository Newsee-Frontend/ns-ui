<template>
  <div class="app-wrapper clear" id="layout">
    <!--head bar-->
    <div class="header-wrapper fl">
      <Head>
        <div slot="header-logo">
          <slot name="header-logo"></slot>
        </div>

        <div slot="header-custom">
          <slot name="header-custom"></slot>
        </div>
        <div slot="user-dropdown">
          <slot name="user-dropdown"></slot>
        </div>
      </Head>
    </div>
    <!--side bar nav -->
    <div class="sidebar-wrapper">
      <slot name="sidebar"></slot>
    </div>

    <!--content-->
    <div class="main-container">
      <!--history task-tabs link-->
      <!--<tabs-view></tabs-view>-->
      <!-- content -->
      <section id="overview" class="app-main">
        <slot name="app-main"></slot>
      </section>
    </div>
  </div>
</template>

<script>
  import Head from '../Head/Head';
  // import TabsView from '../head/TabsView/Screenfull.vue';

  export default {
    name: 'layout',
    components: {
      // TabsView,
      Head
    },
    data() {
      return {};
    },
    computed: {},
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #overview {
    background: white;
  }
</style>
