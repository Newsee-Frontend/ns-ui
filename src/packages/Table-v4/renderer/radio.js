import Radio from '../../Radio/Radio';
import { getLabelByValue } from '../utils/index';

export default {
  name: 'ns-table-radiobutton',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;

      return [
        <Radio
          value={row[modelCode].picked.value}
          onInput={e => {
            row[modelCode].picked.value = e;
            this.$emit('input', e);
          }}
          options={row[modelCode].options}
          disabled={formConfig.disabled}
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
