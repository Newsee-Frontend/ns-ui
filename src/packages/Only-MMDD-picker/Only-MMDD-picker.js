import create from '../../create/create';
import datePicker from '../DatePicker/DatePicker';
import { hasClass, removeClass } from '../../utils/library/class-handle';

export default create({
  name: 'onlyMMDD-picker',
  components: { datePicker },
  inheritAttrs: false,
  data() {
    return {
      childOnlyMMDD: this.value,
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [Date, Array, String, Number],
  },
  computed: {
    popperName() {
      return this.recls('popper');
    },
  },

  watch: {
    value(val) {
      this.childOnlyMMDD = val;
    },
  },

  render(h) {
    return h('date-picker', {
      class: {
        ...this.recls(),
      },
      props: {
        ...this.$attrs,
        value: this.childOnlyMMDD,
        type: 'date',
        format: 'MM-dd',
        'value-format': 'MM-dd',
        'popper-class': this.popperName,
      },
      on: {
        input: e => this.handleModel(e),
        change: this.change.bind(this),
        focus: this.onlyMMDDfocus.bind(this),
        blur: this.onlyMMDDblur.bind(this),
      },
    });
  },
  methods: {
    handleModel(e) {
      this.childOnlyMMDD = e;

      /**
       * 绑定值被改变时触发
       * @event input 
       * @property { String } value 双绑的值
       */
      this.$emit('input', this.childOnlyMMDD);
    },

    onlyMMDDfocus() {
      clearTimeout(tt);
      /**
       * 在组件 Input 获得焦点时触发
       * @event focus 
       * @property { String } value 双绑的值
       */
      this.$emit('focus', this.childOnlyMMDD);

      let _addClass = () => {
        let panel = document.querySelector('body .el-picker-panel'); //时间选择器下拉框Dom节点
        if (!panel) return;
        if (!hasClass(panel, this.popperName)) {
          panel.className += ' ' + this.popperName;
        }
      };
      let tt = setTimeout(_addClass, 10);
    },

    onlyMMDDblur() {
      let panel = document.querySelector('body .el-picker-panel');
      if (hasClass(panel, this.popperName)) {
        removeClass(panel, this.popperName);
      }
    },

    change(value) {
      /**
       * 绑定值被改变时触发
       * @event change 
       * @property { String } value 双绑的值
       */
      this.$emit('change', value);
    },
  },
});
