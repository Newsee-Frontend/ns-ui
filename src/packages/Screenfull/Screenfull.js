import screenfull from 'screenfull';
import create from '../../create/create';

export default create({
    name: 'screenfull',
    data() {
      return {
        isFullscreen: false,
      };
    },
    render(h) {
      return (
        <icon-class
          class={this.recls()}
          icon-class={this.isFullscreen ? 'unFullscreen' : 'fullscreen'}
          on-click={this.click}
        />
      );
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning',
          });
          return false;
        }
        screenfull.toggle();
      },
      init() {
        if (screenfull.enabled) {
          screenfull.on('change', () => {
            this.isFullscreen = screenfull.isFullscreen;
          });
        }
      },
    },
    mounted() {
      this.init();
    },
  },
);
