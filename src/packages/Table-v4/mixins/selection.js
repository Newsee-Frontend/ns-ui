export default {
  methods: {
    /**
     * select change in column
     */
    selectChange(
      { selection, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell },
      event
    ) {
      this.$emit(
        'select-change',
        { row, $rowIndex, column, $columnIndex, checked, selection },
        event
      );
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
     * @param type
     * @param rows
     * @param checked
     */
    setSelection(type, rows, checked) {
      if (type === 'checkbox') {
        this.$refs['main-table'].setCheckboxRow(rows, checked);
      } else if (type === 'radio') {
        if (checked) {
          this.$refs['main-table'].setRadioRow(rows);
        } else {
          this.$refs['main-table'].clearRadioRow();
        }
      }
      this.$refs['main-table'].refreshColumn();
    },

    /**
     * set all selection state
     * @param checked
     */
    setAllSelection(checked) {
      this.$refs['main-table'].setAllCheckboxRow(checked);
    },

    /**
     * clear all selection state
     * @param type - checkbox/radio
     */
    clearSelection(type = 'checkbox') {
      if (type === 'checkbox') {
        this.$refs['main-table'].clearSelection();
      } else if (type === 'radio') {
        this.$refs['main-table'].clearCheckboxRow();
      }
    },

    /**
     * radio change in column
     */
    radioChange({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, cell }, event) {
      // console.log('单选事件');
      this.$emit('select-change', { row, $rowIndex, column, $columnIndex }, event);
    },
  },
};
