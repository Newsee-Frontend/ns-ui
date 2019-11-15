import VXETable from 'vxe-table';

import renderer from '../renderer/index.js';

Object.values(renderer).forEach(r => {
  VXETable.renderer.add(r.name, r.render);
});
