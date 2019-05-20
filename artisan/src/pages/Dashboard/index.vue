<!--主页-->
<template>
  <div class="Dashboard">
    <pre>{{TestDemomodel}}</pre>
    <TestDemo v-model="TestDemomodel"></TestDemo>

  </div>
</template>

<script>
  import TestDemo from '../../../../src/packages/TestDemo/components/testContent';

  export default {
    name: 'Dashboard',
    components: { TestDemo },
    data() {
      return {
        TestDemomodel: {
          ipt: 22,
        },
      };
    },
    created() {
      console.log(9999)
      console.log(this.TestDemomodel)
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
