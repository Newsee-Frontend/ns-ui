import create from '../../create/create';

export default create({
  name: 'Drawer-dialog',

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

    animation: { type: String, default: 'slip-linear' }, //* fade普通 --- fade-normal **** 滑动-匀速进出 --- slip-linear
  },

  watch: {
    visible(val) {
      this.showDialog = val;
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
    return (
      <el-drawer
        class={this.recls}
        ref="drawerDialog"
        visible={this.showDialog}
        destroy-on-close={true}
        direction={this.direction}
        modal={this.modal}
        customClass={this.customClass}
        before-close={this.handleClose.bind(this)}>
        <div className={this.recls('container')} role={'dialog'}>
          {this.$slots.default}
        </div>
      </el-drawer>);
  },

  mounted() {
    if (this.$refs.drawerDialog.$refs.drawer) {
      ['left', 'right', 'top', 'bottom'].forEach(pos => {
        this.$refs.drawerDialog.$refs.drawer.style[pos] = this[pos];
      });
      this.$refs.drawerDialog.$refs.drawer.style.width = 'auto';
      this.$refs.drawerDialog.$refs.drawer.style.height = 'auto';
      this.$refs.drawerDialog.$refs.drawer.style.overflow = 'auto';
    }
  },

  methods:{
    handleClose(){

    }
  }
});
