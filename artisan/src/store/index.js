import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/User';
import Drawer from './modules/Drawer';
import Sidebar from './modules/Sidebar';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    User,
    Drawer,
    Sidebar,
  },
  getters,
});

export default store;
