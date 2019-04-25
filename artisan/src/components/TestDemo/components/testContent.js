export default {
  name: 'testContent',
  data() {
    return {};
  },
  props: {
    item: { type: Object },
  },
  render(h) {
    return (
      <div>
        img-img-img-img
        <img src={require('../../../assets/img/logo.png')} /> :
      </div>
    );
  },
  method: {},
};
