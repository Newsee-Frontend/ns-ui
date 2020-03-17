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
  const labelKey = keyRefer['label'];
  const visibleKey = keyRefer['visible'];
  const indexKey = keyRefer['menuIndex'];
  const childrenKey = keyRefer['children'];
  const isVirtualKey = keyRefer['isVirtual'];
  const virtualLabelKey = keyRefer['virtualLabel'];

  /**
   * 节点递归循环处理
   * 1、显示隐藏字段 => 转换布尔值
   * 2、新增 - 控制是否为虚拟节点
   * 3、若当前节点存在虚拟节点的名称的字段值，则在此节点的上面新增一个虚拟节点（用作假的二级节点，不可操作点击)
   * 显示隐藏字段 => 转换布尔值
   * @param list
   */
  const done = (list) => {
    let inserts = [];
    list.forEach((item, index) => {

      item[visibleKey] = item[visibleKey] === '1';
      item[isVirtualKey] = false;

      const virtualLabe = item[virtualLabelKey];
      if (item[virtualLabelKey]) {
        inserts.push({ index: index, label: virtualLabe });
    }

      item[indexKey] = index + 1;


      if (index === list.length - 1 && inserts.length) {
        inserts.forEach((insert, i) => {

          list.splice(insert.index + i, 0, {
            [labelKey]: insert.label,
            [isVirtualKey]: true,
            [visibleKey]: false,
            [indexKey]: 'virtual-' + (insert.index + i),
          });
        });

      }

      let childNodes = item[childrenKey];

      if (childNodes && childNodes.length > 0) {
        done(childNodes);
      }
    });
  };

  done(list);

  return list;

};


// let virtualHandle = list => {
//   list.forEach(item=>{
//
//   })
// };


const NavMenu = {
  state: {
    navMenuType: 'second',//multiple  / second
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
        const navMenuList = res.resultData || [];

        _filterMenu(navMenuList);

        console.log('处理后的菜单栏数据如下：');
        console.log(navMenuList);

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
