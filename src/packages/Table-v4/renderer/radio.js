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
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          options={formConfig.options}
          disabled={formConfig.disabled}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode, column } = editRender.props;

      const model = row[modelCode];
      const options = column['cell-Config'].options;

      return getLabelByValue(model, options);
    },
  },
};
