import create from '../../create/create';

export default create({
  name: 'step',

  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: '',
    };
  },
  props: {
    /**
     * 标题
     */
    title: String,

    /**
     * 图标
     */
    icon: String,

    /**
     * 描述性文字
     */
    description: String,

    /**
     * 设置当前步骤的状态，不设置则根据 steps 确定状态
     * @values 'wait','process','finish ','error','success'
     */
    status: String,
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : 'wait';
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === 'vertical';
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const {
        isSimple,
        $parent: { space },
      } = this;
      return isSimple ? '' : space;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;

      const space =
        typeof this.space === 'number'
          ? this.space + 'px'
          : this.space
          ? this.space
          : 100 / (len - (this.isCenter ? 0 : 1)) + '%';
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + '%';
      } else {
        style.marginRight = -this.$parent.stepOffset + 'px';
      }

      return style;
    },
  },

  watch: {},

  render(h) {
    let {
      style,
      isSimple,
      space,
      isCenter,
      isLast,
      isVertical,
      icon,
      index,
      currentStatus,
      lineStyle,
      description,
      title,
    } = this;

    let iconSlot,
      stepIcon,
      simpleArrow = null;
    if (icon) {
      iconSlot = <i class={['el-step__icon-inner', icon]} />;
    } else if (!icon && !isSimple) {
      iconSlot = <div class="el-step__icon-inner">{index + 1}</div>;
    }

    if (currentStatus !== 'success' && currentStatus !== 'error') {
      stepIcon = <slot name="icon"> {iconSlot} </slot>;
    } else {
      stepIcon = (
        <i
          class={[
            'el-step__icon-inner',
            'is-status',
            `el-icon-${currentStatus === 'success' ? 'check' : 'close'}`,
          ]}
        />
      );
    }

    if (isSimple) {
      simpleArrow = <div class="el-step__arrow"></div>;
    } else {
      simpleArrow = (
        <div class={['el-step__description', `is-${currentStatus}`]}>
          <slot name="description">{description}</slot>
        </div>
      );
    }

    const header = (
      <div class={['el-step__head', `is-${currentStatus}`]}>
        <div
          class="el-step__line"
          style={isLast ? {} : { marginRight: this.$parent.stepOffset + 'px' }}
        >
          <i class="el-step__line-inner" style={lineStyle} />
        </div>

        <span class={['el-step__icon', `is-${icon ? 'icon' : 'text'}`]}>{stepIcon}</span>
      </div>
    );

    const main = (
      <div class="el-step__main">
        <div class={['el-step__title', `is-${currentStatus}`]} ref="title">
          <slot name="title"> {title}</slot>
        </div>
        {simpleArrow}
      </div>
    );

    return (
      <div
        class={[
          'el-step',
          this.recls(),
          !isSimple && `is-${this.$parent.direction}`,
          isSimple && 'is-simple',
          isLast && !space && !isCenter && 'is-flex',
          isCenter && !isVertical && !isSimple && 'is-center',
        ]}
        style={style}
      >
        {[header, main]}
      </div>
    );
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== 'error') {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }

      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },

    calcProgress(status) {
      let step = 100;
      const style = {};

      style.transitionDelay = 150 * this.index + 'ms';
      if (status === this.$parent.processStatus) {
        step = this.currentStatus !== 'error' ? 0 : 0;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = -150 * this.index + 'ms';
      }

      style.borderWidth = step && !this.isSimple ? '1px' : 0;
      this.$parent.direction === 'vertical'
        ? (style.height = step + '%')
        : (style.width = step + '%');

      this.lineStyle = style;
    },
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.$watch(
        '$parent.processStatus',
        () => {
          const activeIndex = this.$parent.active;
          this.updateStatus(activeIndex);
        },
        { immediate: true }
      );
      unwatch();
    });
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },
});
