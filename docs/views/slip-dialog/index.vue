<template>
  <div>
    <h1> slip-dialog - demo</h1>
    <el-button size="mini" @click.stop="openByRef()">使用事件打开弹窗</el-button>
    <el-button type="danger" size="mini" @click.stop="closeByRef()">使用事件关闭弹窗</el-button>
    <span>开关激活: </span>
    <el-switch v-model="dialogSw" active-color="#13ce66" inactive-color="#ff4949">开关2</el-switch>
    <div style="margin-top: 15px">
      <span>请选择动画: </span>
      <el-select v-model="animation" placeholder="请选择动画">
        <el-option v-for="item in animationList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div style="margin-top: 15px">
      <span>请选择进入位置: </span>
      <el-select v-model="postion" placeholder="请选择进入位置">
        <el-option v-for="item in postionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div style="width: 200px">
      <span>左边距:</span>
      <el-input v-model="iptleft" placeholder="请输入内容"></el-input>
      <span>右边距:</span>
      <el-input v-model="iptright" placeholder="请输入内容"></el-input>
      <span>上边距:</span>
      <el-input v-model="ipttop" placeholder="请输入内容"></el-input>
      <span>下边距:</span>
      <el-input v-model="iptbottom" placeholder="请输入内容"></el-input>
    </div>
    <li>
      <h2 style="background: #865cff">我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2>我是内容</h2>
      <h2 @click.stop="dialogSw=true">我是打开</h2>
      <el-button size="mini" @click.stop="openByRef()">使用事件打开弹窗</el-button>
    </li>

    <cx-slip-dialog ref="slipDialog"
                    :visible.sync="dialogSw"
                    customClass="slipDialog-test"
                    :left="iptleft"
                    :right="iptright"
                    :top="ipttop"
                    :bottom="iptbottom"
                    appendToBody
                    :entr-position="postion"
                    :animation="animation"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    :beforeClose="beforeClose"
    >
      <div style="background: #f3f3f3">
        <h2 style="text-align: center;padding: 15px 0 ;margin: 0">dialog 窗口</h2>
        <ul style="background: #b8e9ff;margin: 20px">
          <li>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
          </li>
        </ul>
      </div>
      <el-button type="danger" @click.stop="btnInDialogClick">关闭弹窗</el-button>
    </cx-slip-dialog>
  </div>
</template>

<script>

  export default {
    name: "slip-dialog",
    data() {
      return {
        dialogSw: false,
        animation: '',
        postion: 'right',
        animationList: [
          {label: 'fade普通', value: 'fade-normal'},
          {label: 'fade上下', value: 'fade-up-down'},
          {label: '滑动-匀速进出', value: 'slip-linear'},
          {label: '滑动-快进慢出', value: 'slip-rush'},
          {label: '滑动-迂回', value: 'slip-pretend'},
          {label: '反弹模式', value: 'bouncer'}
        ],
        postionList: [
          {label: '左', value: 'left'},
          {label: '右', value: 'right'},
          {label: '上', value: 'top'},
          {label: '下', value: 'bottom'}
        ],
        iptleft: '300px',
        iptright: '0',
        ipttop: '100px',
        iptbottom: '0',
      }
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
        this.dialogSw = false;
      },
      /**
       * 关闭之前
       * @param visible 开关值
       */
      beforeClose(visible) {
        console.log('beforeClose')
        console.log(visible)
      },
      beforeEnter(el) {
        console.log('beforeEnter', el)
      },
      enter(el) {
        console.log('enter', el)
      },
      afterEnter(el) {
        console.log('afterEnter', el)
      },
      beforeLeave(el) {
        console.log('beforeLeave', el)
      },
      leave(el) {
        console.log('leave', el)
      },
      afterLeave(el) {
        console.log('afterEnter', el)
      },
    }

  }
</script>

<style scoped>

</style>
