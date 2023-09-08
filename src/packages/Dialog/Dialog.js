import create from '../../create/create';

import { sizeValidator } from '../../utils/props/validator';

const _dialogtype = ['normal', 'simple', 'noFooter', 'noHeader'];

import dialogDrag from './mixins/dialogDrag';

export default create({
  name: 'dialog',

  mixins: [dialogDrag],

  data() {
    return {
      show: false,
      sizeMap: { mini: '300px', small: '500px', normal: '650px', medium: '764px', large: '900px' },

      dialogType: 'normal',  // min
    };
  },
  props: {
    /**
     * 是否显示 Dialog，支持 .sync 修饰符
     */
    visible: { type: Boolean, default: false },

    /**
     * Dialog 的自定义类名
     */
    'custom-class': { type: String },

    /**
     * Dialog 的标题
     */
    title: { type: String, default: 'title' },

    /**
     * 类型 'normal','simple','noFooter'
     * @values
     */
    type: {
      type: String,
      default: 'normal',
      validator: t => {
        return _dialogtype.includes(t);
      },
    },

    /**
     * 是否自动高度（对话框内容部分由内容撑开)
     */
    autoHeight: { type: Boolean, default: false },

    /**
     * 弹窗尺寸
     */
    size: {
      type: String,
      validator: s => sizeValidator(s),
    },

    /**
     * 是否展示最大化 最小化
     */
    maxmin: {
      type: Boolean,
      default: false,
    },


    /**
     * Dialog 的宽度
     */
    width: { type: String }, //宽度值

    /**
     * Dialog CSS 中的 top 值（仅在 size 不为 full 时有效）
     */
    top: { type: String, default: '7%' },

    /**
     * 是否需要遮罩层
     */
    modal: { type: Boolean, default: true },

    /**
     * Dialog 自身是否插入至 body 元素上
     */
    isAppendToBody: { type: Boolean, default: true },

    // 'modal-append-to-body': { type: Boolean, default: true }, //model 遮罩层是否插入至 body 元素上

    /**
     * 是否在 Dialog 出现时将 body 滚动锁定
     */
    'lock-scroll': { type: Boolean, default: true },

    /**
     * 是否可以通过点击 modal 关闭 Dialog
     */
    'close-on-click-modal': { type: Boolean, default: false },

    /**
     * 是否可以通过按下 ESC 关闭 Dialog
     */
    'close-on-press-escape': { type: Boolean, default: false },

    /**
     * 是否显示关闭按钮
     */
    'show-close': { type: Boolean, default: true },

    /**
     * 关闭前的回调，会暂停 Dialog 的关闭
     */
    'before-close': { type: Function },

    /**
     * 是否可拖拉
     */
    draggable: { type: Boolean, default: true },
  },
  watch: {
    visible(val) {
      this.show = val;
      if(val){
        //状态还原
        this.dialogType = 'normal'
      }
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
      const cls = [this.type, this.dialogType];

      if (this.autoHeight) {
        cls.push('autoHeight');
      }
      if(!this.modal){
        cls.push('noModal');
      }
      return this.recls(cls);
    },
  },
  render(h) {
    return h(
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

          'show-close': this.showClose,
          'before-close': this.beforeClose,
        },

        directives: this.draggable ? [{ name: 'dialogDrag', rawName: 'v-dialogDrag',  value: { visible: this.show, maxmin: this.maxmin, dialogWidth: this.dialogWidth} }] : [],

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
      },
      [
        h("span", {
          slot: 'footer',
          class: 'dialog-footer'
        }, [this.$slots.footer]),


        h("div", {
          slot: 'title',
          class: 'dialog-header'
        }, [

          h("span",{
            class: 'el-dialog__title'
          }, [this.$slots.title ? this.$slots.title : this.title]),

          this.maxmin?   h("div",{
            class: ["el-dialog-header_menu",  "el-dialog__headerbtn",  "dialog-header_menu"]
          }, [

            h("i", {
            "class": "el-icon el-icon-minus el-dialog__close",
            "on": {
              "click": this.handlerSize.bind(this, 'minimize')
            }
          }),

            h("i", {
            "on": {
              "click": this.handlerSize.bind(this, '')
            },
              "class": ["el-icon", "el-dialog__close", "icon-maxmin", this.dialogType === 'fullScreen' ? 'el-icon-copy-document' : 'el-icon-full-screen']          })])  : null

        ])
      ]
    );
  },
  /**
   * @slot footer - Dialog 按钮操作区的内容
   * @slot - 默认插槽，Dialog 的内容
   */

  methods: {
    //Dialog close emit
    close() {
      /**
       * Dialog 关闭的回调
       * @event close
       */
      this.$emit('close');
      this.$emit('update:visible', false);

    },
    //Dialog open emit
    open() {
      /**
       * Dialog 打开的回调
       * @event open
       */
      this.$emit('open');
    },
    turnState(state) {
      if (state !== !!state) return;
      this.show = state;
      this.$emit('update:visible', state);
    },


    /**
     * 控制放大缩小
     */
    handlerSize(val){
      if(val){
        this.dialogType = val
        this.$emit('update:visible', false);
        this.dialogType = 'normal'
          this.$emit('minimize');
      }else{
        this.dialogType = this.dialogType === 'normal'? 'fullScreen' : 'normal'
      }

    }
  },
  created() {
    this.show = this.visible;
  },
});
