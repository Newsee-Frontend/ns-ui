<!--UI 组件库 - Only-MMDD-picker - 页面测试-->
<template>
  <div>
    <ns-row>
      <p>
        MMDD-日期控件1值：
        <span>{{pickerModel1}}</span>
      </p>
      <ns-onlyMMDD-picker
        v-model="pickerModel1"
        size="normal"
        placeholder="选择日期"
        @change="change"
      >
      </ns-onlyMMDD-picker>
    </ns-row>

    <ns-row>
      <p>
        MMDD-日期控件1值：
        <span>{{pickerModel2}}</span>
      </p>
      <ns-onlyMMDD-picker
        v-model="pickerModel2"
        :editable="true"
        :clearable="false"
        placeholder="选择日期"
        width="150px"
      >
      </ns-onlyMMDD-picker>
    </ns-row>
  </div>
</template>

<script>
  export default {
    name: 'only-MMDD-picker-demo',
    data() {
      return {
        pickerModel1: '',
        pickerModel2: '05-24',
      };
    },
    created() {

    },
    methods: {
      change(value) {
        console.log('change', value);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .ns-row {
    margin-bottom: 20px;
  }
</style>
