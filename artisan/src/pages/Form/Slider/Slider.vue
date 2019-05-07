<!--UI 组件库 - Slider - 页面测试-->
<template>
  <div class="slider-wrapper">
    <div class="slider-line">
      <span>正常</span>
      <ns-slider v-model="value" width="200px"></ns-slider>
    </div>
    <div class="slider-line">
      <span>自定义tooltip</span>
      <ns-slider v-model="value"
                 width="200px"
                 :formatTooltip = "formatTooltip"
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span>步长</span>
      <ns-slider v-model="value"
                 width="200px"
                 :step="20"
                 showtopsS
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span>范围选择</span>
      <ns-slider v-model="valueRange"
                 width="200px"
                 range
                 :max="50"
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span>vertical</span>
      <ns-slider v-model="valueRange"
                 vertical
                 range
                 height="200px"
                 :max="50"
      ></ns-slider>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        value: 20,
        valueRange: [10,30]
      };
    },
    computed: {},
    created() {

    },
    methods: {
      formatTooltip: function(val){
        return val + 'px'
      }
    },
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .slider-line{
    display: flex;
    align-items: center;
  }
  .slider-line span{
    margin-right: 50px;
  }
</style>
