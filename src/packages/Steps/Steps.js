import create from '../../create/create';
import Migrating from '../../mixins/migrating';

export default create({
  name: 'steps',

  mixins: [Migrating],

  data() {
    return {
      steps: [],
      stepOffset: 0,
    };
  },
  props: {
    /**
     * 每个 step 的间距，不填写将自适应间距。支持百分比。
     */
    space: [Number, String],

    /**
     * 设置当前激活步骤
     */
    active: Number,

    /**
     * 显示方向
     */
    direction: {
      type: String,
      default: 'horizontal',
    },

    /**
     * 进行居中对齐
     */
    alignCenter: Boolean,

    /**
     * 是否应用简洁风格
     */
    simple: Boolean,

    /**
     * 设置结束步骤的状态
     * @values 'wait','process','finish ','error','success'
     */
    finishStatus: {
      type: String,
      default: 'finish',
    },
  },

  computed: {},

  watch: {
    active(newVal, oldVal) {
      /**
       * 当激活的步骤条改变时触发
       * @event change
       * @property { Number } newVal  改变后的值
       * @property { Number } oldVal  改变前的值
       */
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    },
  },

  render(h) {
    let { simple, direction } = this;
    return (
      <div
        class={[
          'el-steps',
          this.recls(),
          !simple && 'el-steps--' + direction,
          simple && 'el-steps--simple',
        ]}
      >
        {this.$slots.default}
      </div>
    );
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: 'center is removed.',
        },
      };
    },
  },

  created() {},

  mounted() {},
});
