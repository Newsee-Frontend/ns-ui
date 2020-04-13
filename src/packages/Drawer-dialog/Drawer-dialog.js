import create from '../../create/create';

export default create({
  name: 'drawer-dialog',

  props: {
    entrPosition: { type: String, default: 'right' },

    visible: {
      type: Boolean,
      default: false,
    },

    customClass: String,

    left: { type: String, default: '0' },
    right: { type: String, default: '0' },
    top: { type: String, default: '0' },
    bottom: { type: String, default: '0' },

    modal: { type: Boolean, default: true }, //是否含有遮罩层

    showHeader: { type: Boolean, default: false},
    title: String,
    showClose: Boolean,

    beforeClose: Function,
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    visible(val) {
      this.showDialog = val;
      val && this.setDialogSize();
    },
  },

  computed: {
    direction() {
      let map = {
        right: 'rtl',
        left: 'ltr',
        top: 'ttb',
        bottom: 'btt',
      };
      return map[this.entrPosition];
    },
  },

  data() {
    return {
      showDialog: false,
    };
  },

  render(h) {
    return h('el-drawer', {
      class: [this.recls(),  !this.showHeader? 'no-header' : null ],
      ref: "drawerDialog",
      props: {
        visible: this.showDialog,
        'destroy-on-close': true,
        direction: this.direction,
        modal: this.modal,
        customClass: this.customClass,
        'before-close': this.handleClose.bind(this)
      },
      on: {
        'update:visible': value => {
          this.showDialog = value;
        }
      }
    }, [
      <div className={this.recls('container')} role={'dialog'}>
        {this.$slots.default}
      </div>
    ]);
  },

  mounted() {
    this.setDialogSize();
  },

  methods:{
    handleClose(){
      if(this.beforeClose){
        return this
      }
      this.showDialog = false;
      this.$emit('update:visible', this.showDialog)
    },

    setDialogSize(){
      if (this.$refs.drawerDialog.$refs.drawer) {
        ['left', 'right', 'top', 'bottom'].forEach(pos => {
          this.$refs.drawerDialog.$refs.drawer.style[pos] = this[pos];
        });
        this.$refs.drawerDialog.$refs.drawer.style.width = 'auto';
        this.$refs.drawerDialog.$refs.drawer.style.height = 'auto';
        this.$refs.drawerDialog.$refs.drawer.style.overflow = 'auto';
      }
    }
  }
});
