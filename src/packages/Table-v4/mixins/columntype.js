export default {
  data() {
    return {
      normalColInclude: ['text', 'number', 'date', 'select'],
      specialColInclude: ['index', 'checkbox', 'radio'],
      actionColInclude: ['action', 'add-row'],
      settingColInclude: ['setting'],
    };
  },
  computed: {
    specialColumns() {
      return [...this.specialColInclude, ...this.actionColInclude, ...this.settingColInclude];
    },
  },
};
