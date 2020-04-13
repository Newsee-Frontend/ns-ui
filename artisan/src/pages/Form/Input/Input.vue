<template>
  <div class="win">
    <demo-block>
      <template slot="title">Dialog - 对话框</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <div v-bind:class="['ns-input--disabled', 'ns-input--primary',{'ns-input__text--disabled': true}]">123123</div>

        <el-input v-model="inoutModel" placeholder="请输入内容" @change="change"></el-input>


        <div class="control-block form-block-line">
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
          <span>输入值: {{inoutModel}}</span>
        </div>
        <div class="control-block form-block-line">
          <ns-input v-model.number="num" maxlength="11">
            <template slot="suffix">年</template>
            <template slot="prefix">第</template>
          </ns-input>
          <span>输入值: {{num}},  我的数据类型是: {{ typeof(num) }}</span>
        </div>
        <div class="control-block form-block-line">
          <ns-input :size="size"></ns-input>
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'col',
    data() {
      return {
        num: 1,
        inoutModel: '高仓雄',
        text: '请输入',
        size: 'normal',
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
      };
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
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
