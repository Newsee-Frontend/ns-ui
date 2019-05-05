<!--UI 组件库 - LabelLinePieChart - 页面测试-->
<template>
  <div>
    <div id="labelLinePieChart" style="width: 500px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'labelLinePieChart-demo',
    data() {
      return {
        data: [
          {
              "actualTarget": "4.14",
              "targetItem": "住宅"
          },
          {
              "actualTarget": "48.21",
              "targetItem": "学校"
          },
          {
              "actualTarget": "14.96",
              "targetItem": "写字楼"
          },
          {
              "actualTarget": "13.42",
              "targetItem": "环卫"
          },
          {
              "actualTarget": "6.28",
              "targetItem": "医院"
          },
          {
              "actualTarget": "2.06",
              "targetItem": "产业园区"
          },
          {
              "actualTarget": "10.93",
              "targetItem": "其他"
          }
        ]
      }
    },
    methods: {},
    mounted() {
      nscharts.labelLinePieChart(this.data, 'labelLinePieChart', {
            radiusScale: ['16%', '68%'],
            centerPosition: ['42%', '50%'],
            legendPosition: ['83%', '6%'],
            legendMaxRowNum: 7,
            tooltipUnit: '个'
        });
    },
  };
</script>
