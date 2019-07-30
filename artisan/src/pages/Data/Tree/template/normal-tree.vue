<template>
  <demo-block>
    <template slot="title">默认 tree</template>
    <template slot="describe">基础用法, keyRefer配置对应字段</template>
    <template slot="content">
      <ns-tree
        v-model="nodeModel"
        :data="nodeList"
        @nodeClick="nodeClick"
        @nodeExpand="nodeExpand"
        ref="baseTree"
      >
        <template slot-scope="{node, parent,index}">
          <div class="title-text">
            {{node.companyName || node.houseFullName}}
          </div>
        </template>
      </ns-tree>
      <ns-button @click="getNodes('baseTree')">获取选中的节点</ns-button>
      <el-input-number v-model="num" @change="handleChange" :min="0" :max="2" size="small"></el-input-number>
    </template>
  </demo-block>
</template>

<script>
  import transformKeyFun from '../utils';
  import keyRefer from '../keyRefer';

  export default {
    name: 'normal-tree',

    data(){
      return {
        nodeModel: {},
        nodeList: [],
        data: [],
        num: 2
      }
    },

    methods: {
      initTree: function(){
        this.$store.dispatch('getRootTree').then((res)=>{
          this.data = res.resultData;
          this.handleChange();
        })
      },

      handleChange: function(){
        this.nodeList = transformKeyFun(this.data, keyRefer, { expandedIndex: this.num });
        this.nodeModel = 114191;
      },

      //node click
      nodeClick(...arg) {
        console.log(arg, this.nodeModel);
      },

      //node 展开关闭
      nodeExpand(...arg) {
        console.log(arg);
      },

      //获取节点
      getNodes(ref) {
        console.log(this.$refs[ref].getSelectedNodes(), 'getSelectedNodes', JSON.stringify(this.nodeModel));
        console.log(this.$refs[ref].getCheckedNodes(), 'getCheckedNodes');
      },
    },


    created(){
      this.initTree();
    }
  };
</script>

<style scoped>

</style>
