export default {
  computed: {},
  created() {
    this.$store.dispatch('generateOptionsDataTemplate', { type: 'options-data-template' });
  },
  mounted() {},
};
