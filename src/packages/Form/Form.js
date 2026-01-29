import create from '../../create/create';

export default create({
  name: 'form',
  props: {
    /**
     * 表单数据对象
     */
    model: { type: Object },

    /**
     * 表单验证规则
     */
    rules: { type: Object },

    /**
     * 行内表单模式
     */
    inline: { type: Boolean, default: false },

    /**
     * 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     */
    'label-position': { type: String, default: 'right' },

    /**
     * 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
     */
    'label-width': { type: String },

    /**
     * 表单域标签的后缀
     */
    'label-suffix': { type: String },

    /**
     * 是否显示校验错误信息
     */
    'show-message': { type: Boolean, default: true },

    cueType: { type: String, default: 'only-error' },

    /**
     * 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
     */
    disabled: { type: Boolean, default: false },
  },
  computed: {
    fromClass() {
      return this.recls();
    },
  },
  watch: {
    model: {
      handler() {
        this.updateHasValueClass();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initCompatibility();
  },
  updated() {
    this.initCompatibility();
  },
  beforeDestroy() {
    this.cleanupEventListeners();
  },
  render(h) {
    return h(
      'el-form',
      {
        ref: this.fromClass,
        class: [this.fromClass, this.labelPosition + '-form'],
        props: {
          model: this.model,
          rules: this.rules,
          inline: this.inline,
          disabled: this.disabled,
          'label-position': this.labelPosition,
          'label-width': this.labelWidth,
          'label-suffix': this.labelSuffix,
          'show-message': this.showMessage,
        },
      },
      this.$slots.default
    );
  },
  methods: {
    /**
     * 初始化低版本浏览器兼容性
     */
    initCompatibility() {
      this.$nextTick(() => {
        const formEl = this.$refs[this.fromClass];
        if (!formEl) return;

        // 处理 :focus-within 兼容性
        this.handleFocusWithinCompatibility(formEl);

        // 处理 :has() 兼容性
        this.handleHasCompatibility(formEl);
      });
    },

    /**
     * 处理 :focus-within 兼容性
     */
    handleFocusWithinCompatibility(formEl) {
      const formItems = formEl.$el.querySelectorAll('.el-form-item');

      formItems.forEach(item => {
        // 移除旧的事件监听器
        const oldFocusIn = item._focusInHandler;
        const oldFocusOut = item._focusOutHandler;

        if (oldFocusIn) item.removeEventListener('focusin', oldFocusIn);
        if (oldFocusOut) item.removeEventListener('focusout', oldFocusOut);

        // 添加新的事件监听器
        const focusInHandler = (e) => {
          item.classList.add('is-focused');
        };

        const focusOutHandler = (e) => {
          // 检查焦点是否还在表单项内
          if (!item.contains(e.relatedTarget)) {
            item.classList.remove('is-focused');
          }
        };

        item.addEventListener('focusin', focusInHandler);
        item.addEventListener('focusout', focusOutHandler);

        // 保存引用以便后续移除
        item._focusInHandler = focusInHandler;
        item._focusOutHandler = focusOutHandler;
      });
    },

    /**
     * 处理 :has() 兼容性
     */
    handleHasCompatibility(formEl) {
      const formItems = formEl.$el.querySelectorAll('.el-form-item');
      formItems.forEach(item => {
        // 检查是否有 label
        const hasLabel = item.querySelector('.el-form-item__label');
        if (!hasLabel) {
          item.classList.add('no-label');
        } else {
          item.classList.remove('no-label');
        }

        // 检查是否有禁用元素
        const hasDisabled = item.querySelector('.is-disabled');
        if (hasDisabled) {
          item.classList.add('has-disabled');
        } else {
          item.classList.remove('has-disabled');
        }

      });
    },

    /**
     * 根据 model 数据更新 has-value class
     */
    updateHasValueClass() {
      this.$nextTick(() => {
        const formEl = this.$refs[this.fromClass];
        if (!formEl || !this.model) return;

        const formItems = formEl.$el.querySelectorAll('.el-form-item');
        formItems.forEach(item => {
          const labelEl = item.querySelector('.el-form-item__label');
          if (!labelEl) return;

          // 通过 label 的 for 属性或者 form-item 的 prop 获取字段名
          const prop = item.getAttribute('data-prop') || labelEl.getAttribute('for');
          if (!prop) return;

          const value = this.getNestedValue(this.model, prop);
          if (this.hasValue(value)) {
            item.classList.add('has-value');
          } else {
            item.classList.remove('has-value');
          }
        });
      });
    },

    /**
     * 获取嵌套对象的值 (支持 'a.b.c' 格式)
     */
    getNestedValue(obj, path) {
      if (!obj || !path) return undefined;
      return path.split('.').reduce((o, k) => (o || {})[k], obj);
    },

    /**
     * 判断值是否为有效值
     */
    hasValue(value) {
      if (value === null || value === undefined || value === '') return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim() !== '';
      return true;
    },

    /**
     * 清理事件监听器
     */
    cleanupEventListeners() {
      const formEl = this.$refs[this.fromClass];
      if (!formEl) return;

      const formItems = formEl.$el.querySelectorAll('.el-form-item');
      formItems.forEach(item => {
        const oldFocusIn = item._focusInHandler;
        const oldFocusOut = item._focusOutHandler;

        if (oldFocusIn) item.removeEventListener('focusin', oldFocusIn);
        if (oldFocusOut) item.removeEventListener('focusout', oldFocusOut);

        delete item._focusInHandler;
        delete item._focusOutHandler;
      });
    },

    /**
     * @public
     * 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用
     * @param {Function} cb
     */
    validate: function(cb) {
      this.$refs[this.fromClass].validate(cb);
    },

    /**
     * @public
     * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     */
    resetFields: function() {
      this.$refs[this.fromClass].resetFields();
    },

    /**
     * @public
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearValidate: function(props) {
      this.$refs[this.fromClass].clearValidate(props);
    },
  },
});
