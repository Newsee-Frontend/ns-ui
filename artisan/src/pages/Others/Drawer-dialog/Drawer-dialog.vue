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
          <!--<ns-drawer-dialog-->
          <!--ref="drawerDialog"-->
          <!--class="drawerDialog"-->
          <!--:visible.sync="form.dialogSw"-->
          <!--customClass="drawerDialog-test"-->
          <!--:left="form.iptleft"-->
          <!--:right="form.iptright"-->
          <!--:top="form.ipttop"-->
          <!--:bottom="form.iptbottom"-->
          <!--:modal="form.modal"-->
          <!--:entr-position="form.postion"-->
          <!--:animation="form.animation"-->
          <!--&gt;-->
          <!--<h2 style="text-align: center;padding: 15px 0 ;margin: 0">侧边滑入窗口</h2>-->
          <!--&lt;!&ndash;<ns-form ref="slip-dialog-form" :model="slipDialogForm" label-width="140px">&ndash;&gt;-->
          <!--&lt;!&ndash;<ns-form-item label=" 详细内容:">&ndash;&gt;-->
          <!--&lt;!&ndash;<ns-editor :height="500" v-model="slipDialogForm.content"/>&ndash;&gt;-->
          <!--&lt;!&ndash;</ns-form-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</ns-form>&ndash;&gt;-->


          <!--&lt;!&ndash;<div class="editor-content">&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--</ns-drawer-dialog>-->
        </template>
      </demo-block>
    </div>

    <el-drawer
      title="我是标题"
      :append-to-body="true"
      :visible.sync="form.dialogSw"
      :direction="form.postion">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Drawer-dialog',

    data(){
      return {
        postionList: [
          { label: '左', value: 'left' },
          { label: '右', value: 'right' },
          { label: '上', value: 'top' },
          { label: '下', value: 'bottom' },
        ],

        form: {
          iptleft: '0',
          iptright: '0',
          ipttop: '0',
          iptButtom: '0',
          dialogSw: false,
          modal: false,
          postion: 'ltr',
        }
      }
    }
  };
</script>

<style scoped>

</style>
