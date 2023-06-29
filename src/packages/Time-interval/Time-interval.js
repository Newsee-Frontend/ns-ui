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
    /**
     * 绑定值
     */
    value: [Object],

    /**
     * 宽度
     */
    width: { type: [String, Number] },

    /**
     *高度 
     */
    height: { type: [String, Number] },

    /**
     * 禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 键值映射
     */
    keyRefer: {
      type: Object,
      default() {
        return defaultKeyRefer;
      },
    },

    /**
     * 时间控件的格式
     */
    timePickerFormat: { type: String, default: 'HH:mm:ss' }, 
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
      <div class={[this.recls(), 'clear']} style={this.convert_style}>
        <Select
          class={'time-interval-part fl'}
          value={this.valueMethods('type')}
          onInput={val => this.inputMethods(val, 'type')}
          options={this.typeOpt}
          size={'mini'}
          placeholder="请选择"
          disabled={this.disabled}
          on-change={this.typeChange}
        ></Select>
        <div class={'time-interval-part fl'}>
          <time-interval-toggle />
        </div>
        <Time-picker
          class={'time-interval-part fl'}
          value={this.valueMethods('time')}
          onInput={val => this.inputMethods(val, 'time')}
          size={'small'}
          placeholder={'任意时间点'}
          format={this.timePickerFormat}
          value-format={this.timePickerFormat}
          disabled={this.disabled}
        ></Time-picker>
      </div>
    );
  },
  methods: {
    typeChange(value) {
      /**
       * 当dataType改变时触发
       * @event change
       * @property { Boolean } value  改变后的dateType值
       */
      this.$emit('change', value);
    },
  },
});
