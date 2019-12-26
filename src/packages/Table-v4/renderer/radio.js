import Radio from '../../Radio/Radio';
import { getLabelByValue } from '../utils/index';
import { modelCover, optionsCover } from '../utils/transform';

export default {
  name: 'table-render-radiobutton',
  render: {
    renderEdit(h, editRender, { row, rowIndex, columnIndex }) {
      const { modelCode, formConfig, column } = editRender.props;
      let { events } = editRender;

      //是否为字典项（内部数据源)
      const isDictionary = column.isDictionary;

      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);

      return [
        <Radio
          value={model}
          onInput={e => {
            if (isDictionary) {
              row[modelCode] = e;
            } else {
              row[modelCode].picked.value = e;
            }
            this.$emit('input', e);
          }}
          options={options}
          disabled={formConfig.disabled}
          on-change={() => events.change({ row, column, rowIndex, columnIndex })}
        />,
      ];
    },

    renderCell(h, editRender, { row }) {
      const { modelCode, column } = editRender.props;

      const isDictionary = column.isDictionary;
      const model = modelCover(isDictionary, modelCode, row);
      const options = optionsCover(isDictionary, modelCode, row, column);

      return getLabelByValue(model, options);
    },
  },
};
