import TimeInterval from '../Time-interval';
import OnlyMMDDPicker from '../../Only-MMDD-picker/Only-MMDD-picker';
import Select from '../../Select/Select';
import modelSimple from '../mixins/model-simple';

export default {
  name: 'Time-interval-toggle',
  extends: TimeInterval,
  components: { Select, OnlyMMDDPicker },
  mixins: [modelSimple],
  data() {
    return {
      weekOpt: [
        { value: 'Mon', label: '周一' },
        { value: 'Tue', label: '周二' },
        { value: 'Wed', label: '周三' },
        { value: 'Thu', label: '周四' },
        { value: 'Fri', label: '周五' },
        { value: 'Sat', label: '周六' },
        { value: 'Sun', label: '周日' },
      ],
    };
  },
  computed: {
    parent() {
      let parent = this.$parent;
      while (parent && parent.$options.name === `${this.namespace}time-interval`) {
        parent = parent.$parent;
      }
      if (!parent) throw 'miss parent component ( time-interval )';
      return parent;
    },
    childInterval() {
      return this.parent.childInterval;
    },
    keyRefer() {
      return this.parent.keyRefer;
    },
    toggletype() {
      return this.childInterval[this.keyRefer['type']];
    },
    monthOpt() {
      let marr = [];
      for (let i = 1; i <= 31; i++) {
        marr.push({ value: i, label: i.toString() });
      }
      return marr;
    },
  },
  render(h) {
    const toggletComponents = () => {

      switch (this.toggletype) {
        //选择星期
        case 'week':
          return (
            <Select
              value={this.valueMethods('week')}
              onInput={val => this.inputMethods(val, 'week')}
              options={this.weekOpt}
              disabled={this.parent.disabled}
              size={'small'}
            >
            </Select>
          );
        case 'mouth':
          return (
            // 选择月
            <div>
              <Select
                value={this.valueMethods('day')}
                onInput={val => this.inputMethods(val, 'day')}
                options={this.monthOpt}
                disabled={this.parent.disabled}
                size={'small'}
              >
              </Select>
              <span class={'day'}>日</span>
            </div>
          );
        case 'year':
          return (
            // 选择年 => onlyMMDD-Picker
            <Only-MMDD-Picker
              class={'onlyMMDD'}
              value={this.valueMethods('mounthAndDay')}
              onInput={val => this.inputMethods(val, 'mounthAndDay')}
              type="date"
              placeholder="选择日期"
              disabled={this.parent.disabled}
              size={'small'}
            />
          );
      }
    };

    return (
      toggletComponents()
    );
  },
};
