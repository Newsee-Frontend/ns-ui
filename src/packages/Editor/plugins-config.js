export default {
  'editor-image': {
    action: 'https://httpbin.org/post', //图片请求地址
    headers: {}, //请求头
    response: response => {
      return response.files.file;
    },
  },
  'editor-media': {
    accept: '.mp4,.webm,.ogg,.ogv,.mp3,.wav,.m4a,.aac,.mov,.avi,.flv,.mkv,.wmv',
    action: 'https://httpbin.org/post', //图片请求地址
    headers: {}, //请求头
    response: response => {
      return response.files.file;
    },
  },
};
