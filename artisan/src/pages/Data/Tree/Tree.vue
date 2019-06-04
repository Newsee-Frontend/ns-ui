<!--UI 组件库 - Tree - 页面测试-->
<template>
  <div class="tree-wrapper">
    <demo-block>
      <template slot="title">默认 tree</template>
      <template slot="describe">基础用法, keyRefer配置对应字段</template>
      <template slot="content">
        <ns-tree
          :keyRefer="keyRefer"
          :data="nodesListNormal"
          ref="baseTree"
        >
          <template slot-scope="{node, parent,index}">
            <div class="title-text">
              {{node.companyName || node.houseFullName}}
            </div>
          </template>
        </ns-tree>
        <ns-button @click="getNodes('baseTree')">获取选中的节点</ns-button>
        <ns-button @click="setNodes('baseTree')">设置选中的节点</ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">懒加载叶子节点</template>
      <template slot="describe">lazy懒加载</template>
      <template slot="content">
        <ns-tree
          style="width: 500px"
          :data="nodesListLazy"
          :keyRefer="keyRefer"
          multiple
          :showCheckbox="showCheckbox"
          :lazy="lazy"
          ref="testTree"
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

    <demo-block>
      <template slot="title">可选择,多选</template>
      <template slot="describe">多选树</template>
      <template slot="content">
        <ns-tree
          style="width: 500px"
          :data="nodesListSelect"
          :keyRefer="keyRefer"
          :showCheckbox="true"
          :checkStrictly="checkStrictly"
          multiple
          :lazy="lazy"
          ref="selectTree"
          @loadNode="loadNodeSelect"
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
        <ns-switch v-model="checkStrictly"   active-text="父子不关联" inactive-text="父子关联"> </ns-switch>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">可拖拉</template>
      <template slot="content">
        <ns-tree
          :keyRefer="keyRefer"
          :data="nodeListdrag"
          :draggable="true"
          :dropJudge="dropJudge"
          ref="dropTree"
        >
          <template slot-scope="{node, parent,index}">
            <div class="title-text">
              {{node.companyName || node.houseFullName}}
            </div>
          </template>
        </ns-tree>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import fetch from '../../../fetch/fetch';

  export default {
    name: '',
    data() {
      return {
        nodesListNormal: [],
        nodesListLazy: [],
        nodesListSelect: [],
        nodeListdrag: [],
        checkStrictly: true,
        keyRefer: {
          id: 'houseId',
          title: 'houseName',
          children: 'childOwnerHouseBaseInfoTreeNodeList',
          isHasChild: 'isHasChild',
          expanded: 'nodeExpanded',
          disabled: 'disabled',
        },

        showCheckbox: false,

        lazy: true,
      };
    },
    computed: {},
    created() {
      this.getInitTreeNodes();
    },
    methods: {
      //初始化获取树节点
      getInitTreeNodes() {
        fetch({
          url: '/system/data/initTree',
          method: 'get',
        }).then((res) => {
          this.$refs.baseTree.initTree(this.deepCopy(res.resultData));
          this.$refs.testTree.initTree(this.deepCopy(res.resultData));
          this.$refs.selectTree.initTree(this.deepCopy(res.resultData));
          this.$refs.dropTree.initTree(this.deepCopy(res.resultData));
        });
      },

      deepCopy(obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              result[key] =this.deepCopy(obj[key]);   //递归复制
            } else {
              result[key] = obj[key];
            }
          }
        }
        return result;
      },


      //异步获取
      loadNode(node) {
        this.$set(node, 'loading', true);
        fetch({
          url: '/system/data/childrenTree',
          method: 'get',
          params: { id: node.id },
        }).then((res) => {
          res.resultData.length > 0 && this.$refs.testTree.addNodes(node, res.resultData);
          this.$set(node, 'loading', false);
        });
      },


      //异步加载select树
      loadNodeSelect(node) {
        this.$set(node, 'loading', true);
        fetch({
          url: '/system/data/childrenTree',
          method: 'get',
          params: { id: node.id },
        }).then((res) => {
          res.resultData.length > 0 && this.$refs.selectTree.addNodes(node, res.resultData);
          this.$set(node, 'loading', false);
        });
      },

      //删除树
      delNode(...arg) {
        this.$refs.testTree.delNode(...arg);
      },

      //编辑节点
      editNode(node){
        this.$prompt('您要修改节点的名称', '提示').then( ({value}) => {
          node.houseFullName = value;
        });
      },

      //获取节点
      getNodes(ref) {
        console.log(this.$refs[ref].getSelectedNodes(), 'getSelectedNodes');
        console.log(this.$refs[ref].getCheckedNodes(), 'getCheckedNodes');
      },

      //设置选中的节点
      setNodes(ref) {
        this.$refs[ref].nodeSelectedByKey([0,114191]);
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
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .title-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .title-icon {
    float: right;
    color: #20a0ff;
  }
</style>
