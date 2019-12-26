import TimePicker from '../../TimePicker/TimePicker';

export default {
  name: 'table-render-time',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;
      return [
        <TimePicker
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          width={'100%'}
          placeholder={formConfig.placeHolder}
          disabled={formConfig.disabled}
          editable={false}
          format="hh:mm:ss"
          value-format="hh:mm:ss"
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
