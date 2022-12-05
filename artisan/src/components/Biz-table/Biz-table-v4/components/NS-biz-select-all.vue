<template>
  <div class="select-all">
      <ns-input v-model="filterValue"
                placeholder="Enter回车搜索"
                clearable
                @clear="searchOptions"
                @keydown.enter.native="searchOptions">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </ns-input>

    <el-tree
      ref="tree"
      v-if="options.length > 0"
      :data="dataTree"
      show-checkbox
      node-key="value"
      :indent = 0
      :default-expand-all="true"
      :expand-on-click-node="false"
      :check-on-click-node= "true"
      :filter-node-method="filterNode"
      @check-change="checkChange"
      :props="defaultProps">
    </el-tree>

  </div>
</template>

<script>
export default {
  name: 'select-all',

  props: {
    //下拉值
    options: {
      type: Array,
      default: ()=>[] ,
    },

    // value 绑定model
    value: {
      type: [Array, String]
    }
  },

  data() {
    return {
      filterValue: '',

      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  computed: {
    dataTree() {
      return [
        {
          label: '全部',
          value: -1,
          children: this.options
        }
      ];
    },
  },

  watch: {
    value: {
      handler(newValue, oldValue){
        this.$nextTick(()=>{
          this.$refs.tree.setCheckedKeys(newValue || []);
        })
      },
      immediate: true
    },
  },

  methods: {
    // 搜索
    searchOptions() {
      this.$refs.tree.filter(this.filterValue);
    },

    //搜索的方法
    filterNode(value, data){
      if (!value) return true;
      return data.label.indexOf(value) !== -1
    },

    // 勾选调整
    checkChange(){
      let arr = this.$refs.tree.getCheckedKeys() || []
      this.$emit('input', arr)
    }
  },
};
</script>

<style lang="scss" scoped>
.select-all {
  .ns-input {
    margin-bottom: 10px;
  }
  .el-tree {
    max-height: 160px;
    overflow: auto;
    padding: 0 10px;
    /deep/ {
      .el-tree-node__expand-icon{
        display: none;
      }
    }
  }
}
</style>
