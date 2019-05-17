<!--UI 组件库 - Checkbox - 页面测试-->
<template>
  <div class="checkbox-wrapper">
    <demo-block>
      <template slot="title">默认 checkbox</template>
      <template slot="describe">默认checkbox，多选框不可用的状态，keyRefer修改label、value的字段，change 绑定值变化时触发的事件。</template>
      <template slot="content">
        <ns-checkbox v-model="checkValues" :options="optionsDataTemplate" @change="getChange"></ns-checkbox>
        <div class="gap">
          <ns-checkbox v-model="checkValues" :options="optionsDataTemplate" :keyRefer="keyRefer"></ns-checkbox>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">禁用状态</template>
      <template slot="describe">多选框禁用不可选</template>
      <template slot="content">
        <ns-checkbox v-model="checkValues" :options="optionsDataTemplate" disabled></ns-checkbox>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">可选项目数量的限制</template>
      <template slot="describe">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</template>
      <template slot="content">
        <ns-checkbox v-model="newCheckValues" :options="optionsDataTemplate" :min="1" :max="2"></ns-checkbox>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 checkbox</template>
      <template slot="describe">按钮样式的多选组合，通过size改变尺寸，fill可以颜色，。</template>
      <template slot="content">
        <ns-checkbox v-model="checkValues" :options="optionsDataTemplate" type="button" size="mini"></ns-checkbox>
        <div class="gap"></div>
        <ns-checkbox v-model="checkValues" :options="optionsDataTemplate"
                     type="button" fill="#7fffcd"
                     textColor="#5e6d82"
                     size="large"
        ></ns-checkbox>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';

  export default {
    name: 'checkbox-demo',
    mixins: [formmixins],
    data() {
      return {
        checkValues: [1, 2],
        newCheckValues: [3, 4, 5],
        keyRefer: {
          label: 'label',
          value: 'value',
          disabled: 'disabled',
        },
      };
    },
    computed: {
      ...mapGetters(['optionsDataTemplate']),
    },
    methods: {
      getChange(val) {
        console.log('checkbox-change', val);
      },
    },
  };
</script>
