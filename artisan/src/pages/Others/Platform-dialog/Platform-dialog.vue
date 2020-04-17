<!--工作台弹窗-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">Platform-dialog - 工作台对话框</template>
        <template slot="describe">基础用法 - 作用于工作台 - 全屏操作弹出框，位置较为固定</template>
        <template slot="content">

          <!--参数控制-->
          <div class="control-block form-block-line">
            <span>打开未封装 - 开关激活:</span>
            <ns-switch v-model="visible1" active-color="#13ce66" inactive-color="#ff4949" style="margin-right: 10px">打开未封装</ns-switch>

            <span>打开封装 - 开关激活:</span>
            <ns-switch v-model="visible2" active-color="#13ce66" inactive-color="#ff4949" style="margin-right: 10px">打开封装</ns-switch>

          </div>
          <div class="control-block form-block-line">
            <span>是否显示遮罩: </span>
            <ns-switch
              v-model="isShowModal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px">
            </ns-switch>
            <span>是否可以通过点击 modal 关闭: </span>
            <ns-switch
              v-model="closeOnClickModal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              style="margin-right: 10px">
            </ns-switch>
          </div>

          <ns-platform-dialog
            ref="ns-platform-dialog"
            customClass="ns-platform-dialog"
            :visible.sync="visible1"

            title="工作台弹窗1"
            :modal="isShowModal"
            :closeOnClickModal="closeOnClickModal"

            left="50px"
            right="0"
            top="87px"
            bottom="0"
          >
            <h2>工作台弹窗1</h2>
            <ns-button type="primary">确定</ns-button>
            <ns-button @click="visible1=false">取消</ns-button>
          </ns-platform-dialog>


          <!--工作台弹窗-->
          <ns-biz-platform-dialog
            :visible.sync="visible2"
            title="工作台弹窗2"
            :modal="isShowModal"
            :closeOnClickModal="closeOnClickModal"

            v-if="visible2"
          >
            <div slot="header">
              <ns-button type="primary">确定</ns-button>
              <ns-button @click="visible2=false">取消</ns-button>

            </div>

            <div slot="body">
              <h2 style="text-align: center;padding: 15px 0 ;margin: 0">工作台弹窗内容</h2>
              <ns-editor :height="1000" v-model="editorContent"/>
            </div>

            <div slot="footer">
              <ns-button type="primary">确定</ns-button>
              <ns-button @click="visible2=false">取消</ns-button>

            </div>

          </ns-biz-platform-dialog>


        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  import nsBizPlatformDialog from '../../../components/NS-biz-platform-dialog/NS-biz-platform-dialog';

  export default {
    name: 'Platform-dialog',
    components: { nsBizPlatformDialog },
    data() {
      return {
        visible1: false,
        visible2: false,
        isShowModal: false,
        closeOnClickModal: false,
        editorContent: '',
        form: {
          iptleft: '50px',
          iptright: '0',
          ipttop: '88px',
          iptbottom: '0',
        },
      };
    },
  };
</script>

<style scoped>

</style>
