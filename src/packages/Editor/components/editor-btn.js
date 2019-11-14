import IconClass from '../../Icon-class/Icon-class';
import { stopPropagation } from '../../../utils/library/event';

export default {
  name: 'editor-btn',
  components: { IconClass },
  props: {
    iconClass: {
      type: String,
      default: '',
    },
  },
  render(h) {
    return h(
      'div',
      {
        class: 'editor-btn mce-btn',
        on: {
          click: this.editorBtnClick,
        },
      },
      [
        h('button', [
          h('IconClass', {
            class: 'mce-ico',
            props: {
              'icon-class': this.iconClass,
            },
          }),
        ]),
      ]
    );
  },
  methods: {
    editorBtnClick(event) {
      stopPropagation(event);
      event.preventDefault();
      this.$emit('editor-btn-click');
      return false;
    },
  },
};
