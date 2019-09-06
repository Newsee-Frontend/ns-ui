<!--UI 组件库 - Input-tag - 页面测试-->
<template>
  <div class="input-tag-wrapper">
    <demo-block>
      <template slot="title">Input-tag 1</template>
      <template slot="content">
        <ns-input-tag
          v-model="inputModel1"
          size="normal"
          :options="optionsDataTemplate"
          :prefixIcon="prefixIcon"

        ></ns-input-tag>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">Input-tag 2</template>
      <template slot="content">
        <ns-input-tag
          v-model="inputModel2"
          size="medium"
          :options="optionsDataTemplate"
          :suffixIcon="suffixIcon"
        ></ns-input-tag>
      </template>
    </demo-block>


    <demo-block>
      <template slot="title">Input-tag 2</template>
      <template slot="content">
        <ns-input-tag
          size="large"
          v-model="inputModel3"
          :options="optionsDataTemplate"
          :prefixIcon="prefixIcon"
          :suffixIcon="suffixIcon"
          @click="click"
          @focus="onFocus"
          @change="change"
          @removeTag="removeTag"
          @onClear="onClear"
          @iconClick="iconClick"
        ></ns-input-tag>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';


  export default {
    mixins: [formmixins],

    data() {
      return {
        inputModel1: [3, 4, 5],
        inputModel2: [1, 2, 3, 4, 5, 7],
        inputModel3: [6],
        prefixIcon: 'daohang', //输入框头部图标
        suffixIcon: 'gailan', //输入框尾部图标
        //'mini', 'small', 'normal', 'medium', 'large'
      };
    },

    computed: {
      ...mapGetters(['optionsDataTemplate']),
    },
    methods: {
      click() {
        console.log('click 事件');
      },
      onFocus() {
        console.log('onFocus 事件');
      },
      change(val) {
        console.log('change 事件');
        console.log(val);
      },
      removeTag() {
        console.log('removeTag 事件');
      },
      onClear() {
        console.log('onClear 事件');
      },
      iconClick(type, val) {
        alert(`图标-${type} 点击事件`);
        console.log(val);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
