<template>
  <Dialog
  title="裁剪图片"
  type="autoHeight"
  @close="close"
  ref="corpper-image-dialog"
  :visible.sync="showDialog"
  >
    vfvfvfvfv
  </Dialog>
</template>

<script>
  import Dialog from '../../Dialog/Dialog';
  import Button from '../../Button/Button';
  import { vueCropper } from 'vue-cropper';
  export default {
    name: 'cropper-dialog',

    components: {
      vueCropper,Dialog, Button
    },

    data(){
      return {
        showDialog: this.visible
      }
    },

    methods: {
      //弹框关闭
      close(){
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog);
      },

      //转换状态
      turnState(val){
        this.showDialog = val;
      }
    }
  };
</script>

<style scoped>

</style>
