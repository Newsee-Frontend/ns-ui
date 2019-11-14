<template>
  <Dialog
    title="截图"
    autoHeight
    width="1000px"
    :visible.sync="showDialog"
    @close="close"
    class="cropper-dialog"
  >
    <div class="cropper">
      <vueCropper
        ref="cropper"
        :img="imgFile"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
      ></vueCropper>
    </div>
    <div slot="footer">
      <div>
        <ns-button type="primary" style="float: left" @click="turnDirection('left')"
          >逆时针旋转</ns-button
        >
        <ns-button type="primary" style="float: left" @click="turnDirection('right')"
          >顺时针旋转</ns-button
        >
        <ns-button type="primary" @click="uploadImg" :disabled="isDisabled">选择</ns-button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '../../Dialog/Dialog';
import { VueCropper } from 'vue-cropper';

export default {
  name: 'cropper-dialog',
  components: { VueCropper, Dialog },

  props: {
    visible: Boolean,

    imgFile: String,

    //截图的size
    fixedNumber: Array,

    //output 类型
    outputCropType: {
      type: String,
      default: 'data', //输出的类型  data（base64） 或者 blob
    },
  },

  data() {
    return {
      showDialog: this.visible,

      //截图的配置参数
      option: {
        img: '', // 裁剪图片的地址  (默认：空)
        outputSize: 1, // 裁剪生成图片的质量  (默认:1)
        full: false, // 是否输出原图比例的截图 选true生成的图片会非常大  (默认:false)
        outputType: 'png', // 裁剪生成图片的格式  (默认:jpg)
        canMove: true, // 上传图片是否可以移动  (默认:true)
        original: false, // 上传图片按照原始比例渲染  (默认:false)
        canMoveBox: true, // 截图框能否拖动  (默认:true)
        autoCrop: true, // 是否默认生成截图框  (默认:false)
        autoCropWidth: 100, // 默认生成截图框宽度  (默认:80%)
        autoCropHeight: 100, // 默认生成截图框高度  (默认:80%)
        fixedBox: false, // 固定截图框大小 不允许改变  (默认:false)
        fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
        fixedNumber: this.fixedNumber, // 截图框比例  (默认:[1:1])
        enlarge: 1,
      },

      isDisabled: false,
    };
  },

  created() {
    this.option.autoCropWidth = this.fixedNumber[0];
    this.option.autoCropHeight = this.fixedNumber[1];
  },

  watch: {
    visible(val) {
      this.showDialog = val;
    },
  },

  methods: {
    close() {
      this.showDialog = false;
      this.$emit('update:visible', false);
    },

    //转换方向
    turnDirection(direction) {
      if (direction === 'left') {
        this.$refs.cropper.rotateLeft();
      } else {
        this.$refs.cropper.rotateRight();
      }
    },

    //上传图片
    uploadImg() {
      // 将剪裁好的图片回传给父组件
      event.preventDefault();
      this.isDisabled = true;
      if (this.outputCropType === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          successFun(data);
        });
      } else {
        this.isDisabled = false;
        this.$refs.cropper.getCropData(data => {
          successFun(data);
        });
      }
      let successFun = data => {
        this.isDisabled = false;
        this.showDialog = false;
        this.$emit('uploadImg', data);
      };
    },
  },
};
</script>
