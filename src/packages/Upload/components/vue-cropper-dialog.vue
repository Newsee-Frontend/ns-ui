<template>
  <Dialog
  title="裁剪图片"
  type="autoHeight"
  @close="close"
  >



  </Dialog>
</template>

<script>
  import Dialog from '../../Dialog/Dialog';
  import Button from '../../Button/Button';
  import { VueCropper } from 'vue-cropper';
  export default {
    name: 'vue-cropper-dialog',
    components: {
      VueCropper,Dialog, Button
    },
    watch: {
      visible(val){
        this.showDialog = val;
      }
    },

    methods: {
      //弹框关闭
      close(){
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog);
      }
    }
  };
</script>

<style scoped>

</style>
