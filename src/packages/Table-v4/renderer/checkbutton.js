import Checkbox from '../../Checkbox/Checkbox';
import { getLabelByValue } from '../utils/index';
import { modelCover, optionsCover } from '../utils/transform';

export default {
  name: 'table-render-checkbutton',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;

      //是否为字典项（内部数据源)
      const isDictionary = column.isDictionary;

      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);

      return [
        <Checkbox
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
          disabled={formConfig.disabled}
          min={formConfig.min}
          max={formConfig.max}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode, column } = editRender.props;


      const isDictionary = column.isDictionary;
      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);


      if (!Array.isArray(model)) {
        return [];
      }

      return model.map(value => {
        return <span>{`${getLabelByValue(value, options)}  `}</span>;
      });

    },
  },
};
