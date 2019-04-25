<template>
  <ul v-bind:class="['first-nav', 'noselect', { iscollapse: control.state.isCollapse }]">
    <div class="nav-collapse" @click="navcollapse">
      <ns-icon-svg icon-class="shouqi"></ns-icon-svg>
    </div>
    <li
      v-for="(firstitem, firstIndex) in data"
      :index="firstitem[keyRefer.menuIndex]"
      :key="firstitem[keyRefer.menuIndex]"
      v-bind:class="[
        'first-nav-items',
        { 'first-nav-active': firstitem[keyRefer.menuIndex] - 1 === control.state.firstActiveNow },
      ]"
      @mouseenter="navMouseEnter(firstitem[keyRefer.menuIndex] - 1, $event)"
      @mouseleave="navMouseLeave(firstitem[keyRefer.menuIndex] - 1)"
    >
      <div class="first-nav-tit" @click="firstNavClick(firstitem)">
        <div class="oneline-ellipsis">
          <icon-svg
            :icon-class="firstitem[keyRefer.menuIcon] ? firstitem[keyRefer.menuIcon] : ''"
          ></icon-svg>
          <span v-text="firstitem[keyRefer.menuLabel]"></span>
        </div>
      </div>
      <ul
        :class="[
          'second-nav',
          { 'is-arrowDec': arrowDec },
          secNavASC ? 'second-nav-ASC' : 'second-nav-DESC',
        ]"
        :style="{ top: second_nav_top, 'max-height': maxSecNavHeight }"
        v-if="firstitem[keyRefer.childMenus] && firstitem[keyRefer.childMenus].length > 0"
      >
        <div class="nav-active-mask"></div>
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
            >
              <a
                class="nav-link oneline-ellipsis"
                v-text="seconditem[keyRefer.menuLabel]"
                @click="
                  linkTo(
                    '/' + firstitem[keyRefer.menuRouter] + '/' + seconditem[keyRefer.menuRouter],
                    firstitem[keyRefer.menuIndex] - 1,
                    seconditem[keyRefer.menuIndex] - 1
                  )
                "
              ></a>
            </li>
          </div>
        </div>
      </ul>
    </li>
  </ul>
</template>
<script>
import iconSvg from '../../../Icon-svg/Icon-svg';
import Navcontrol from '../../control';
import { compute, delaynav } from '../../utils';

export default {
  name: 'sidebar-bubble',
  components: { iconSvg },
  data() {
    return {
      control: null,
      activeStore: { first: '', second: '' }, //active index store
      second_nav_top: 0,
      secNavASC: true,
      maxSecNavHeight: null,
    };
  },
  props: {
    data: { type: Array, default: [] },
    arrowDec: { type: Boolean, default: false }, //二级悬浮框箭头修饰
    jumpByNavEmpty: { type: Boolean, default: true },
    showTimeout: { type: Number, default: 200 },
    hideTimeout: { type: Number, default: 200 },
    keyRefer: {
      type: Object,
      default() {
        return {};
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
        firstActiveNow: 0,
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
     * @param index
     */
    firstnavclick(index) {
      this.$emit('first-nav-click', item[this.keyRefer.menuIndex] - 1);
      if (
        (!item[this.keyRefer.childMenus] || item[this.keyRefer.childMenus].length === 0) &&
        this.jumpByNavEmpty
      ) {
        this.$router.push({ path: '/' + item[this.keyRefer.menuRouter] }); //jump
      }
    },
    /**
     * nav mouse enter
     * @param index
     * @param event
     */
    navMouseEnter(index, event) {
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

      this.$emit('mouse-enter', index);
    },

    /**
     * nav mouse leave
     * @param index
     */
    navMouseLeave(index) {
      delaynav(
        this,
        () => {
          this.ishover = false;
        },
        this.hideTimeout
      );
      this.$emit('mouse-leave', index);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
/*@import '../../style/bubble/var';*/
/*@import '../../style/base';*/
/*@import '../../style/bubble/bubble';*/
</style>
