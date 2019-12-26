/*
 * ====================================================================================
 * 表格表单取值说明：
 * 1、字典项（内部数据源):
 *      options 取值=> editor-config => options
 *      data 取值 => row=> 对应key
 *
 * 2、非字典项 （外部数据源):
 *      考虑到每行数据不一，且外部数据源插入表头数据中获取较为不易，options 取值放于表数据中
 *      表数据返回格式示例如下：
 *
 *      xxkey：{
 *          picked:{ value: 1 },
 *          options:[ { label: '已审核', value: 1 }, { label: '未审核', value: 0 } ]
 *      }
 *
 *      options 取值=> row => 对应key => options
 *      data 取值 => row=> 对应key => picked => value
 *
 * ====================================================================================
 */

/**
 * 表格表单 model 值转换
 * @param isDictionary 是否为字典项
 * @param code   表格列 code
 * @param row    表格行数据
 * @returns {*}
 */
export const modelCover = (isDictionary, code, row) => {
  if (isDictionary) {
    return row[code];
  } else {
    return row[code].picked.value;
  }
};

/**
 * 表格表单 options 值转换
 * @param isDictionary 是否为字典项
 * @param code   表格列 code
 * @param row    表格行数据
 * @param column 表格列数据
 * @returns {*}
 */
export const optionsCover = (isDictionary, code, row, column) => {
  if (isDictionary) {
    return column['cell-Config'].options;
  } else {
    return row[code].options;
  }
};
