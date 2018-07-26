/*
 * regular expression validation
 * you can use this form-validation for this project,as an extension script.
 * created: 2017/6/5.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
import {judgeType} from '../index';
import rulesInfo from './rulesInfo'

/**
 * validate rule private
 * @param val
 * @param type          rule type
 * @param ruleInfo      rule information list
 * @returns {*}
 */
export default function validateRule(val, type, ruleInfo) {
  console.log('验证中。。。。');
  console.log(val);
  console.log(type);
  let info = {};
  //if ruleInfo exists, use it directly, otherwise, you need to get the ruleInfo value (search form rules-info).
  if (ruleInfo) {
    info = ruleInfo;
  }
  else {
    //search from rules-information list
    for (let rule of rulesInfo) {
      if (rule.type === type) {
        info = rule;
        break;
      }
    }
  }
  const REG = info.ruleReg;//reg rule
  console.log(REG);
  if (!REG) return true;//如果验证内容规则不存在，则直接抛出验证正确（跳过验证）
  const warmPrompt = info.warmPrompt;//warm prompt message

  /*---------------------
  complex ? = >
      judge is fun?
                  Yes => 1、run _complexValidate method
                  No  => 2、return true
  simple ? = >  validata value base on reg rule
  -----------------------*/
  let ruleStatus = info.complex ?
    judgeType(REG) === 'function' ?
      REG(val, info) : true :
    REG.test(val);
  //throw resault to validate-check
  return ruleStatus;
}



