<!--UI 组件库 - Dialog - 页面测试-->
<template>
  <div>
    <a @click.stop="buttonClick">点击打开</a>
    <!--<el-dialog-->
    <!--:visible.sync="visible"-->
    <!--:fullscreen="fullscreen"-->
    <!--append-to-body-->
    <!--:modal="false"-->
    <!--&gt;-->
    <!--123123123-->
    <!--</el-dialog>-->
    <ns-dialog
      :visible.sync="visible"
      :type="type"
      :size="size"
      :title="title"
      :top="top"
      :modal="modal"
      :fullscreen="fullscreen"
      :lock-scroll="false"
      :modal-append-to-body="modalAppendToBody"
      :close-on-click-modal="closeOnClickModal"
      :show-close="showClose"
      :before-close="beforeClose"
      @close="close"
      @open="open"
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
        visible: false,
        type: 'normal',//'normal','simple','noFooter','noHeader','autoHeight'
        size: 'large',
        title: '标题',
        top: '7%',
        modal: true,
        fullscreen: true,
        modalAppendToBody: true,
        closeOnClickModal: true,
        showClose: true,
      };
    },
    computed: {},
    created() {

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
