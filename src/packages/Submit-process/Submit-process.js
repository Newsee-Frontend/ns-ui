import create from '../../create/create';
import Progress from '../Progress/Progress';

export default create({
  name: 'submit-progress',

  components: {
    Progress,
  },

  data() {
    return {
      showProgress: false,
      end: false,
      percentage: 0,
    };
  },
  props: {
    value: Boolean,

    strokeWidth: {
      type: Number,
      default: 18,
    },

    //进度条类型 separator/circle
    type: {
      type: String,
      default: 'line',
    },

    //进度条显示文字内置在进度条内（只在 type=separator 时可用）
    textInside: {
      type: Boolean,
      default: false,
    },
    //进度条背景色（会覆盖 status 状态颜色）
    color: {
      type: [Function, String, Array],
    },
    //环形进度条画布宽度（只在 type=circle 时可用）
    width: {
      type: Number,
      default: 126,
    },
    //是否显示进度条文字内容
    showText: {
      type: Boolean,
      default: true,
    },
  },

  computed: {},

  watch: {
    value(val) {
      val ? this.initStartTick() : this.endsWidth();
    },
  },

  render(h) {
    return (
      <div v-show={this.showProgress} class={[this.recls(), 'el-loading-mask', 'is-fullscreen']}>
        <Progress
          type={this.type}
          color={this.color}
          text-inside={this.textInside}
          stroke-width={this.strokeWidth}
          width={this.width}
          percentage={parseInt(this.percentage)}
          show-text={this.showText}
        ></Progress>
      </div>
    );
  },

  methods: {
    initStartTick: function() {
      this.showProgress = true;
      this.end = false;
      this.percentage = 0;
      this._startTick();
    },

    endsWidth: function() {
      this.end = true;
    },

    //进度条加载
    _startTick: function() {
      let fps = 30;
      let widthInc = 100 / fps;
      let timeSpace = 1000 / fps;
      let that = this;
      let k = 1.02; // 增速比率
      let breakPoint = 70; //临界值
      let leakPoint = 0.3;
      let reStartWidthIncMin = 1;

      function startWidth() {
        if (that.percentage < 100) {
          setTimeout(() => {
            startWidth();
            //外部通知结束, 加快执行完进度条
            if (that.end) {
              widthInc = Math.max(widthInc, reStartWidthIncMin) * k;
            }
            //临界点的情况
            else if (that.percentage + widthInc > breakPoint) {
              widthInc = Math.min(leakPoint, widthInc);
              widthInc /= k;
            }

            that.percentage = Math.min(that.percentage + widthInc, 100);
          }, timeSpace);
        } else {
          that._ended();
        }
      }

      startWidth();
    },

    _ended: function() {
      this.showProgress = false;
    },
  },

  created() {},

  mounted() {},
});
