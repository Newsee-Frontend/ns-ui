/*=====================================================================================================================*/
/*
 * error-message for Vue
 * created: 2017/10/01.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*=====================================================================================================================*/

export default [
  { type: 'lowerCase', complex: false, msg: '请输入小写字母（测试）', ruleReg: /^[a-z]+$/ },
  //数字格式
  { type: 'num', complex: false, msg: '请输入正确的数字格式', ruleReg: /^[0-9.]+$/ },
  //验证邮箱
  {
    type: 'email',
    complex: false,
    msg: '请输入正确的邮箱',
    ruleReg: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  },
];
