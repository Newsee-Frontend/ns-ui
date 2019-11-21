export default {
  name: 'ns-table-link',
  render: {
    renderDefault(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, column } = editRender.props;
      let { events } = editRender;
      return [
        <a
          class={'cell-link'}
          on-click={() => events.click({ row, rowIndex, column, columnIndex })}
        >
          {row[modelCode]}
        </a>,
      ];
    },
  },
};
