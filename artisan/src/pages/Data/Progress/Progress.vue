<!--UI 组件库 - Progress - 页面测试-->
<template>
  <div class="progress-wrapper">
    <demo-block>
      <template slot="title">默认 progress</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <ns-progress type="circle" :stroke-width="18" :percentage="percentage" color="#c0c200"
                     :width="300"></ns-progress>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title"> 手动控制 显示progress</template>
      <template slot="describe">用于长时间接口的提交</template>
      <template slot="content">
        <ns-submit-progress v-model="submitLoading"
                            :color="changeColor"
                            :stroke-width="strokeWidth"
                            :width="width"
                            :type="type"></ns-submit-progress>
        <div class="line">
          <p>进度条会在</p>
          <ns-input v-model.trim.number="time">
            <template slot="suffix">毫秒</template>
          </ns-input>
          <p>后关闭</p>
        </div>
        <div class="line">
          <p>您选择类型是</p>
          <ns-select :options="typeOptions" v-model="type"></ns-select>
        </div>

        <div class="line">
          <p> 进度条宽度 </p>
          <ns-input-number v-model="strokeWidth"></ns-input-number>
        </div>
        <div class="line">
          <p>宽度（仅circle/dashboard）有效</p>
          <ns-input-number v-model="width"></ns-input-number>
        </div>

        <div class="line">
          <ns-button type="primary" @click="showProcess"> 点击弹出进度条</ns-button>
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'progress',
    data() {
      return {
        percentage: 11,

        submitLoading: false,

        time: 5000,

        typeOptions: [
          { label: 'line', value: 'line' },
          { label: 'circle', value: 'circle' },
          { label: 'dashboard', value: 'dashboard' },
        ],

        strokeWidth: 6,

        width: 120,

        type: 'line',
      };
    },

    methods: {
      showProcess() {
        this.submitLoading = true;
        setTimeout(() => {
          this.submitLoading = false;
        }, this.time);
      },


      changeColor(percentage) {
        if (percentage < 30) {
          return '#f56c6c';
        } else if (percentage < 80) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
    },

    created() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.line{
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>
