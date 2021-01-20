import Input from '../../Input/Input';

export default {
  name: 'table-render-input',
  render: {
    // 可编辑激活模板
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;

      return [
        <Input
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          width={'100%'}
          placeholder={formConfig.placeHolder}
          disabled={formConfig.disabled}
          clearable
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
          on-blur={() => events.blur({ row, column, rowIndex, columnIndex })}
          on-focus={() => events.focus({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },
    // 可编辑显示模板
    renderCell(h, editRender, { row }) {
      const { modelCode } = editRender.props;
      return row[modelCode];
    },
  },
};
