import Select from '../../Select/Select';
import { modelCover, optionsCover } from '../utils/transform';
import { getLabelByValue } from '../utils/index';

export default {
  name: 'table-render-select',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;

      //是否为字典项（内部数据源)
      const isDictionary = column.isDictionary;

      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);

      return [
        <Select
          value={model}
          onInput={e => {
            if (isDictionary) {
              row[modelCode] = e;
            }
            else {
              row[modelCode].picked.value = e;
            }
            this.$emit('input', e);
          }}
          options={options}
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

      const isDictionary = column.isDictionary;
      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);


      if (formConfig.multiple) {
        if (!Array.isArray(model)) {
          return [];
        }

        return model.map(value => {
          return <span>{`${getLabelByValue(value, options)}  `}</span>;
        });
      }
      else {
        return getLabelByValue(model, options);
      }

    },
  },
};
