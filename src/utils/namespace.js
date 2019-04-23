import config from '../config/config';

export default function (name) {
  return `${config.namespace}${config.separator}${name}`;
}
