<template>
  <div class="tabs-wrapper">
    <!-- tabPosition 切换控制器 -->
    <div class="control-panel">
      <label>标签位置：</label>
      <ns-select v-model="tabPosition" :options='options' style="width: 120px;"></ns-select>
    </div>

    <!--两种标签都兼容-->
    <ns-tabs v-model="activeName" :tab-position='tabPosition'>
      <ns-tab-pane name="tab1" label="第一个选项312312答复啊地方温度范围v卡">第一个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡">第二个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab3" label="第三个选项卡">第三个选项卡</ns-tab-pane>
      <ns-tab-pane name="tab4" label="第四个选项卡">第四个选项卡</ns-tab-pane>
    </ns-tabs>


    <ns-tabs v-model="activeName" type="arrow" >
      <ns-tab-pane name="tab1" label="第一个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab3" label="第三个选项卡"></ns-tab-pane>
    </ns-tabs>

    <ns-tabs v-model="activeName" type="card" >
      <ns-tab-pane name="tab1" label="第一个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab2" label="第二个选项卡"></ns-tab-pane>
      <ns-tab-pane name="tab3" label="第三个选项卡"></ns-tab-pane>
    </ns-tabs>


    <ns-tabs v-model="activeName" type="border-card" >
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
        options: [
          { value: 'top',  label: '顶部'},
          { value: 'right',  label: '右侧'},
          { value: 'bottom',  label: '底部'},
          { value: 'left',  label: '左边'},
        ],
        activeName: 'tab2',
        tabPosition: 'top',
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
.tabs-wrapper {
  padding: 20px;
}

.control-panel {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-panel label {
  font-weight: 500;
  color: #606266;
}
</style>
