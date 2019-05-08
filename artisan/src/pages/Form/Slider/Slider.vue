<!--UI 组件库 - Slider - 页面测试-->
<template>
  <div class="slider-wrapper">
    <demo-block>
      <template slot="title">slider 基础用法</template>
      <template slot="describe">slider基础用法, 不展示tooltip, width定义宽度，自定义tooltip, disabled滑块， 显示间断点，显示input， 触发change事件</template>
      <template slot="content">
        <div class="slider-line">
          <span class="decs">不展示tooltip</span>
          <ns-slider v-model="value"
                     width="200px"
                     :showTooltip="false"
                     disabled
                     @change="getChange"
                     :formatTooltip = "formatTooltip"
          ></ns-slider>
        </div>
        <div class="slider-line">
          <span class="decs">自定义tooltip</span>
          <ns-slider v-model="value"
                     width="200px"
                     @change="getChange"
                     :step="20"
                     showStops
                     :formatTooltip = "formatTooltip"
          ></ns-slider>
        </div>
        <div class="slider-line">
          <span class="decs">显示input</span>
          <ns-slider v-model="value"
                     width="400px"
                     showInput
                     @change="getChange"
          ></ns-slider>
        </div>
      </template>
    </demo-block>
    <demo-block>
      <template slot="title">slider 范围选择</template>
      <template slot="describe"> slider范围选择, 定义最小值和最大值， 滑块纵向展示</template>
      <template slot="content">
        <div class="slider-line">
          <span class="decs">横向范围选择</span>
          <ns-slider v-model="valueRange"
                     width="200px"
                     @change="getChange"
                     range
                     :min="10"
                     :max="50"
          ></ns-slider>
        </div>
        <div class="slider-line">
          <span class="decs">纵向范围选择</span>
          <ns-slider v-model="valueRange"
                     vertical
                     range
                     :min="10"
                     :max="50"
                     height="200px"
          ></ns-slider>
        </div>
      </template>
    </demo-block>
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
      },

      getChange: function(val){
        console.log('slider-changed',val)
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
    width: 100px;
  }
</style>
