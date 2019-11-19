export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const info = {};

  if (userAgent.indexOf('Trident') > -1) {
    info.browser = 'IE';

    info.ieVer =
      userAgent.indexOf('rv:11.0') > -1
        ? 11
        : parseInt(userAgent.split(';')[1].replace(' MSIE ', ''));
  } else if (userAgent.indexOf('Chrome') > -1) {
    info.browser = 'Chrome';
  }
  return info;
};
