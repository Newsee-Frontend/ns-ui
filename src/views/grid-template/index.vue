<template>
  <div class="grid-template">
    <div class="front-Logo">
      CX-GRID
      <i>Design</i>
    </div>
    <div class="template-btn">
      <el-button type="info" plain @click="shower(basicVisible)">基础用法示例</el-button>
      <el-button type="info" plain @click="shower(bussinessVisible)">业务二次封装示例</el-button>
      <el-button type="info" plain @click="shower(testVisible)">测试操作示例</el-button>
    </div>
    <basic-grid-template :visible="basicVisible" v-if="basicVisible.visible"></basic-grid-template>
    <bussiness-grid-template :visible="bussinessVisible" v-if="bussinessVisible.visible"></bussiness-grid-template>
    <test-grid-template :visible="testVisible" v-if="testVisible.visible"></test-grid-template>
  </div>
</template>

<script>
  import basicGridTemplate from './basic-grid/basic-grid-template'
  import bussinessGridTemplate from './bussiness-grid/bussiness-grid-template'
  import testGridTemplate from './test-grid/test-grid-template'

  export default {
    name: 'grid-template',
    data() {
      return {
        basicVisible: {visible: false},
        bussinessVisible: {visible: false},
        testVisible: {visible: false}
      }
    },
    components: {basicGridTemplate, bussinessGridTemplate, testGridTemplate},
    created() {
      // const reverse = xs => {
      //   if (xs.length === 1) return xs;
      //   const [head, ...tail] = xs;
      //   return reverse(tail).concat(head);
      // };
      // const a = reverse([1, 2, 3, 4, 5]);
      // console.log(a);
      // const quickSort = list => {
      //   if (list.length === 0) return list;
      //   const [pivot, ...rest] = list;
      //   const smaller = [];
      //   const bigger = [];
      //   rest.forEach(x => (x < pivot ? smaller.push(x) : bigger.push(x)));
      //
      //   return [...quickSort(smaller), pivot, ...quickSort(bigger)];
      // };
      //
      // console.log(quickSort([24, 4, 62, 9, 3, 41, 7, 4, 9, 22, 3, 42, 6, 14, 3, 5, 75, 9, 33, 55, 99, 22, 33]));
      //生成由随机整数组成的数组，数组长度和元素大小可自定义

      const genNumArr = (length, limit) =>
        Array.from({length}, _ => Math.floor(Math.random() * limit));

      genNumArr(10, 100);
      console.log(genNumArr(10, 100))
    },
    methods: {
      shower(sw) {
        sw.visible = !sw.visible;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .grid-template {
    position: absolute;
    top: 30%;
    width: 100%;
    .template-btn {
      text-align: center;
    }
    .front-Logo {
      text-align: center;
      font-size: 48px;
      font-style: normal;
      color: #ffffff;
      padding: 38px 0 30px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      i {
        font-size: 40px;
      }
    }
  }
</style>
