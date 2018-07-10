<!-- canvas background component -->
<template>
  <div :class="['error-prompt',{'trans':errorType === 'error'}]" v-if="errorType !=='noError'">
    <img :class="['error-prompt_img',{'fl':errorType === 'error'}]" :src="imgSrc" :alt="errorType"/>
    <div :class="['error-prompt_content',{'fl':errorType === 'error'}]">
      <span v-if="errorType === 'noData'">服务器获取错误数据，请联系管理员</span>
      <!--<span class="" @click=“”>去新增</span>-->
      <span v-if="errorType === 'noResult'">抱歉,没有搜索到你要的结果</span>
      <div v-if="errorType === 'error'">
        <p>服务器出错</p>
        <span>蛋定！伸个懒腰喝杯水，过会再试试吧</span>
        <el-button type="primary" size="small" @click="this.refreshGrid">刷新试试</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'error-prompt',
    props: {
      errorType: {type: String, default: 'noError'},
    },
    data() {
      return {}
    },
    computed: {
      imgSrc() {
        const map = {
          noData: "null.jpg",
          noResult: "searchNone.jpg",
          error: "error.jpg"
        };
        const baseUrl = '/static/img/';
        // const baseUrl = '../../../../assets/img/';
        return baseUrl + map[this.errorType];
      }
    },
    methods: {
      //刷新表事件抛出回调
      refreshGrid() {
        this.$emit("refreshGrid");
      },
    },
  }
</script>

