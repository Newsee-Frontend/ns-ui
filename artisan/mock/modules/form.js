const optionsDataTemplate = (req, res) => {
  // console.log(req.body);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: [
      { label: '奔驰', value: 1 },
      { label: '宝马', value: 2 },
      { label: '奥迪', value: 3 },
      { label: '保时捷', value: 4 },
      { label: '雷克萨斯', value: 5 },
      { label: '凯迪拉克', value: 6 },
      { label: '沃尔沃', value: 7 },
      { label: '英菲尼迪', value: 8, disabled: true },
    ],
  });
};

module.exports = {
  'POST /form/options-data/template': optionsDataTemplate,
};
