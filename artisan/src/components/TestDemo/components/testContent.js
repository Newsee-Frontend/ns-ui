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
        <img src={require('../../../assets/img/logo.png')} /> :
      </div>
    );
  },
  method: {},
};
