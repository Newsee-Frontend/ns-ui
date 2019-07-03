<!--UI 组件库 - Editor - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">Editor - 富文本编辑器</template>
      <template slot="describe">基础用法 简单模式</template>
      <template slot="content">
        <div class="control-block form-block-line">
          <span>模式切换:  </span>
          <ns-radio v-model="model" :options="modelOptions"></ns-radio>
        </div>
        <ns-editor v-model="content" :height="500" :model="model" :plugins-config="pluginsConfig"/>
        <div class="editor-content">
          <h3>输入内容如下:</h3>{{content}}
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'editor-demo',
    data() {
      return {
        visible: false,
        content: '',
        model: 'normal',//模式选择 - "simple", "normal", "rich"
        modelOptions: [
          { label: 'simple', value: 'simple' },
          { label: 'normal', value: 'normal' },
          { label: 'rich', value: 'rich' },
        ],
      };
    },
    computed: {
      ...mapGetters(['requestHead']),
      pluginsConfig() {
        return {
          'editor-image': {
            action: '/o2o/activity/fileUploadBase64',//图片请求地址
            headers: this.requestHead,//请求头
            response: res => {
              return res[0].file;
            },
          },
        };
      },
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
