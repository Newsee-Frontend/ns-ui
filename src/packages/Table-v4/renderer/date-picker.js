import DatePicker from '../../DatePicker/DatePicker';
export default {
  name: 'table-render-date',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;
      return [
        <DatePicker
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          type="date"
          width={'100%'}
          placeholder={formConfig.placeHolder}
          disabled={formConfig.disabled}
          editable={false}
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },
    renderCell(h, editRender, { row }) {
      const { modelCode } = editRender.props;
      return row[modelCode];
    },
  },
};
