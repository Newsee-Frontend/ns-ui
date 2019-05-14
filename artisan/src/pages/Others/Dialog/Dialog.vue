<!--UI 组件库 - Dialog - 页面测试-->
<template>
  <div>

    <el-button @click="buttonClick">点击打开</el-button>

    <ns-dialog
      :visible.sync="visible"
      :type="type"
      :size="size"
      :title="title"
      :top="top"
      :modal="modal"

      :lock-scroll="lockScroll"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"

      :show-close="showClose"
      :before-close="beforeClose"
      @close="close"
      @open="open"

      v-if="visible"
    >
      <div>
        <h1>dialog-demo</h1>
      </div>
      <div slot="footer">
        <ns-button @click="buttonClose">关闭</ns-button>
      </div>
    </ns-dialog>

  </div>
</template>

<script>

  export default {
    name: 'dialog-demo',
    data() {
      return {
        visible: false,
        type: 'autoHeight',//'normal','simple','noFooter','noHeader','autoHeight'
        size: 'large',//'mini', 'small', 'normal', 'medium', 'large'
        title: '标题',
        top: '7%',
        modal: true,
        closeOnClickModal: true,
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
        console.log('dialog-open');
      },
      beforeClose(done) {
        console.log('dialog-beforeClose');
        done();
      },
      close() {
        console.log('dialog-close');
        console.log(this.visible);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
