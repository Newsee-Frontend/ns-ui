import Button from '../../../Button/Button';
import img_null from '../../../../assets/null.jpg';
import img_error from '../../../../assets/error.jpg';

export default {
  name: 'error',
  components: { Button },
  props: {
    errorType: { type: String, default: 'no-error' },
  },
  render(h) {
    const content = type => {
      switch (type) {
        case 'service-error':
          return (
            <div class="error-prompt-content">
              <img class={'errorImg'} src={img_error} />
              <h4>服务器出错</h4>
              <p>蛋定！伸个懒腰喝杯水，过会再试试吧</p>
              <Button type={'primary'} on-click={this.refresh}>
                刷新试试
              </Button>
            </div>
          );
        case 'no-result':
          return (
            <div class="error-prompt-content">
              <img class={'errorImg'} src={img_null} />
              <p>抱歉,没有搜索到你要的结果</p>
            </div>
          );
        default:
          break;
      }
    };

    return this.errorType !== 'no-error' ? (
      <div class={`error-prompt ${this.errorType}`}>{content(this.errorType)}</div>
    ) : null;
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    },
  },
};
