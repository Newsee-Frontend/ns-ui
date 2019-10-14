<!--UI 组件库 - Dialog - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <!--基础用法示例-->
      <demo-block>
        <template slot="title">Dialog - 对话框</template>
        <template slot="describe">基础用法</template>
        <template slot="content">
          <el-button @click="buttonClick">点击打开</el-button>
          <ns-dialog
            :visible.sync="visible1"
            title="basic-dialog-demo"
            top="7%"

            size="large"
            autoHeight

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
              <ns-editor :height="300" v-model="content" model="simple"/>
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

      <!--类型/尺寸 用法示例-->
      <demo-block>
        <template slot="title">Dialog - 对话框</template>
        <template slot="describe">类型/尺寸 用法</template>
        <template slot="content">

          <div class="control">
            <div class="control-block form-block-line">
              <span>是否自动高度:</span>
              <ns-radio v-model="dialogType" :options="dialogTypeOptions"></ns-radio>
              <ns-radio v-model="dialogSize" :options="dialogSizeOptions"></ns-radio>
              <ns-switch v-model="isAutoHeight"></ns-switch>
            </div>
          </div>
          <el-button @click=" visible2=true">点击打开</el-button>
          <ns-dialog
            :visible.sync="visible2"
            :type="dialogType"
            :size="dialogSize"
            :autoHeight="isAutoHeight"
            :title="`dialog-demo-${dialogType}`"
            close-on-click-modal
          >
            <div>
              <h1>类型：{{dialogType}}，是否自动高度：{{isAutoHeight}}</h1>
            </div>
            <div slot="footer">
              <ns-button @click="visible2=false">关闭</ns-button>
            </div>
          </ns-dialog>
        </template>
      </demo-block>

      <!--嵌套用法示例-->
      <demo-block>
        <template slot="title">Dialog - 对话框</template>
        <template slot="describe">嵌套用法</template>
        <template slot="content">
          <el-button @click="visible3=true">点击打开</el-button>
          <ns-dialog
            :visible.sync="visible3"
            title="嵌套对话框示例（外层）"
            autoHeight
          >
            <div>
              <h1>dialog-demo2</h1>
              <ns-dialog
                :visible.sync="visible4"
                title="嵌套对话框示例（内层）"
                autoHeight
              >
                <h1>dialog-demo3</h1>
                <div slot="footer">
                  <ns-button @click="visible4=false">关闭</ns-button>
                </div>
              </ns-dialog>
            </div>
            <div slot="footer">
              <ns-button @click="visible4=true">打开二级弹窗</ns-button>
              <ns-button @click="visible3=false">关闭</ns-button>
            </div>
          </ns-dialog>
        </template>
      </demo-block>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'dialog-demo',
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,

        closeOnClickModal: false,
        closeOnPressEscape: true,
        lockScroll: false,
        showClose: true,
        content: '请输入...',


        dialogType: 'normal',
        dialogTypeOptions: [
          { label: 'normal', value: 'normal' },
          { label: 'simple', value: 'simple' },
          { label: 'noFooter', value: 'noFooter' },
          { label: 'noHeader', value: 'noHeader' },
        ],
        dialogSize: 'small',
        dialogSizeOptions: [
          { label: 'mini', value: 'mini' },
          { label: 'small', value: 'small' },
          { label: 'normal', value: 'normal' },
          { label: 'medium', value: 'medium' },
          { label: 'large', value: 'large' },
        ],
        isAutoHeight: true,
      };
    },
    methods: {
      buttonClick() {
        this.visible1 = true;
      },
      buttonClose() {
        this.visible1 = false;
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
