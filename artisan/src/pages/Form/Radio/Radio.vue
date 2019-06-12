<!--UI 组件库 - Radio - 页面测试-->
<template>
  <div class="redio-wrapper">
    <demo-block>
      <template slot="title">默认 Radio</template>
      <template slot="describe">默认Radio，单选框不可用的状态，keyRefer修改label、value的字段，change 绑定值变化时触发的事件。</template>
      <template slot="content">
        <div class="gap">
          <ns-radio
            v-model="selectRadio"
            :options="optionsDataTemplate"
            @change="change"
          />
        </div>
        <div class="gap">
          <ns-radio
            v-model="selectRadio"
            :options="optionsDataTemplate"
            :keyRefer="keyRefer"
            @change="change"
          />
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">禁用状态</template>
      <template slot="describe">单选框禁用不可选</template>
      <template slot="content">
        <ns-radio
          v-model="selectRadio"
          :options="optionsDataTemplate"
          disabled
        ></ns-radio>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Radio</template>
      <template slot="describe">按钮样式的单选组合，通过size改变尺寸，fill、textColor可以改变颜色</template>
      <template slot="content">
        <ns-radio
          v-model="selectRadio"
          :options="optionsDataTemplate"
          type="button"
          fill="#7fffcd"
          textColor="#5e6d82"
          size="mini"
        />
        <div class="gap">
          <ns-radio
            v-model="selectRadio"
            :options="optionsDataTemplate"
            type="button"
            height="100px"
          />
        </div>
      </template>
    </demo-block>


    <demo-block>
      <template slot="title">单个 radio按钮</template>
      <template slot="describe"> 单个radio选项， disabled控制禁用， label是radio的value值</template>
      <template slot="content">
        <ns-single-radio
          v-model="radio1"
          label="1"
          disabled
          @change="changeRadio"
        >
          备选项
        </ns-single-radio>

        <ns-single-radio
          v-model="radio1"
          label="2"
          @change="changeRadio"

        >
          备选项
        </ns-single-radio>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';

  export default {
    name: 'radio-demo',
    mixins: [formmixins],
    data() {
      return {
        selectRadio: 1,
        radio1: 0,
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
      change(value) {
        console.log('radio-change', value);
      },

      changeRadio(value){
        console.log('singleRadio-change', value, this.radio1)
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
