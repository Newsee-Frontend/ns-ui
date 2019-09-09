<template>
  <demo-block>
    <template slot="title">可选择,多选</template>
    <template slot="describe">多选树</template>
    <template slot="content">
      <ns-tree
        style="width: 500px"
        v-model="nodeModel"
        :data="nodeList"
        :checkStrictly="checkStrictly"
        multiple
        isObjectData
        ref="selectTree"
        @loadNode="loadNode"
        @nodeCheck="nodeCheck"
      >
        <template slot-scope="{node, parent,index}">
          <div class="slot-container">
            <div class="title-text">
              {{node.companyName || node.houseFullName}}
            </div>
          </div>
        </template>
      </ns-tree>

      <div class="tags-container">
        <el-tag
          v-for="tag in nodeModel"
          :key="tag.id"
          closable
          @close="handleClose(tag)"
          style="margin: 5px;" >
          {{tag.companyName || tag.houseFullName}}
        </el-tag>
      </div>
      <ns-switch v-model="checkStrictly" active-text="父子不关联" inactive-text="父子关联"></ns-switch>
    </template>
  </demo-block>
</template>

<script>
  import transformKeyFun from '../utils';
  import keyRefer from '../keyRefer';
  export default {
    name: 'multiple-tree',

    data(){
      return{
        nodeModel: [],
        nodeList: [],
        checkStrictly: true
      }
    },

    methods: {
      initTree: function() {
        this.$store.dispatch('getRootTree').then((res) => {
          this.nodeList = transformKeyFun(res.resultData, keyRefer, { expandedIndex: 2, lazy: true });
          this.nodeModel =  this.nodeList[0].children;
        });
      },

      //获取节点
      getNodes() {
        console.log(this.nodeModel);
      },


      //删除节点
      handleClose(tag) {
        //手动设置node checked 为false
        this.$refs.selectTree.clearNodeById(tag.id);
      },


      //按需加载子节点
      loadNode(node) {
        this.$set(node, 'loading', true);
        this.$store.dispatch('getChildTree', { id: node.id }).then((res) => {
          this.$set(node, 'loading', false);
          if (res.resultData.length > 0) {
            let childNodes = transformKeyFun(res.resultData, keyRefer, { lazy: true });
            this.$refs.selectTree.addNodes(node, childNodes);
          }
        });
      },


      nodeCheck(...arg){
        console.log(...arg, this.nodeModel)
      },


    },

    created(){
      this.initTree();
    }
  };
</script>

<style scoped>

</style>
