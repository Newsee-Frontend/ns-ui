<!--UI 组件库 - Alert - 页面测试-->
<template>
  <div class="alert-wrapper">
    <ns-alert title="警告提示的文案" type="warning" style="margin-top: 20px" :closable="false"></ns-alert>
    <ns-alert title="警告提示的文案" type="info" close-text="知道了" style="margin-top: 20px"></ns-alert>
    <ns-alert title="消息提示的文案" type="success" center show-icon style="margin-top: 20px"></ns-alert>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
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

</style>
