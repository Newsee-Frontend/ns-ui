<!--UI 组件库 - Radio - 页面测试-->
<template>
  <div class="redio-wrapper">

    <demo-block>
      <template slot="title">默认 Radio</template>
      <template slot="describe">默认Radio，单选框不可用的状态，keyRefer修改label、value的字段，change	绑定值变化时触发的事件。</template>
      <template slot="content">
        <ns-radio
          v-model="selectRadio"
          :options="options"
          @change="change"
        />
        <div class="gap">
          <ns-radio
            v-model="selectRadio"
            :options="options"
            :keyRefer="keyRefer"
            @change="change"
          />
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Radio</template>
      <template slot="describe">按钮样式的单选组合，通过size改变尺寸，fill可以颜色</template>
      <template slot="content">
        <div>
          <ns-radio
            v-model="selectRadio"
            :options="options"
            type="button"
            fill="#f0f030"
            size="mini"
          />
        </div>
        <div class="gap">
          <ns-radio
            v-model="selectRadio"
            :options="options"
            type="button"
            height="100px"
          />
        </div>
      </template>
    </demo-block>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        selectRadio: '12',
        options: [
          { label: '北京', value: '11', disabled: true },
          { label: '上海', value: '12' },
          { label: '杭州', value: '13' },
          { label: '广州', value: '14' },
        ],

        keyRefer: {
          label: 'value',
          value: 'value',
          disabled: 'disabled'
        }
      };
    },
    methods: {
      change(value) {
        console.log('radio-change',value);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
