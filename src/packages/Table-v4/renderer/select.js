import Select from '../../Select/Select';
import { getLabelByValue } from '../utils/index';

export default {
  name: 'ns-table-select',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;
      return [
        <Select
          value={row[modelCode].picked.value}
          onInput={e => {
            row[modelCode].picked.value = e;
            this.$emit('input', e);
          }}
          options={row[modelCode].options}
          width={'100%'}
          editable={false}
          placeholder={formConfig.placeHolder}
          disabled={formConfig.disabled}
          clearable
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode } = editRender.props;
      let data = row[modelCode];
      return getLabelByValue(data.picked.value, data.options);
    },
  },
};
