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
          :keyMap = keyMap
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
          :keyMap = keyMap
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
          :keyMap = keyMap
          :options="options"
        ></ns-select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        selectModel: 1,
        selectModels: [],
        keyMap: {
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
      getDictionaryFun: function(){
        return  new Promise((resolve, reject) => {
          setTimeout(()=>{
            resolve([
              { code: '1', name: '北京' },
              { code: '2', name: '香港' },
              { code: '3', name: '深圳' },
            ])
          }, 1000)
        })
      }
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
