<template>
  <div class="date-picker-wrapper">
    <span>{{date}}</span>
    <ns-date-picker
      v-model="date"
      type="date"
      height="100px"
      width="500px"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="请选择"
    ></ns-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'datepicker',
    data(){
      return {
        date: '2016-12-12'
      }
    }
  };
</script>

<style scoped>

</style>
