import Checkbox from '../../Checkbox/Checkbox';
import { getLabelByValue } from '../utils/index';

export default {
  name: 'ns-table-checkbutton',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;
      return [
        <Checkbox
          value={row[modelCode].picked.value}
          onInput={e => {
            row[modelCode].picked.value = e;
            this.$emit('input', e);
          }}
          options={row[modelCode].options}
          disabled={formConfig.disabled}
          min={formConfig.min}
          max={formConfig.max}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode } = editRender.props;
      let data = row[modelCode];

      const model = data.picked.value;

      if (!Array.isArray(model)) {
        return [];
      }

      return model.map(value => {
        return <span>{`${getLabelByValue(value, data.options)}  `}</span>;
      });
    },
  },
};
