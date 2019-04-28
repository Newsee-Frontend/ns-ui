<!--UI 组件库 - Time-interval - 页面测试-->
<template>
  <div>
    time-interval-demo
    <ns-time-interval v-model="timeIntervalModel"></ns-time-interval>
  </div>
</template>

<script>
  export default {
    name: 'time-interval-demo',
    data() {
      return {
        timeIntervalModel: {
          dateType: '',//类型
          mdays: '',//第几个月第几号
          monthDay: '',//当月几号号
          weeks: '',//星期
          mSenconds: '',//时间
        },
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
