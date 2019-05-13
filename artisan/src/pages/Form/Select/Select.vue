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
            size="small"
            :keyRefer=keyRefer
            height="40px"
            width="300px"
            :options="options"
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
          <ns-select
            size="small"
            :keyRefer=keyRefer
            height="40px"
            width="300px"
            v-model="selectModel"
            :options="options"
            :disabled="true"
            @change="change"
            @focus="focus"
            @blur="blur"
            @clear="clear"
            @visible-change="visibleChange"
            @remove-tag="removeTag"
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
          :options="options"
          :keyRefer=keyRefer
          :multipleLimit="2"
          multiple
          collapseTags
          placeholder="请选择"
          @change="change"
          @focus="focus"
          @blur="blur"
          @clear="clear"
          @visible-change="visibleChange"
          @remove-tag="removeTag"
        ></ns-select>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">ns-select-dictionary</template>
      <template slot="content">
        <ns-select-dictionary></ns-select-dictionary>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import nsSelectDictionary from '../../../components/SelectDictionary/SelectDictionary.vue';

  export default {
    name: 'select-demo',

    components: {
      nsSelectDictionary,
    },

    data() {
      return {
        selectModel: 1,
        selectModels: [],
        keyRefer: {
          label: 'name',
          value: 'value',
        },
        options: [
          { name: '北京', value: 1 },
          { name: '上海', value: 2 },
          { name: '杭州', value: 3 },
        ],
      };
    },
    computed: {},
    created() {

    },
    methods: {
      /**
       * select change
       * @param val
       */
      change: function(val){
        console.log('change select',val)
      },

      /**
       * on-blur
       */
      blur: function(){
        console.log('select blur')
      },

      /**
       * on-focus
       */
      focus: function(){
        console.log('select focus')
      },

      /**
       * on-focus
       */
      clear: function(){
        console.log('select clear')
      },

      /**
       * on-visibleChange
       */
      visibleChange: function(){
        console.log('select visibleChange')
      },

      /**
       * on remove tag
       */
      removeTag: function(){
        console.log('select remove tag')
      }

    },
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .selecte-line {
    margin-bottom: 20px;
  }
</style>
