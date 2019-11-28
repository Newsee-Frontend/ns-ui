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
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          options={formConfig.options}
          disabled={formConfig.disabled}
          min={formConfig.min}
          max={formConfig.max}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode, column } = editRender.props;

      const model = row[modelCode];
      const options = column['cell-Config'].options;

      if (!Array.isArray(model)) {
        return [];
      }

      return model.map(value => {
        return <span>{`${getLabelByValue(value, options)}  `}</span>;
      });
    },
  },
};
