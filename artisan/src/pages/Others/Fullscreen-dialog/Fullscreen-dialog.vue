<!--UI 组件库 - Fullscreen-dialog - 页面测试-->
<template>
  <div>
    <div id="test1" style="width: 400px;height: 200px"></div>
    <el-button @click="buttonClick">点击打开</el-button>

    <ns-fullscreen-dialog
      :visible.sync="visible"
      :type="type"
      title="全屏弹窗"
      :lock-scroll="lockScroll"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :before-close="beforeClose"
      @close="close"
      @open="open"

      v-if="visible"
    >
      <div>
        <h1>fullscreen-dialog-demo</h1>
      </div>
      <div slot="footer">
        <ns-button @click="buttonClose">关闭</ns-button>
      </div>
    </ns-fullscreen-dialog>
  </div>
</template>

<script>
  import nscharts from './nscharts';

  export default {
    name: 'fullscreen-dialog-demo',
    data() {
      return {
        visible: false,
        title: '标题',
        type: 'normal',//'normal','simple','noFooter','noHeader',nscharts.js
        closeOnPressEscape: true,
        lockScroll: false,
        showClose: true,
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
    methods: {
      buttonClick() {
        this.visible = true;
      },
      buttonClose() {
        this.visible = false;
      },
      open() {
        console.log('fullscreen-dialog-open');
      },
      beforeClose(done) {
        console.log('fullscreen-dialog-beforeClose');
        done();
      },
      close() {
        console.log('fullscreen-dialog-close');
        console.log(this.visible);
      },
    },
    mounted() {
      nscharts.pieChart(this.data, 'test1', {
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

<style rel="stylesheet/scss" lang="scss">

</style>
