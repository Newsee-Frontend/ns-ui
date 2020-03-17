<!--UI 组件库 - Radio - 页面测试-->
<template>
  <div class="win redio-wrapper">
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
        <ns-radio
          v-model="radio1"
          :isGroup="false"
          label="1"
          disabled
          @change="changeRadio"
        >
          备选项
        </ns-radio>

        <ns-radio
          v-model="radio1"
          :isGroup="false"
          label="2"
          @change="changeRadio"

        >
          备选项
        </ns-radio>

        <ns-radio
          v-model="radio1"
          :isGroup="false"
          label="3"
          @change="changeRadio"

        >
          备选项
        </ns-radio>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">ns-radio-dictionary</template>
      <template slot="content">
        <ns-radio-dictionary
          v-model="radioDictionary"
          type="button"
          @change="changeRadioDictionary"
        ></ns-radio-dictionary>
        <div class="gap"></div>
        <ns-radio-dictionary
          v-model="radioDictionary"
          @change="changeRadioDictionary"
        ></ns-radio-dictionary>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';
  import nsRadioDictionary from '../../../components/radioDictionary/radioDictionary'


  export default {
    name: 'radio-demo',
    mixins: [formmixins],
    components: {
      nsRadioDictionary
    },
    data() {
      return {
        selectRadio: 1,
        radio1: '1',
        radioDictionary: '100',
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
      },

      changeRadioDictionary(e){
        console.log('radio-dictionary-change', e);
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
