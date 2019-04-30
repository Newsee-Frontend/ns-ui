<!--UI 组件库 - StackedBarChart - 页面测试-->
<template>
  <div>
    <div id="stackedBarChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'stackedBarChart-demo',
    data() {
      return {
        data: [
          [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "1400",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1546290632000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "1200",
                "date": "20191",
                "departmentID": "100845",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553545231000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "1000",
                "date": "20191",
                "departmentID": "1234",
                "departmentName": "烟台城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553631632000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "800",
                "date": "20191",
                "departmentID": "1235",
                "departmentName": "北京城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553545231000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "301",
                "departmentName": "东营城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "302",
                "departmentName": "日照城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553631632000,
                "unit": "万元"
            }
        ], [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "700",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1546290632000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "100845",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "500",
                "date": "20191",
                "departmentID": "1234",
                "departmentName": "烟台城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "1235",
                "departmentName": "北京城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553545231000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "300",
                "date": "20191",
                "departmentID": "301",
                "departmentName": "东营城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "200",
                "date": "20191",
                "departmentID": "302",
                "departmentName": "日照城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            }
        ], [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "700",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1546290632000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "100845",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "500",
                "date": "20191",
                "departmentID": "1234",
                "departmentName": "烟台城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "1235",
                "departmentName": "北京城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553545231000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "300",
                "date": "20191",
                "departmentID": "301",
                "departmentName": "东营城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "200",
                "date": "20191",
                "departmentID": "302",
                "departmentName": "日照城市公司",
                "shouldTarget": "",
                "targetItem": "",
                "targetUpdateTime": 1553718031000,
                "unit": "万元"
            }
          ]
        ]
      };
    },
    methods: {},
    mounted() {
      nscharts.stackedBarChart(this.data, 'stackedBarChart', {
          gridLeft: 10,
          gridTop: 50,
          gridRight: 30,
          gridBottom: -10,
          tooltipUnit: '万元',
          legendName: ['总营收', '本年营收', '往年营收']
      });
    },
  };
</script>
