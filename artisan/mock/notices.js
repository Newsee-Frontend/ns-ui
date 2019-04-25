const getNotices = (req, res) =>
  res.json({
    status: 200,
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: 'notification',
      },
    ],
    message: 'success',
  });

module.exports = {
  'GET /notices': getNotices,
  'GET /xxxggg': getNotices,
};
