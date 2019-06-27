import create from '../../create/create';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../utils/event';

export default create({
  name: 'slip-dialog',

  props: {
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
    entrPosition: { type: String, default: 'right' }, //入场位置
    left: { type: String, default: '0' },
    right: { type: String, default: '0' },
    top: { type: String, default: '0' },
    bottom: { type: String, default: '0' },
    customClass: { type: String, default: '' },
    domToClose: { type: String, default: 'app' },
    appendToBody: { type: Boolean, default: true },
    closeOnPressEscape: { type: Boolean, default: true },
    beforeClose: Function,
  },

  data() {
    return {
      lastVisible: false,
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
  },

  watch: {
    visible(val) {
      this.lastVisible = this.visible;
      if (val) {
        this.appendDialogToBody();
        this.open();
      } else {
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
      >{
        this.visible ?
          <div
            class={this.recls() + ' ' + this.customClass}
            style={this.wrapperStyle}
            on-click={this.wrapperClick}
          >
            <div class={this.recls('wrapper')} role={'dialog'}>
              {
                this.$slots.default
              }
            </div>
          </div> : null
      }
      </transition>
    );
  },

  methods: {
    appendDialogToBody() {
      if (!this.appendToBody) return;
      document.body.appendChild(this.$el);
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
      this.close();
    },
    wrapperClick(e) {
      stopPropagation(e);
    },
    beforeEnter(el) {
      this.$emit('before-enter', el);
    },
    enter(el) {
      this.$emit('enter', el);
    },
    afterEnter(el) {
      this.$emit('after-enter', el);
    },
    beforeLeave(el) {
      this.$emit('before-leave', el);
    },
    leave(el) {
      this.$emit('leave', el);
    },
    afterLeave(el) {
      this.$emit('after-leave', el);
    },
  },

  created() {
    this.lastVisible = this.visible;
  },
  mounted() {
    //listen drop modules click event
    addEventHandler(this.outerDomTarget, 'click', this.outerClickEvent);
    if (this.visible) {
      this.appendDialogToBody();
    }
  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(this.outerDomTarget, 'click', this.outerClickEvent);
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
});
