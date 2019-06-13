<!--UI 组件库 - Select - 页面测试-->
<template>
  <div class="select-wrapper">
    <demo-block>
      <template slot="title">
        基础用法（单选）
      </template>
      <template slot="describe">
        单选，使用size（width，height）定义宽高，禁用状态，keyRefer相对应的字段。
      </template>
      <template slot="content">
        <div>选择的值：{{selectModel}}</div>
        <div class="gap">
          <ns-select
            v-model="selectModel"
            size="medium"
            :keyRefer=keyRefer
            :options="optionsDataTemplate"
            :clearable="true"
            :disabled="false"
            :allowCreate="false"
            @change="change"
            @focus="focus"
            @blur="blur"
            @clear="clear"
            @visible-change="visibleChange"
            @remove-tag="removeTag"
          ></ns-select>
          <ns-select size="small" v-model="selectModel" :keyRefer=keyRefer :options="optionsDataTemplate" disabled @change="change"
          ></ns-select>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">
        多选
      </template>
      <template slot="describe">
        多选， 限制条数
      </template>
      <template slot="content">
        <ns-select
          v-model="selectModels"
          :options="optionsDataTemplate"
          :keyRefer=keyRefer
          :multipleLimit="2"
          multiple
          collapseTags
          placeholder="请选择"
          width="300px"
          height="40px"
        ></ns-select>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">ns-select-dictionary</template>
      <template slot="content">
        <ns-select-dictionary
          :clearable="true"
          v-model="selectModelDictionary"
          multiple
          collapseTags
          @change="changeSelectModelDictionary"
          @clear="clearSelectModelDictionary"
        ></ns-select-dictionary>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';
  import nsSelectDictionary from '../../../components/SelectDictionary/SelectDictionary.vue';

  export default {
    name: 'select-demo',
    mixins: [formmixins],
    components: {
      nsSelectDictionary,
    },
    data() {
      return {
        selectModel: 1,
        selectModels: [2, 5, 6],
        selectModelDictionary: ['100'],
        keyRefer: {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        },
      };
    },
    computed: {
      ...mapGetters(['optionsDataTemplate']),
    },
    methods: {
      /**
       * select change
       * @param val
       */
      change: function(val) {
        console.log('change select', val);
      },

      /**
       * on-blur
       */
      blur: function() {
        console.log('select blur');
      },

      /**
       * on-focus
       */
      focus: function() {
        console.log('select focus');
      },

      /**
       * on-focus
       */
      clear: function() {
        console.log('select clear');
      },

      /**
       * on-visibleChange
       */
      visibleChange: function() {
        console.log('select visibleChange');
      },

      /**
       * on remove tag
       */
      removeTag: function() {
        console.log('select remove tag');
      },

      /**
       *  数据字典 change 事件
       */
      changeSelectModelDictionary: function(e){
        console.log('SelectModelDictionary change', e, this.selectModelDictionary)
      },

      /**
       *  数据字典 change 事件
       */
      clearSelectModelDictionary: function(){
        console.log('SelectModelDictionary clear', this.selectModelDictionary)
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .selecte-line {
    margin-bottom: 20px;
  }
</style>
