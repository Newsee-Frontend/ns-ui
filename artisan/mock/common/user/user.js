/**
 * avatar data mock
 * @param baseUrl
 * @returns {string,null}
 * @private
 */
function _avatar_mock(baseUrl) {
  const type = '.jpg-thumb_m2.2_s200.200';
  const random = parseInt(Math.random() * 200);
  const bu = 'http://otaflb4oo.bkt.clouddn.com/mimo/p/avatar/cartoon/avatar';
}


const oauth = (req, res) => {
  console.log(req.body);

  return res.json({
    resultCode: '200',
    resultMsg: '操作成功。',
    restLog: null,
    resultData: {
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjEiLCJpYXQiOjE1MDg0NjMwNTh9.h-qB1AjtoKNv3mdYRuNTup4LEicNP1nG5JWcdGCxRfo',
      userId: 1,
      userName: req.body.username,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      userType: 1,
      userPhone: 18768183457,
      userSex: 1,
      themeColor: '#252836',
    },
  });
};

module.exports = {
  'POST /oauth/oauth/query-user-enterprise': oauth,
};
