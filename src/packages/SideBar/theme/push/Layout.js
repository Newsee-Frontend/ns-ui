// import Cookies from 'js-cookie';
// import CryptoJS from 'crypto-js';
// import ns from '../../utils/nsQuery/nsQuery';
//
// const lifetime = -1;
// const cookieName = 'layout';
// const cookieKey = 'layoutKey';
//
// /**
//  * deCrypto user-information data in cookie
//  * @returns {{}}
//  * @private
//  */
// function _deCryptoLayout(key, customVal) {
//   if (Cookies.get(cookieName)) {
//     const d = JSON.parse(
//       CryptoJS.AES.decrypt(Cookies.get(cookieName), cookieKey).toString(CryptoJS.enc.Utf8)
//     )[key];
//     return d && d === 0 ? d : customVal;
//   } else {
//     return customVal;
//   }
// }
//
// const layout = {
//   state: {
//     sidebar: {
//       isCollapse: +_deCryptoLayout('isCollapse', false),
//       secState: +_deCryptoLayout('secState', true),
//       firstActiveNow: _deCryptoLayout('firstActiveNow', 0),
//       secondActiveNow: _deCryptoLayout('secondActiveNow', 0),
//       contentfill: +_deCryptoLayout('contentfill', false),
//     },
//   },
//   mutations: {
//     //side bar handle
//     SIDEBARHANDLE: (state, data) => {
//       switch (data.type) {
//         //set collapse  of first nav list
//         case 'collapse':
//           state.sidebar.isCollapse = !state.sidebar.isCollapse;
//           break;
//         //set first nav which is active
//         case 'setFirstActive':
//           state.sidebar.firstActiveNow = data.index;
//           break;
//         //set second nav which is active
//         case 'setSecondActive':
//           state.sidebar.secondActiveNow = data.index;
//           break;
//         //toggle 2st Nav menu list
//         case 'toggle':
//           state.sidebar.secState = !state.sidebar.secState;
//           break;
//         //open 2st Nav menu list
//         case 'open':
//           // Cookies.set('secState', true);
//           state.sidebar.secState = true;
//           break;
//         //close 2st Nav menu list
//         case 'close':
//           // Cookies.set('secState', false);
//           state.sidebar.secState = false;
//           break;
//         default:
//           break;
//       }
//       ns.crypto.cryptoCookie(cookieName, state.sidebar, cookieKey, lifetime);
//     },
//     //right content is fill ( padding ) - toggle
//     CONTENTFILL: (state, data) => {
//       if (data.type === 'open') {
//         state.sidebar.contentfill = true;
//         ns.crypto.cryptoCookie(cookieName, state.sidebar, cookieKey, lifetime);
//       }
//       if (data.type === 'close') {
//         state.sidebar.contentfill = false;
//         ns.crypto.cryptoCookie(cookieName, state.sidebar, cookieKey, lifetime);
//       }
//     },
//   },
//   actions: {
//     sideBarHandle: ({ commit }, data) => {
//       commit('SIDEBARHANDLE', data);
//     },
//     contentfill: ({ commit }, data) => {
//       commit('CONTENTFILL', data);
//     },
//   },
// };
// export default layout;
