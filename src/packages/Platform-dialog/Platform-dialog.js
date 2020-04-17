import create from '../../create/create';
import Dialog from '../Dialog/Dialog';
import { addEventHandler, removeEventHandler } from '../../utils/library/event';

export default create({
  name: 'platform-dialog',
  components: { Dialog },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String },
    modal: { type: Boolean, default: false }, //是否需要遮罩层
    closeOnClickModal: { type: Boolean, default: false }, //是否可以通过点击 modal 关闭
    left: { type: String, default: '0' },
    right: { type: String, default: '0' },
    top: { type: String, default: '0' },
    bottom: { type: String, default: '0' },
    'before-close': { type: Function },
    domsToClose: {
      type: [Array, null],
      default() {
        return [];
      },
      validator: d => {
        if (d.length > 5) {
          console.warn(
            '【platform-dialog】: there is too many doms  to listen to binding events, may cause performance problems.'
          );
        }
        return d;
      },
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    outerDomTargets() {
      let outers = [];

      try {
        if (!this.domsToClose) return outers;

        this.domsToClose.forEach(dom => {
          const outer = document.getElementById(dom);

          if (outer) {
            outers.push(outer);
          }
        });

        return outers;
      } catch (e) {
        return outers;
      }
    },
    wrapperStyle() {
      let style = {};
      ['left', 'right', 'top', 'bottom'].forEach(pos => {
        style[pos] = this[pos];
      });
      return style;
    },
  },

  watch: {
    visible: {
      handler(newVal, oldVal) {
        this.show = newVal;
        if (newVal) {
          this.open();
        } else {
          this.close();
        }
      },
      immediate: true,
    },
  },

  render(h) {
    return this.visible ? (
      <Dialog
        class={this.recls()}
        visible={this.show}
        on-update:visible={val => (this.show = val)}
        title={this.title}
        fullscreen
        type={'simple'}
        modal={this.modal}
        close-on-click-modal={this.closeOnClickModal}
        append-to-body
        show-close={false}
        before-close={this.beforeClose}
        on-close={this.close}
        on-open={this.open}
        style={this.wrapperStyle}
      >
        {this.$slots.default}
      </Dialog>
    ) : null;
  },

  methods: {
    //Dialog open emit
    open() {
      this.$emit('open');
    },

    //Dialog close emit
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },

    outerClickEvent(e) {
      if (!this.visible) return;
      if (this.closeOnClickModal) return;

      this.close();
    },

    addEventHandlerToTargets(type, eventType, callback) {
      if (!this.outerDomTargets || !this.outerDomTargets.length) return;

      this.outerDomTargets.forEach(outer => {
        if (type === 'add') {
          addEventHandler(outer, eventType, callback);
        } else if (type === 'remove') {
          removeEventHandler(outer, eventType, callback);
        }
      });
    },
  },

  mounted() {
    //listen drop modules click event
    this.addEventHandlerToTargets('add', 'click', this.outerClickEvent);
  },
  beforeDestroy() {
    //remove event Listener
    this.addEventHandlerToTargets('remove', 'click', this.outerClickEvent);
  },
  destroyed() {
    this.timeout = null;
  },
});
