import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { cryptoCookie } from '../../utils/crypto';
import { oauthlogin } from '../../service/User';

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
      CryptoJS.AES.decrypt(Cookies.get(cookieName), cookieKey).toString(CryptoJS.enc.Utf8),
    )
    : {};
}

const User = {
  state: {
    userinfo: {
      token: +Cookies.get('token'),
      userId: _deCryptoUserInfo().userId,
      userName: _deCryptoUserInfo().userName,
      avatar: _deCryptoUserInfo().avatar,
      userType: _deCryptoUserInfo().userType,
      userPhone: _deCryptoUserInfo().userPhone,
      userSex: _deCryptoUserInfo().userSex,
      theme: _deCryptoUserInfo().theme,
    },
  },
  mutations: {
    //login and set/store - token info
    SET_LOGIN_DATA: (state, data) => {
      Cookies.set('token', data.token, lifetime);

      //user information by login
      state.userinfo.userId = data.userId;
      state.userinfo.userName = data.userName;
      state.userinfo.avatar = data.avatar; //avatar data mock
      state.userinfo.userType = data.userType;
      state.userinfo.userPhone = data.userPhone;
      state.userinfo.userSex = data.userSex;
      state.userinfo.theme = data.theme;

      //cookie store - token info
      cryptoCookie(
        cookieName,
        state.userinfo,
        cookieKey,
        lifetime,
      );
    },
    LOGOUT: () => {
      Cookies.remove('token');
      $store.dispatch('delAllVisitedPages');
      sessionStorage.clear();
      // Cookies.clear();
    },
  },

  actions: {
    oauthlogin({ commit }, query) {
      oauthlogin(query).then(res => {

        const userinfo = res.resultData || [];

        commit('SET_LOGIN_DATA', userinfo);
      });
    },

    LogOut({ commit }) {
      commit('LOGOUT');
    },

  },
};

export default User;
