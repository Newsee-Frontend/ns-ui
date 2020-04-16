<!--UI 组件库 - Fullscreen-dialog - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">Fullscreen-dialog - 侧滑对话框</template>
        <template slot="describe">基础用法</template>
        <template slot="content">
          <el-button @click="visible1=true">点击打开1</el-button>
          <el-button @click="visible2=true">点击打开2</el-button>
          <!--参数控制-->
          <div class="control-block form-block-line">
            <span>是否显示遮罩: </span>
            <ns-switch
              v-model="form.modal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px"
            >是否显示遮罩
            </ns-switch>
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

          <ns-fullscreen-dialog
            :visible.sync="visible1"
            :type="type"
            title="全屏弹窗"
            :left="form.iptleft"
            :right="form.iptright"
            :top="form.ipttop"
            :bottom="form.iptbottom"
            :modal="form.modal"
            close-on-press-escape
            :show-close="showClose"
            :before-close="beforeClose"
            @close="close"
            @open="open"

            v-if="visible1"
          >
            <div>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
            </div>
            <div slot="footer">
              <ns-button @click="buttonClose">关闭</ns-button>
            </div>
          </ns-fullscreen-dialog>

          <workSpaceDialog
            :visible.sync="visible2"
            :left="form.iptleft"
            :right="form.iptright"
            :top="form.ipttop"
            :bottom="form.iptbottom"
          >
            <div>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
              <h1>fullscreen-dialog-demo</h1>
            </div>
          </workSpaceDialog>

        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  import workSpaceDialog from '../../../components/NS-biz-platform-dialog/NS-biz-platform-dialog';

  export default {
    name: 'fullscreen-dialog-demo',
    components: { workSpaceDialog },
    data() {
      return {
        visible1: false,
        visible2: false,
        type: 'normal',//'normal','simple','noFooter','noHeader',nscharts.js
        showClose: true,

        form: {
          modal: false,
          iptleft: '50px',
          iptright: '0',
          ipttop: '88px',
          iptbottom: '0',
        },
      };
    },
    methods: {
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
