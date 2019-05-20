import { judgeType } from '../../utils';
import keyRefer from './keyRefer';
import Select from '../Select/Select';
import TimePicker from '../TimePicker/TimePicker';
import OnlyMMDDPicker from '../Only-MMDD-picker/Only-MMDD-picker';

import create from '../../create/create';

/**
 * time-interval component - 选择时间频率
 */
export default create({
  name: 'time-interval',
  components: { Select, TimePicker, OnlyMMDDPicker },
  props: {
    value: [Object],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    disabled: { type: Boolean, default: false }, //禁用
  },
  data() {
    return {
      xcxcxc: {
        [keyRefer['type']]: '',
        [keyRefer['mounthAndDay']]: '', //第几个月第几号
        [keyRefer['day']]: '', //当月几号号
        [keyRefer['week']]: '', //星期几
        [keyRefer['time']]: '', //时间
      },
      childInterval: this.value,
      keyRefer: keyRefer,
      //组件model
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
  computed: {
    convert_style() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },
    dateTypeValue() {
      return this.childInterval[keyRefer['type']];
    },

  },

  watch: {
    'childInterval.dateType': {
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
        console.log(3333333333);
        console.log(this.childInterval);
      },
      deep: true,
    },
    value(val) {
      this.childInterval = val;
    },
  },
  render(h) {

    const xxx = () => {
      const t = this.childInterval[keyRefer['type']];
      console.log(12213123123);
      console.log(this.childInterval);
      console.log(keyRefer['type']);
      console.log(t);
      switch (t) {
        //选择星期
        case '每周':
          return (
            <Select
              v-model={this.childInterval[keyRefer['week']]}
              options={this.weekOpt}
              disabled={this.disabled}
              size={this.small}
            >
            </Select>
          );
        case '每月':
          return (
            // 选择月
            <template>
              <Select
                v-model={this.childInterval[keyRefer['day']]}
                options={this.monthOpt}
                disabled={this.disabled}
                size={this.small}
              >
              </Select>
              <p>日</p>
            </template>
          );
        case '每年':
          return (
            // 选择年 => onlyMMDD-Picker
            <Only-MMDD-Picker
              class={'onlyMMDD'}
              v-model={this.childInterval[keyRefer['mounthAndDay']]}
              type="date"
              placeholder="选择日期"
              width="150px"
            ></Only-MMDD-Picker>
          );
      }
    };

    return (
      <div
        class={this.recls()}
        value={this.childInterval}
        onInput={e =>
          this.handleModel(e)
        }
        style={this.convert_style}
      >
        <Select
          class={'time-interval-part firstPart fl'}
          value={this.dateTypeValue}
          onInput={e =>
            this.selectHandleModel(e)
          }
          options={this.typeOpt}
          size={this.small}
          placeholder="请选择"
          disabled={this.disabled}
          on-change={this.typeChange}
        >
        </Select>
        <div class={'time-interval-part secondPart fl'}>
          {xxx()}
        </div>
        <Time-picker
          class={'time-interval-part thirdPart fl'}
          v-model={this.childInterval[keyRefer['time']]}
          placeholder={'任意时间点'}
          format={'HH:mm:ss'}
          value-format={'HH:mm:ss'}
          disabled={this.disabled}
        >
        </Time-picker>
      </div>
    );
  },
  methods: {
    handleModel: function(e) {
      this.childInterval = e;
      this.$emit('input', this.childInterval);
    },
    selectHandleModel: function(e) {
      console.log(22222222222);
      console.log(e);
      this.childInterval[keyRefer['type']] = e;
      console.log(this.childInterval);
      this.$emit('input', this.childInterval[keyRefer['type']]);
      console.log(this.childInterval);
    },

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
      const val = this.childInterval[key];
      if (val || val === 0) {
        return;
      }
      this.$set(this.childInterval, key, init);
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
        delete this.childInterval[key];
      });
    },
    typeChange(value) {
      this.$emit('change', value);
    },
  },
  created() {

  },
});


