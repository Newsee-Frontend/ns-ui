<!--UI 组件库 - BarChart - 页面测试-->
<template>
  <div>
    <div id="barChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'barChart-demo',
    data() {
      return {
        data: [
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
      nscharts.barChart(this.data, 'barChart', {
        gridLeft: 10,
        gridTop: 10,
        gridRight: 50,
        gridBottom: -20,
        tooltipUnit: '万元'
      });
    },
  };
</script>
