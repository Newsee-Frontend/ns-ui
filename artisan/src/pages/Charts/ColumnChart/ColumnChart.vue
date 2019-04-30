<!--UI 组件库 - ColumnChart - 页面测试-->
<template>
  <div>
    <div id="columnChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'columnChart-demo',
    data() {
      return {
        data:[
          [
            {
                "actualTarget": "2808.78",
                "departmentName": "济南城市公司",
                "shouldTarget": "2808"
            },
            {
                "actualTarget": "2099.32",
                "departmentName": "泰安城市公司",
                "shouldTarget": "2099"
            },
            {
                "actualTarget": "2007.08",
                "departmentName": "烟台城市公司",
                "shouldTarget": "2007"
            },
            {
                "actualTarget": "1738.57",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "1738"
            },
            {
                "actualTarget": "1710.92",
                "departmentName": "济宁城市公司",
                "shouldTarget": "1710"
            },
            {
                "actualTarget": "1629.28",
                "departmentName": "东营城市公司",
                "shouldTarget": "1629"
            },
            {
                "actualTarget": "1433.54",
                "departmentName": "云南城市公司",
                "shouldTarget": "1433"
            },
            {
                "actualTarget": "1142.31",
                "departmentName": "北京城市公司",
                "shouldTarget": "1142"
            },
            {
                "actualTarget": "1081.50",
                "departmentName": "安徽城市公司",
                "shouldTarget": "1081"
            },
            {
                "actualTarget": "750.77",
                "departmentName": "西安城市公司",
                "shouldTarget": "750"
            },
            {
                "actualTarget": "0.00",
                "departmentName": "广州城市公司",
                "shouldTarget": "0"
            }
        ],
        [
            {
                "actualTarget": "2808.78",
                "departmentName": "济南城市公司",
                "shouldTarget": "2808"
            },
            {
                "actualTarget": "2099.32",
                "departmentName": "泰安城市公司",
                "shouldTarget": "2099"
            },
            {
                "actualTarget": "2007.08",
                "departmentName": "烟台城市公司",
                "shouldTarget": "2007"
            },
            {
                "actualTarget": "1738.57",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "1738"
            },
            {
                "actualTarget": "1710.92",
                "departmentName": "济宁城市公司",
                "shouldTarget": "1710"
            },
            {
                "actualTarget": "1629.28",
                "departmentName": "东营城市公司",
                "shouldTarget": "1629"
            },
            {
                "actualTarget": "1433.54",
                "departmentName": "云南城市公司",
                "shouldTarget": "1433"
            },
            {
                "actualTarget": "1142.31",
                "departmentName": "北京城市公司",
                "shouldTarget": "1142"
            },
            {
                "actualTarget": "1081.50",
                "departmentName": "安徽城市公司",
                "shouldTarget": "1081"
            },
            {
                "actualTarget": "750.77",
                "departmentName": "西安城市公司",
                "shouldTarget": "750"
            },
            {
                "actualTarget": "0.00",
                "departmentName": "广州城市公司",
                "shouldTarget": "0"
            }
        ],
        [
            {
                "actualTarget": "2808.78",
                "departmentName": "济南城市公司",
                "shouldTarget": "2808"
            },
            {
                "actualTarget": "2099.32",
                "departmentName": "泰安城市公司",
                "shouldTarget": "2099"
            },
            {
                "actualTarget": "2007.08",
                "departmentName": "烟台城市公司",
                "shouldTarget": "2007"
            },
            {
                "actualTarget": "1738.57",
                "departmentName": "黑龙江城市公司",
                "shouldTarget": "1738"
            },
            {
                "actualTarget": "1710.92",
                "departmentName": "济宁城市公司",
                "shouldTarget": "1710"
            },
            {
                "actualTarget": "1629.28",
                "departmentName": "东营城市公司",
                "shouldTarget": "1629"
            },
            {
                "actualTarget": "1433.54",
                "departmentName": "云南城市公司",
                "shouldTarget": "1433"
            },
            {
                "actualTarget": "1142.31",
                "departmentName": "北京城市公司",
                "shouldTarget": "1142"
            },
            {
                "actualTarget": "1081.50",
                "departmentName": "安徽城市公司",
                "shouldTarget": "1081"
            },
            {
                "actualTarget": "750.77",
                "departmentName": "西安城市公司",
                "shouldTarget": "750"
            },
            {
                "actualTarget": "0.00",
                "departmentName": "广州城市公司",
                "shouldTarget": "0"
            }
          ]
        ]
      };
    },
    methods: {},
    mounted() {
      nscharts.columnChart(this.data, 'columnChart', {
            gridLeft: 10,
            gridTop: 50,
            gridRight: 30,
            gridBottom: 10,
            tooltipUnit: '万元',
            legendName: ['指标一', '指标二', '指标三'],
            xAxisMaxCharNum: 3,
            xAxisFilter: '城市公司',
            yAxisSplitNum: 2,
            dataZoomStyle: [0, 50, false]
        });
    },
  };
</script>
