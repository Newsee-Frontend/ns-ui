<template>
  <el-form
    class="ns-form"
    ref="form"
    :model="model"
    :rules="rules"
    :inline="inline"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :label-suffix="labelSuffix"
    :show-message="showMessage"
  >
    <slot></slot>
  </el-form>
</template>
<script>
  export default {
    name:'ns-form',
    props: {
      model: { type: Object },
      rules: { type: Object },
      inline: { type: Boolean, default: false },
      'label-position': { type: String, default: 'right' },
      'label-width': { type: String },
      'label-suffix': { type: String },
      'show-message': { type: Boolean, default: true },
      cueType: {type: String, default: 'only-error'}
    },
    created() {},
    methods: {
      //校验
      validate: function(cb){
        this.$refs.form.validate(cb)
      },

      //重置
      resetFields: function() {
        this.$refs.form.resetFields()
      },

      //清除校验结果
      clearValidate: function(){
        this.$refs.form.clearValidate()
      }
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped></style>
