export default {
  name: 'table-render-slot',
  render: {
    renderDefault(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, column } = editRender.props;
      let { events } = editRender;
      const value = row[modelCode];
      const formatter = column.formatter;

      // return [<span>123123</span>];
    },
  },
};
