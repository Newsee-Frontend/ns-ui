<!--UI 组件库 - rate - 页面测试-->
<template>
  <div class="win rate-wrapper">
    <demo-block>
      <template slot="title">基础用法</template>
      <template slot="describe">评分组件的基础用法</template>
      <template slot="content">
        <!--参数控制-->
        <div class="control-block form-block-line">
          <span>是否禁用: </span>
          <ns-switch
            v-model="rateForm.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="margin-right: 10px"
          >
          </ns-switch>

          <span>是否允许半选: </span>
          <ns-switch
            v-model="rateForm.allowHalf"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="margin-right: 10px"
          >
          </ns-switch>

          <span>最大分值: </span>
          <ns-input v-model.number="rateForm.max" placeholder="请输入最大分值"></ns-input>

          <span>是否显示辅助文字/分值: </span>
          <ns-select v-model="show" placeholder="请选择" :options="showOptions"></ns-select>

        </div>


        <div class="control-block form-block-line">
          <span>当前分值: </span>
          <ns-input v-model.number="rateModel" placeholder="请输入当前分值"></ns-input>

          <ns-button type="primary" @click="updateClick" style="margin-left: 20px">点击刷新组件</ns-button>
        </div>

        <h2 style="margin: 20px 0 ">组件展示:</h2>


        <div v-if="Switch">
          <ns-rate
            v-model="rateModel" v-bind="rateForm" @change="rateChange"
            v-for="(index) in Array.from({length:1})" :key="index">
          </ns-rate>
        </div>


      </template>
    </demo-block>


  </div>
</template>

<script>
  export default {
    name: 'rate-demo',
    components: {},
    data() {
      return {
        rateModel: 3,

        show: 'text',

        rateForm: {
          disabled: false,
          allowHalf: false,
          showScore: false,
          showText: false,
          max: 5,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          texts: ['极差', '失望', '一般', '满意', '惊喜'],
        },

        showOptions: [
          { label: '辅助文字', value: 'text' },
          { label: '辅助分值', value: 'value' },
        ],
        Switch: true,
      };
    },
    watch: {
      show: {
        handler: function handler(newVal, oldVal) {
          this.rateForm.showScore = newVal === 'value';
          this.rateForm.showText = newVal === 'text';
        },
        immediate: true,
      },
    },
    methods: {
      /**
       * rate change
       * @param val
       */
      rateChange: function(val) {
        console.log('change rate', val);
      },
      updateClick() {
        this.Switch = false;
        this.$nextTick(() => {
          this.Switch = true;
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
