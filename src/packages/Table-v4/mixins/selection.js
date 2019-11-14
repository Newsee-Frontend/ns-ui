export default {
  methods: {
    /**
     * select change in column
     */
    selectChange(
      { selection, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell },
      event
    ) {
      this.$emit('select-change', { checked, row, $rowIndex, column, $columnIndex }, event);
    },

    /**
     * all select change in column
     */
    selectAll({ selection, checked }, event) {
      if (!checked) {
        this.$refs['main-table'].clearSelection();
      }
      this.$emit('select-all', { selection, checked }, event);
    },

    /**
     * set selection state
     * @param rows
     * @param checked
     */
    setSelection(rows, checked) {
      this.$refs['main-table'].setSelection(rows, checked);
      this.$refs['main-table'].refreshColumn();
    },

    /**
     * set all selection state
     * @param checked
     */
    setAllSelection(checked) {
      this.$refs['main-table'].setAllSelection(checked);
    },

    /**
     * clear all selection state
     */
    clearSelection() {
      this.$refs['main-table'].clearSelection();
    },
  },
};
