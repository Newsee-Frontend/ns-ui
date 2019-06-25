import { stopPropagation } from '../../../utils/event';

export default {
  name: 'editor-btn',
  render(h) {
    return (
      h('div',
        {
          class: 'editor-btn mce-btn',
          on: {
            click: this.editorBtnClick,
          },
        },
        [
          h(
            'button',
            [
              h('i', {
                  class: 'el-icon-upload  mce-ico',
                },
              ),
            ],
          ),
        ],
      )
    );
  },
  methods: {
    editorBtnClick(e) {
      stopPropagation(e);
      this.$emit('editor-btn-click');
    },
  },
};
