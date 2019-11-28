<!--UI 组件库 - Time-interval - 页面测试-->
<template>
  <div>
    <ns-row>
      <p>时间频率控件1值：</p>
      <pre>{{timeIntervalModel1}}</pre>
      <ns-time-interval
        v-model="timeIntervalModel1"
      >
      </ns-time-interval>
    </ns-row>
    <ns-row>
      <p>时间频率控件2值：</p>
      <pre>{{timeIntervalModel2}}</pre>
      <ns-time-interval
        v-model="timeIntervalModel2"
        :disabled="disabled"
      >
      </ns-time-interval>
    </ns-row>
  </div>
</template>

<script>
  export default {
    name: 'time-interval-demo',
    data() {
      return {
        timeIntervalModel1: {
          dateType: 'year',//类型
          mdays: '',//第几个月第几号
          monthDay: 10,//当月几号号
          weeks: '',//星期
          mSenconds: '',//时间
        },
        timeIntervalModel2: {
          dateType: 'year',//类型
          mdays: '',//第几个月第几号
          monthDay: '',//当月几号号
          weeks: 'Wed',//星期
          mSenconds: '22:22:22',//时间
        },
        disabled: false,
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
  .ns-row {
    margin-bottom: 20px;
  }
</style>
