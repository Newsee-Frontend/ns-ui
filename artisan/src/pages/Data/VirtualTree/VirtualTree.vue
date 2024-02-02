<template>
  <demo-block>
    <template slot="title">虚拟加载树</template>
    <template slot="describe">在原有功能不变的情况下增加虚拟加载的功能，目的是为了更好的性能提升</template>
    <template slot="content">
      <el-row>
        <el-col :span="12">
          <ns-virtual-tree
            height='500px'
            v-bind='baseProps'
            :data="nodeList"
            draggable
            @node-click="nodeClick"
            :dropJudge='dropJudge'
            ref="testTree"
          >
            <template #default="{node, data, parent}">
              <div class="slot-container">
                <div class="title-text">
                  {{data.companyName || data.houseFullName}}
                </div>
                <i class="el-icon-delete title-icon" @click.stop="delNode(data)"></i>
                <i class="el-icon-edit title-icon" @click.stop="editNode(data)"></i>
              </div>
            </template>
          </ns-virtual-tree>
        </el-col>
        <el-col :span="12">
          <ns-virtual-tree
            height='500px'
            v-bind='baseProps'
            show-checkbox
            :data="nodeList"
            ref="testTree1"
          >
            <template #default="{node, data, parent}">
              <div class="slot-container">
                <div class="title-text">
                  {{data.companyName || data.houseFullName}}
                </div>
              </div>
            </template>
          </ns-virtual-tree>
        </el-col>
      </el-row>
    </template>
  </demo-block>
</template>

<script>
import keyRefer from './keyRefer'
export default {
  name: 'VirtualTree-dome',

  data(){
    return {
      nodeList: [],
      defaultExpandedKeys: []
    }
  },

  computed: {
    baseProps() {
      return {
         props: keyRefer,
        'node-key': keyRefer['id'],
        load: this.loadNode,
        defaultExpandedKeys: this.defaultExpandedKeys,
        allowDrop: (draggingNode, dropNode, type)=>{
          return type === 'inner'
        }
      };
    },
  },

  methods: {
    async loadNode(node, resolve){
      if (node.level === 0) {
        return resolve(node.data)
      }
      // 判断节点是否需要异步加载
      let isAsync = (node.data[keyRefer['children']] || []).length === 0 && !node.isLeaf

      if (isAsync) {
        let data  = await  this.$store.dispatch('getChildTree', { id: node.id })
        console.log(data);
        // resolve(nodes)
      } else {
        resolve(node.data[keyRefer['children']] || [])
      }
    },


    dropJudge(node, pNode, resolve) {
      let pData = pNode.data
      let cData = node.data
      let name = cData.companyName || cData.houseName;
      let pName = pData.companyName || pData.houseName;
      this.$confirm(`是否将房产节点“${name}”移至房产节点“${pName}”下`, '提示', {
        type: 'warning',
      }).then(action => {
        //判断是否可拖拉 resolve(true) - 允许拖拽   resolve(false) - 不允许拖拽
        this.$message.success(`已成功将房产节点“${name}”移至房产节点“${pName}”`);
        this.defaultExpandedKeys = [ pData[keyRefer.id]]
        resolve(true);
      });
    },

    /**
     * 删除
     * @param node
     */
    delNode(node) {
      let message = `该节点(${node.companyName || node.houseName})删除后不可恢复，确定继续删除吗？`;
      this.$confirm(message, '提示', {
        type: 'warning',
      }).then(() => {
        this.$refs.testTree.remove(node)
      });
    },


    /**
     * 编辑节点
     * @param data
     */
    editNode(data){
      this.$prompt('您要修改节点的名称', '提示').then(({ value }) => {
        data.houseFullName = value
      });
    },


    nodeClick(node){
      console.log(node);
    }
  },

  async mounted() {
    let res = await this.$store.dispatch('getRootTree')
    this.nodeList = res.resultData
    this.defaultExpandedKeys = [this.nodeList[0][keyRefer.id]]
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.slot-container{
  width: 100%;
  display: flex;
  align-items: center;
  .title-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
  }

  .title-icon {
    color: #20a0ff;
  }
}
</style>
