<!--UI 组件库 - Loading-block - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">Loading-block 加载块</template>
        <template slot="describe">基础用法</template>
        <template slot="content" class="clear">
          <div class="loading-block-container">
            <ns-loading-block></ns-loading-block>
          </div>
          <div class="loading-block-container">
            <ns-loading-block simple></ns-loading-block>
          </div>
        </template>
      </demo-block>

      <demo-block>
        <template slot="title">Loading-block 加载块</template>
        <template slot="describe">插槽用法</template>
        <template slot="content" class="clear">
          <div class="loading-block-container">
            <ns-loading-block>
              <i class="el-icon-loading"></i>
              <p>我是插槽</p>
              <p>~~~~</p>
              <p>转转转转</p>
            </ns-loading-block>
          </div>
        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading-block',
    data() {
      return {};
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .loading-block-container {
    display: inline-block;
    width: 300px;
    height: 200px;
    border: 1px solid #999;
    margin-right: 20px;
    i {
      font-size: 28px;
    }
  }
</style>
