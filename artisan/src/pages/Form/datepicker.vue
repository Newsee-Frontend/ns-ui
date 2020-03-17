<template>
  <div class="win date-picker-wrapper">
    <demo-block>
      <template slot="title">默认 日期选择</template>
      <template slot="describe">
        默认日期选择，使用size（width，height）定义宽高，禁用状态，编辑状态 和自定义展示的格式
      </template>
      <template slot="content">
        <div>选择的时间： {{date}}</div>
        <div class="gap">
          <ns-date-picker
            v-model="date"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
            :clearable="clearable"
            align="right"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择"
            :popper-class="popperClass"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          ></ns-date-picker>
        </div>

        <div class="gap">
          <ns-date-picker
            v-model="date"
            size="medium"
            :width="width"
            :height="height"
            :readonly="readonly"
            :disabled="true"
            :editable="editable"
            :clearable="clearable"
            align="right"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择"
            :popper-class="popperClass"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          ></ns-date-picker>
        </div>
      </template>
    </demo-block>

    <demo-block>
      <template slot="title">日期范围选择</template>
      <template slot="describe">
        日期范围选择， 使用size（width，height）定义宽高，禁用状态，编辑状态 和自定义展示的格式
      </template>
      <template slot="content">
        <div>选择的时间范围： {{dateRange}}</div>
        <div class="gap">
          <ns-date-picker
            v-model="dateRange"
            type="daterange"
            width="400px"
            height="100px"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
            :clearable="clearable"
            startPlaceholder="请输入起"
            endPlaceholder="请输入止"
            range-separator="至"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="请选择"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          ></ns-date-picker>
        </div>
        <div class="gap">
          <ns-date-picker
            v-model="dateRange"
            type="daterange"
            width="400px"
            :readonly="readonly"
            :disabled="true"
            :editable="editable"
            :clearable="clearable"
            startPlaceholder="请输入起"
            endPlaceholder="请输入止"
            range-separator="至"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="请选择"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          ></ns-date-picker>
        </div>
      </template>
    </demo-block>
  </div>
</template>

<script>
  export default {
    name: 'datepicker',
    data(){
      return {
        date: '2016-12-12',
        dateRange: ['2011/12/12','2011/12/22'],
        width:'500px',
        height: '50px',
        readonly: false,
        disabled: false,
        editable: true,
        clearable: true,
        popperClass: 'pop-class'
      }
    },
    methods: {
      onChange: function(val){
        console.log('datePicker changed', val);
      },

      onBlur: function(){
        console.log('datePicker blur')
      },

      onFocus: function(){
        console.log('datePicker focus')
      }
    }
  };
</script>

<style scoped>
  .test-line{
    margin: 20px 0;
  }
</style>
