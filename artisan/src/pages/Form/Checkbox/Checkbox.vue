<!--UI 组件库 - Checkbox - 页面测试-->
<template>
  <div class="checkbox-wrapper">
    <div>
      <h2 style="margin: 20px 0"> 正常状态</h2>
      <ns-checkbox
        v-model="checkValues"
        :options="options"
      ></ns-checkbox>
    </div>

    <div>
      <h2 style="margin: 20px 0"> 带全选的状态</h2>
      <ns-checkbox
        v-model="checkValues"
        :options="options"
        indeterminate
      ></ns-checkbox>
    </div>
    <div style="line-height: 50px;">
      <h2 style="margin: 20px 0"> button样式</h2>
      <ns-checkbox
        v-model="checkValues"
        :options="options"
        type="button"
        size="mini"
      ></ns-checkbox>

      <ns-checkbox
        v-model="checkValues"
        :options="options"
        type="button"
        size="large"
      ></ns-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        options: [
          { label: '北京1', value: '11', disabled: true  },
          { label: '北京2', value: '12' },
          { label: '北京3', value: '13' },
          { label: '北京4', value: '14' },
        ],
        checkValues: ['11']
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
