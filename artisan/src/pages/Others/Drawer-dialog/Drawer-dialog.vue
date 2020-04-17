<!--UI 组件库 -Drawer-dialog - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">Drawer-dialog - 侧滑对话框</template>
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
          </div>
          <div class="control-block form-block-line">
            <span>是否显示遮罩: </span>
            <ns-switch
              v-model="form.modal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px">
            </ns-switch>
          </div>
          <div class="control-block form-block-line">
            <span>是有显示header: </span>
            <ns-switch
              v-model="form.showHeader"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px"
            >
            </ns-switch>
          </div>
          <div class="control-block form-block-line">
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

          <!--侧滑入窗口-->
          <ns-drawer-dialog
            ref="drawerDialog"
            class="drawerDialog"
            :visible.sync="form.dialogSw"
            customClass="drawerDialog-test"
            title="title"
            :left="form.iptleft"
            :right="form.iptright"
            :top="form.ipttop"
            :bottom="form.iptbottom"
            :modal="form.modal"
            :entr-position="form.postion"
            :animation="form.animation"
            :showHeader="form.showHeader"
          >
            <h2 style="text-align: center;padding: 15px 0 ;margin: 0">侧边滑入窗口</h2>
            <ns-form ref="slip-dialog-form" :model="slipDialogForm" label-width="140px">
              <ns-form-item label=" 详细内容:">
                <ns-input v-model="slipDialogForm.input"></ns-input>
              </ns-form-item>
              <ns-form-item label=" 详细内容:">
                <ns-input v-model="slipDialogForm.input"></ns-input>
              </ns-form-item>
              <ns-form-item label=" 详细内容:">
                <ns-input v-model="slipDialogForm.input"></ns-input>
              </ns-form-item>
              <ns-form-item label=" 详细内容:">
                <ns-input v-model="slipDialogForm.input"></ns-input>
              </ns-form-item>
              <ns-form-item label=" 详细内容:">
                <ns-editor v-model="slipDialogForm.content"></ns-editor>
              </ns-form-item>
            </ns-form>


            <div class="editor-content">

            </div>
          </ns-drawer-dialog>
        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  import editorContent from '../Editor/content';

  export default {
    name: 'Drawer-dialog',

    data() {
      return {
        postionList: [
          { label: '左', value: 'left' },
          { label: '右', value: 'right' },
          { label: '上', value: 'top' },
          { label: '下', value: 'bottom' },
        ],

        form: {
          iptleft: '300px',
          iptright: '0',
          ipttop: '0',
          iptbottom: '0',
          dialogSw: false,
          modal: false,
          postion: 'right',
          showHeader: false
        },

        slipDialogForm: {
          input: '我爱你中国',
          content: editorContent.content
        }
      };
    },

    methods: {
      beforeClose(done){
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.form.dialogSw = false;
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style scoped>

</style>
