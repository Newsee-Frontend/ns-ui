<!--主页-->
<template>
  <div class="Dashboard">
    <!--<router-view />-->
    22222
    <el-row>
      12312
      <el-col :span="24">

        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>


    <!--<HelloWorld></HelloWorld>-->
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    12312312
    <TestDemo1 :item="item"></TestDemo1>
    <TestDemo2 :item="item"></TestDemo2>
    <span>{{item.firstName}}</span>
    <span>{{item.time}}</span>



    <ns-row :gutter="20">
      <ns-col :span="16">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="8">
        <div class="grid-content bg-purple"></div>
      </ns-col>
    </ns-row>
  </div>
</template>

<script>
  import HelloWorld from '../../components/HelloWorld';
  import TestDemo1 from '../../../../src/packages/TestDemo/TestDemo.vue';

  import TestDemo2 from '../../components/TestDemo/components/testContent';

  export default {
    name: 'Dashboard',
    components: {HelloWorld, TestDemo1, TestDemo2},
    data() {
      return {
        input: '',
        item: {
          firstName: 'gcx',
          time: ''
        }
      }
    },
    created() {

    }
  };

</script>

<style>
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
