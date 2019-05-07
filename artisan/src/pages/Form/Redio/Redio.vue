<!--UI 组件库 - Redio - 页面测试-->
<template>
  <div class="redio-wrapper">
    <div class="redio-item">
      <h2 style="margin: 20px 0">正常</h2>
      <ns-redio
        v-model="selectRedio"
        :options="options"
        height="20px"
      />
    </div>

    <div class="redio-item" style="line-height: 50px;">
      <h2 style="margin: 20px 0">button</h2>

      <ns-redio
        v-model="selectRedio"
        :options="options"
        type="button"
        size="mini"
      />

      <ns-redio
        v-model="selectRedio"
        :options="options"
        type="button"
      />

    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        selectRedio: '11',
        options: [
          { label: '北京1', value: '11', disabled: true },
          { label: '北京2', value: '12' },
          { label: '北京3', value: '13' },
          { label: '北京4', value: '14' },
        ]
      };
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
