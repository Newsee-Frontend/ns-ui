<!--UI 组件库 - InputNumber - 页面测试-->
<template>
  <div class="input-number-wrapper">
    <demo-block>
      <template slot="title">普通计数器</template>
      <template slot="content">
        <ns-input-number v-model="num" size="small" @change="handleChange" :step	="2" :min="1" :max="10" label="描述文字"/>
        <div class="gap"></div>
        <ns-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" disabled></ns-input-number>
        <div class="gap"></div>
        <ns-input-number v-model="numFloat" @change="handleChange" :step	="0.01"  :precision="2" label="描述文字"/>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        num: 1,
        numFloat: 1.00
      };
    },
    computed: {},
    created() {

    },
    methods: {
      handleChange(e){
        console.log('input-number-changed',e);
      }
    },
    created() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = "https://api.map.baidu.com/api?v=2.0&ak=CpSSIGhCSB8o5T0dhtacTTS6dcqHo2h7";
      document.body.appendChild(s);
      s.onload = ()=>{
        console.log(1111111);
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
