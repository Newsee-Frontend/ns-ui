<!--UI 组件库 - Input-tag - 页面测试-->
<template>
  <div class="input-tag-wrapper">
    <demo-block>
      <template slot="title">Input-tag</template>
      <template slot="content">
        <ns-input-tag
          :options="optionsDataTemplate"
          v-model="inputModel"
          :prefixIcon="prefixIcon"
          :suffixIcon="suffixIcon"
        ></ns-input-tag>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import formmixins from '../../../mixins/form-mixins';


  export default {
    mixins: [formmixins],

    data() {
      return {
        inputModel: [],
        prefixIcon: 'daohang', //输入框头部图标
        suffixIcon: 'gailan', //输入框尾部图标
      };
    },

    computed: {
      ...mapGetters(['optionsDataTemplate']),
    },
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
