import create from '../../utils/create';

export default create({
  name: 'tab-pane',

  data() {
    return {};
  },
  props: {},

  computed: {},

  watch: {},

  render(h) {
    return (
      <div className={this.recls()}>
        {this.$slots.default}
      </div>
    );
  },

  methods: {},

  created() {
  },

  mounted() {
  },
});
