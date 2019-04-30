<!--UI 组件库 - BarDoubleLineChart - 页面测试-->
<template>
  <div>
    <div id="barDoubleLineChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'barDoubleLineChart-demo',
    data() {
      return {
        data: [
          [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576637000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "500",
                "date": "20191",
                "departmentID": "100845",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576631000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "100943",
                "departmentName": "安徽城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576640000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "300",
                "date": "20191",
                "departmentID": "100674",
                "departmentName": "武汉城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576634000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "200",
                "date": "20191",
                "departmentID": "100787",
                "departmentName": "青岛城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576639000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "100",
                "date": "20191",
                "departmentID": "100826",
                "departmentName": "云南城市公司",
                "shouldTarget": "",
                "targetItem": "净增长合同额",
                "targetUpdateTime": 1552576641000,
                "unit": "万元"
            }
        ],
        [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "1200",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "接管合同额",
                "targetUpdateTime": 1550412037000,
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
                "targetItem": "接管合同额",
                "targetUpdateTime": 1552576626000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "800",
                "date": "20191",
                "departmentID": "100943",
                "departmentName": "安徽城市公司",
                "shouldTarget": "",
                "targetItem": "接管合同额",
                "targetUpdateTime": 1552576630000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "100674",
                "departmentName": "武汉城市公司",
                "shouldTarget": "",
                "targetItem": "接管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "100787",
                "departmentName": "青岛城市公司",
                "shouldTarget": "",
                "targetItem": "接管合同额",
                "targetUpdateTime": 1552576629000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "1000",
                "date": "20191",
                "departmentID": "100826",
                "departmentName": "云南城市公司",
                "shouldTarget": "",
                "targetItem": "接管合同额",
                "targetUpdateTime": 1552576631000,
                "unit": "万元"
            }
        ],
        [
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "600",
                "date": "20191",
                "departmentID": "100429",
                "departmentName": "沈阳城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1552576617000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "100",
                "date": "20191",
                "departmentID": "100845",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "400",
                "date": "20191",
                "departmentID": "100943",
                "departmentName": "安徽城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "300",
                "date": "20191",
                "departmentID": "100674",
                "departmentName": "武汉城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "200",
                "date": "20191",
                "departmentID": "100787",
                "departmentName": "青岛城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            },
            {
                "actualDenominator": "",
                "actualNumerator": "",
                "actualTarget": "900",
                "date": "20191",
                "departmentID": "100826",
                "departmentName": "云南城市公司",
                "shouldTarget": "",
                "targetItem": "撤管合同额",
                "targetUpdateTime": 1550412037000,
                "unit": "万元"
            }
          ]
        ]
      };
    },
    methods: {},
    mounted() {
      nscharts.barDoubleLineChart(this.data, 'barDoubleLineChart', {
        gridLeft: 10,
        gridTop: 50,
        gridRight: 30,
        gridBottom: -10,
        legendName: ['净增长合同额', '接管合同额', '撤管合同额']
      });
    },
  };
</script>
