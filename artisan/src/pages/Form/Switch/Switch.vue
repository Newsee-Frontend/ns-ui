<!--UI 组件库 - Switch - 页面测试-->
<template>
  <div class="switch-wrapper">
    <ns-switch
      v-model="value"
      onText="季报"
      offText="月报"
      onColor="#13ce66"
      offColor="#ff4949"
    ></ns-switch>

    <ns-switch
      v-model="value"
      :switchWidth="50"
    ></ns-switch>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        value: true
      };
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
