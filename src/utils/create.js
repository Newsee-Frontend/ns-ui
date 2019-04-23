/**
 * Create a component with common options
 */
import namespace from '../utils/namespace';
import createBasic from './create-basic';
// import Icon from '../icon';
// import Loading from '../loading';
// import Cell from '../cell';
// import CellGroup from '../cell-group';

export default function (sfc) {
  sfc.components = Object.assign(sfc.components || {}, {
    // Icon,
    // Loading,
    // Cell,
    // CellGroup
  });

  sfc.methods.p = (name) => namespace(name);

  return createBasic(sfc);
};
