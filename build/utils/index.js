/**
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * dateFormat("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateFormat("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @returns {*}
 */
var dateFormat = function (fmt) {
  const date = new Date();
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


/**
 * tips message
 * @param author
 */
exports.tips = function (author) {
  return `/*
 * Those files is auto gererated by build/build-components-entry.js in every components files
 * author: ${author}
 * created: ${dateFormat('yyyy-MM-dd')}.
 * copyright (c) ${dateFormat('yyyy')} Broccoli spring( gcx )
 * == eslint-disable ==
 */`;
};

/**
 * 将 Date 转化为指定格式的String
 * @type {function(*=): *}
 */
exports.dateFormat = dateFormat;


/**
 * cssLoaders
 * @param options   接受一个options参数，参数还有的属性：sourceMap、usePostCSS。
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  //是否需要补全css代码的兼容性前缀配置，需要的话把 postcssLoader 注入
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  /**
   * 生成加载器 - generate loader string to be used with extract text plugin
   * @param loader                loader 的名称
   * @param loaderOptions         loader 的配置项
   * @returns {*}
   */
  function generateLoaders(loader, loaderOptions) {
    const loaders = [];

    /*----------------------------------------------------------------------------------------*/
    /*  Extract CSS when that option is specified (which is the case during production build) */
    /*  是否需要分离出js中的css代码,然后分别进行打包                                               */
    /*  此项目中，development 时不分离， production 时 分离                                      */
    /*----------------------------------------------------------------------------------------*/
    if (options.extract) {
      loaders.push(MiniCssExtractPlugin.loader)
    } else {
      loaders.push('vue-style-loader')
    }

    loaders.push(cssLoader);

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    //注入loader的相关配置
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    //sass-resources-loader 在webpack4中暂时无更新，故而无法使用
    const sassResources = config.base ? config.base.sassResources : [];
    if (sassResources.length !== 0 && loader === 'sass') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: sassResources
        }
      })
    }
    return loaders
  }

  /**
   * judge use modifyVars or not
   * @param type
   * @returns {*}
   */
  function useModifyVars(type) {
    try {
      const themeConfig = config.base.themeConfig;
      if (themeConfig.type === type) {
        return themeConfig.switch ? {modifyVars: themeConfig.theme} : {}
      }
      else {
        return {}
      }
    }
    catch (e) {
      return {}
    }
  }

  /**
   * 同时，它返回一个对象，其中包含了css预编译器(less、sass、stylus)loader生成方法等,
   * 如果你的文档明确只需要一门css语言，那么可以稍微清楚一些语言，同时可以减少npm包的大小(毕竟这是一个令人烦躁的东西)
   */
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', useModifyVars('less')),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};

/**
 * styleLoaders
 * Generate loaders for standalone style files (outside of .vue)
 * 该方法只是根据cssLoaders中的方法配置，生成不同loaders。然后将其返回。
 * @param options
 * @returns {Array}
 */
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
};


exports.NumbertoLen2String = (n) => {
  if (n.toString().length === 1) {
    return '0' + n.toString();
  }
  else {
    return n;
  }
};

exports.sysdate = function () {
  const myDate = new Date();
  return myDate.getFullYear() + "-" + this.NumbertoLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.NumbertoLen2String(myDate.getDate())
    + " " + this.NumbertoLen2String(myDate.getHours()) + ":" + this.NumbertoLen2String(myDate.getMinutes()) + ":" + this.NumbertoLen2String(myDate.getSeconds())
};
