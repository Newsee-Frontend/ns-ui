export default {
  data() {
    return {
      normalColInclude: ['text', 'number', 'date', 'select'],
      specialColInclude: ['index', 'selection', 'radio'],
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
