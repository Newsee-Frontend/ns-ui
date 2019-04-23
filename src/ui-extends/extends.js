// import {Dialog, Toast} from 'vant'

/**
 * 普通alert弹框
 * @param message
 * @param fn
 */
export default {
  ns: {
    alert: (message, fn) => {
      alert(message)
      // Dialog.alert({
      //   title: '提示',
      //   message
      // }).then(fn)
    }
  },
  alert: (message, fn) => {
    alert('9999999999999999')
    // Dialog.alert({
    //   title: '提示',
    //   message
    // }).then(fn)
  }
}
