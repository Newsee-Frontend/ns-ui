<!--UI 组件库 - GanttChart - 页面测试-->
<template>
  <div>
    <div id="ganttChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'ganttChart-demo',
    data() {
      return {
        data: [
          {
              "actualDenominator": "",
              "actualNumerator": "",
              "actualTarget": "项目1",
              "date": "201807",
              "departmentID": "63",
              "departmentName": "222",
              "shouldTarget": "",
              "targetItem": "",
              "targetUpdateTime": 1534214430000,
              "unit": ""
          },
          {
              "actualDenominator": "",
              "actualNumerator": "",
              "actualTarget": "项目2",
              "date": "201810",
              "departmentID": "63",
              "departmentName": "222",
              "shouldTarget": "",
              "targetItem": "",
              "targetUpdateTime": 1534214430000,
              "unit": ""
          },
          {
              "actualDenominator": "",
              "actualNumerator": "",
              "actualTarget": "项目3",
              "date": "201901",
              "departmentID": "63",
              "departmentName": "222",
              "shouldTarget": "",
              "targetItem": "",
              "targetUpdateTime": 1534214430000,
              "unit": ""
          },
          {
              "actualDenominator": "",
              "actualNumerator": "",
              "actualTarget": "项目4",
              "date": "201904",
              "departmentID": "63",
              "departmentName": "222",
              "shouldTarget": "",
              "targetItem": "",
              "targetUpdateTime": 1534214430000,
              "unit": ""
          }
        ]
      };
    },
    methods: {},
    mounted() {
    nscharts.ganttChart(this.data, 'ganttChart', {
      });
    },
  };
</script>
