<template>
  <div class="tabs-wrapper">
    <!--两种标签都兼容-->
    <ns-tabs v-model="activeName">
      <ns-tab-pane name="tab1" label="第一个选项卡">第一个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡">第二个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab3" label="第三个选项卡">第三个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab4" label="第四个选项卡">第四个选项卡</ns-tab-pane>
    </ns-tabs>

    <ns-tabs v-model="activeName" type="arrow">
      <ns-tab-pane name="tab1" label="第一个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab3" label="第三个选项卡"></ns-tab-pane>
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

    methods: {
      tabClick: function(e){
        console.log('tab-click',e);
      }
    },

    watch: {
      activeName: function(val){
        console.log('tab changed', val)
      }
    }
  };
</script>

<style scoped>

</style>
