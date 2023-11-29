<!--UI 组件库 - Slip-Dialog - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">Slip-Dialog - 侧滑对话框</template>
        <template slot="describe">基础用法</template>
        <template slot="content">

          <!--参数控制-->
          <div class="control-block form-block-line">
            <span>开关激活: </span>
            <ns-switch
              v-model="form.dialogSw"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px"
            >开关2
            </ns-switch>
            <ns-button @click="openByRef()">使用事件打开弹窗</ns-button>
            <ns-button type="danger" @click="closeByRef()">使用事件关闭弹窗</ns-button>
          </div>
          <div class="control-block form-block-line">
            <span>是否显示遮罩: </span>
            <ns-switch
              v-model="form.modal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px"
            >是否显示遮罩
            </ns-switch>
            <span>点击modal关闭: </span>
            <ns-switch
              v-model="form.closeOnClickModal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px"
            >点击modal关闭
            </ns-switch>
            <span>遮罩层速率: </span>
            <ns-input v-model="form.modalSpeed" placeholder="请输入遮罩层速率"></ns-input>

          </div>
          <div class="control-block form-block-line">
            <span>动画: </span>
            <ns-select v-model="form.animation" placeholder="动画" :options="animationList"></ns-select>
            <span>进入位置: </span>
            <ns-select v-model="form.postion" placeholder="进入位置" :options="postionList"></ns-select>
          </div>
          <div class="control-block form-block-line">
            <span>左边距: </span>
            <ns-input v-model="form.iptleft" placeholder="请输入左边距"></ns-input>
            <span>右边距: </span>
            <ns-input v-model="form.iptright" placeholder="请输入右边距"></ns-input>
            <span>上边距: </span>
            <ns-input v-model="form.ipttop" placeholder="请输入上边距"></ns-input>
            <span>下边距: </span>
            <ns-input v-model="form.iptbottom" placeholder="请输入下边距"></ns-input>
          </div>

          <!--侧边滑入窗口-->
          <ns-slip-dialog
            ref="slipDialog"
            class="slipDialog"
            v-show="form.dialogSw"
            :visible.sync="form.dialogSw"
            customClass="slipDialog-test"
            :left="form.iptleft"
            :right="form.iptright"
            :top="form.ipttop"
            :bottom="form.iptbottom"
            :modal="form.modal"
            :closeOnClickModal="form.closeOnClickModal"
            :modalSpeed="form.modalSpeed"
            appendToBody
            :entr-position="form.postion"
            :animation="form.animation"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            :beforeClose="beforeClose"
          >
            <h2 style="text-align: center;padding: 15px 0 ;margin: 0">侧边滑入窗口</h2>

            <ns-form ref="slip-dialog-form" :model="slipDialogForm" label-width="140px">
              <ns-form-item label=" 详细内容:">
                <ns-editor :height="500" v-model="slipDialogForm.content"/>
              </ns-form-item>
            </ns-form>


            <div class="editor-content">
              <h3>输入内容如下:</h3>{{slipDialogForm.content}}
            </div>


            <div style="text-align: right">
              <ns-button @click="form.dialogSw2 = true">打开全屏弹窗</ns-button>
              <ns-button type="danger" @click="formPublish">发布</ns-button>
              <ns-button type="danger" @click="btnInDialogClick">返回</ns-button>
            </div>
          </ns-slip-dialog>

          <!--全屏窗口-->
          <ns-slip-dialog
            ref="slipDialog2"
            class="slipDialog2"
            :visible.sync="form.dialogSw2"
            customClass="slipDialog-fullScreen"
            left="50px"
            right="0"
            top="88px"
            bottom="0"
            appendToBody
          >
            <h2 style="text-align: center;padding: 15px 0 ;margin: 0">全屏窗口</h2>
            <!--<img src="../../../style/img/banner/banner.png" alt="banner"/>-->
            <div style="text-align: right">
              <el-button @click.stop="form.dialogSw2 = false">关闭窗口</el-button>
            </div>
          </ns-slip-dialog>
        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  import editorContent from '../Editor/content';

  export default {
    name: 'slip-dialog',
    data() {
      return {
        input: '',
        form: {
          dialogSw: false,
          dialogSw2: false,
          modal: true,
          closeOnClickModal: true,
          modalSpeed: 300,
          animation: 'slip-pretend',
          postion: 'right',
          iptleft: '300px',
          iptright: '0',
          ipttop: '88px',
          iptbottom: '0',
        },
        animationList: [
          { label: 'fade普通', value: 'fade-normal' },
          { label: 'fade上下', value: 'fade-up-down' },
          { label: '滑动-匀速进出', value: 'slip-linear' },
          { label: '滑动-快进慢出', value: 'slip-rush' },
          { label: '滑动-迂回', value: 'slip-pretend' },
          { label: '反弹模式', value: 'bouncer' },
        ],
        postionList: [
          { label: '左', value: 'left' },
          { label: '右', value: 'right' },
          { label: '上', value: 'top' },
          { label: '下', value: 'bottom' },
        ],
        slipDialogForm: {
          content: editorContent.content,
        },
      };
    },
    methods: {
      openByRef() {
        console.log(this.$refs);
        this.$refs.slipDialog.open();
      },
      closeByRef() {
        this.$refs.slipDialog.close();
      },
      btnInDialogClick() {
        this.form.dialogSw = false;
      },
      /**
       * 关闭之前
       * @param visible 开关值
       */
      beforeClose(visible) {
        console.log('beforeClose');
        console.log(visible);
      },
      beforeEnter(el) {
        console.log('beforeEnter', el);
      },
      enter(el) {
        console.log('enter', el);
      },
      afterEnter(el) {
        console.log('afterEnter', el);
      },
      beforeLeave(el) {
        console.log('beforeLeave', el);
      },
      leave(el) {
        console.log('leave', el);
      },
      afterLeave(el) {
        console.log('afterEnter', el);
      },
      /***
       * 发布/暂存
       * @param submitType
       */
      formPublish(submitType) {
        this.$refs['slip-dialog-form'].validate((valid) => {
          if (valid) {
            this.form.dialogSw = false;
          }
        });
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .slipDialog2 {
    z-index: 1505;
  }
</style>

