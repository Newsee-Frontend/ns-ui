import $store from '@/store/index';

/**
 * generate route + funic information in tab-views store
 * @returns {{name, path, meta}}
 * @private
 */
let _generateRoute = function(matched) {
  let matchedObj = matched[matched.length - 1];
  // const monitor = _monitor(matchedObj);  // object agents
  return { name: matchedObj.name, path: matchedObj.path, meta: matchedObj.meta };
};

/**
 * add tab
 */
export function addPageTabs(matched) {
  $store.dispatch('addVisitedPages', _generateRoute(matched));
}
