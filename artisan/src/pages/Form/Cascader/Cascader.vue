<!--UI 组件库 - Cascader - 页面测试-->
<template>
  <div class="cascader-wrapper">
    <ns-cascader
      v-model="cascaderModel"
      width="300px"
      height="38px"
      placeholder="请选择"
      clearable
      :options="options"
      @change="getChange"
    ></ns-cascader>
  </div>
</template>

<script>
  export default {
    name: 'cascader-demo',
    data() {
      return {
        cascaderModel: [1, 11, 111],
        options: [
          {
            label: '浙江', value: 1, children: [
              {
                label: '杭州', value: 11, children: [
                  { label: '滨江区', value: 111 },
                  { label: '下城区', value: 112 },
                  { label: '江干区', value: 113 },
                ],
              },
            ],
          },
        ],
      };
    },
    methods: {
      getChange(value) {
        console.log('cascader-change',value);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
