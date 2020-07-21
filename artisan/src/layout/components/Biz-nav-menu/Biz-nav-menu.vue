<template>
  <div style="height: 100%">
    <!--<a style="color: red" @click="setActive('1')">setActive1</a>-->
    <!--<a style="color: #3eff72" @click="setActive('0-0')">  setActive2</a>-->
    <!--<a style="color: #ff20b5" @click="setActive('0-1-3')">  setActive3</a>-->
    <!--多级导航栏-->
    <ns-multiple-navMenu
      ref="bizSideMenu"
      :data="navMenuList"
      :keyRefer="keyRefer"
      :slotRander="slotRanderFn"
      :defaultExpandedKeys="defaultExpandedKeys"
      :defaultActive="defaultActive"
      closeByLeafClick
      @node-click="nodeClick"
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
                       hasVirtualNode
                       :keyRefer="keyRefer"
                       @first-nav-click="firstNavClick"
                       @second-nav-click="secondNavClick"
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
  import {mapGetters} from 'vuex';
  import keyRefer from './keyRefer';

  export default {
    name: 'Biz-side-menu',
    data() {
      return {
        dialogSw: false,
        dialogTit: '',
        sidebarType: 'collapse', //bubble,collapse
        jumpByNavEmpty: true,
        defaultExpandedKeys: ['0-1', '10-1'],//初始化的展开节点key队列,注意：defaultExpandAll必须为false，才能设置
        defaultActive: '0-0',

        keyRefer,
      };
    },
    computed: {
      ...mapGetters(['navMenuType', 'navMenuList']),
    },
    methods: {
      setActive(key) {
        console.log(this.$refs['bizSideMenu'])
        this.$refs['bizSideMenu'].setActive(key);
      },


      slotRanderFn(h, node) {
        if (
          (node.level === 1 && node.index === 0) ||
          (node.level === 3 && node.index === 0)
        ) {
          return h('ns-icon-svg', {
            'attrs': {
              iconClass: 'jiantou',
            },
            style: {
              'margin-left': '15px',
            },
          });
        }
      },

      nodeClick(node, instance) {
        console.log('nodeClick-nodeClick');
        console.log(node);
        console.log(instance);
      },


      /**
       * first nav click handle
       * @param firstItem
       * @param firstIndex
       */
      firstNavClick(firstItem, firstIndex) {
        // if (index === 0) {
        //   this.jumpByNavEmpty = false;
        // }
        console.log(firstIndex, firstItem);

        if (firstItem === 0) {
          this.dialogSw = true;
        }
        else {
          this.dialogSw = false;
        }

        this.$router.push({path: '/' + firstItem[this.keyRefer.menuRouter]}); //jump
      },

      /**
       * first nav click handle
       * @param firstItem
       * @param secondItem
       * @param firstaIndex
       * @param secondIndex
       */
      secondNavClick(firstItem, secondItem, firstaIndex, secondIndex) {
        console.log(firstItem, secondItem, firstaIndex, secondIndex);

        const url = '/' + firstItem[this.keyRefer.menuRouter] + '/' + secondItem[this.keyRefer.menuRouter];

        //jump
        this.$router.push({path: url});
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
