export default {
  computed: {
    namefactory() {
      return {
        'cell-class-name': ({ column, $rowIndex, $columnIndex }) =>
          this.namefactoryEvent('cell', { column, $rowIndex, $columnIndex }),
        'header-cell-class-name': ({ column, $rowIndex, $columnIndex }) =>
          this.namefactoryEvent('header', { column, $rowIndex, $columnIndex }),
        'footer-cell-class-name': ({ column, $rowIndex, $columnIndex }) =>
          this.namefactoryEvent('footer', { column, $rowIndex, $columnIndex }),
        'row-class-name': ({ rowIndex }) => `row-${rowIndex}`,
      };
    },
  },
  methods: {
    namefactoryEvent(type, { column, $rowIndex, $columnIndex }) {
      return `${type}-${column.property || column.type}-${$rowIndex}-${$columnIndex}`;
    },
  },
};
