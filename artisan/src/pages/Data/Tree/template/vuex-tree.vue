<template>
  <demo-block>
    <template slot="title">store tree</template>
    <template slot="describe">从vuex中获取数据, ns-tree 支持v-model node节点 和id</template>
    <template slot="content">
      <ns-tree
        :data="nodeList"
        v-model="nodeModel"
        isObjectData
        @nodeClick="nodeClick"
      >
        <template slot-scope="{node, parent,index}">
          <div class="title-text">
            {{node.companyName || node.houseFullName}}
          </div>
        </template>
      </ns-tree>
    </template>
  </demo-block>
</template>

<script>
  export default {
    name: 'vuex-tree',

    data(){
      return {
        nodeList: [],
        nodeModel: {}
      }
    },

    methods: {
      //node click
      nodeClick(...arg) {
        console.log(arg, this.nodeModel);
      },
    },

    created(){
      this.nodeList = this.$store.state.Tree.treeTempData;
      this.nodeModel = this.nodeList[0];
    }
  };
</script>

<style scoped>

</style>
