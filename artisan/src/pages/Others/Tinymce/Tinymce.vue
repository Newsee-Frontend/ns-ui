<!--UI 组件库 - Tinymce - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">Tinymce - 富文本编辑器</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <div>
          <ns-tinymce v-model="content"
                      :disabled="false"
                      ref="editor"></ns-tinymce>


          <!--<ns-tinymce :height="300" v-model="content"/>-->
        </div>
        <div class="editor-content" v-html="content"/>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'tinymce-demo',
    data() {
      return {
        content: '',
      };
    },
    computed: {},
    created() {

    },
    methods: {},
    mounted() {
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
