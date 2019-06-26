/**
 * Create a component with common options
 */
import createBasic from './create-basic';
import '../icons/iconfont.css'
import iconSvg from '../packages/Icon-svg/Icon-svg';
import iconClass from '../packages/Icon-class/Icon-class';
// import Loading from '../loading';
// import Cell from '../cell';
// import CellGroup from '../cell-group';

export default function(sfc) {
  sfc.components = Object.assign(sfc.components || {}, {
    iconSvg,
    iconClass,
    // Loading,
    // Cell,
    // CellGroup
  });

  return createBasic(sfc);
}
