import i18n from '../utils/i18n';
import recls from '../mixins/recls';
import namespace from '../mixins/namespace';
import * as sizeComputed from '../mixins/size';

const propser = ['size', 'width', 'height'];

export default sfc => {
  let mixinslist = [];

  mixinslist.push(i18n, recls, namespace);

  propser.forEach(prop => {
    if (sfc.props && sfc.props[prop]) {
      mixinslist.push(sizeComputed[prop]);
    }
  });
  return mixinslist;
};
