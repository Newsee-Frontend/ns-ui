<!--UI 组件库 - Dropdown - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">dropdown 基础用法</template>
      <template slot="describe">dropdown options配置菜单，command事件接收菜单的点击 visibleChange 下拉框出现/隐藏时触发	</template>
      <template slot="content">
        <ns-dropdown :options="options" @command="handleCommand" @visibleChange="visibleChange">
          <ns-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </ns-button>
        </ns-dropdown>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">dropdown 按钮组</template>
      <template slot="describe">dropdown  split-button的用法, size控制按钮size和dropdown的size	 </template>
      <template slot="content">
        <ns-dropdown :options="options" splitButton  size="small" type="primary" @command="handleCommand" @click="click">
          更多菜单
        </ns-dropdown>

        <ns-dropdown :options="options" splitButton type="primary" @command="handleCommand" @click="click">
          更多菜单
        </ns-dropdown>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        options: [
          { label: '黄金糕', value: '1' },
          { label: '玉米糕', value: '2', disabled: true },
          {
            label: '新增子节点', value: '3', disabled: true ,divided: true,
            children: [
              { label: '新增子节点', value: '31' },
              { label: '新增子节点', value: '32' }
            ],
          },
        ],
      };
    },
    computed: {},
    created() {

    },
    methods: {
      handleCommand(val) {
        console.log('just choosed', val);
      },

      visibleChange(val){
       console.log('下拉框现在显示？', val);
      },

      click(val){
        console.log('按钮组click事件触发？',val);
      }
    },
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
