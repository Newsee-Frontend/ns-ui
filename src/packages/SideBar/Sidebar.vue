<template>
  <component
    id="Sidebar"
    :class="currentType"
    class="sidebar-container"
    v-bind:is="currentType"
    :data="data"
    :keyRefer="keyRefer"
    :jumpByNavEmpty="jumpByNavEmpty"
    :showTimeout="showTimeout"
    :hideTimeout="hideTimeout"
    @first-nav-click="firstNavClick"
    @mouse-enter="mouseEnter"
    @mouse-leave="mouseLeave"
  >
    <span slot="firstNav0">
      <slot name="firstNav0"></slot>
    </span>
  </component>
</template>
<script>
  import sidebarBubble from './theme/bubble/sidebar-bubble';
  import sidebarCollapse from './theme/collapse/sidebar-collapse';
  // import sidebarPush from './theme/push/sidebar-push';

  export default {
    name: 'sidebar',

    components: {sidebarBubble, sidebarCollapse},

    data() {
      return {};
    },
    props: {
      type: {type: String, default: 'collapse'},//'bubble','push','collapse'
      data: {type: Array},
      jumpByNavEmpty: {type: Boolean},
      showTimeout: {type: Number},
      hideTimeout: {type: Number},
      keyRefer: {
        type: Object, default() {
          return {
            funcId: 'funcId', //func-ID
            menuLabel: 'menuMenuname', //显示名称
            menuRouter: 'menuMenusubname', //路径符号
            menuIcon: 'menuIconcls', //图标
            menuIconRight: 'menuIconRight', //图标
            menuIndex: 'syOrderindex', //序号
            childMenus: 'childMenus', //子集菜单
          }
        }
      },
    },
    computed: {
      currentType() {
        return 'sidebar-' + this.type;
      },
    },
    methods: {
      /**
       * first nav click handle
       * @param index
       * @param item
       */
      firstNavClick(index, item) {
        this.$emit('first-nav-click', index, item)

      },
      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseEnter(index, item) {
        this.$emit('mouse-enter', index, item)
      },
      /**
       * nav mouse event
       * @param index
       * @param item
       */
      mouseLeave(index, item) {
        this.$emit('mouse-leave', index, item)
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
