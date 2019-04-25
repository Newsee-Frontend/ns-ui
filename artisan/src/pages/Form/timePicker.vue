<template>
    <div class="time-picker-wrapper">
      <div>选择的时间： {{time}}</div>
      <div>选择的时间范围： {{timeRange}}</div>

      <div class="test-line">
        size和高度：
        <ns-time-picker
          v-model="time"
          height="50px"
          size="large"/>
      </div>

      <div class="test-line">
        时间区间的选择：
        <ns-time-picker
          v-model="timeRange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :isRange="true"/>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'timePicker',

    data(){
      return{
        time: '12:12:12',
        timeRange: ['8:30:00','8:30:00']
      }
    }
  };
</script>

<style scoped>
  .test-line{
    margin: 20px 0;
  }
</style>
