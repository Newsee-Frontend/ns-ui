import create from '../../create/create';
import { sizeValidator } from '../../utils/props/validator';
import unionBy from 'lodash/unionBy';

export default create({
  name: 'select',

  data() {
    return {
      childSelect: this.getLastChildSelect(this.value),
    };
  },
  props: {
    /**
     * 绑定值
     */
    value: [Array, String, Number],

    /**
     * 是否正在从远程获取数据
     */
    loading: { type: Boolean, default: false },

    /**
     * 选择项
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * 宽度
     */
    width: [String, Number],

    /**
     * 输入框尺寸
     */
    size: { type: String, validator: s => sizeValidator(s) },

    /**
     * 占位符
     */
    placeholder: { type: String, default: null },

    /**
     * select input 的 name 属性
     */
    name: { type: String },

    /**
     * 是否可以清空选项
     */
    clearable: { type: Boolean, default: true },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 是否多选
     */
    multiple: { type: Boolean, default: false },

    /**
     * 多选时用户最多可以选择的项目数，为 0 则不限制
     */
    multipleLimit: { type: Number, default: 0 },

    /**
     * Select 下拉框的类名
     */
    popperClass: { type: String },

    /**
     * 多选时是否将选中值按文字的形式展示
     */
    collapseTags: { type: Boolean, default: false },

    /**
     * 是否可搜索
     */
    filterable: { type: Boolean, default: true },

    /**
     * 自定义搜索方法
     */
    filterMethod: { type: Function, default: null },

    /**
     * 是否为远程搜索
     */
    remote: { type: Boolean, default: false },

    /**
     * 远程搜索方法
     */
    remoteMethod: { type: Function, default: null },

    /**
     * 是否允许用户创建新条目，需配合 filterable 使用
     */
    allowCreate: { type: Boolean, default: false },

    /**
     * 远程加载时显示的文字
     */
    loadingText: { type: String, default: '加载中' },

    /**
     * 搜索条件无匹配时显示的文字
     */
    noMatchText: { type: String, default: '无匹配数据' },

    /**
     * 	在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
     */
    defaultFirstOption: { type: Boolean, default: true },


    /**
     * 	是否展示全选（多选才会有）
     */
    showSelectAll: { type: Boolean, default: false },

    /**
     * 键值映射
     */
    keyRefer: {
      type: Object,
      default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }),
    },
  },

  computed: {
    reClass() {
      return this.recls([this.formsize, this.multiple && !this.collapseTags && 'auto_height']);
    },
    convert_style() {
      return { width: this.convert_width };
    },

    showAll(){
      return this.showSelectAll && this.multiple && this.multipleLimit === 0
    }
  },

  watch: {
    value(val) {
      this.childSelect = this.getLastChildSelect(val);
    },
  },

  render(h) {
    let { label, value } = this.keyRefer;
    // 默认去重，防止报错
    let options = unionBy(this.options, this.keyRefer.value);
    const optionRender = item => {
      return   <el-option
        key={item[value]}
        value={item[value]}
        label={item[label]}
        disabled={item.disabled}
        nativeOnclick={this.clickOption.bind(this, item)}
      ></el-option>

    };
    return (
      <el-select
        class={this.reClass}
        size="small"
        ref="select"
        value={this.childSelect}
        nativeOnKeyup={this.filterKeyUp.bind(this)}
        onInput={e => this.handleModel(e)}
        onChange={this.change.bind(this)}
        onVisible-change={this.visibleChange.bind(this)}
        onRemove-tag={this.removeTag.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onClear={this.onClear.bind(this)}
        disabled={this.disabled}
        clearable={this.clearable}
        multiple={this.multiple}
        multipleLimit={this.multipleLimit}
        popperClass={this.popperClass}
        collapseTags={this.collapseTags}
        filterable={this.filterable}
        filterMethod={this.filterMethod}
        loadingText={this.loadingText}
        noMatchText={this.noMatchText}
        remote={this.remote}
        defaultFirstOption={this.defaultFirstOption}
        remoteMethod={this.remoteMethod}
        allowCreate={this.allowCreate}
        loading={this.loading}
        placeholder={this.placeholder}
        style={this.convert_style}
      >
        { (this.showAll) ? optionRender({ [label]: '全选', [value]: -1}): null}

        {options.map(item => {
          return optionRender(item);
        })}
        <span slot={'default'} class={'select-option-content'}>
          {this.$slots.default}
        </span>
      </el-select>
    );
  },

  methods: {
    /**
     * defaultFirstOption 在多选 输入中文的情况下失效，手动补充方法
     */
    filterKeyUp(e) {
      if (e.code === 'Space' && this.defaultFirstOption && this.multiple) {
        let selectRef = this.$refs.select;
        let { options, query } = selectRef;
        selectRef.hoverIndex =
          options.findIndex(option => option.label && option.label.indexOf(query) > -1) || 0;
      }
    },


    getLastValue(e){
      return this.multiple? (e ||[]).filter(i=> i !== -1) : e
    },

    getLastChildSelect(val){
      if(this.showAll){
        let isAll = this.options.every( item => val.includes(item[this.keyRefer.value]))
        return isAll? [ -1, ...val] : val
      }else{
        return val
      }
    },


    clickOption(item){
      let value = this.keyRefer.value
      if(item[value] !== -1) return
      if(!(this.childSelect || []).includes(-1)){
        this.childSelect = [-1, ...this.options.map(i=> i[value])]
      }else{
        this.childSelect = []
      }
    },

    /**
     * 同步v-model
     * @param e
     */
    handleModel(e) {
      this.childSelect = e;
      this.$emit('input', this.getLastValue(e));
    },

    /**
     * visible-Change （下拉框显示隐藏）
     */
    visibleChange(e) {
      /**
       * 下拉框出现/隐藏时触发
       * @event visible-change
       * @property { Boolean } e  出现则为 true，隐藏则为 false
       */
      this.$emit('visible-change', e);
    },

    removeTag(e) {
      if(e === -1){
        this.$nextTick(()=>{
          this.handleModel([]);
        })
      }

      /**
       * 多选模式下移除tag时触发
       * @event remove-tag
       */
      this.$emit('remove-tag');
    },

    /**
     * select change
     * @param value
     */
    change(value) {
      /**
       * 选中值发生变化时触发
       * @event change
       */
      this.$emit('change', this.getLastValue(value));
    },
    /**
     * on-focus
     */
    onFocus() {
      /**
       * 当 input 获得焦点时触发
       * @event focus
       */
      this.$emit('focus');
    },
    /**
     * on-blur
     */
    onBlur() {
      /**
       * 当 input 失去焦点时触发
       * @event blur
       */
      this.$emit('blur');
    },
    /**
     * 清除事件
     */
    onClear() {
      /**
       * 可清空的单选模式下用户点击清空按钮时触发
       * @event clear
       */
      this.$emit('clear');
    },
  },
});
