<!--UI 组件库 - Upload - 页面测试-->
<template>
  <div class="upload-wrapper">
    <demo-block>
      <template slot="title">上传控件 - Upload type为 singlePicture</template>
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
      <template slot="title">上传控件 - Upload type为 pictureWall</template>
      <template slot="describe">照片墙</template>
      <template slot="content">
        <ns-upload
          v-model="childItemWall"
          type="pictureWall"
          :limit="2"
          exceedLimitHiddenEntrance
          :action="dynamicUrl"
        >
        </ns-upload>
      </template>
    </demo-block>


    <demo-block>
      <template slot="title">上传控件 - Upload type为 otherFileList</template>
      <template slot="describe">文件上传</template>
      <template slot="content">
        <ns-upload
          v-model="childItemOther"
          type="otherFileList"
          :action="dynamicUrl"
          :limit="3"
          :beforeRemove="beforeRemove"
        >
          <ns-button type="primary"> 点击上传文件 </ns-button>
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
        dynamicUrl: 'http://192.168.1.75/api/fastdfs/fastdfs/uploadFile',
        childItemSingle: [],
        childItemOther: [],
        childItemWall: [
          {
            fileUrl: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG',
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
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
