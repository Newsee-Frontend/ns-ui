import Cookies from 'js-cookie';

const requestHead = {
  state: {
    base: {
      appId: '07d8737811434732',
      appClientType: 'pc',
      'Set-Cookie': Cookies.get('token'),
    },
  }
};

export default requestHead;
