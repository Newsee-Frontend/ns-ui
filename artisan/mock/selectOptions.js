
const options = (req, res) => {
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      list: [
        { label: '北京', value: 1},
        { label: '上海', value: 2},
        { label: '杭州', value: 3},
        ]
    },
  });
};

module.exports = {
  'GET /system/dictionary/list-dictionaryItem': options,
};
