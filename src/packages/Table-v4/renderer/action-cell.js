import { judgeType } from '../../../utils/library/basic';
import Button from '../../Button/Button';

export default {
  name: 'table-render-action-cell',
  render: {
    renderDefault(h, editRender, { row, rowIndex, columnIndex }) {
      const { column, scopeRefer } = editRender.props;
      let { events } = editRender;
      const btns = row[scopeRefer['actionBtnList']];

      /**
       *  action render
       * @param list
       * @param events
       * @param scope  =>  row, column, rowIndex, columnIndex
       * @returns {*}
       */
      let actionRender = (list, events, { row, column, rowIndex, columnIndex }) => {
        return (
          <div class={'action-scope'}>
            {
              //single button
              <Button
                type={'text'}
                on-click={() => events.click(list[0], { row, column, rowIndex, columnIndex })}
              >
                {list[0].label}
              </Button>
            }
            {//more than 2 operation buttons, use drop-down menu to display
            list.length > 2 ? (
              <el-dropdown trigger="click">
                <span class={'el-dropdown-link'}>
                  更多
                  <i class={'el-icon-arrow-down el-icon--right'} />
                </span>
                <el-dropdown-menu slot="dropdown">
                  {list.map((item, index) => [
                    index > 0 ? (
                      <el-dropdown-item
                        key={index}
                        nativeOnClick={() =>
                          events.click(item, { row, column, rowIndex, columnIndex })
                        }
                      >
                        {item.label}
                      </el-dropdown-item>
                    ) : null,
                  ])}
                </el-dropdown-menu>
              </el-dropdown>
            ) : // 普通按钮
            list.length === 2 ? (
              <Button
                type="text"
                on-click={() => events.click(list[1], { row, column, rowIndex, columnIndex })}
              >
                {list[1].label}
              </Button>
            ) : null}
          </div>
        );
      };

      return judgeType(btns) === 'array' && btns.length > 0
        ? [actionRender(btns, events, { row, column, rowIndex, columnIndex })]
        : [];
    },
  },
};
