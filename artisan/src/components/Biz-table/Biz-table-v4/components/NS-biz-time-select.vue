<!--用于筛选器的金额选择控件-->
<!--model值 lg： { EQUAL：2010-12-12 }  等于 2010-12-12  -->
<template>
  <div class="ns-biz-time-select">
    <!-- 时间选择器 -->
    <ns-time-picker
      v-if="config.displayFormat === 'time'"
      :picker-options="{
        start: '09:00',
        step: '00:30',
        end: '23:59',
      }"
      v-model="timeModel"
      :placeholder="placeholder"
      :is-range="isRange"
      range-separator="至"
      :start-placeholder="startPlaceholder.replace('请选择','')"
      :end-placeholder="endPlaceholder.replace('请选择','')"
      :format="'HH:mm'"
      :value-format="'HH:mm'"
      @change="changeTime"
      :clearable="clearable"
      :editable="clearable"
    >
    </ns-time-picker>


    <!-- 日期选择器 -->
    <ns-date-picker
      :width="isRange? '410px' : '200px'"
      v-else
      v-model="timeModel"
      :type="dateType"
      editable
      :placeholder="placeholder"
      range-separator="至"
      :start-placeholder="startPlaceholder"
      :default-time="isRange? ['00:00:00', '23:59:59'] : ''"
      :end-placeholder="endPlaceholder"
      :value-format="format"
      :format="format"
      :picker-options="pickerOptions"
      :clearable="clearable"
      @change="changeTime"
    >
    </ns-date-picker>
  </div>
</template>

<script>
  import '../utils/time';
  import map from '../utils/formatMap';
  import { dateFormula } from '../utils/formular'
  export default {
    name: 'NS-biz-time-select',

    props: {
      config: {
        type: Object,
      },  //配置信息

      value: String,

      placeholder: String,
    },

    data() {
      return {
        timeModel: '',
        dateOptions: {
          date: new Map([
            ['今天', this.getTransformTime('today')],
            ['昨天', this.getTransformTime('yesterday')],
            ['一周前', this.getTransformTime('oneWeekAgo')],
          ]),

          month: new Map([
            ['本月', this.getTransformTime('thisMonthStart')],
            ['上个月', this.getTransformTime('lastMonthStart')],
            ['下个月', this.getTransformTime('nextMonthStart')],
          ]),

          daterange: new Map([
            ['最近一周', this.getRangeTime('oneWeekAgoInclude', 'today')],
            ['最近一个月', this.getRangeTime('oneMonthAgo', 'today')],
            ['最近三个月', this.getRangeTime('oneThreeMonthAgo', 'today')],
          ]),

          monthrange: new Map([
            ['本月', this.getRangeTime('oneWeekAgoInclude', 'today')],
            ['今年至今', this.getRangeTime('thisYearStart', 'today')],
            ['最近六个月', this.getRangeTime('oneSixMonthAgo', 'today')],
          ]),
        },
      };
    },

    watch: {
      value: {
        handler(val) {
          if (val) {
            let obj = JSON.parse(val);
            if (this.isRange) {
              this.timeModel = [obj.GREATER_EQUAL_THAN || obj.EQUAL, obj.LESS_EQUAL_THAN || obj.EQUAL];
            } else {
              this.timeModel = obj.EQUAL;
            }
          } else {
            this.timeModel = '';
          }
        },
        immediate: true,
      },
    },

    computed: {
      isRange() {
        return this.config.range !== false && this.config.displayFormat !== 'year';
      },

      dateType() {
        return (this.config.displayFormat || 'date') + (this.isRange ? 'range' : '');
      },

      format() {
        return this.config.valueFormat || map[this.dateType] || 'yyyy-MM-dd';
      },

      clearable(){
        return this.config.clearable　?? true
      },


      startPlaceholder() {
        return this.placeholder + '开始';
      },

      endPlaceholder() {
        return this.placeholder + '结束';
      },

      pickerOptions() {
        let type = this.dateType.replace('datetime', 'date');  // datetime date 是一样的快捷键
        let shortcuts = [];
        if (this.dateOptions[type]) {
          this.dateOptions[type].forEach((i, key) => {
            shortcuts.push({
              text: key,
              onClick(picker) {
                picker.$emit('pick', i);
              },
            });
          });
        }
        return shortcuts.length > 0 ? { shortcuts } : null;
      },

    },

    methods: {
      changeTime() {
        let val = dateFormula(this.timeModel)
        console.log(val, 'input');
        this.$emit('input', val);
        this.$emit('change', val);
      },
    },
  };
</script>

<style lang="scss">
  .ns-biz-time-select {
    .el-date-editor .el-range-separator {
      height: 32px;
      line-height: 32px;
    }
  }
</style>
