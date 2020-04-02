<template>
  <ul v-bind:class="[`${recls()} first-nav noselect`, { hasVirtualNode: hasVirtualNode }]">
    <li
      v-for="(firstitem, firstIndex) in data"
      :index="firstitem[keyRefer.menuIndex]"
      :key="firstitem[keyRefer.menuIndex]"
      v-bind:class="[
        'first-nav-items',
        { ishover: ishover && firstitem[keyRefer.menuIndex] - 1 === control.state.firstHoverNow },
        { 'first-nav-active': firstitem[keyRefer.menuIndex] - 1 === control.state.firstActiveNow },
      ]"
      @mouseenter="navMouseEnter(firstitem, $event)"
      @mouseleave="navMouseLeave(firstitem)"
      v-if="!firstitem[keyRefer.visible]"
    >
      <div class="first-nav-tit" @click="firstNavClick(firstitem)">
        <div class="oneline-ellipsis">
          <icon-svg
            :icon-class="firstitem[keyRefer.icon] ? firstitem[keyRefer.icon] : ''"
          ></icon-svg>
          <span v-text="firstitem[keyRefer.label]"></span>
          <span class="first-slot">
            <slot name="first-slot" :item="firstitem"></slot>
          </span>
        </div>
      </div>
      <div class="nav-active-mask"></div>
      <ul
        :class="[
          'second-nav',
          'clear',
          { 'is-arrowDec': arrowDec },
          secNavASC ? 'second-nav-ASC' : 'second-nav-DESC',
        ]"
        :style="{ top: second_nav_top, 'max-height': maxSecNavHeight }"
        v-if="firstitem[keyRefer.children] && firstitem[keyRefer.children].length > 0"
      >
        <div class="left fl"></div>
        <div class="right fl">
          <p class="second-nav-tit" v-text="firstitem[keyRefer.label]"></p>
          <div
            class="second-nav-container"
            :style="{ 'max-height': second_nav_container_maxheight }"
          >
            <li
              :class="[
                'second-nav-items',
                {
                  'second-nav-active':
                    firstitem[keyRefer.menuIndex] - 1 === control.state.firstActiveNow &&
                    seconditem[keyRefer.menuIndex] - 1 === control.state.secondActiveNow,
                },
                { 'is-virtual-node': seconditem[keyRefer.isVirtual] },
              ]"
              v-for="(seconditem, secondIndex) in firstitem[keyRefer.children]"
              :index="firstitem[keyRefer.menuIndex] + '-' + seconditem[keyRefer.menuIndex]"
              :key="firstitem[keyRefer.menuIndex] + '-' + seconditem[keyRefer.menuIndex]"
              v-if="!seconditem[keyRefer.visible]"
            >
              <!--虚拟节点 - 假的二级菜单节点 - 临时方案后续删除-->
              <a class="nav-link oneline-ellipsis" v-if="seconditem[keyRefer.isVirtual]">
                {{ seconditem[keyRefer.label] }}
              </a>
              <!--正常节点显示-->
              <a
                v-if="!seconditem[keyRefer.isVirtual]"
                class="nav-link oneline-ellipsis"
                @click="
                  secondNavClick(
                    firstitem,
                    seconditem,
                    firstitem[keyRefer.menuIndex] - 1,
                    seconditem[keyRefer.menuIndex] - 1
                  )
                "
              >
                {{ seconditem[keyRefer.label] }}
                <!--<slot-->
                <!--name="second-slot"-->
                <!--:item="{-->
                <!--firstitem:firstitem,-->
                <!--seconditem:seconditem,-->
                <!--}-->
                <!--">-->
                <!--</slot>-->
              </a>
            </li>
          </div>
        </div>
      </ul>
    </li>
  </ul>
</template>
<script>
import create from '../../../../create/create';
import Navcontrol from '../../control';
import defaultKeyRefer from '../../keyRefer';
import { compute, delaynav } from '../../utils';

export default create({
  name: 'sidebar-collapse',
  data() {
    return {
      control: null,
      activeStore: { first: '', second: '' }, //active index store
      second_nav_top: 0,
      secNavASC: true,
      maxSecNavHeight: null,
      ishover: false,
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    arrowDec: { type: Boolean, default: false }, //二级悬浮框箭头修饰
    jumpByNavEmpty: { type: Boolean, default: true },
    showTimeout: { type: Number, default: 200 },
    hideTimeout: { type: Number, default: 200 },
    hasVirtualNode: { type: Boolean, default: false }, //是否含有虚拟节点 - 用作假的二级分类
    keyRefer: {
      type: Object,
      default() {
        return defaultKeyRefer;
      },
    },
  },
  computed: {
    second_nav_container_maxheight() {
      return parseInt(this.maxSecNavHeight) - 2 - 12 - 40 + 'px';
    },
  },
  created() {
    this.control = new Navcontrol({
      state: {
        isCollapse: false,
        firstActiveNow: 1,
        secondActiveNow: 0,
        secondNavTop: 0,
        secondNavASC: true,
      },
    });
  },
  methods: {
    //set collapse status for nav-list
    navcollapse() {
      const collapse = this.control.state.isCollapse;
      this.control.setCollapse(!collapse);
    },

    /**
     * first nav click handle
     * @param item
     */
    firstNavClick(item) {
      const firstindex = item[this.keyRefer.menuIndex] - 1;

      if (
        (!item[this.keyRefer.children] || item[this.keyRefer.children].length === 0) &&
        this.jumpByNavEmpty
      ) {
        //set acitev of first nav
        this.control.setFirstActive(firstindex);
      }

      this.$emit('first-nav-click', item, firstindex);
    },

    /**
     * link to router web ,and set funcId
     * @param firstItem
     * @param secondItem
     * @param firstaIndex
     * @param secondIndex
     */
    secondNavClick(firstItem, secondItem, firstaIndex, secondIndex) {
      //set acitev of first nav
      this.control.setFirstActive(firstaIndex);
      //set acitev of second nav
      this.control.setSecondActive(secondIndex);
      //set first active to active-store
      this.activeStore.first = firstaIndex;
      //set second active to active-store
      this.activeStore.second = secondIndex;

      this.$emit('second-nav-click', firstItem, secondItem, firstaIndex, secondIndex);
    },

    /**
     * nav mouse enter
     * @param item
     * @param event
     */
    navMouseEnter(item, event) {
      const index = item[this.keyRefer.menuIndex] - 1;
      //set hover of first nav
      this.control.setFirstHover(index);

      compute(event, this);

      delaynav(
        () => {
          this.ishover = false;
          this.ishover = true;
        },
        this.showTimeout,
        this
      );

      this.$emit('mouse-enter', index, item);
    },

    /**
     * nav mouse leave
     * @param item
     */
    navMouseLeave(item) {
      delaynav(
        () => {
          this.ishover = false;
        },
        this.hideTimeout,
        this
      );
      this.$emit('mouse-leave', item[this.keyRefer.menuIndex] - 1, item);
    },
  },
});
</script>
<style rel="stylesheet/scss" lang="scss">
.first-nav.hasVirtualNode {
  ul.second-nav .right {
    padding-top: 0 !important;
    .second-nav-tit {
      font-size: 16px !important;
      padding-left: 16px !important;
      background-color: #eeeeee;
    }
    li.second-nav-items {
      padding-left: 32px;
      &.is-virtual-node {
        a.nav-link {
          color: #222222 !important;
          text-indent: 8px !important;
          cursor: auto !important;
          font-weight: 600;
        }
        &:hover {
          a.nav-link {
            background-color: transparent !important;
          }
        }
      }
    }
  }
}
</style>
