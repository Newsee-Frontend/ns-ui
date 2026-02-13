<template>
  <div class="el-tabs__active-bar" :class="`is-${rootTabs.tabPosition}`" :style="barStyle"></div>
</template>
<script>
import { arrayFind } from '../../../utils/util';
export default {
  name: 'TabBar',

  props: {
    tabs: Array,
  },

  inject: ['rootTabs'],

  computed: {
    barStyle: {
      get() {
        let style = {};
        let offset = 0;
        let tabSize = 0;
        const sizeName =
          ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
        const sizeDir = sizeName === 'width' ? 'x' : 'y';
        const firstUpperCase = str => {
          return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
        };
        this.tabs.every((tab, index) => {
          let $el = arrayFind(
            this.$parent.$refs.tabs || [],
            t => t.id.replace('tab-', '') === tab.paneName
          );
          if (!$el) {
            return false;
          }

          if (!tab.active) {
            offset += $el[`client${firstUpperCase(sizeName)}`];
            return true;
          } else {
            // 使用传入的 activeBarSize 参数设置尺寸
            const activeBarSize = this.rootTabs.activeBarSize || '30px';
            const activeBarSizeNum = parseInt(activeBarSize);
            const tabSize = $el[`client${firstUpperCase(sizeName)}`];

            if (['left', 'right'].indexOf(this.rootTabs.tabPosition) !== -1) {
              // 左右位置：bar是垂直的，宽度 4px，高度 activeBarSize
              style.width = '4px';
              style.height = activeBarSize;
              // 垂直方向居中
              const centerOffset = (tabSize - activeBarSizeNum) / 2;
              if (centerOffset > 0) {
                offset += centerOffset;
              }
            } else {
              // 上下位置：bar是水平的，宽度 activeBarSize，高度 4px
              style.width = activeBarSize;
              style.height = '4px';

              // 直接使用 el-tabs__item 的宽度计算居中
              const itemEl = $el;
              const itemWidth = itemEl.clientWidth;
              const computedStyle = window.getComputedStyle(itemEl);
              const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
              const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

              // 减去 padding 得到文字区域宽度
              const textAreaWidth = itemWidth - paddingLeft - paddingRight;

              // 计算文字在 tab 中的左侧偏移（考虑 padding）
              let textLeftOffset = paddingLeft;

              // 如果文字区域比 bar 宽，需要居中
              if (textAreaWidth > parseInt(activeBarSize)) {
                textLeftOffset += (textAreaWidth - parseInt(activeBarSize)) / 2;
              }

              if (textLeftOffset > 0) {
                offset += textLeftOffset;
              }
            }
            return false;
          }
        });

        const transform = `translate${firstUpperCase(sizeDir)}(${offset}px)`;
        // 不再设置 style[sizeName]，因为已经在 else 分支中设置了固定的宽高
        style.transform = transform;
        style.msTransform = transform;
        style.webkitTransform = transform;

        return style;
      },
    },
  },
};
</script>
