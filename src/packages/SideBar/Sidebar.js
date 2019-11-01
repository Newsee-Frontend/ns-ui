import create from '../../create/create';
import sidebarBubble from './theme/bubble/sidebar-bubble';
import sidebarCollapse from './theme/collapse/sidebar-collapse';
// import sidebarPush from './theme/push/sidebar-push';

const _sidetype = ['collapse', 'bubble', 'push'];
export default create({
  name: 'sidebar',

  components: { sidebarCollapse, sidebarBubble },

  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: 'collapse',
      validate: t => {
        return _sidetype.some(t);
      },
    },
    data: { type: Array },
    jumpByNavEmpty: { type: Boolean },
    showTimeout: { type: Number },
    hideTimeout: { type: Number },
    keyRefer: { type: Object },
  },
  computed: {},
  render(h) {
    return h(`sidebar-${this.type}`, {
      props: {
        data: this.data,
        keyRefer: this.keyRefer,
        jumpByNavEmpty: this.jumpByNavEmpty,
        showTimeout: this.showTimeout,
        hideTimeout: this.hideTimeout,
      },
      on: this.$listeners,
      scopedSlots: {
        'first-slot': item => this.$scopedSlots['first-slot'](item),
        // 'second-slot': (item) => this.$scopedSlots['second-slot'](item),
      },
    });
  },
  methods: {},
});
