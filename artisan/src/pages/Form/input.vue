<template>
  <div class="input">
    <span>{{inoutModel || text}}</span>
    <ns-input
      v-model="inoutModel"
      :spec="spec"
      :width="width"
      :height="height"
      :size="size"
    >

    </ns-input>

  </div>
</template>

<script>
  export default {
    name: 'col',
    data() {
      return {
        text: '请输入',
        inoutModel: '',
        spec: 'small',
        width: '300px',
        height: '40px',
        size: 'medium',
      }
    },
    created() {

    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .ns-input.el-input--medium {
    height: 32px;
    line-height: 32px;
    .el-input__inner {
      background: red!important;
      width: 100%;
      height: 100%;
      line-height: 100%;
    }
  }
</style>
