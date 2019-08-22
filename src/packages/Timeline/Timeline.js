import create from '../../create/create';

export default create({
  name: 'timeline',

  data() {
    return {};
  },
  props: {
    options: { type: Array, default:[] },
    reverse: { type:Boolean, default: true }, //指定节点排序方向，默认为正序
    timestamp: String,
    hideTimestamp: { type:Boolean, default: false },
    placement:  { type:String, default: 'bottom' },
    size: { type: String, default: 'normal' },
    icon: String,//节点图标
    keyRefer: {
      type: Object,
      default: () => ({
        timestamp: 'timestamp',
        active: 'active',
        color: 'color',
        size: 'size'
      })
    }
  },

  computed: {},

  watch: {},

  render(h) {
    const timeLineItemDom = (item, index) => (
      <el-timeline-item
        key={index}
        icon={item.icon}
        placement={this.placement}
        timestamp={item[this.keyRefer.timestamp]}
        type={item[this.keyRefer.active]? 'success' : ''}
        color={item[this.keyRefer.color]}
        hideTimestamp={this.hideTimestamp}
        size={item[this.keyRefer.size] || this.size}
      >
        { this.$scopedSlots.default && this.$scopedSlots.default({
          item
        })}

        { this.$slots.dot? <template slot="dot">
          { this.$slots.dot }
        </template> : null}
      </el-timeline-item>
  )

    return(
      <el-timeline
      class={this.recls()}
      >
        {
          this.options.map((item, index)=>(
            timeLineItemDom(item, index)
          ))
        }
      </el-timeline>
    )
  },

  methods: {},

  created() {
  },

  mounted() {
  },
});
