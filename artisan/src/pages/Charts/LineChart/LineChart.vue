<!--UI 组件库 - LineChart - 页面测试-->
<template>
  <div>
    <div id="lineChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'lineChart-demo',
    data() {
      return {
        data: [
          [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "50.08",
                "date": "2016",
                "departmentID": "1",
                "departmentName": "运营管理中心",
                "shouldTarget": "",
                "targetItem": "员工离职率",
                "targetUpdateTime": 1530155293000,
                "unit": "%"
            },
            {
                "actualDenominator": "29841",
                "actualNumerator": "1227",
                "actualTarget": "65.1",
                "date": "2017",
                "departmentID": "1",
                "departmentName": "集团本部",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1530155285000,
                "unit": "%"
            },
            {
                "actualDenominator": "4125",
                "actualNumerator": "2066",
                "actualTarget": "50",
                "date": "2018",
                "departmentID": "1",
                "departmentName": "集团本部",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1546192206000,
                "unit": "%"
            },
            {
                "actualDenominator": "10163",
                "actualNumerator": "985",
                "actualTarget": "9.7",
                "date": "2019",
                "departmentID": "1",
                "departmentName": "运营管理中心",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553716210000,
                "unit": "%"
            }
        ],
        [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "9.7",
                "date": "2016",
                "departmentID": "1",
                "departmentName": "运营管理中心",
                "shouldTarget": "",
                "targetItem": "员工离职率",
                "targetUpdateTime": 1530155293000,
                "unit": "%"
            },
            {
                "actualDenominator": "29841",
                "actualNumerator": "1227",
                "actualTarget": "50",
                "date": "2017",
                "departmentID": "1",
                "departmentName": "集团本部",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1530155285000,
                "unit": "%"
            },
            {
                "actualDenominator": "4125",
                "actualNumerator": "2066",
                "actualTarget": "65.1",
                "date": "2018",
                "departmentID": "1",
                "departmentName": "集团本部",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1546192206000,
                "unit": "%"
            },
            {
                "actualDenominator": "10163",
                "actualNumerator": "985",
                "actualTarget": "50.08",
                "date": "2019",
                "departmentID": "1",
                "departmentName": "运营管理中心",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553716210000,
                "unit": "%"
            }
          ]
        ]
      };
    },
    methods: {},
    mounted() {
      nscharts.lineChart(this.data, 'lineChart', {
        gridLeft: 10,
        gridTop: 50,
        gridRight: 30,
        gridBottom: 10,
        tooltipUnit: '%',
        legendName: ['X公司', 'Y公司']
      });
    },
  };
</script>
