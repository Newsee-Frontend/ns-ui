/**
 * Create a component with common options
 */
import namespace from '../utils/namespace';
import createBasic from './create-basic';


import iconSvg from '../packages/Icon-svg/Icon-svg';
// import Loading from '../loading';
// import Cell from '../cell';
// import CellGroup from '../cell-group';

export default function (sfc) {
  sfc.components = Object.assign(sfc.components || {}, {
    iconSvg,
    // Loading,
    // Cell,
    // CellGroup
  });

  return createBasic(sfc);
};
