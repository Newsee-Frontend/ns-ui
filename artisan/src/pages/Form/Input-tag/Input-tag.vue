<!--UI 组件库 - Input-tag - 页面测试-->
<template>
  <div class="input-tag-wrapper">
    <demo-block>
      <template slot="title">Input-tag no icon</template>
      <template slot="content">
        <ns-input-tag
          v-model="inputModel1"
          size="normal"
          :options="optionsDataTemplate"
          @iconClick="iconClick"
        ></ns-input-tag>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">Input-tag - prefix icon</template>
      <template slot="content">
        <ns-input-tag
          v-model="inputModel1"
          size="normal"
          :options="optionsDataTemplate"
          :prefixIcon="prefixIcon"
          @iconClick="iconClick"
        ></ns-input-tag>
        <div class="gap"></div>
        <ns-input-tag
          v-model="inputModel1"
          size="normal"
          collapseTags
          :options="optionsDataTemplate"
          :prefixIcon="prefixIcon"
          @iconClick="iconClick"
        ></ns-input-tag>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">Input-tag - suffix icon</template>
      <template slot="content">
        <ns-input-tag
          v-model="inputModel2"
          size="medium"
          :options="optionsDataTemplate"
          :suffixIcon="suffixIcon"
          @iconClick="iconClick"
        ></ns-input-tag>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">Input-tag in form</template>
      <template slot="content">
        <ns-form label-width="100px"
                 :model="formData"
                 :rules="rules"
        >
          <ns-form-item label="姓名" prop="inputModel4">
            <ns-input-tag
              size="large"
              v-model="formData.inputModel4"
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
          </ns-form-item>
        </ns-form>
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
      let validator = function(rule, value, callback) {
        console.log(1231231);
        console.log(value);
        if (value && value.length) {

        }
        else {
          callback(new Error('错误'));
        }
      };
      return {
        inputModel1: [3, 4, 5, 6],
        inputModel2: [3, 4, 5],
        inputModel3: [1, 2, 3, 4, 5, 7],
        formData: {
          inputModel4: [6,7],
        },

        prefixIcon: 'daohang', //输入框头部图标
        suffixIcon: 'gailan', //输入框尾部图标
        //'mini', 'small', 'normal', 'medium', 'large'
        rules: {
          // inputModel3: [
          //   { validator: validator, trigger: 'blur,change' },
          // ],
          inputModel3: [{ required: true, trigger: 'change', message: '请添加项目负责人' }],
        },
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
