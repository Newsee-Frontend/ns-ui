<template>
  <div style="height: 100%">
    <!--多级导航栏-->
    <ns-multiple-navMenu
      :data="navMenuList"
      :keyRefer="keyRefer"
      v-if="navMenuType === 'multiple'"
    >
    </ns-multiple-navMenu>
    <!--二级导航栏-->
    <ns-second-navMenu v-if="navMenuType === 'second'"
                       :type="sidebarType"
                       :data="navMenuList"
                       :jumpByNavEmpty="jumpByNavEmpty"
                       :showTimeout="200"
                       :hideTimeout="200"
                       :keyRefer="keyRefer"
                       @first-nav-click="firstNavClick"
                       @mouse-enter="mouseEnter"
    >
      <template slot="first-slot" slot-scope="scope">
        <ns-icon-svg icon-class="jiantou" v-if="scope.item.menuIndex === 1" style="margin-left: 25px"></ns-icon-svg>
        <!--<span v-if="scope.item.menuIndex === 1" style="margin-left: 25px">=>12312321312312</span>-->
      </template>
      <template slot="second-slot" slot-scope="scope">
        <span v-if="secondNavSlot(scope)">=></span>
      </template>
    </ns-second-navMenu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import keyRefer from './keyRefer';

  export default {
    name: 'Biz-side-menu',
    data() {
      return {
        dialogSw: false,
        dialogTit: '',
        sidebarType: 'collapse', //bubble,collapse
        jumpByNavEmpty: true,
        keyRefer,
      };
    },
    computed: {
      ...mapGetters(['navMenuType', 'navMenuList']),
    },
    methods: {
      /**
       * first nav click handle
       * @param index
       * @param item
       */
      firstNavClick(index, item) {
        // if (index === 0) {
        //   this.jumpByNavEmpty = false;
        // }
        console.log(index, item);
        if (index === 0) {
          this.dialogSw = true;
        }
        else {
          this.dialogSw = false;
        }
      },

      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseEnter(index, item) {
        // console.log('mouseEvent-mouseEvent');
        // console.log(index, item);
      },

      secondNavSlot(scope) {
        const firstitem = scope.item.firstitem;
        const seconditem = scope.item.seconditem;
        if (!firstitem && !firstitem.childMenus && !firstitem.childMenus.length) {
          return false;
        }
        return firstitem.menuIndex === 3 && seconditem.menuIndex === 1;
      },
    },
    created() {
      //发起请求菜单栏
      this.$store.dispatch('generateNavMenu', this.navMenuType);
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .slipDialog-side {
    z-index: 1;
  }
</style>
