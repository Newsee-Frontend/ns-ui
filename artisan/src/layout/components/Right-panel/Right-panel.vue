<!--左侧悬浮侧滑窗口-->
<template>
  <div ref="rightPanel" :class="{show:show}" class="rightPanel-container">
    <div class="rightPanel-background"/>
    <div :class="['rightPanel',{'is-hover':panelHover}]"
         @mouseenter="panelHover=true"
         @mouseleave="panelHover=false">
      <transition name="slide-fade">
        <div class="handle-button"
             :style="{'top':buttonTop+'px'}" @click="show=!show"
        >
          <i class="el-icon-more" v-if="!panelHover"></i>
          <i :class="show?'el-icon-close':'el-icon-setting'" v-if="panelHover"></i>
        </div>
      </transition>
      <div class="rightPanel-items">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  import { addClass, removeClass } from '../../../utils/library/class';

  export default {
    name: 'RightPanel',
    props: {
      clickNotClose: { default: false, type: Boolean },
      buttonTop: { default: 250, type: Number },
    },
    data() {
      return {
        show: false,
        panelHover: false,
      };
    },
    watch: {
      show(value) {
        if (value && !this.clickNotClose) {
          this.addEventClick();
        }
        if (value) {
          addClass(document.body, 'showRightPanel');
        } else {
          removeClass(document.body, 'showRightPanel');
        }
      },
    },

    methods: {
      addEventClick() {
        window.addEventListener('click', this.closeSidebar);
      },
      closeSidebar(evt) {
        const parent = evt.target.closest('.rightPanel');
        if (!parent) {
          this.show = false;
          window.removeEventListener('click', this.closeSidebar);
        }
      },
      insertToBody() {
        const elx = this.$refs.rightPanel;
        const body = document.querySelector('body');
        body.insertBefore(elx, body.firstChild);
      },
    },
    mounted() {
      this.insertToBody();
    },
    beforeDestroy() {
      const elx = this.$refs.rightPanel;
      elx.remove();
    },
  };
</script>

<style>
  .showRightPanel {
    overflow: hidden;
    position: relative;
    width: calc(100% - 15px);
  }
</style>

<style lang="scss" scoped>
  @import "../../../style/public";

  $button-size: 36px;

  .rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
    background: rgba(0, 0, 0, .4);
    z-index: -1;
  }

  .rightPanel {
    position: fixed;
    width: 100%;
    max-width: 140px;
    height: 100vh;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
    transition: all .25s cubic-bezier(.7, .3, .1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 2000;
    &.is-hover {
      .handle-button {
        left: -$button-size;
        width: $button-size;
        font-size: $button-size/2;
        i {
          font-size: $button-size/2;
        }
      }
    }
    .handle-button {
      position: absolute;
      text-align: center;
      border-radius: 6px 0 0 6px !important;
      z-index: 0;
      pointer-events: auto;
      cursor: pointer;
      background-color: $--color-primary;
      color: #fff;
      left: -$button-size/2;
      width: $button-size/2;
      height: $button-size;
      line-height: $button-size;
      font-size: $button-size/3;
      transition: all 200ms ease-in-out;
      i {
        font-size: $button-size/3;
        line-height: $button-size;
      }
    }
  }

  .show {
    transition: all .3s cubic-bezier(.7, .3, .1, 1);

    .rightPanel-background {
      z-index: 1999;
      opacity: 1;
      width: 100%;
      height: 100%;
    }

    .rightPanel {
      transform: translate(0);
    }
  }
</style>
