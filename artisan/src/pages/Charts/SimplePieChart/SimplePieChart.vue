<!--UI 组件库 - SimplePieChart - 页面测试-->
<template>
  <div>
    <div id="simplePieChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';
  export default {
    name: 'simplePieChart-demo',
    data() {
      return {
        data: [
          [
            {
                "actualTarget": "4.14"
            }
          ],
          [
            {
                "actualTarget": "12"
            }
          ]
        ]
      }
    },
    methods: {},
    mounted() {
      nscharts.simplePieChart(this.data, 'simplePieChart', {
          radiusScale: ['52%', '68%'],
          text: '完成率',
        tooltipText: ['', '未完成项<br>1. 项目一<br>2. 项目二']
      });
    },
  };
</script>
