export default {
  name: 'ns-table-link',
  render: {
    renderDefault(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, column } = editRender.props;
      let { events } = editRender;
      const value = row[modelCode];
      const formatter = column.formatter;

      return [
        <a
          class={'cell-link'}
          on-click={() => events.click({ row, rowIndex, column, columnIndex })}
        >
          {formatter ? formatter[value] : value}
        </a>,
      ];
    },
  },
};
