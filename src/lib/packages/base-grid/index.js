import BaseGrid from './src/base-grid';

/* istanbul ignore next */
BaseGrid.install = function (Vue) {
  Vue.component(BaseGrid.name, BaseGrid);
};

export default BaseGrid;


