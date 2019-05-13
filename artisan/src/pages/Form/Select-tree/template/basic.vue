<!--UI 组件库 - Select-tree basic- 页面测试-->
<template>
  <demo-block>
    <template slot="title">基础用法</template>
    <template slot="describe">基础用法</template>
    <template slot="content">
      <ns-select-tree
        v-model="selectTreeModel"
        :options="selectTreeOptions"
        :size="size"
        :menuHeight="reNumModel(menuHeight)"
        :menuOpenDirection="menuOpenDirection"
        :placeholder="placeholder"
        :multiple="multiple"
        :disabled="disabled"
        :clearable="clearable"
        :limit="reNumModel(limit)"
        :limitText="limitText"
        :append-to-body="appendToBody"
        :isMenuOpened="isMenuOpened"
      >
      </ns-select-tree>
      <pre class="result">{{ selectTreeModel }}</pre>
      <div class="control">
        <div class="control-block form-block-line">
          <span>选择下拉树尺寸:</span>
          <ns-radio v-model="size" :options="sizeOpts"></ns-radio>
        </div>
        <div class="control-block form-block-line">
          <span>是否多选:</span>
          <ns-switch v-model="multiple"></ns-switch>
          <span>是否禁用:</span>
          <ns-switch v-model="disabled"></ns-switch>
          <span>是否可清除:</span>
          <ns-switch v-model="clearable"></ns-switch>
          <span>下拉菜单是否插入body中:</span>
          <ns-switch v-model="appendToBody"></ns-switch>
          <span>下拉菜单是否强制打开:</span>
          <ns-switch v-model="isMenuOpened"></ns-switch>
        </div>
        <div class="control-block form-block-line">
          <span>placeholder显示值:</span>
          <ns-input v-model="placeholder"></ns-input>
        </div>
        <div class="control-block form-block-line">
          <span>select显示框中显示的个数限制:</span>
          <ns-input v-model.number="limit" placeholder="请输入展开的层级"></ns-input>
        </div>
        <div class="control-block form-block-line">
          <span>菜单栏高度:</span>
          <ns-input v-model.number="menuHeight" placeholder="请输入菜单栏高度"></ns-input>
        </div>
        <div class="control-block form-block-line">
          <span>下拉菜单打开的方向:</span>
          <ns-radio v-model="menuOpenDirection" :options="menuOpenDirectionOpts"></ns-radio>
        </div>
      </div>
    </template>
  </demo-block>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'select-tree-demo-basic',
    data() {
      return {
        selectTreeModel: ['team-1'],
        placeholder: '请选择...',
        size: 'normal',//尺寸
        sizeOpts: [
          { label: 'mini', value: 'mini' },
          { label: 'small', value: 'small' },
          { label: 'normal', value: 'normal' },
          { label: 'medium', value: 'medium' },
          { label: 'large', value: 'large' },
        ],
        menuHeight: 300,//菜单栏高度
        menuOpenDirection: 'auto',//下拉菜单打开的方向 - "auto", "below", "bottom", "above" or "top"
        menuOpenDirectionOpts: [
          { label: 'auto', value: 'auto' },
          { label: 'below', value: 'below' },
          { label: 'bottom', value: 'bottom' },
          { label: 'above', value: 'above' },
          { label: 'top', value: 'top' },
        ],
        multiple: true,
        disabled: false,
        clearable: true,
        limit: 2,
        limitText: count => `+ ${count} more`,
        appendToBody: true,
        isMenuOpened: false,
      };
    },
    computed: {
      ...mapGetters(['selectTreeOptions']),
    },
    methods: {},
    created() {


    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
