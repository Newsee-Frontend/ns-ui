<!--time-interval 选择时间频率-->
<template>
  <div class="time-interval" v-model="childTimeInterval" :style="convert_style">
    <!--选择执行频率的类型 （年/月/周/日）-->
    <el-select
      class="time-interval-part firstPart fl"
      v-model="childTimeInterval[keyRefer['type']]"
      size="small"
      placeholder="请选择"
      :disabled="disabled"
      @change="typeChange"
    >
      <el-option
        v-for="item in typeOpt"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!--联动选择-内容切换部分-->
    <div class="time-interval-part secondPart fl">
      <!--选择星期-->
      <el-select
        v-model="childTimeInterval[keyRefer['week']]"
        :disabled="disabled"
        size="small"
        v-if="childTimeInterval[keyRefer['type']] === '每周'"
      >
        <el-option
          v-for="item in weekOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!--选择月-->
      <el-select
        v-model="childTimeInterval[keyRefer['day']]"
        :disabled="disabled"
        size="small"
        v-if="childTimeInterval[keyRefer['type']] === '每月'"
      >
        <el-option
          v-for="item in monthOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <p v-if="childTimeInterval[keyRefer['type']] === '每月'">日</p>
      <!--选择年 => onlyMMDD-Picker-->
      <only-MMDD-Picker
        class="onlyMMDD"
        v-model="childTimeInterval[keyRefer['mounthAndDay']]"
        type="date"
        placeholder="选择日期"
        width="150px"
        v-if="childTimeInterval[keyRefer['type']] === '每年'"
      ></only-MMDD-Picker>
    </div>
    <!--选择时间点-->
    <time-picker
      class="time-interval-part thirdPart fl"
      v-model="childTimeInterval[keyRefer['time']]"
      placeholder="任意时间点"
      format="HH:mm:ss"
      value-format="HH:mm:ss"
      :disabled="disabled"
    >
    </time-picker>
  </div>
</template>
<script>
import timePicker from '../TimePicker/TimePicker';
import onlyMMDDPicker from '../Only-MMDD-picker/Only-MMDD-picker';
import { judgeType } from '../../utils';
import keyRefer from './keyRefer';

import create from '../../create/create';

export default create({
  name: 'time-interval',
  components: { timePicker, onlyMMDDPicker },
  data() {
    return {
      keyRefer: keyRefer,
      //组件model
      childTimeInterval: {
        [keyRefer['type']]: '',
        [keyRefer['mounthAndDay']]: '', //第几个月第几号
        [keyRefer['day']]: '', //当月几号号
        [keyRefer['week']]: '', //星期几
        [keyRefer['time']]: '', //时间
      },
      typeOpt: [
        { value: '每日', label: '每日' },
        { value: '每周', label: '每周' },
        { value: '每月', label: '每月' },
        { value: '每年', label: '每年' },
      ],
      weekOpt: [
        { value: 'Mon', label: '周一' },
        { value: 'Tue', label: '周二' },
        { value: 'Wed', label: '周三' },
        { value: 'Thu', label: '周四' },
        { value: 'Fri', label: '周五' },
        { value: 'Sat', label: '周六' },
        { value: 'Sun', label: '周日' },
      ],
      monthOpt: [],
    };
  },
  created() {
    this.childTimeInterval = this.fatherTimeInterval;
  },
  model: {
    prop: 'fatherTimeInterval',
    event: 'datechange',
  },
  computed: {
    convert_style() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },
  },
  watch: {
    'childTimeInterval.dateType': {
      handler: function(val) {
        switch (val) {
          case '每日':
            this.delProperty([[keyRefer['mounthAndDay']], [keyRefer['day']], [keyRefer['week']]]); //delete property
            break;
          case '每周':
            this.initModel([keyRefer['week']], 'Mon');
            this.delProperty([[keyRefer['mounthAndDay']], [keyRefer['day']]]);
            break;
          case '每月':
            this.createMonthOpt();
            this.initModel([keyRefer['day']], 1);
            this.delProperty([[keyRefer['mounthAndDay']], [keyRefer['week']]]);
            break;
          case '每年':
            this.initModel([keyRefer['mounthAndDay']], '01-01');
            this.delProperty([[keyRefer['day']], [keyRefer['week']]]);
            break;
          default:
            break;
        }
      },
      deep: true,
    },
    childTimeInterval() {
      this.$emit('datechange', this.childTimeInterval);
    },
    fatherTimeInterval() {
      this.childTimeInterval = this.fatherTimeInterval;
    },
  },
  methods: {
    //create month - option
    createMonthOpt() {
      if (this.monthOpt.length > 0) return false;
      for (let i = 1; i <= 31; i++) {
        this.monthOpt.push({ value: i, label: i.toString() });
      }
    },
    /**
     * init model value
     * @param key
     * @param init      init data
     */
    initModel(key, init) {
      const val = this.childTimeInterval[key];
      if (val || val === 0) {
        return;
      }
      this.$set(this.childTimeInterval, key, init);
    },
    /**
     * delete property
     * @param proList
     */
    delProperty(proList) {
      if (judgeType(proList) !== 'array') {
        return;
      }
      proList.forEach(key => {
        delete this.childTimeInterval[key];
      });
    },
    typeChange(value) {
      this.$emit('change', value);
    },
  },
  props: {
    fatherTimeInterval: [Object],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    disabled: { type: Boolean, default: false }, //禁用
  },
});
</script>
