import config from '../../config/config'

export const sizeValidator = (s) => {
  return config.sizetype.includes(s);
};
