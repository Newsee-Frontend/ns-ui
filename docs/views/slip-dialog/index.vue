<template>
  <div>
    <h1> slipDialog - demo</h1>
    <el-switch v-model="sw1" active-color="#13ce66" inactive-color="#ff4949">开关1</el-switch>
    <el-switch v-model="sw2" active-color="#13ce66" inactive-color="#ff4949">开关2</el-switch>
    <el-select v-model="selectvalue1" placeholder="请选择动画">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="selectvalue2" placeholder="请选择进入位置">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <slipDialog :visible.sync="sw1" appendToBody>
      <h1>窗口1</h1>
      <el-button type="danger" @click.stop="btnclose1()">关闭</el-button>
    </slipDialog>
    <slipDialog :visible.sync="sw2" appendToBody rerender top="100px" left="300px" :entr-position="selectvalue2" :animation="selectvalue1">
      <div style="background: #ffe335">
        <span>窗口2</span>
        <ul style="background: #2480ff;margin: 20px">
          <li>
            <h2 style="background: #865cff">我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
            <h2>我是内容</h2>
          </li>
        </ul>
      </div>
      <el-button type="danger" @click.stop="btnclose2()">关闭</el-button>
    </slipDialog>
  </div>
</template>

<script>
  import slipDialog from '../../../packages/slip-dialog/index'

  export default {
    name: "slip-dialog",
    components: {slipDialog},
    data() {
      return {
        sw1: false,
        sw2: false,
        selectvalue1: '',
        options1: [
          {label: 'fade普通', value: 'fade-normal'},
          {label: 'fade上下', value: 'fade-in-out'},
          {label: '快进慢出', value: 'fastIn-slowOut'},
          {label: '滑动进场', value: 'slip-in-out'},
          {label: '反弹模式', value: 'bouncer'}

        ],
        selectvalue2: '',
        options2: [
          {label: '左', value: 'left'},
          {label: '右', value: 'right'},
          {label: '上', value: 'top'},
          {label: '下', value: 'bottom'}
        ]
      }
    },
    methods: {
      btnclose1() {
        this.sw1 = false;
      },
      btnclose2() {
        this.sw2 = false;
      }
    }

  }
</script>

<style scoped>

</style>
