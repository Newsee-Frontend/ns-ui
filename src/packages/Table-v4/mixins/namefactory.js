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
      // console.log('namefactoryEvent-namefactoryEvent');
      // console.log(column);
      // console.log(column.property);
      // console.log(column.type);
      // console.log('namefactoryEvent-namefactoryEvent');

      return `${type}-${column.property || column.type}-${$rowIndex}-${$columnIndex}`;
    },
  },
};
