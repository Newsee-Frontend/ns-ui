<!--UI 组件库 - ColorPicker - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">颜色选择器</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <ns-color-picker v-model="color1" :size="size" :disabled="disabled" :showAlpha="showAlpha" :colorFormat="colorFormat"></ns-color-picker>
        <h3>选择值：{{color1}}</h3>
        <div class="control-block form-block-line">
          <span>是否禁用:</span>
          <ns-switch v-model="disabled"></ns-switch>
          <span>是否支持透明度选择:</span>
          <ns-switch v-model="showAlpha"></ns-switch>
          <div class="control-block form-block-line">
            <span>尺寸大小:</span>
            <ns-radio v-model="size" :options="sizeOpts"></ns-radio>
          </div>
          <div class="control-block form-block-line">
            <span>写入 v-model 的颜色的格式:</span>
            <ns-radio v-model="colorFormat" :options="colorFormatOpts"></ns-radio>
          </div>
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'color-picker-demo',
    data() {
      return {
        color1: '#409EFF',
        size: 'normal',
        disabled: false,
        showAlpha: true,
        colorFormat: 'rgb',
        sizeOpts: [
          { label: 'mini', value: 'mini' },
          { label: 'small', value: 'small' },
          { label: 'normal', value: 'normal' },
          { label: 'medium', value: 'medium' },
          { label: 'large', value: 'large' },
        ],
        colorFormatOpts: [
          { label: 'hsl', value: 'hsl' },
          { label: 'hsv', value: 'hsv' },
          { label: 'hex', value: 'hex' },
          { label: 'rgb', value: 'rgb' },
        ],
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
