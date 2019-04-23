<!--<template>-->
  <!--&lt;!&ndash;nav left&ndash;&gt;-->
  <!--&lt;!&ndash; first nav - list&ndash;&gt;-->
  <!--<ul id="Sidebar" v-bind:class="['first-nav', 'noselect', { iscollapse: sidebar.isCollapse }]">-->
    <!--<div class="nav-collapse" @click="navcollapse">-->
      <!--<ns-icon-svg icon-class="shouqi"></ns-icon-svg>-->
    <!--</div>-->
    <!--<li-->
      <!--v-for="(firstitem, index) in sideBarList"-->
      <!--:index="firstitem[menuIndex]"-->
      <!--:key="firstitem[menuIndex]"-->
      <!--v-bind:class="[-->
        <!--'first-nav-items',-->
        <!--{-->
          <!--'first-nav-active':-->
            <!--sidebar.secState && firstitem[menuIndex] - 1 === sidebar.firstActiveNow,-->
        <!--},-->
      <!--]"-->
    <!--&gt;-->
      <!--<div class="first-nav-tit" @click="firstnavclick(firstitem[menuIndex] - 1)">-->
        <!--<div class="oneline-ellipsis">-->
          <!--<ns-icon-svg :icon-class="firstitem[menuIcon] ? firstitem[menuIcon] : ''"></ns-icon-svg>-->
          <!--<span v-text="firstitem[menuLabel]"></span>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; second nav - list&ndash;&gt;-->
      <!--<ul class="second-nav">-->
        <!--<p class="second-nav-tit" v-text="firstitem[menuLabel]"></p>-->
        <!--<li-->
          <!--v-bind:class="[-->
            <!--'second-nav-items',-->
            <!--{-->
              <!--'second-nav-active':-->
                <!--sidebar.secState && seconditem[menuIndex] - 1 === sidebar.secondActiveNow,-->
            <!--},-->
          <!--]"-->
          <!--v-for="(seconditem, index) in firstitem[childMenus]"-->
          <!--:index="firstitem[menuIndex] + '-' + seconditem[menuIndex]"-->
          <!--:key="firstitem[menuIndex] + '-' + seconditem[menuIndex]"-->
        <!--&gt;-->
          <!--<a-->
            <!--class="nav-link oneline-ellipsis"-->
            <!--v-text="seconditem[menuLabel]"-->
            <!--@click="-->
              <!--linkTo(-->
                <!--'/' + firstitem[menuRouter] + '/' + seconditem[menuRouter],-->
                <!--seconditem[menuIndex] - 1-->
              <!--)-->
            <!--"-->
          <!--&gt;</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</li>-->
  <!--</ul>-->
<!--</template>-->
<!--<script>-->
<!--import ns from '@/utils/nsQuery/nsQuery';-->
<!--import keyRefer from '../../keyRefer';-->
<!--import { mapGetters } from 'vuex';-->
<!--import * as store from '../../../../../utils/nsQuery/nsStore';-->

<!--export default {-->
  <!--name: 'Sidebar',-->
  <!--data() {-->
    <!--return {-->
      <!--funcId: keyRefer['funcId'], //func-ID-->
      <!--menuLabel: keyRefer['menuLabel'], //显示名称-->
      <!--menuRouter: keyRefer['menuRouter'], //路径符号-->
      <!--menuIcon: keyRefer['menuIcon'], //图标-->
      <!--menuIndex: keyRefer['menuIndex'], //序号-->
      <!--childMenus: keyRefer['childMenus'], //子集菜单-->
      <!--activeStore: { first: '', second: '' }, //active index store-->
      <!--navList: [], //all nav data-->
    <!--};-->
  <!--},-->
  <!--computed: {-->
    <!--...mapGetters(['sideBarList', 'sidebar']),-->
  <!--},-->
  <!--created() {-->
    <!--//catch status and info by cookie when they existence-->
    <!--this.init();-->
  <!--},-->
  <!--methods: {-->
    <!--/**-->
     <!--* set init side-bar status-->
     <!--*/-->
    <!--init() {-->
      <!--const cinfo = store.currentPageInfo.get();-->
      <!--/*当前页面信息不存在或者为空值的情况下，菜单栏一二级状态值为（undefined），故需要关闭二级侧边栏（不然一级侧边栏不选中，且二级侧边栏显示空内容）*/-->
      <!--cinfo && !ns.base.isEmpty(cinfo) ? store.sideBar.controller('open') : store.sideBar.close();-->
    <!--},-->
    <!--/**-->
     <!--* first nav click handle-->
     <!--* @param index-->
     <!--*/-->
    <!--firstnavclick(index) {-->
      <!--//when click same first nav-->
      <!--if (index === this.sidebar.firstActiveNow) {-->
        <!--//toggle second nav state-->
        <!--store.sideBar.controller('toggle');-->
      <!--} else {-->
        <!--//open second nav-->
        <!--store.sideBar.controller('open');-->
        <!--//set acitev of first nav-->
        <!--store.sideBar.controller('setFirstActive', index);-->
        <!--//toggle second-nav active empty / show-->
        <!--this.toggleSecActiveShow();-->
      <!--}-->
    <!--},-->
    <!--//toggle second-nav active empty / show-->
    <!--toggleSecActiveShow() {-->
      <!--/*当前点击的一级目录为上次点击的二级目录所属的一级目录时，二级目录的active值需要从存储（activeStore）的second字段中读取，-->
        <!--若不是，则清空二级目录active值，以及设置的active的值*/-->
      <!--if (this.activeStore.first === this.sidebar.firstActiveNow) {-->
        <!--store.sideBar.controller('setSecondActive', this.activeStore.second);-->
      <!--} else {-->
        <!--/*-->
         <!--* 点击选择了一级，二级菜单栏，且二级菜单已经显示选中，若再次点击一级菜单栏，这时，为了不显示历史二级菜单栏选中信息，需要清空二级菜单栏选中状态-->
         <!--*  empty acitev of second nav-->
         <!--*/-->
        <!--store.sideBar.controller('setSecondActive', null);-->
      <!--}-->
    <!--},-->
    <!--//set collapse status for nav-list-->
    <!--navcollapse() {-->
      <!--store.sideBar.controller('collapse');-->
      <!--// store.sideBar.collapse();-->
    <!--},-->
    <!--/**-->
     <!--* link to router web ,and set funcId-->
     <!--* @param url-->
     <!--* @param index-->
     <!--*/-->
    <!--linkTo(url, index) {-->
      <!--//set acitev of second nav-->
      <!--store.sideBar.controller('setSecondActive', index);-->
      <!--//set first active to active-store-->
      <!--this.activeStore.first = this.sidebar.firstActiveNow;-->
      <!--//set second active to active-store-->
      <!--this.activeStore.second = index;-->
      <!--//jump-->
      <!--this.$router.push({ path: url });-->
    <!--},-->
  <!--},-->
<!--};-->
<!--</script>-->
<!--<style rel="stylesheet/scss" lang="scss"></style>-->
