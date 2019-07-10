import create from '../../create/create';
import { addEventHandler, removeEventHandler, stopPropagation } from '../../utils/event';
import { uuid } from '../../utils/uuid';
import delayEvent from '../../utils/delay-event';

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
    model: { type: Boolean, default: false },//是否含有遮罩层
    modelSpeed: { type: Number, default: 200 },//遮罩层速率
    closeOnClickModal: { type: Boolean, default: true },//是否可以通过点击 modal 关闭
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

    modelId() {
      return `${this.recls('model')}-${uuid(5)}`;
    },


    createModelDom() {
      let mask = document.createElement('div');
      mask.setAttribute('id', this.modelId);
      mask.setAttribute('class', this.recls('model'));
      return mask;
    },

    outerModelTarget() {
      try {
        const outer = document.getElementById(this.modelId);
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
        this.appendModelToBody();

        this.open();

      } else {

        delayEvent(this,
          _ => this.destroyModel(),
          this.modelSpeed,
        );


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
            class={this.recls() + ' ' + (this.model ? 'is-model' : '')}
            style={this.wrapperStyle}
            on-click={this.wrapperClick}
          >
            <div class={this.recls('container')} role={'dialog'}>
              {
                this.$slots.default
              }
            </div>
          </div>
          : null
      }
      </transition>
    );
  },

  methods: {
    appendDialogToBody() {
      if (!this.appendToBody) return;
      document.body.appendChild(this.$el);
    },
    appendModelToBody() {
      if (!this.model) return;
      if (document.getElementById(this.modelId)) return;
      document.body.appendChild(this.createModelDom);
    },

    destroyModel() {
      if (!this.model) return;
      if (!document.getElementById(this.modelId)) return;
      document.body.removeChild(this.createModelDom);
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

    if (this.model && this.closeOnClickModal) {
      addEventHandler(this.outerModelTarget, 'click', this.outerClickEvent);
    }

    if (this.visible) {
      this.appendDialogToBody();
      this.appendModelToBody();
    }
  },
  beforeDestroy() {
    //remove event Listener
    removeEventHandler(this.outerDomTarget, 'click', this.outerClickEvent);

    if (this.model && this.closeOnClickModal) {
      removeEventHandler(this.outerModelTarget, 'click', this.outerClickEvent);
    }

  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }

    this.destroyModel();

    this.timeout = null;
  },
});
