/**
 * rgba to hax
 * @param color
 * @returns {string}
 */
export const colorRGBtoHex = color => {
  const rgb = color.split(',');
  // console.log(rgb);
  const r = parseInt(rgb[0].split('(')[1]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2].split(')')[0]);

  // console.log(r);
  // console.log(g);
  // console.log(b);

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// 将hex颜色转成rgb
export const colorHexToRgba = (hex, opacity) => {
  const isAlpha = opacity || opacity === 0;
  const RGBA = `${isAlpha ? 'rgba' : 'rgb'}(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
    '0x' + hex.slice(3, 5)
  )},${parseInt('0x' + hex.slice(5, 7))}${isAlpha ? ',' + opacity : ''})`;
  console.log(RGBA);
  return {
    red: parseInt('0x' + hex.slice(1, 3)),
    green: parseInt('0x' + hex.slice(3, 5)),
    blue: parseInt('0x' + hex.slice(5, 7)),
    rgba: RGBA,
  };
};
