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
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
  },

  computed: {},

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  },

  render(h) {
    let { simple, direction } = this;
    return (
      <div
        class={[
          'el-steps',
          this.recls(),
          !simple && 'el-steps--' + direction,
          simple && 'el-steps--simple'
          ]}>
        {this.$slots.default}
      </div>
    )
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },

  created() {
  },

  mounted() {
  },
});
