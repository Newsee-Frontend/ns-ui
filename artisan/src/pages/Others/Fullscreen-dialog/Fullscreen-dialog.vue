<!--UI 组件库 - Fullscreen-dialog - 页面测试-->
<template>
  <div>
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
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
