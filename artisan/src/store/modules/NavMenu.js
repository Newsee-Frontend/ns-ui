import $store from '../../store/index';
import { navMenuService } from '../../service/NavMenu';
import keyRefer from '../../layout/components/Biz-nav-menu/keyRefer';

/**
 * filter side bar data
 * @param list
 * @returns {*}
 * @private
 */
let _filterMenu = list => {
  const visibleKey = keyRefer['visible'];
  const childrenKey = keyRefer['children'];

  list.forEach(item => {
    item[visibleKey] = item[visibleKey] === '1';
    let childNodes = list[childrenKey];
    if (childNodes && Array.isArray(childNodes)) {
      _filterMenu(childNodes);
    }
  });

  return list;
};


const NavMenu = {
  state: {
    navMenuType: 'multiple',//multiple
    navMenuList: JSON.parse(sessionStorage.getItem('nav')),
  },
  mutations: {
    SET_NAV_MENU_DATA: (state, data) => {
      state.navMenuList = data;
      sessionStorage.setItem('nav', JSON.stringify(data));
    },
    TOGGLE_NAV_MENU_TYPE: (state, data) => {
      state.navMenuType = data;
    },
  },
  actions: {
    generateNavMenu({ commit }, query) {
      navMenuService({ type: query }).then(res => {
        const side = res.resultData || [];

        let navMenuList = _filterMenu(side);

        commit('SET_NAV_MENU_DATA', navMenuList);
      });
    },

    toggleNavMenuType({ commit }, data) {
      commit('TOGGLE_NAV_MENU_TYPE', data);

      //重新请求菜单栏数据
      $store.dispatch('generateNavMenu', data);


    },

  },
};
export default NavMenu;
