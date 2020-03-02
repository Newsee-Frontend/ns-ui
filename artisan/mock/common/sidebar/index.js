import multipleMenuData from './data/multiple';
import secondMenuData from './data/second';


const navmenu = (req, res) => {

  console.log(req.body);
  if (!req.body) return;
  const { type } = req.body;

  let menuList = null;
  if (type === 'multiple') {
    menuList = multipleMenuData;
  }
  else if (type === 'second') {
    menuList = secondMenuData;
  }
  else if (type === 'empty') {
    menuList = [];
  }

  // console.log(req.body);
  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: menuList,
  });
};

module.exports = {
  'POST /system/permission/list-menu': navmenu,
};

