<!--page tabs in business-->
<template>
  <ns-page-tabs
    :data="visitedPages"
    :limit="limit"
    :autoJump="false"
    :activeRule="activeRule"
    @click-view-tabs="clickViewTabs"
    @close-view-tabs="closeViewTabs"
    @close-all-view-tabs="closeAllViewTabs"
  >
  </ns-page-tabs>
</template>
<script>
  import { addPageTabs } from '../../../router/pageTabsData';
  import { mapGetters } from 'vuex';

  export default {
    name: 'biz-page-tabs',
    data() {
      return {
        limit: 6,
        initRouter: '/dashboard',//默认初始路由地址（主页路由地址）
      };
    },
    props: {},
    computed: {
      ...mapGetters(['visitedPages']),
      curPath() {
        return this.$route.path;
      },
    },
    created() {

    },
    methods: {
      /**
       * 点击当前tabs
       * @param tag
       */
      clickViewTabs(tag) {
        console.log(tag);
        this.$router.push({ path: tag.path });
      },
      /**
       * 关闭当前tabs
       * @param view
       */
      closeViewTabs(view) {
        console.log('关闭单个-ViewTabs');
        console.log(view);

        this.$store.dispatch('delVisitedPages', view).then(() => {
          /*
          * 判断删除的标签是否为当前页面标签：
          * 是：=>
          *      判断删除后的标签列表长度是否大于0？
          *             =>大于0则跳转到最后一个标签页面，等于0则回到主页
          *      判断当前页是否为设置初始页
          *             =>不跳转路由，直接忽略，不做操作
          * 否：=>
          *      直接跳回到设定的初始页面
          *
          */
          const l = this.visitedPages.length;

          console.log(l, this.curPath);

          if (this.curPath === view.path) {
            if (this.curPath === this.initRouter) {
              addPageTabs(this.$route.matched);
            }
            this.$router.push({ path: l > 0 ? this.visitedPages[l - 1].path : this.initRouter });
          }
        });
      },
      /**
       * 关闭所有tabs
       * @param views
       */
      closeAllViewTabs(views) {
        console.log('关闭所有-ViewTabs');
        console.log(views);
        this.$store.dispatch('delAllVisitedPages').then(() => {
          /*
         * 判断当前页是否为设置初始页：
         * 是：=>
         *      不跳转路由，想数据列表中插入设置初始页的信息
         * 否：=>
         *      直接跳回到设定的初始页面
         *
         */
          if (this.curPath === this.initRouter) {
            addPageTabs(this.$route.matched);
          }
          this.$router.push({ path: this.initRouter }); //回到主页

        });
      },
      /**
       * 自定义 tabs 的 active 规则
       * @param path   各tabs path 属性
       * @returns {boolean}
       */
      activeRule(path) {
        // console.log('activeRule');
        return path === this.$route.path;
      },

    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
