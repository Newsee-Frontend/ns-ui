<template>
  <div class="action-scope">
    <ns-button type="text" @click="emitClick(item)"  v-for="(item, index) in actionBtnList" :key="index">
      {{item.label}}
    </ns-button>

    <el-dropdown trigger="click" v-show="dropDownBtnList.length > 0">
       <span class="el-dropdown-link">
         更多<i class="el-icon-arrow-down el-icon--right" />

         <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in  dropDownBtnList" :key="index"
                              @click.native="emitClick(item)">
              {{item.label}}
            </el-dropdown-item>
         </el-dropdown-menu>
       </span>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'action-cell',

    props: {
      btnList: Array
    },

    computed: {
      actionBtnList({ btnList = [] }){
        let num =  btnList.length　> 2 ? 1 : 2
        return btnList.slice(0,num)
      },

      dropDownBtnList({ btnList = [] }){
        let num =  btnList.length　> 2 ? 1 : 2
        return btnList.slice(num)
      }
    },

    methods: {
      emitClick(btn){
        this.$emit('btnClick',btn)
      }
    }
  };
</script>

<style lang="scss" scoped>
  //action area in column for table
  .action-scope {
    height: inherit;
    font-size: 13px;
    button.ns-button--normal {
      padding: 0 6px 0 0;
      border: none;
      font-size: inherit;
      &:hover {
        //color: $action-scope_text__hovercolor;
        background-color: transparent;
      }
      &:last-child {
        margin-left: 0;
        padding-right: 0;
      }
    }
    .el-dropdown {
      margin: 0;
      vertical-align: middle;
      font-size: inherit;
      span {
        //color: $action-scope_text__color;
        font-weight: 500;
        font-size: inherit;
        cursor: pointer;
        margin: 0;
        padding: 0;
        line-height: inherit;
        //&:hover {
        //  color: $action-scope_text__hovercolor;
        //}
      }
    }
  }

</style>
