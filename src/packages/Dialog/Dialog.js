import create from '../../create/create';

import { sizeValidator } from '../../utils/props/validator';

const _dialogtype = ['normal', 'simple', 'noFooter', 'noHeader'];

export default create({
  name: 'dialog',
  data() {
    return {
      show: false,
      sizeMap: { mini: '300px', small: '500px', normal: '650px', medium: '764px', large: '900px' },
    };
  },
  props: {
    //是否显示 Dialog，支持 .sync 修饰符
    visible: { type: Boolean, default: false },
    'custom-class': { type: String }, //Dialog 的自定义类名
    title: { type: String, default: 'title' }, //Dialog 的标题
    type: {
      type: String, default: 'normal', validator: t => {
        return _dialogtype.includes(t);
      },
    }, //类型（'normal','simple','noFooter','noHeader'）
    autoHeight: { type: Boolean, default: false },//是否自动高度（对话框内容部分由内容撑开)
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    width: { type: String }, //宽度值
    top: { type: String, default: '7%' }, //	Dialog CSS 中的 top 值（仅在 size 不为 full 时有效）

    modal: { type: Boolean, default: true }, //是否需要遮罩层
    isAppendToBody: { type: Boolean, default: true },//Dialog 自身是否插入至 body 元素上
    'lock-scroll': { type: Boolean, default: false }, //是否在 Dialog 出现时将 body 滚动锁定

    'close-on-click-modal': { type: Boolean, default: false }, //是否可以通过点击 modal 关闭 Dialog
    'close-on-press-escape': { type: Boolean, default: false }, //是否可以通过按下 ESC 关闭 Dialog
    'show-close': { type: Boolean, default: true }, //是否显示关闭按钮
    'before-close': { type: Function }, //关闭前的回调，会暂停 Dialog 的关闭

    isfullscreen: { type: Boolean, default: false },
  },
  watch: {
    visible(val) {
      this.show = val;
    },
  },
  computed: {
    //遮罩层是否插入至 body 元素上
    modalAppendToBody(val) {
      return this.isAppendToBody;
    },
    dialogWidth() {
      return this.width || this.sizeMap[this.size];
    },
    dialogClass() {
      const cls = [this.type];

      if (this.autoHeight) {
        cls.push('autoHeight');
      }
      return this.recls(cls);
    },
  },
  render(h) {
    return (
      h(
        `el-dialog`,
        {
          class: this.dialogClass,
          props: {
            'custom-class': this.customClass,
            visible: this.show,
            width: this.dialogWidth,
            top: this.top,
            title: this.title,

            'lock-scroll': this.lockScroll,
            'close-on-click-modal': this.closeOnClickModal,
            'close-on-press-escape': this.closeOnPressEscape,

            modal: this.modal,
            'modal-append-to-body': this.modalAppendToBody,
            'append-to-body': this.isAppendToBody,

            fullscreen: this.isfullscreen,

            'show-close': this.showClose,
            'before-close': this.beforeClose,

          },
          on: {
            'update:visible': value => {
              this.show = value;
            },
            close: this.close,
            open: this.open,
          },
          scopedSlots: {
            default: slots => this.$slots.default,
          },
        }, [
          <span slot={'footer'} class={'dialog-footer'}>
             {this.$slots.footer}
          </span>,
        ],
      )
    );
  },
  methods: {
    //Dialog close emit
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },
    //Dialog open emit
    open() {
      this.$emit('open');
    },
    turnState(state) {
      if (state !== !!state) return;
      this.show = state;
      this.$emit('update:visible', state);
    },
  },
  created() {
    this.show = this.visible;
  },
});
