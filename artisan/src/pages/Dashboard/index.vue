<!--主页-->
<template>
  <div class="Dashboard">
    <ns-particles :color="particlesColor" class="ns-particles"></ns-particles>
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--label="日期"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<el-date-picker-->
            <!--v-model="scope.row.date "-->
            <!--type="datetime"-->
            <!--placeholder="选择日期时间">-->
          <!--</el-date-picker>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="姓名"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>

  export default {
    name: 'Dashboard',
    data() {
      return {
        particlesColor: '#a9abae',
        tableData: [],
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created() {
     this.tableData =  [...new Array(100)].map((item, index) => {
       return {
         date: '2016-05-02',
         name: `王小虎${index}`,
         address: '上海市普陀区金沙江路 1518 弄',

       }
     })
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
