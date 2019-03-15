<template>
  <transition
    :name="animationName"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div class="cx-slipDialog"
         v-show="visible"
         :class="[customClass]"
         :style="wrapperStyle"
         @click="wrapperClick"
    >
      <div class="cx-slipDialog__wrapper"
           role="dialog"
           ref="dialog"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import {addEventHandler, stopPropagation} from './utils/utils';

  export default {
    name: 'slip-dialog',

    props: {
      visible: {type: Boolean, default: false},
      animation: {type: String, default: 'fade-normal'},//动画 fastIn-slowOut fade-in-out fade-normal
      entrPosition: {type: String, default: 'right'}, //入场位置
      left: {type: String, default: "0"},
      right: {type: String, default: "0"},
      top: {type: String, default: "0"},
      bottom: {type: String, default: "0"},
      customClass: {type: String, default: ''},
      appendToBody: {type: Boolean, default: true},
      closeOnPressEscape: {type: Boolean, default: true},
      beforeClose: Function,
    },

    data() {
      return {
        lastVisible: false,
      };
    },

    watch: {
      visible(val) {
        console.log('watch-watch');
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
      }
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
        ["left", "right", "top", "bottom"].forEach(pos => {
          style[pos] = this[pos];
        });
        return style;
      }
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
        console.log('outerClickEvent');
        console.log(this.lastVisible);
        if (!this.visible) return;
        if (!this.lastVisible) return;
        console.log('店点击body 执行关闭');
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
      addEventHandler(document.body, 'click', this.outerClickEvent);
      if (this.visible) {
        this.appendDialogToBody();
      }
    },
    beforeDestroy() {
      //remove event Listener
      document.body.removeEventListener('click', this.outerClickEvent);
    },
    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "style/slip-dialog";
</style>
