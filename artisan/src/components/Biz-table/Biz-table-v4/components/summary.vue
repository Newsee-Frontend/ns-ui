<!--合计操作区域-->
<template>
  <div class="summary-area">
    <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{dropTit}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
      <el-dropdown-menu slot="dropdown" class="summary-menu">
        <el-dropdown-item v-for="(item,index) in summaryOption" :key="index" :command="item.command">{{item.menutit}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'biz-table-summary',
    data() {
      return {
        dropTit: '合计',
        summaryOption: [{ command: 'current', tit: '分页', menutit: '分页合计' }, { command: 'total', tit: '全部', menutit: '全部合计' }],
      };
    },
    methods: {
      /**
       * command value change
       * @param param
       */
      handleCommand(param) {
        this.dropTit = this.getTitBycommand(param);

        this.$emit('summary-change', param);
      },

      getTitBycommand(command) {
        return this.summaryOption.filter(item => item.command === command)[0].tit;
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../style/action-summary";
</style>
