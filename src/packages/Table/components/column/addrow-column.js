export default {
  name: 'addrow-column',
  data() {
    return {};
  },
  props: {
    headRefer: { type: Object },
    scopeRefer: { type: Object },
    headScope: { type: Object },
  },
  computed: {},
  render(h) {
    return (
      h(
        `el-table-column`,
        {
          props: {
            'class-name': `table-head-${this.headScope[this.headRefer['model-code']]}`,
            key: `table-head-${this.headScope[this.headRefer['model-code']]}`,
            width: this.headScope[this.headRefer['width']],
            align: this.headScope[this.headRefer['align']],
            fixed: 'right',
          },
          scopedSlots: {
            'header': scope => {
              return [
                h('i', {
                  class: 'el-icon-circle-plus',
                  on: { click: this.addRow },
                }),
              ];
            },
            default: scope => {
              return [
                h('i', {
                  class: 'el-icon-delete',
                  on: { click: this.deleteCurrentRow(scope.$index, scope.row) },
                }),
              ];
            },
          },
        },
      )
    );
  },
  methods: {
    /**
     * add row to grid
     */
    addRow() {
      this.$emit('add-row');
    },
    /**
     * delete current row
     * @param index
     * @param row
     */
    deleteCurrentRow(index, row) {
      this.$emit('delete-current-row', index, row);
    },
  },
};
