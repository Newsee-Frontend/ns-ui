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
          value={row[modelCode]}
          onInput={e => {
            row[modelCode] = e;
            this.$emit('input', e);
          }}
          options={formConfig.options}
          width={'100%'}
          editable={false}
          placeholder={formConfig.placeHolder}
          disabled={formConfig.disabled}
          clearable
          multiple={formConfig.multiple}
          multiple-limit={formConfig.max}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode, formConfig, column } = editRender.props;

      const model = row[modelCode];
      const options = column['cell-Config'].options;

      if (formConfig.multiple) {
        if (!Array.isArray(model)) {
          return [];
        }

        return model.map(value => {
          return <span>{`${getLabelByValue(value, options)}  `}</span>;
        });
      } else {
        return getLabelByValue(model, options);
      }
    },
  },
};
