<!--UI 组件库 - Upload - 页面测试-->
<template>
  <div class="upload-wrapper">
    <demo-block>
      <template slot="title">上传控件 - Upload</template>
      <template slot="describe">默认用法</template>
      <template slot="content">
        <ns-upload
          v-model="childItem1"
          width="300px"
          height="300px"
          :action="dynamicUrl"
        >
        </ns-upload>
        <ns-upload
          v-model="childItem2"
          width="200px"
          height="200px"
          :action="dynamicUrl"
        >
        </ns-upload>
      </template>
    </demo-block>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        dynamicUrl: '/post',
        childItem1: [{
          fileUrl: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG',
        }],
        childItem2: [],
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
