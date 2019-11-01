export default {
  data() {
    return {
      /*
       * 是否要高亮当前行
       * 只有当首列为radio( firstColType = radio ),时才需要设置高亮当前行，支持显性标识选中项目
       * 随单选状态切换
       */
      highlightCurrentRow: false,
    };
  },
  methods: {
    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param selection
     * @param row
     */
    selectionSelect(selection, row) {
      this.$emit('selection-select', selection, row);
    },

    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param selection
     */
    selectionSelectAll(selection) {
      this.$emit('selection-select-all', selection);
    },

    selectionChange(row, index) {
      this.highlightCurrentRow = true;
      this.$emit('selection-change', row, index);
    },

    /**
     * reset select state
     * @param type  - selection / radio
     * @param rowindex
     * @param selected
     */
    setSelectedRow(type, rowindex, selected) {
      if (parseInt(rowindex) >= this.data.length)
        throw 'the index of selected row should be less than table data length';

      const setobj = this.data[rowindex];

      if (type === 'selection') {
        this.$refs['el-table'].toggleRowSelection(setobj, selected);
      } else if (type === 'radio') {
        if (selected) {
          this.highlightCurrentRow = true;
          this.$refs['el-table'].setCurrentRow(setobj); //set highlight current row
          this.$refs['first-table-column'].setRadioState(rowindex); //set radio state
        } else {
          this.resetSelectState('radio');
        }
      }
    },

    /**
     * reset select state
     * @param type  - selection / radio
     */
    resetSelectState(type) {
      if (type === 'selection') {
        this.$refs['el-table'].clearSelection();
      } else if (type === 'radio') {
        this.highlightCurrentRow = false;
        this.$refs['first-table-column'].setRadioState(null); //remove highlight current row
        this.$refs['el-table'].setCurrentRow(); //remove radio state
      }
    },
  },
};
