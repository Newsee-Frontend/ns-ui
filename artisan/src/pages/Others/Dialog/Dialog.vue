<!--UI 组件库 - Dialog - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">Dialog - 对话框</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <el-button @click="buttonClick">点击打开</el-button>
        <ns-dialog
          :visible.sync="visible"
          :type="type"
          :size="size"
          :title="title"
          :top="top"
          :modal="modal"

          :is-append-to-body="false"
          :lock-scroll="lockScroll"
          :close-on-click-modal="closeOnClickModal"
          :close-on-press-escape="closeOnPressEscape"

          :show-close="showClose"
          :before-close="beforeClose"
          @close="close"
          @open="open"
        >
          <div>
            <h1>dialog-demo</h1>
            <ns-editor :height="500" v-model="content"/>
            <div class="editor-content">
              <h3>输入内容如下:</h3>{{content}}
            </div>
          </div>
          <div slot="footer">
            <ns-button @click="buttonClose">关闭</ns-button>
          </div>
        </ns-dialog>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">Dialog - 对话框</template>
      <template slot="describe">嵌套用法</template>
      <template slot="content">
        <el-button @click=" visible2=true">点击打开</el-button>
        <ns-dialog
          :visible.sync="visible2"
          type="autoHeight"
          :size="size"
          :title="title"
        >
          <div>
            <h1>dialog-demo2</h1>
            <ns-dialog
              :visible.sync="visible3"
              type="autoHeight"
              :size="size"
              :title="title"
            >
              <h1>dialog-demo3</h1>
              <div slot="footer">
                <ns-button @click="visible3=false">关闭</ns-button>
              </div>
            </ns-dialog>
          </div>
          <div slot="footer">
            <ns-button @click="visible3=true">打开二级弹窗</ns-button>
            <ns-button @click="visible2=false">关闭</ns-button>
          </div>
        </ns-dialog>
      </template>
    </demo-block>

  </div>
</template>

<script>

  export default {
    name: 'dialog-demo',
    data() {
      return {
        visible: false,
        visible2: false,
        visible3: false,
        type: 'normal',//'normal','simple','noFooter','noHeader','autoHeight'
        size: 'large',//'mini', 'small', 'normal', 'medium', 'large'
        title: '标题',
        top: '7%',
        modal: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        lockScroll: false,
        showClose: true,
        content: '请输入...',
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
