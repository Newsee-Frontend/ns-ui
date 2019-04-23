const Mock = require('mockjs');
const units = require('./units');

module.exports = {
  api: [
    { id: '1', method: 'post', path: '/test/post', dataFile: 'post.json', describe: 'post-test' },
    { id: '2', method: 'get', path: '/test/get', dataFile: 'get.json', describe: 'get-test' },
    {
      id: '3',
      method: 'post',
      path: '/oauth/login',
      dataFile: 'login.json',
      callback: (rep, res) => {
        const fileMap = {
          0: 'login_male.json',
          1: 'login_female.json',
          2: 'login.json',
        };

        var json = units.getJsonFile(fileMap[rep.body.sex]);
        res.json(Mock.mock(json));
      },
      describe: 'post-other-test',
    },
  ],
};
