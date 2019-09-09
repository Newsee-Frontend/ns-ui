<template>
  <demo-block>
    <template slot="title">懒加载叶子节点</template>
    <template slot="describe">lazy懒加， dropJudge</template>
    <template slot="content">
      <ns-tree
        style="width: 500px"
        :data="nodeList"
        v-model="nodeModel"
        isObjectData
        ref="testTree"
        :draggable="true"
        :dropJudge="dropJudge"
        @loadNode="loadNode"
      >
        <template slot-scope="{node, parent,index}">
          <div class="slot-container">
            <i class="el-icon-delete title-icon" @click.stop="delNode(node,parent,index)"></i>
            <i class="el-icon-edit title-icon" @click.stop="editNode(node)"></i>
            <div class="title-text">
              {{node.companyName || node.houseFullName}}
            </div>
          </div>
        </template>
      </ns-tree>
    </template>
  </demo-block>
</template>

<script>
  import transformKeyFun from '../utils';
  import keyRefer from '../keyRefer';

  export default {
    name: 'lazy-tree',

    data() {
      return {
        nodeList: [],
        nodeModel: {},
      };
    },

    methods: {
      initTree: function () {
        this.$store.dispatch('getRootTree').then((res) => {
          this.nodeList = transformKeyFun(res.resultData, keyRefer, {expandedIndex: 2, lazy: true});
        });
      },

      loadNode(node) {
        this.$set(node, 'loading', true);
        this.$store.dispatch('getChildTree', {id: node.id}).then((res) => {
          this.$set(node, 'loading', false);
          if (res.resultData.length > 0) {
            let childNodes = transformKeyFun(res.resultData, keyRefer, {lazy: true});
            this.$refs.testTree.addNodes(node, childNodes);
          }
        });
      },

      /***
       * 删除树
       */
      delNode(...arg) {
        this.$refs.testTree.delNode(...arg);
      },

      //编辑节点
      editNode(node) {
        this.$prompt('您要修改节点的名称', '提示').then(({value}) => {
          this.$refs.testTree.updateNode(node, {houseFullName: value});
        });
      },


      //判断是否可拖拉
      dropJudge(node, Pnode, resolve) {
        let name = node.companyName || node.houseFullName;
        let pName = Pnode.companyName || Pnode.houseFullName;
        this.$confirm(`是否将节点${name}插入节点${pName}`, '提示', {
          callback: action => {
            resolve(action === 'confirm');
          },
        });
      },
    },

    created() {
      this.initTree();
    },
  };
</script>

<style scoped>

</style>
