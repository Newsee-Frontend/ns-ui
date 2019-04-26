<!--主页-->
<template>
  <div class="Dashboard">
    <TestDemo1 :item="item"></TestDemo1>
    <TestDemo2 :item="item"></TestDemo2>
  </div>
</template>

<script>
  import HelloWorld from '../../components/HelloWorld';
  import TestDemo1 from '../../../../src/packages/TestDemo/TestDemo.vue';

  import TestDemo2 from '../../components/TestDemo/components/testContent';

  export default {
    name: 'Dashboard',
    components: { HelloWorld, TestDemo1, TestDemo2 },
    data() {
      return {};
    },
    created() {

    },
  };

</script>

<style rel="stylesheet/scss" lang="scss">

</style>
