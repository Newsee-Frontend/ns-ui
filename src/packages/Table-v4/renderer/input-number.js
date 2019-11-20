import InputNumber from '../../InputNumber/InputNumber';

export default {
  name: 'ns-table-inputNumber',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;
      return [
        <InputNumber
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          width={'100%'}
          min={formConfig.min}
          max={formConfig.max}
          disabled={formConfig.disabled}
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
