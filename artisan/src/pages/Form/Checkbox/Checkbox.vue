<!--UI 组件库 - Checkbox - 页面测试-->
<template>
  <div class="checkbox-wrapper">
    <demo-block>
      <template slot="title">默认 checkbox</template>
      <template slot="describe">默认checkbox，多选框不可用的状态，keyRefer修改label、value的字段，change	绑定值变化时触发的事件。</template>
      <template slot="content">
        <div class="gap">
          <ns-checkbox
            v-model="checkValues"
            :options="options"
            @change="getChange"
          ></ns-checkbox>
        </div>
        <div class="gap">
          <ns-checkbox
            v-model="checkValues"
            :options="options"
            :keyRefer="keyRefer"
          ></ns-checkbox>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">禁用状态</template>
      <template slot="describe">多选框禁用不可选</template>
      <template slot="content">
        <div class="gap">
          <ns-checkbox
            v-model="checkValues"
            :options="nOptions"
            disabled
          ></ns-checkbox>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">可选项目数量的限制</template>
      <template slot="describe">使用 min 和 max 属性能够限制可以被勾选的项目的数量。</template>
      <template slot="content">
        <div class="gap">
          <ns-checkbox
            v-model="newCheckValues"
            :options="nOptions"
            :min="1"
            :max="2"
          ></ns-checkbox>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 checkbox</template>
      <template slot="describe">按钮样式的多选组合，通过size改变尺寸，fill可以颜色，。</template>
      <template slot="content">
        <ns-checkbox
          v-model="checkValues"
          :options="nOptions"
          type="button"
          size="mini"
        ></ns-checkbox>
        <div class="gap"></div>
        <ns-checkbox
          v-model="checkValues"
          :options="nOptions"
          type="button"
          fill="#ff00ff"
          textColor="#000"
          size="large"
        ></ns-checkbox>
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
          { label: '北京1', value: '11', disabled: true },
          { label: '北京2', value: '12' },
          { label: '北京3', value: '13' },
          { label: '北京4', value: '14' },
        ],
        nOptions: [
          { label: '北京1', value: '11' },
          { label: '北京2', value: '12' },
          { label: '北京3', value: '13' },
          { label: '北京4', value: '14' },
          { label: '北京4', value: '15' },
          { label: '北京4', value: '16' },
          { label: '北京4', value: '17' },
          { label: '北京4', value: '18' },
          { label: '北京4', value: '19' },
          { label: '北京4', value: '20' },
          { label: '北京4', value: '21' },
          { label: '北京4', value: '22' },
          { label: '北京4', value: '23' },
          { label: '北京4', value: '24' },
          { label: '北京4', value: '25' },
          { label: '北京4', value: '26' },
          { label: '北京4', value: '27' },
          { label: '北京4', value: '28' },
        ],
        checkValues: ['14'],
        newCheckValues: ['14'],
        keyRefer: {
          label: 'value',
          value: 'value',
          disabled: 'disabled',
        },
      };
    },
    computed: {},
    created() {

    },
    methods: {
      getChange(val) {
        console.log('checkbox-change', val);
      },
    },
    mounted() {
    },
  };
</script>
