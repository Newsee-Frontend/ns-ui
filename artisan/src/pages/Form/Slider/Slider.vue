<!--UI 组件库 - Slider - 页面测试-->
<template>
  <div class="slider-wrapper">
    <div class="slider-line">
      <span class="decs">正常</span>
      <ns-slider v-model="value" width="200px"></ns-slider>
    </div>
    <div class="slider-line">
      <span class="decs">自定义tooltip</span>
      <ns-slider v-model="value"
                 width="200px"
                 :formatTooltip = "formatTooltip"
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span class="decs">步长</span>
      <ns-slider v-model="value"
                 width="200px"
                 :step="20"
                 showtopsS
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span class="decs">显示input</span>
      <ns-slider v-model="value"
                 width="800px"
                 showInput
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span class="decs">范围选择</span>
      <ns-slider v-model="valueRange"
                 width="200px"
                 range
                 :max="50"
      ></ns-slider>
    </div>
    <div class="slider-line">
      <span class="decs">vertical</span>
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
  .slider-line .decs{
    margin-right: 50px;
  }
</style>
