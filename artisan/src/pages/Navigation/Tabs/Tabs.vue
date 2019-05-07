<template>
  <div class="tabs-wrapper">
    <!--两种标签都兼容-->
    <ns-tabs v-model="activeName">
      <el-tab-pane name="tab1" label="第一个选项卡">第一个选项卡</el-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡">第二个选项卡</ns-tab-pane>
    </ns-tabs>

    <ns-tabs v-model="activeName" type="arrow">
      <el-tab-pane name="tab1" label="第一个选项卡"></el-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡"></ns-tab-pane>
    </ns-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',

    data() {
      return {
        activeName: 'tab2',
      };
    },
  };
</script>

<style scoped>

</style>
