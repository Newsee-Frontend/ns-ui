import create from '../../utils/create';
import Dialog from '../Dialog/Dialog';


const _fullscreen_dialogtype = ['normal', 'simple', 'noFooter', 'noHeader'];

export default create({
  name: 'fullscreen-dialog',
  components: { Dialog },
  data() {
    return {
      show: false,
    };
  },
  props: {
    visible: { type: Boolean, default: false },
    'custom-class': { type: String },
    title: { type: String },
    type: {
      type: String, default: 'normal', validator: t => {
        return _fullscreen_dialogtype.includes(t);
      },
    }, //类型（'normal','simple','noFooter','noHeader'）

    'close-on-press-escape': { type: Boolean, default: false },
    'show-close': { type: Boolean, default: true },
    'before-close': { type: Function },
  },

  computed: {},

  watch: {
    visible(val) {
      this.show = val;
    },
  },

  render(h) {
    return (
      <el-dialog
        visible={this.show}
        on-update:visible={val => this.show = val}

        class={this.recls([this.type])}

        title={this.title}

        custom-class={this.customClass}
        close-on-press-escape={this.closeOnPressEscape}

        modal-append-to-body
        append-to-body
        fullscreen

        show-close={this.showClose}
        before-close={this.beforeClose}
        on-close={this.close}
        on-open={this.open}
      >
        {
          this.$slots.default
        }
        <span slot={'footer'} className={'dialog-footer'}>
           {this.$slots.footer}
        </span>
      </el-dialog>
    );
  },

  methods: {
    //Dialog close emit
    close() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },
    //Dialog open emit
    open() {
      this.$emit('open');
    },
  },
  created() {
    this.show = this.visible;
  },
});
