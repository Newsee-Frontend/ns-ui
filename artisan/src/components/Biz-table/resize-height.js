import { addEventHandler, removeEventHandler } from '../../utils/event';

export default {
  data() {
    return {
      height: 0,
    };
  },
  props: {
    autoResize: { type: Boolean, default: true }, //表格高度是否自适应窗口变化
    customHeight: { type: Number, default: 300 }, //自定义表格高度
  },
  methods: {
    /**
     * get auto resize height 获取动态计算高度
     */
    getAutoResizeHeight() {
      let containerHeight = this.getClassDomHeight('ns-container-right');
      let searchHeight = this.getClassDomHeight('action-module');
      let paginationHeight = this.getClassDomHeight('biz-pagination');
      return containerHeight - searchHeight - paginationHeight;
    },

    /**
     * getClassDomHeight -获取指定 dom 高度
     * @param className
     */
    getClassDomHeight(className) {
      let domArr = document.getElementsByClassName(className);
      return domArr.length > 0 ? domArr[domArr.length - 1].offsetHeight : 0;
    },
  },
  mounted() {
    //是否需要自适应高度
    if (this.autoResize) {
      this.height = this.getAutoResizeHeight();
      addEventHandler(window, 'resize', () => {
        this.height = this.getAutoResizeHeight();
      });
    } else {
      //需要使用者自行定义高度
      this.height = this.customHeight;
    }
  },
  beforeDestroy() {
    removeEventHandler(window, 'resize');
  },
};
