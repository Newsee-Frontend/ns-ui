<template>
  <transition
    :name="animationName"
    @after-enter="afterEnter"
    @after-leave="afterLeave"


  >
    <div class="cx-slipDialog" v-show="visible" id="gcxgcx" :style="wrapperStyle" @click="wrapperClick">
      <div class="cx-slipDialog__wrapper"
           v-loading="!slotRender"
           role="dialog"

           :class="[ customClass]"
           ref="dialog"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import Velocity from 'velocity-animate'
  import {addEventHandler, stopPropagation} from './utils';

  // import Popup from './popup';
  // import Migrating from 'element-ui/src/mixins/migrating';
  // import emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'slip-dialog',

    // mixins: [Popup],

    props: {
      visible: {type: Boolean, default: false},
      animation: {type: String, default: 'fade-normal'},//动画 fastIn-slowOut fade-in-out fade-normal
      //入场位置
      entrPosition: {type: String, default: 'right'},

      left: {type: String, default: "0"},
      right: {type: String, default: "0"},
      top: {type: String, default: "0"},
      bottom: {type: String, default: "0"},


      rerender: {
        type: Boolean,
        default: false
      },
      customClass: {
        type: String,
        default: ''
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      beforeClose: Function,
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
    },

    data() {
      return {
        closed: false,
        slotRender: true,
        postionDelMap: {
          'left': 'right',
          'right': 'left',
          'top': 'bottom',
          'bottom': 'top',
        }
      };
    },

    watch: {
      visible(val) {
        console.log('watch - visible');
        console.log(val)
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          if (!this.closed) this.$emit('close');
        }
      }
    },

    computed: {
      animationName() {
        //fastIn-slowOut fade-in-out fade-normal
        const moveStyle = ['fastIn-slowOut', 'slip-in-out'];
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
        console.log('wrapperStyle');
        console.log(style);
        return style;

      }
    },

    methods: {

      close() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose();
        } else {

        }
      },

      //drop modules click event
      OuterClickEvent(e) {
        if (!this.visible) return;
        console.log('OuterClickEvent');
        console.log(this.visible);

        this.$emit('update:visible', false);
      },
      wrapperClick(e) {
        stopPropagation(e);
      },


      afterEnter() {
        console.log('afterEnter');
        this.slotRender = true
      },
      afterLeave() {
        console.log('afterEnter');
        if (this.rerender) {
          this.slotRender = false
        }
      },

    },

    mounted() {
      console.log(this.visible);
      //listen drop modules click event
      addEventHandler(document.body, 'click', this.OuterClickEvent);


      if (this.visible) {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },
    beforeDestroy() {
      //remove event Listener
      document.body.removeEventListener('click', this.OuterClickEvent);
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
