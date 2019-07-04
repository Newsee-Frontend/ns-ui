export default {
  'editor-image': {
    action: 'https://httpbin.org/post',//图片请求地址
    headers: {},//请求头
    response: response => {
      return response.files.file;
    },
  },
};
