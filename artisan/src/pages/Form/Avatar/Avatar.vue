<!--UI 组件库 - Avatar - 页面测试-->
<template>
  <div class="avatar-wrapper">
    <ns-avatar
      :dynamicSrc="dynamicSrc"
      type="round"
    ></ns-avatar>

    <ns-avatar
      :dynamicSrc="dynamicSrc"
      height="80px"
      :width="80"
      border-radius="20%"
      @click="click"
    ></ns-avatar>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        dynamicSrc: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      };
    },
    created() {

    },
    methods: {
      click() {
        console.log('点击图片事件');
      },
    },
  };
</script>
<style>
  .avatar-wrapper .ns-avatar {
    float: left;
    margin: 20px;
  }
</style>
