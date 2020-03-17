<!--UI 组件库 - Switch - 页面测试-->
<template>
  <div class="win switch-wrapper">
    <ns-switch
      v-model="value"
      activeText="季报"
      inactiveText="月报"
      activeColor="#13ce66"
      inactiveColor="#ff4949"
      @change="getChange"
    ></ns-switch>

    <ns-switch
      v-model="value"
      :switchWidth="50"
      @change="getChange"
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
    methods: {
      getChange(val){
        console.log(val)
      }
    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
