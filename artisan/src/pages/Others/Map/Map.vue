<template>
  <demo-block>
    <template slot="title">测试百度地图</template>
    <template slot="content">
      <div ref="allmap" style="width: 500px; height: 500px"></div>
    </template>
  </demo-block>
</template>

<script>
  import {MP} from './map.js'
  export default {
    name: 'Map',

    mounted(){
      this.$nextTick(()=>{
        MP().then(BMap => {
          var map = new BMap.Map(this.$refs.allmap);
          var point = new BMap.Point(116.331398,39.897445);
          map.centerAndZoom(point,12);
          // 创建地址解析器实例
          var myGeo = new BMap.Geocoder();
          // 将地址解析结果显示在地图上,并调整地图视野
          myGeo.getPoint("银爵世纪公寓", function(point){
            if (point) {
              map.centerAndZoom(point, 16);
              map.addOverlay(new BMap.Marker(point));
            }else{
              map.centerAndZoom("杭州市",15);      // 初始化地图,用城市名设置地图中心点
            }
          }, "杭州市");
        })
      })
    }
  };
</script>

<style scoped>

</style>
