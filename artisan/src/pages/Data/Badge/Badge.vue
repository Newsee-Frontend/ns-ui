<!--UI 组件库 - Badge - 页面测试-->
<template>
  <div class="badge-wrapper">
    <ns-badge :value="1222" :isDot="true">
      <el-button size="mini">回复</el-button>
    </ns-badge>

    <ns-badge :value="12">
      <el-button size="mini">回复</el-button>
    </ns-badge>
  </div>
</template>

<script>
  export default {
    name: 'badge'
  };
</script>
