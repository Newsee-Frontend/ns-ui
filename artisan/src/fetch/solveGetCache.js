import { getBrowserInfo } from '../utils/library/browser';

export default config => {
  if (config.method === 'get') {
    config.params = Object.assign(config.params || {}, {
      _: new Date().getTime(),
    });
  }
};
