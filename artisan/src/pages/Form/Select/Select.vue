<!--UI 组件库 - Select - 页面测试-->
<template>
  <div class="select-wrapper">
    <div class="select-setion">
      <div>  ns-select </div>
      <div class="selecte-line">
        <span> 单选: {{selectModel}} </span>
        <ns-select
          :disabled="true"
          size="small"
          :keyRefer = keyRefer
          height="40px"
          v-model="selectModel"
          :options="options"
        ></ns-select>
      </div>

      <div class="selecte-line">
        <span> 多选: {{selectModels}} </span>
        <ns-select
          v-model="selectModels"
          :options="options"
          :keyRefer = "keyRefer"
          :multipleLimit="2"
          multiple
          collapseTags
          placeholder="请选择"
        ></ns-select>
      </div>

      <div class="selecte-line">
        <span> 自定义: {{selectModel}} </span>
        <ns-select
          size="mini"
          v-model="selectModel"
          custom
          :keyRefer = keyRefer
          :options="options"
        ></ns-select>
      </div>
    </div>

    <div class="select-setion">
      <div>  ns-select-dictionary </div>
      <div class="selecte-line">
        <ns-select-dictionary></ns-select-dictionary>
      </div>
    </div>
    </div>
</template>

<script>
  import nsSelectDictionary from '../../../components/SelectDictionary/SelectDictionary.vue'
  export default {
    name: '',

    components: {
      nsSelectDictionary
    },

    data() {
      return {
        selectModel: 1,
        selectModels: [],
        keyRefer: {
          label: 'name',
          value: 'value'
        },
        options: [
          { name: '北京', value:  1 },
          { name: '上海', value: 2},
          { name: '杭州', value: 3},
        ]
      };
    },
    computed: {},
    created() {

    },
    methods: {

    },
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .selecte-line{
    margin-bottom: 20px;
  }
</style>
