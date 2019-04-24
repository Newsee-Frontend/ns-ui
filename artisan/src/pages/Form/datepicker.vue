<template>
  <div class="date-picker-wrapper">
    <div>选择的时间： {{date}}</div>
    <div>选择的时间范围： {{dateRange}}</div>
    <div class="test-line">
      使用size  medium：
      <ns-date-picker
        v-model="date"
        size="medium"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择"
      ></ns-date-picker>
    </div>

    <div class="test-line">
      自定义长宽：
      <ns-date-picker
        v-model="date"
        size="mini"
        width="500px"
        height="50px"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择"
      ></ns-date-picker>
    </div>

    <div class="test-line">
      禁用/只读：
      <ns-date-picker
        v-model="date"
        :readonly="true"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择"
      ></ns-date-picker>
    </div>

    <div class="test-line">
      可编辑：
      <ns-date-picker
        v-model="date"
        :editable="true"
        type="date"
        format="yyyy/MM/dd"
        value-format="yyyy--MM--dd"
        placeholder="请选择"
      ></ns-date-picker>
    </div>

    <div class="test-line">
      时间起止：
      <ns-date-picker
        v-model="dateRange"
        type="daterange"
        size="large"
        startPlaceholder="请输入起"
        endPlaceholder="请输入止"
        range-separator="至"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="请选择"
      ></ns-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'datepicker',
    data(){
      return {
        date: '2016-12-12',
        dateRange: ['2011-12-12','2011-12-22']
      }
    }
  };
</script>

<style scoped>
  .test-line{
    margin: 20px 0;
  }
</style>
