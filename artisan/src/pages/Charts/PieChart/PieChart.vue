<!--UI 组件库 - PieChart - 页面测试-->
<template>
  <div>
    <div id="pieChart" style="width: 400px;height: 200px"></div>
  </div>
</template>

<script>
  import nscharts from '../../../utils/nscharts';

  export default {
    name: 'pieChart-demo',
    data() {
      return {
        data: [
          {
            'actualTarget': '4.14',
            'targetItem': '住宅',
          },
          {
            'actualTarget': '48.21',
            'targetItem': '学校',
          },
          {
            'actualTarget': '14.96',
            'targetItem': '写字楼',
          },
          {
            'actualTarget': '13.42',
            'targetItem': '环卫',
          },
          {
            'actualTarget': '6.28',
            'targetItem': '医院',
          },
          {
            'actualTarget': '2.06',
            'targetItem': '产业园区',
          },
          {
            'actualTarget': '10.93',
            'targetItem': '其他',
          },
        ],
      };
    },
    methods: {},
    mounted() {
      nscharts.pieChart(this.data, 'pieChart', {
        centerPosition: ['30%', '50%'],
        radiusScale: ['52%', '68%'],
        legendPosition: ['56%', '26%'],
        textPosition: ['29%', '44%'],
        text: ['各业态', '收入占比'],
        centerFontSize: 14,
        legendMaxRowNum: 4,
        tooltipUnit: '元',
        clickFn: function(result) {
          alert(result.name + '\n' + result.value + '万元 (' + result.percent + '%)');
        },
      });
    },
  };
</script>
