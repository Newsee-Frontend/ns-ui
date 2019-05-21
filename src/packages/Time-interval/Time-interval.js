import defaultKeyRefer from './keyRefer';
import reInit from './mixins/reInit';
import modelSimple from './mixins/model-simple';
import Select from '../Select/Select';
import TimePicker from '../TimePicker/TimePicker';
import TimeIntervalToggle from './components/Time-interval-toggle';
import create from '../../create/create';

/**
 * time-interval component - 选择时间频率
 */
export default create({
  name: 'time-interval',
  components: { Select, TimePicker, TimeIntervalToggle },
  mixins: [modelSimple, reInit],
  props: {
    value: [Object],
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    disabled: { type: Boolean, default: false }, //禁用
    keyRefer: {
      type: Object, default() {
        return defaultKeyRefer;
      },
    },
  },
  data() {
    return {
      childInterval: this.value,
      typeOpt: [
        { value: 'day', label: '每日' },
        { value: 'week', label: '每周' },
        { value: 'mouth', label: '每月' },
        { value: 'year', label: '每年' },
      ],
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
  },
  watch: {
    value(val) {
      this.childInterval = val;
    },
  },
  render(h) {
    return (
      <div
        class={[this.recls(), 'clear']}
        value={this.childInterval}
        onInput={
          val => {
            this.childInterval = val;
            this.$emit('input', this.childInterval);
          }
        }
        style={this.convert_style}
      >
        <Select
          class={'time-interval-part fl'}
          value={this.valueMethods('type')}
          onInput={val => this.inputMethods(val, 'type')}
          options={this.typeOpt}
          size={'mini'}
          placeholder="请选择"
          disabled={this.disabled}
          on-change={this.typeChange}
        >
        </Select>
        <div class={'time-interval-part fl'}>
          <time-interval-toggle/>
        </div>
        <Time-picker
          class={'time-interval-part fl'}
          value={this.valueMethods('time')}
          onInput={val => this.inputMethods(val, 'time')}
          size={'small'}
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
    typeChange(value) {
      this.$emit('change', value);
    },
  },
});



