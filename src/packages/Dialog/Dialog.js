import create from '../../create/create';

import { sizeValidator } from '../../utils/props/validator';

const _dialogtype = ['normal', 'simple', 'noFooter', 'noHeader', 'autoHeight'];

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
    title: { type: String }, //Dialog 的标题
    type: {
      type: String, default: 'normal', validator: t => {
        return _dialogtype.includes(t);
      },
    }, //类型（'normal','simple','noFooter','noHeader','autoHeight'）
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    width: { type: String }, //宽度值
    top: { type: String, default: '7%' }, //	Dialog CSS 中的 top 值（仅在 size 不为 full 时有效）

    modal: { type: Boolean, default: true }, //是否需要遮罩层
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
    dialogWidth() {
      return this.width || this.sizeMap[this.size];
    },
    // reclass() {
    //   if (this.fullscreen && type === 'autoHeight') {
    //     return this.recls();
    //   }
    //   return this.recls([this.type]);
    // },
  },
  render(h) {
    return (
      <el-dialog
        visible={this.show}
        on-update:visible={val => this.show = val}

        class={this.recls([this.type])}
        width={this.dialogWidth}
        top={this.top}
        title={this.title}

        lock-scroll={this.lockScroll}
        custom-class={this.customClass}
        close-on-click-modal={this.closeOnClickModal}
        close-on-press-escape={this.closeOnPressEscape}

        modal={this.modal}
        modal-append-to-body
        append-to-body
        fullscreen={this.isfullscreen}

        show-close={this.showClose}
        before-close={this.beforeClose}
        on-close={this.close}
        on-open={this.open}
      >
        {
          this.$slots.default
        }
        <span slot={'footer'} class={'dialog-footer'}>
           {this.$slots.footer}
        </span>
      </el-dialog>
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
  },
  created() {
    this.show = this.visible;
  },
});
