<template>
    <div class="win time-picker-wrapper">
      <demo-block>
        <template slot="title">默认 时间选择</template>
        <template slot="describe">默认时间选择，使用size（width，height）定义宽高，禁用状态，编辑状态 和自定义展示的格式</template>
        <template slot="content">
          <div>选择的时间： {{time}}</div>
          <div class="gap">
            <ns-time-picker
              v-model="time"
              placeholder="请选择时间"
              size="normal"
              :readonly="readonly"
              :disabled="disabled"
              :clearable="clearable"
              :editable="editable"
              popperClass="popperClass"
              :format="format"
              :valueFormat="valueFormat"
              :isRange="false"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            />
          </div>
          <div class="gap">
            <ns-time-picker
              v-model="time"
              placeholder="请选择时间"
              size="normal"
              :readonly="readonly"
              :disabled="true"
              :clearable="clearable"
              :editable="editable"
              popperClass="popperClass"
              :format="format"
              :valueFormat="valueFormat"
              :isRange="false"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            />
          </div>
        </template>
      </demo-block>

      <demo-block>
        <template slot="title">时间范围选择</template>
        <template slot="describe">时间范围选择，使用size（width，height）定义宽高，禁用状态，编辑状态 和自定义展示的格式</template>
        <template slot="content">
          <div>选择的时间范围： {{timeRange}}</div>
          <div class="gap">
            <ns-time-picker
              v-model="timeRange"
              startPlaceholder="请选择时间"
              endPlaceholder="请选择时间"
              size="large"
              :readonly="readonly"
              :disabled="disabled"
              :clearable="clearable"
              :editable="editable"
              popperClass="popperClass"
              :format="format"
              :valueFormat="valueFormat"
              :isRange="true"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            />
          </div>
          <div class="gap">
            <ns-time-picker
              v-model="timeRange"
              startPlaceholder="请选择时间"
              endPlaceholder="请选择时间"
              size="large"
              :readonly="readonly"
              :disabled="true"
              :clearable="clearable"
              :editable="editable"
              popperClass="popperClass"
              :format="format"
              :valueFormat="valueFormat"
              :isRange="true"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            />
          </div>
        </template>
      </demo-block>
    </div>
</template>

<script>
  export default {
    name: 'timePicker',

    data(){
      return{
        time: '12:12:12',
        timeRange: ['8:30:00','9:30:00'],
        readonly: false,
        disabled: false,
        clearable: true,
        editable: true,
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss'
      }
    },

    methods: {
      onChange: function(val){
        console.log('timePicker changed', val);
      },

      onBlur: function(){
        console.log('timePicker blur')
      },

      onFocus: function(){
        console.log('timePicker focus')
      }
    }
  };
</script>
