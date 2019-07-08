<!--UI 组件库 - Button - 页面测试-->
<template>
  <div>
    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">尺寸</template>
      <template slot="content">
        <ns-button size="large" icon="el-icon-edit">较大按钮</ns-button>
        <ns-button size="medium" icon="el-icon-share">中等按钮</ns-button>
        <ns-button size="normal" icon="el-icon-delete">默认按钮</ns-button>
        <ns-button size="small" icon="el-icon-search">小型按钮</ns-button>
        <ns-button size="mini" icon="el-icon-upload">超小按钮</ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">图标</template>
      <template slot="content">
        <ns-button size="large" icon="el-icon-edit" type="primary">较大按钮</ns-button>
        <ns-button size="medium" icon="el-icon-share" type="success">中等按钮</ns-button>
        <ns-button size="normal" icon="el-icon-delete" type="info">默认按钮</ns-button>
        <ns-button size="small" icon="el-icon-search" type="warning">小型按钮</ns-button>
        <ns-button size="mini" icon="el-icon-upload" type="danger">超小按钮</ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">圆角</template>
      <template slot="content">
        <ns-button size="large" icon="el-icon-edit" round>较大按钮</ns-button>
        <ns-button size="medium" icon="el-icon-share" round>中等按钮</ns-button>
        <ns-button size="normal" icon="el-icon-delete" round>默认按钮</ns-button>
        <ns-button size="small" icon="el-icon-search" round>小型按钮</ns-button>
        <ns-button size="mini" icon="el-icon-upload" round>超小按钮</ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">圆形</template>
      <template slot="content">
        <ns-button size="large" icon="el-icon-edit" type="primary" circle>较大按钮</ns-button>
        <ns-button size="medium" icon="el-icon-share" type="success" circle>中等按钮</ns-button>
        <ns-button size="normal" icon="el-icon-delete" type="info" circle>默认按钮</ns-button>
        <ns-button size="small" icon="el-icon-search" type="warning" circle></ns-button>
        <ns-button size="mini" icon="el-icon-upload" type="danger" circle></ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">文字按钮</template>
      <template slot="content">
        <ns-button type="text" size="large" icon="el-icon-edit">文字按钮1</ns-button>
        <ns-button type="text" size="medium" icon="el-icon-share">文字按钮2</ns-button>
        <ns-button type="text" size="normal" icon="el-icon-delete">文字按钮3</ns-button>
        <ns-button type="text" size="small" icon="el-icon-search">文字按钮4</ns-button>
        <ns-button type="text" size="mini" icon="el-icon-upload">文字按钮5</ns-button>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">按钮 Button 用法</template>
      <template slot="describe">按钮组</template>
      <template slot="content">
        <ns-button-group>
          <ns-button type="primary" icon="el-icon-arrow-left">上一页</ns-button>
          <ns-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></ns-button>
        </ns-button-group>
      </template>
    </demo-block>


  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {};
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
  .ns-row {
    margin-bottom: 20px;
  }
</style>
