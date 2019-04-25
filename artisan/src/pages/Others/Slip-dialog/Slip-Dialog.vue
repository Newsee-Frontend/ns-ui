<template>
  <div>
    <el-form label-width="70px" :model="form" inline size="mini">
      <!--打开-->
      <el-form-item label-width="0">
        <span>开关激活: </span>
        <el-switch
          v-model="form.dialogSw"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="margin-right: 10px"
        >开关2
        </el-switch>
        <el-button size="mini" @click.stop="openByRef()">使用事件打开弹窗</el-button>
        <el-button type="danger" size="mini" @click.stop="closeByRef()">使用事件关闭弹窗</el-button>
      </el-form-item>
      <!--动画，位置-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="动画">
            <el-select v-model="form.animation" placeholder="动画">
              <el-option
                v-for="item in animationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进入位置">
            <el-select v-model="form.postion" placeholder="进入位置">
              <el-option
                v-for="item in postionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--左右边距-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="左边距">
            <el-input v-model="form.iptleft" placeholder="请输入左边距"></el-input>
          </el-form-item>
          <el-form-item label="右边距">
            <el-input v-model="form.iptright" placeholder="请输入右边距"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--上下边距-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="上边距">
            <el-input v-model="form.ipttop" placeholder="请输入上边距"></el-input>
          </el-form-item>
          <el-form-item label="下边距">
            <el-input v-model="form.iptbottom" placeholder="请输入下边距"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--侧边滑入窗口-->
    <ns-slip-dialog
      ref="slipDialog"
      :visible.sync="form.dialogSw"
      customClass="slipDialog-test"
      :left="form.iptleft"
      :right="form.iptright"
      :top="form.ipttop"
      :bottom="form.iptbottom"
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
      <!--<img src="../../../assets/img/banner/banner.png" alt="banner"/>-->
      <div style="text-align: right">
        <el-button @click.stop="form.dialogSw2 = true">打开全屏弹窗</el-button>
        <el-button type="danger" @click.stop="btnInDialogClick">关闭弹窗</el-button>
      </div>
    </ns-slip-dialog>

    <!--全屏窗口-->
    <ns-slip-dialog
      ref="slipDialog2"
      :visible.sync="form.dialogSw2"
      customClass="slipDialog-fullScreen"
      left="0"
      right="0"
      top="0"
      bottom="0"
      appendToBody
    >
      <h2 style="text-align: center;padding: 15px 0 ;margin: 0">全屏窗口</h2>
      <!--<img src="../../../assets/img/banner/banner.png" alt="banner"/>-->
      <div style="text-align: right">
        <el-button @click.stop="form.dialogSw2 = false">关闭窗口</el-button>
      </div>
    </ns-slip-dialog>
  </div>
</template>

<script>
  export default {
    name: 'slip-dialog',
    data() {
      return {
        input: '',
        form: {
          dialogSw: false,
          dialogSw2: false,
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
      };
    },
    created() {


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
    },
  };
</script>

<style scoped></style>
