import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

/**
 * setCrypto
 * @param val
 * @param key      crypto-password
 * @returns {*}
 */
export const setCrypto = (val, key) => {
  if (!CryptoJS) {
    ns.error.throw('CryptoJS is undefined, you need to load it');
  }
  if (typeof val === 'string' && typeof key === 'string') {
    return CryptoJS.AES.encrypt(val, key);
  } else {
    ns.error.throw('The data format of encrypted content and key should be string，find it.');
  }
};

/**
 * deCrypto
 * @param val
 * @param key      crypto-password
 * @returns {string}
 */
export const deCrypto = (val, key) => {
  if (!CryptoJS) {
    ns.error.throw('CryptoJS is undefined, you need to load it');
  }
  if (typeof key === 'string') {
    return CryptoJS.AES.decrypt(val, key).toString(CryptoJS.enc.Utf8);
  } else {
    ns.error.throw('The decrypt-key should be string，find it.');
  }
};

/**
 * Crypto and set into Cookie
 * @param name        stroe name
 * @param val         stroe value
 * @param key         stroe password
 * @param time        stroe time
 */
export const cryptoCookie = (name, val, key, time) => {
  //get crypto password
  const mi = setCrypto(JSON.stringify(val), key);
  time ? Cookies.set(name, mi, time) : Cookies.set(name, mi);
};

/**
 * deCrypto
 * @param cookieName
 * @param cookieKey         passwoed
 * @returns {{}}
 */
export const deCryptoCookie = (cookieName, cookieKey) => {
  return Cookies.get(cookieName)
    ? JSON.parse(
      CryptoJS.AES.decrypt(Cookies.get(cookieName), cookieKey).toString(CryptoJS.enc.Utf8),
    )
    : {};
};
