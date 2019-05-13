<!--UI 组件库 - Upload - 页面测试-->
<template>
  <div class="upload-wrapper">
    <ns-upload
      v-model="childItem"
      width="100px"
      height="100px"
      :action="dynamicUrl"
    >
    </ns-upload>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        dynamicUrl: '/post',
        childItem: [{
          fileUrl: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG'
        }]
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
