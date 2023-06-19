export default {
  name: 'table-render-link',
  render: {
    renderDefault(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, column } = editRender.props;
      let { events } = editRender;
      let value = row[modelCode];
      const formatter = column.formatter;
      if(formatter){
        if(typeof formatter === 'function'){
          value = formatter(value)
        } else{
          value = formatter[value]
        }
      }

      return [
        <a
          class={'cell-link'}
          on-click={() => events.click({ row, rowIndex, column, columnIndex })}
        >
          {value}
        </a>,
      ];
    },
  },
};
