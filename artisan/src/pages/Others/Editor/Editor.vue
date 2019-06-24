<!--UI 组件库 - Editor - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">Tinymce - 富文本编辑器</template>
      <template slot="describe">基础用法</template>
      <template slot="content">
        <ns-editor :height="500" v-model="content"/>
        <div class="editor-content">
          <h3>输入内容如下:</h3>{{content}}
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'editor-demo',
    data() {
      return {
        visible: false,
        content: '',
      };
    },
    methods: {
      buttonClick() {
        this.visible = true;
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .editor-content {
    h3 {
      margin-bottom: 10px;
    }
    margin: 20px 0;
  }
</style>
