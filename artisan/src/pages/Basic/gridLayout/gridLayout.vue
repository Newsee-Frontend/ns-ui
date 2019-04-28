<template>
  <div class="row">
    <h3>示例一：</h3>
    <ns-row>
      <ns-col :span="12">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
    </ns-row>
    <h3>示例二：</h3>
    <ns-row>
      <ns-col :span="4">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
    </ns-row>
    <h3>示例三：</h3>
    <ns-row :gutter="20">
      <ns-col :span="4">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="16">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :span="4">
        <div class="grid-content bg-purple"></div>
      </ns-col>
    </ns-row>
    <h3>示例三四</h3>
    <ns-row :gutter="10">
      <ns-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
      <ns-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple"></div>
      </ns-col>
      <ns-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </ns-col>
    </ns-row>

  </div>
</template>

<script>
  export default {
    name: 'gridLayout-demo',
    data() {
      return {};
    },
    created() {

    },
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
