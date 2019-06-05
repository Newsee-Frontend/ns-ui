<!--UI 组件库 - Pagination - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">Pagination</template>
      <template slot="describe">基础用法 - 总条目数, 页码按钮的数量, 组件布局, 以及相关事件</template>
      <template slot="content">

        <ns-pagination
          :total="total" :layout="layout" :pageSizes="pageSizes"
          :pagerCount="pagerCount" :searchConditions="searchConditions"
          @size-change="sizeChange"
          @current-change="currentChange"
        >

        </ns-pagination>
        <div class="control-block form-block-line">
          <span>总条目数:</span>
          <ns-input v-model="total"></ns-input>
          <span>页码按钮的数量:</span>
          <ns-input v-model="pagerCount"></ns-input>
        </div>
        <p>组件布局:</p>
        <ns-input v-model="layout" type="textarea"></ns-input>
        <p>搜索条件:</p>
        <pre class="result">{{ searchConditions }}</pre>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'pagination-demo',
    data() {
      return {
        total: 100,//总条目数
        layout: 'total, sizes, prev, pager, next, jumper',//组件布局，子组件名用逗号分隔
        pageSizes: [10, 20, 50, 100], //每页显示个数选择器的选项设置
        pagerCount: 7, //页码按钮的数量，当总页数超过该值时会折叠
        //搜索条件 searchConditions
        searchConditions: {
          companyId: '', //公司id
          departmentId: '', //部门id
          filterList: [], //条件
          pageNum: 1, //当前页数
          pageSize: 10, //每页显示条目个数
          orderBy: '', //排序：升序还是降序
          orderFieldName: '', //排序：字段名
          mainSearch: '', //输入框值
          filterConditions: [], //筛选器记录的条件
          //add by xiaosisi on 20170320 用来存储其他检索条件
          otherConditions: {},
          organizationId: '',
          totalType: 1,
        },
      };
    },
    methods: {
      sizeChange(val) {
        console.log('size-change', val);
      },
      currentChange(val) {
        console.log(' current-page-change', val);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
