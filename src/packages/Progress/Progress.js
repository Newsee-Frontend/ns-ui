import create from '../../create/create';

export default create({
  name: 'progress',
  data() {
    return {};
  },
  props: {
    /**
     * 百分比（必填)
     * @values 0-100
     */
    percentage: {
      type: Number,
      default: 0,
    },

    /**
     * 进度条类型
     * @values 'line','circle','dashboard'
     */
    type: {
      type: String,
      default: 'line',
    },

    /**
     * 进度条的宽度，单位 px
     */
    strokeWidth: {
      type: Number,
      default: 6,
    },

    /**
     * 进度条显示文字内置在进度条内（只在 type=line 时可用）
     */
    textInside: {
      type: Boolean,
      default: false,
    },

    /**
     * 进度条当前状态
     * @values 'success','exception','warning'
     */
    status: {
      type: String,
    },

    /**
     * 进度条背景色（会覆盖 status 状态颜色）
     */
    color: {
      type: [Function, String, Array],
    },

    /**
     * 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
     */
    width: {
      type: Number,
      default: 126,
    },

    /**
     * 是否显示进度条文字内容
     */
    showText: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  watch: {},
  render(h) {
    return (
      <el-progress
        class={this.recls()}
        type={this.type}
        percentage={this.percentage}
        stroke-width={this.strokeWidth}
        text-inside={this.textInside}
        status={this.status}
        color={this.color}
        width={this.width}
        show-text={this.showText}
      ></el-progress>
    );
  },

  methods: {},

  created() {},
});
