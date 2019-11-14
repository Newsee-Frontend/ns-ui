<!--UI 组件库 - 标准Table - 表格测试页-->
<template>
  <div class="win">
    <div class="ns-container">
      <div class="ns-container-right">
        <div class="action-module">
          <demo-block>
            <template slot="title">表格测试页</template>
            <template slot="describe">基础用法</template>
            <template slot="content">
              <virtual-list :size="100" :remain="10" class="gcx">
                <div v-for="item of tableData" :key="item.id">
                  <span>{{item.id}}</span>
                  <span>{{item.name}}</span>
                  <span>{{item.date}}</span>
                  <span>{{item.address}}</span>
                </div>
              </virtual-list>
            </template>
          </demo-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import virtualList from 'vue-virtual-scroll-list';

  export default {
    name: 'table-test-demo',
    components: { 'virtual-list': virtualList },
    data() {
      return {
        tableData: [],
      };
    },
    created() {
      for (let i = 0; i < 10000; i++) {
        this.tableData.push({
          id: i,
          date: '2016-05-02',
          name: '王小虎' + i,
          address: '上海市普陀区金沙江路 1518 弄',
        });
      }
    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
