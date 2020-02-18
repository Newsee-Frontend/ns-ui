<template>
  <ul v-bind:class="`${recls()} first-nav noselect`">
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
      v-if="firstitem[keyRefer.hide]"
    >
      <div class="first-nav-tit" @click="firstNavClick(firstitem)">
        <div class="oneline-ellipsis">
          <icon-svg
            :icon-class="firstitem[keyRefer.menuIcon] ? firstitem[keyRefer.menuIcon] : ''"
          ></icon-svg>
          <span v-text="firstitem[keyRefer.menuLabel]"></span>
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
        v-if="firstitem[keyRefer.childMenus] && firstitem[keyRefer.childMenus].length > 0"
      >
        <div class="left fl"></div>
        <div class="right fl">
          <p class="second-nav-tit" v-text="firstitem[keyRefer.menuLabel]"></p>
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
              ]"
              v-for="(seconditem, secondIndex) in firstitem[keyRefer.childMenus]"
              :index="firstitem[keyRefer.menuIndex] + '-' + seconditem[keyRefer.menuIndex]"
              :key="firstitem[keyRefer.menuIndex] + '-' + seconditem[keyRefer.menuIndex]"
              v-if="seconditem[keyRefer.hide]"
            >
              <a
                class="nav-link oneline-ellipsis"
                @click="
                  linkTo(
                    '/' + firstitem[keyRefer.menuRouter] + '/' + seconditem[keyRefer.menuRouter],
                    firstitem[keyRefer.menuIndex] - 1,
                    seconditem[keyRefer.menuIndex] - 1
                  )
                "
              >
                {{ seconditem[keyRefer.menuLabel] }}
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
     * link to router web ,and set funcId
     * @param url
     * @param firstaIndex
     * @param secondIndex
     */
    linkTo(url, firstaIndex, secondIndex) {
      //set acitev of first nav
      this.control.setFirstActive(firstaIndex);
      //set acitev of second nav
      this.control.setSecondActive(secondIndex);
      //set first active to active-store
      this.activeStore.first = firstaIndex;
      //set second active to active-store
      this.activeStore.second = secondIndex;
      //jump
      this.$router.push({ path: url });
    },
    /**
     * first nav click handle
     * @param item
     */
    firstNavClick(item) {
      const firstindex = item[this.keyRefer.menuIndex] - 1;

      this.$emit('first-nav-click', firstindex, item);
      if (
        (!item[this.keyRefer.childMenus] || item[this.keyRefer.childMenus].length === 0) &&
        this.jumpByNavEmpty
      ) {
        //set acitev of first nav
        this.control.setFirstActive(firstindex);
        this.$router.push({ path: '/' + item[this.keyRefer.menuRouter] }); //jump
      }
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
        this,
        () => {
          this.ishover = false;
          this.ishover = true;
        },
        this.showTimeout
      );

      this.$emit('mouse-enter', index, item);
    },

    /**
     * nav mouse leave
     * @param item
     */
    navMouseLeave(item) {
      delaynav(
        this,
        () => {
          this.ishover = false;
        },
        this.hideTimeout
      );
      this.$emit('mouse-leave', item[this.keyRefer.menuIndex] - 1, item);
    },
  },
});
</script>
<style rel="stylesheet/scss" lang="scss">
/*@import '../../style/collapse/var';*/
/*@import '../../style/base';*/
/*@import '../../style/collapse/collapse';*/
</style>
