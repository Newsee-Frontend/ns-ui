<!--UI 组件库 - Dialog - 页面测试-->
<template>
  <div>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      modal-append-to-body
      append-to-body
      fullscreen
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>


    <el-button @click="buttonClick">点击打开</el-button>

    <ns-dialog
      :visible.sync="visible"
      :type="fullscreen_type"
      :size="size"
      title="全屏弹窗"
      :modal="modal"

      :lock-scroll="lockScroll"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      fullscreen


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
        <el-button @click="buttonClose">关闭</el-button>
      </div>
    </ns-dialog>


  </div>
</template>

<script>

  export default {
    name: 'dialog-demo',
    data() {
      return {
        dialogVisible: false,
        visible: false,
        type: 'normal',//'normal','simple','noFooter','noHeader','autoHeight'
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
