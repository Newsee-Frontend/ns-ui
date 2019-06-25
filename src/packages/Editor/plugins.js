// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/


/**
 * plugins list ...
 * ================================================================
 * advlist（Advanced List Plugin）：项目编号。toolbar：bullist。
 * autolink：自动加链接。
 * lists：This list plugin normalizes list behavior between browsers. Enable it if you have problems with consistency making lists.
 * link：插入链接。
 * image：插入图片。
 * charmap（Character Map Plugin）：插入特殊符号。
 * print：打印。
 * preview：预览。
 * hr：水平分割线。
 * anchor：插入锚点。
 * pagebreak：分页符。
 * searchreplace：查找替换。
 * wordcount：计算字符数。
 * visualblocks：显示出块级元素。
 * visualchars：显示出隐藏字符。
 * code：源码编辑。
 * fullscreen：全屏显示。
 * insertdatetime：插入时间日期。
 * media：插入视频。
 * nonbreaking：插入字符&nbsp;。
 * save：提交表单。
 * table：插入表格。
 * contextmenu：右键菜单。设置：contextmenu。
 * directionality：文字方向。toolbar：ltr rtl。
 * emoticons：表情。
 * template：插入模板。
 * paste：粘贴。
 * textcolor：文本颜色，固定的。toolbar: forecolor backcolor。
 * colorpicker：选择颜色。
 * textpattern：类似于支持markdown的语法，自动生成相应的html标签。
 * ================================================================
 * @type {*[]}
 */
const usePlugins = [
  'advlist ' +
  'print ' +
  'save ' +
  'autolink ' +
  'autosave ' +
  'contextmenu ' +
  'fullscreen ' +
  'code ' +
  'codesample ' +
  'colorpicker ' +
  'textcolor ' +
  'emoticons ' +
  'link ' +
  'media ' +
  'image ' +
  'insertdatetime ' +
  'noneditable ' +
  'nonbreaking ' +
  'paste ' +
  'preview ' +
  'searchreplace ' +
  'spellchecker ' +
  'tabfocus ' +
  'table ' +
  'template ' +
  'pagebreak ' +
  'anchor ' +
  'textpattern ' +
  'visualblocks ' +
  'visualchars ' +
  'wordcount',

];


const allPlugins = [
  'advlist ' +
  'anchor ' +
  'autolink ' +
  'autosave ' +
  'code ' +
  'codesample ' +
  'colorpicker ' +
  'contextmenu ' +
  'directionality ' +
  'emoticons ' +
  'fullscreen ' +
  'hr ' +
  'image ' +
  'imagetools ' +
  'insertdatetime ' +
  'link ' +
  'lists ' +
  'media ' +
  'nonbreaking ' +
  'noneditable ' +
  'pagebreak ' +
  'paste ' +
  'preview ' +
  'print ' +
  'save ' +
  'searchreplace ' +
  'spellchecker ' +
  'tabfocus ' +
  'table ' +
  'template ' +
  'textcolor ' +
  'textpattern ' +
  'visualblocks ' +
  'visualchars ' +
  'wordcount',
];

export default allPlugins;
