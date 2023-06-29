import create from '../../create/create';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../utils/library/event';
import { uuid } from '../../utils/uuid';
import delayEvent from '../../utils/library/delay-event';

export default create({
  name: 'slip-dialog',

  props: {
    /**
     * 是否显示Slip-dialog，支持 .sync 修饰符
     */
    visible: { type: Boolean, default: false },

    /**
     * animation type
     * fade普通 --- fade-normal
     * fade上下 --- fade-up-down
     * 滑动-匀速进出 --- slip-linear
     * 滑动-快进慢出 --- slip-rush
     * 滑动-迂回 --- slip-pretend
     * 反弹模式 --- bouncer
     */
    animation: { type: String, default: 'fade-normal' },

    /**
     * 入场位置
     */
    entrPosition: { type: String, default: 'right' },

    /**
     * Slip-dialog距离左侧的距离
     */
    left: { type: String, default: '0' },

    /**
     * Slip-dialog距离右侧的距离
     */
    right: { type: String, default: '0' },

    /**
     * Slip-dialog距离顶部的距离
     */
    top: { type: String, default: '0' },

    /**
     * Slip-dialog距离底部的距离
     */
    bottom: { type: String, default: '0' },

    /**
     * 是否含有遮罩层
     */
    modal: { type: Boolean, default: false },

    /**
     * 遮罩层速率
     */
    modalSpeed: { type: Number, default: 200 },

    /**
     * 是否可以通过点击 modal 关闭
     */
    closeOnClickModal: { type: Boolean, default: true },

    /**
     * 提供dom id  点击可关闭Slip-dialog
     */
    domToClose: { type: String, default: 'app' },

    /**
     * Slip-dialog 自身是否插入至 body 元素上。嵌套的 Slip-dialog 必须指定该属性并赋值为 true
     */
    appendToBody: { type: Boolean, default: true },

    /**
     * 是否可以通过按下 ESC 关闭 Slip-dialog
     */
    closeOnPressEscape: { type: Boolean, default: true },

    /**
     * 关闭前的回调，会暂停 Slip-dialog 的关闭
     */
    beforeClose: { type: Function },
  },

  data() {
    return {
      lastVisible: false,
      allvisible: true,
      activating: false, //动画是否进行中（enter/leave）
    };
  },

  computed: {
    animationName() {
      //fastIn-slowOut fade-in-out fade-normal
      const moveStyle = ['slip-rush', 'slip-linear', 'slip-pretend'];
      if (moveStyle.indexOf(this.animation) === -1) {
        return this.animation;
      }
      return this.animation + '-' + this.entrPosition;
    },
    wrapperStyle() {
      let style = {};
      ['left', 'right', 'top', 'bottom'].forEach(pos => {
        style[pos] = this[pos];
      });
      style['display'] = this.visible ? 'block' : 'none';
      return style;
    },

    outerDomTarget() {
      try {
        const outer = document.getElementById(this.domToClose);

        return outer ? outer : document.body;
      } catch (e) {
        return document.body;
      }
    },

    modalId() {
      return `${this.recls('modal')}-${uuid(5)}`;
    },

    createModalDom() {
      let mask = document.createElement('div');
      mask.setAttribute('id', this.modalId);
      mask.setAttribute('class', this.recls('modal'));
      return mask;
    },

    outerModalTarget() {
      try {
        const outer = document.getElementById(this.modalId);
        return outer ? outer : document.body;
      } catch (e) {
        return document.body;
      }
    },
  },

  watch: {
    visible(val) {
      this.lastVisible = this.visible;
      if (val) {
        this.appendDialogToBody();
        this.appendModalToBody();

        this.open();
      } else {
        delayEvent(this, _ => this.destroyModal(), this.modalSpeed);

        if (typeof this.beforeClose === 'function') {
          this.beforeClose(val);
        }
        this.close();
      }
    },
  },

  render(h) {
    return (
      <transition
        name={this.animationName}
        on-before-enter={this.beforeEnter}
        on-enter={this.enter}
        on-after-enter={this.afterEnter}
        on-before-leave={this.beforeLeave}
        on-leave={this.leave}
        on-after-leave={this.afterLeave}
      >
        {this.visible ? (
          <div
            class={this.recls() + ' ' + (this.modal ? 'is-modal' : '')}
            style={this.wrapperStyle}
            on-click={this.wrapperClick}
          >
            <div class={this.recls('container')} role={'dialog'}>
              {this.$slots.default}
            </div>
          </div>
        ) : null}
      </transition>
    );
  },

  methods: {
    appendDialogToBody() {
      if (!this.appendToBody) return;
      document.body.appendChild(this.$el);
    },
    appendModalToBody() {
      if (!this.modal) return;
      if (document.getElementById(this.modalId)) return;
      document.body.appendChild(this.createModalDom);
    },

    destroyModal() {
      if (!this.modal) return;
      if (!document.getElementById(this.modalId)) return;
      document.body.removeChild(this.createModalDom);
    },

    open() {
      this.$emit('update:visible', true);
    },
    close() {
      this.$emit('update:visible', false);
    },
    outerClickEvent() {
      if (!this.visible) return;
      if (!this.lastVisible) return;
      if (this.activating) return;
      if (!this.closeOnClickModal) return;
      this.close();
    },
    wrapperClick(e) {
      stopPropagation(e);
    },
    beforeEnter(el) {
      this.activating = false;
      /**
       * 在元素被插入到 DOM 之前被触发
       * @event before-enter
       * @property { Object } el node
       */
      this.$emit('before-enter', el);
    },
    enter(el) {
      this.activating = true;
      /**
       * 在元素被插入到 DOM 之后的下一帧被触发
       * @event enter
       * @property { Object } el node
       */
      this.$emit('enter', el);
    },
    afterEnter(el) {
      this.activating = false;
      /**
       * 当进入过渡完成时触发
       * @event after-enter
       * @property { Object } el node
       */
      this.$emit('after-enter', el);
    },
    beforeLeave(el) {
      this.activating = false;
      /**
       * 在 leave 钩子之前触发
       * @event before-leave
       * @property { Object } el node
       */
      this.$emit('before-leave', el);
    },
    leave(el) {
      this.activating = true;
      /**
       * 元素离开时被触发
       * @event leave 
       * @property { Object } el node
       */
      this.$emit('leave', el);
    },
    afterLeave(el) {
      this.activating = false;
      /**
       * 在离开过渡完成、且元素已从 DOM 中移除时触发
       * @event after-leave 
       * @property { Object } el node
       */
      this.$emit('after-leave', el);
    },
  },

  created() {
    this.lastVisible = this.visible;
  },
  mounted() {
    //listen drop modules click event
    addEventHandler(this.outerDomTarget, 'click', this.outerClickEvent);

    if (this.modal && this.closeOnClickModal) {
      addEventHandler(this.outerModalTarget, 'click', this.outerClickEvent);
    }

    if (this.visible) {
      this.appendDialogToBody();
      this.appendModalToBody();
    }
  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(this.outerDomTarget, 'click', this.outerClickEvent);

    if (this.modal && this.closeOnClickModal) {
      removeEventHandler(this.outerModalTarget, 'click', this.outerClickEvent);
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }

    this.destroyModal();

    this.timeout = null;
  },
});
