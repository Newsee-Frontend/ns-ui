<template>
  <div class="input">
    <div v-bind:class="['ns-input--disabled', 'ns-input--primary',{'ns-input__text--disabled': true}]"></div>
    <span>{{inoutModel || text}}</span>
    <!--<el-input v-model="inoutModel" placeholder="请输入内容" size="small"></el-input>-->
    <ns-input
      v-model="inoutModel"
      :size='size'
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :minlength="minlength"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :readonly="readonly"
      :clearable="clearable"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      @change="change"
      @blur="blur"
      @focus="focus"
      @iconClick="iconClick"
    >
    </ns-input>
    <i slot="suffix" class="el-input__icon el-icon-date"></i>
    <i class="el-icon-edit"></i>
  </div>
</template>

<script>
  export default {
    name: 'col',
    data() {
      return {
        inoutModel: '',
        text: '请输入',
        size: 'small',
        width: '300px',
        height: '40px',
        type: 'text',
        placeholder: '请输入..',
        rows: 3,
        minlength: 0, //最小输入长度
        maxlength: 300, //最大输入长度
        disabled: false,
        autofocus: false,
        readonly: false,
        clearable: false,
        prefixIcon: 'daohang', //输入框头部图标
        suffixIcon: 'gailan', //输入框尾部图标
      }
    },
    created() {

    },
    methods: {
      /**
       * change
       * @param value
       */
      change(value) {
        console.log('change', value);
      },
      /**
       * blur
       * @param event
       */
      blur(event) {
        console.log('blur', event);
      },
      /**
       * focus
       * @param event
       */
      focus(event) {
        console.log('focus', event);
      },
      /**
       * icon-click
       * @param value
       * @param type
       */
      iconClick(value, type) {
        console.log('iconClick', value, type);
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "input";
</style>
