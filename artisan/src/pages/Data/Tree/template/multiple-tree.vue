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
      <ns-button @click="getNodes('selectTree')">获取选中的节点</ns-button>
      <ns-button @click="setNodes('selectTree')">设置选中的节点</ns-button>
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
        });
      },

      //获取节点
      getNodes() {
        console.log(this.nodeModel);
      },

      setNodes(){
      },

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
      }
    },

    created(){
      this.initTree();
    }
  };
</script>

<style scoped>

</style>
