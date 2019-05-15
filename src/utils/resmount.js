import $Var from '../variable';
import { camelize, prefixName } from '.';

/**
 * component resources mounting.
 * @param vue
 * @param component
 * @param opts
 * @param isglobal
 */
export default (vue, component, opts, isglobal = true) => {
  let { name } = component;
  name = prefixName(name, opts, $Var);
  vue.component(name, component);
  if (!isglobal) {
    vue.component(camelize(`-${name}`), component);
  }
  // console.log((isglobal ? '全局' : '局部') + '加载组件');
  // console.log('传入参数', opts);
  // console.log('组件本身', component);
  // console.log('处理后名称');
  // console.log(name);
  // console.log(camelize(`-${name}`));
};
