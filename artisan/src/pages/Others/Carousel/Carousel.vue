<!--UI 组件库 - Carousel - 页面测试-->
<template>
  <div class="carousel-wrapper">
    <div style="text-align: center">
      <ns-carousel
        style="margin: auto"
        ref="nsCarousel"
        :list="list"
        :autoplay="false"
        width="50%"
        height="300px"
        @change="getChange"
      >
      </ns-carousel>

      <el-button @click="toNext">next</el-button>
      <el-button @click="toPrev">prev</el-button>
      <el-button @click="toSetActiveItem">setActiveItem2</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        list: [{
          name: '1',
          src: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0805201705191824540.JPG'
        },{
          name: '2',
          src: 'http://oa.new-see.com/upload/file/public/upload/file/public/201607/QQ截图20160722145259201607221508490.png'
        },
          {
            name: '3',
            src: 'http://oa.new-see.com/upload/file/public/upload/file/public/201705/IMG_0680201705230907560.JPG'
          }
        ]
      };
    },
    computed: {},
    created() {

    },
    methods: {
      getChange: function(e){
        console.log('carousel index', e)
      },
      toSetActiveItem: function(){
        this.$refs.nsCarousel.setActiveItem(2);
      },
      toNext: function(){
        this.$refs.nsCarousel.next();
      },
      toPrev: function(){
        this.$refs.nsCarousel.prev();
      }



    },
    mounted() {

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
