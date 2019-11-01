<!--UI 组件库 - Message - 页面测试-->
<template>
  <div class="win">
    <div class="ns-container">
      <demo-block>
        <template slot="title">常规 Message</template>
        <template slot="describe">简单示例用法</template>
        <template slot="content">
          <ns-button @click="messageClick ">常规 Message 测试点击</ns-button>
        </template>
      </demo-block>
      <demo-block>
        <template slot="title">错误 Error Message ，限制显示个数</template>
        <template slot="describe">通过参数设置限制显示个数，默认为1</template>
        <template slot="content">
          <ns-input v-model.number="Limit">限制显示个数</ns-input>
          <ns-button @click="messageErrorClick">错误 Error Message 测试点击</ns-button>
        </template>
      </demo-block>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        Limit: 2,
      };
    },
    methods: {
      messageClick() {
        this.$message({
          type: 'success',
          message: '常规 Message 测试点击',
          center: true,
        });
      },
      messageErrorClick() {
        const l = parseInt(this.Limit);
        console.log(`限制个数:${l}`);
        this.$message.error({ message: '错误 Error Message 测试点击' }, l);
      },
    },
  };
</script>
