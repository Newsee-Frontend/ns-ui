<!--UI 组件库 - Upload - 页面测试-->
<template>
  <div class="upload-wrapper">
    <demo-block>
      <template slot="title">上传控件 - Upload type为 picture-single</template>
      <template slot="describe">单张照片， 用于头像上传</template>
      <template slot="content">
        <ns-upload
          v-model="childItemSingle"
          width="100px"
          height="100px"
          :data="{name:1}"
          :action="dynamicUrl"
          @change="changeModel"
        >
        </ns-upload>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">上传控件 - Upload type为 picture-wall</template>
      <template slot="describe">照片墙</template>
      <template slot="content">
        <ns-upload
          v-model="childItemWall"
          type="picture-wall"
          :limit="2"
          exceedLimitHiddenEntrance
          :action="dynamicUrl"
        >
        </ns-upload>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">上传控件 - Upload type为 file</template>
      <template slot="describe">文件上传</template>
      <template slot="content">
        <ns-upload
          v-model="childItemOther"
          type="file"
          :action="dynamicUrl"
          :limit="3"
          :beforeRemove="beforeRemove"
        >
          <ns-button type="primary"> 点击上传文件 </ns-button>
        </ns-upload>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">带截图功能的上传图片</template>
      <template slot="describe">
        <div>fixedNumber: 控制截图大小</div>
        <div>outputCropType: 输出格式</div>
      </template>
      <template slot="content">
        <ns-upload-cropper v-model="childItemCropper"
                           :fixedNumber="[100,100]"
                           outputCropType="data"
                           @uploadImg="uploadImg"
                           type="picture-single"></ns-upload-cropper>

        <div class="cropper" style="width: 150px; height: 150px">
          <!--<vueCropper ref="cropper"></vueCropper>-->
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
        dynamicUrl: 'http://192.168.1.75/api/fastdfs/fastdfs/uploadFile',
        childItemSingle: [],
        childItemOther: [],
        childItemWall: [
          {
            fileUrl: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG',
          }
        ],

        childItemCropper: [
          {
            fileUrl: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG'
          }
        ],
      };
    },

    methods: {
      changeModel(){
        console.log(this.childItemSingle);
      },

      beforeRemove(){
        return false;
      },

      uploadImg(fileUrl){
        this.childItemCropper = [];
        this.childItemCropper.push({
          fileUrl
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
