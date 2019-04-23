<template>
  <div class="input">
    <span>{{inoutModel || text}}</span>
    <el-input v-model="inoutModel" placeholder="请输入内容" size="small"></el-input>
    <ns-input
      v-model="inoutModel"
      :size="size"
    >
    </ns-input>
    <ns-input
      v-model="inoutModel"
      size="small"
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
        width: '300px',
        height: '40px',
        size: 'medium',
      }
    },
    created() {

    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "input";
</style>
