import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

import $store from '@/store/index';

const lifetime = 0;
const cookieName = 'userInfo';
const cookieKey = 'userPass';


/**
 * deCrypto user-information data in cookie
 * @returns {{}}
 * @private
 */
function _deCryptoUserInfo() {
  return Cookies.get(cookieName)
    ? JSON.parse(
      CryptoJS.AES.decrypt(Cookies.get(cookieName), cookieKey).toString(CryptoJS.enc.Utf8)
    )
    : {};
}


const User = {
  state: {
    info: {
      token: +Cookies.get('token'),
      loginTime: '',
      maxage: '',
      userId: _deCryptoUserInfo().userId,
      userName: '高仓雄',
      userType: _deCryptoUserInfo().userType,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      userPhone: _deCryptoUserInfo().userPhone,
      userSex: _deCryptoUserInfo().userSex,
      // userAccount: '',
      roles: [],
    },
  },
  mutations: {
    //login and set/store - token info
    LOGIN: (state, data) => {
      window.name = data.userId;
      ns.base.Cookie.set('token', data.token, lifetime);
      //user information by login
      state.info.loginTime = data.loginTime;
      state.info.maxage = data.maxage;
      state.info.userId = data.userId;
      state.info.userName = data.userName;
      state.info.userType = data.userType;
      state.info.userPhone = data.userPhone;
      state.info.userSex = data.userSex;
      state.info.avatar = data.avatar; //avatar data mock

      //cookie store - token info
      ns.crypto.cryptoCookie(
        cookieName,
        {
          loginTime: data.loginTime,
          maxage: data.maxage,
          userId: data.userId,
          userName: data.userName,
          userType: data.userType,
          userPhone: data.userPhone,
          userSex: data.userSex,
          avatar: _avatar_mock(data.avatar),
        },
        cookieKey,
        lifetime
      );
    },
    LOGOUT: () => {
      // ns.base.Cookie.delete('token');
      // ns.base.Cookie.delete(cookieName);
      // ns.base.Cookie.delete('layout');

      $store.dispatch('delAllVisitedViews');
      sessionStorage.clear();
      ns.base.Cookie.clear();
    },
  },

  actions: {
    Login({commit}, data) {
      commit('LOGIN', data);
    },
    LogOut({commit}) {
      commit('LOGOUT');
    },
  },
};

export default User;
