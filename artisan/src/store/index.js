import Vue from 'vue';
import Vuex from 'vuex';

import User from './modules/User';
import Drawer from './modules/Drawer';
import NavMenu from './modules/NavMenu';
import PageTabs from './modules/PageTabs';
import Form from './modules/Form';
import Tree from './modules/Tree';
import Table from './modules/Table';

import RequestHead from './modules/common/RequestHeader';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
    Drawer,
    NavMenu,
    Form,
    Tree,
    Table,
    PageTabs,
    RequestHead,
  },
  getters,
});

export default store;
