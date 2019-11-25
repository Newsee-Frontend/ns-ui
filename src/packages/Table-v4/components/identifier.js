import Button from '../../Button/Button';
import img_error from '../../../assets/error.jpg';
import img_null from '../../../assets/null.jpg';

export default {
  components: { Button },
  props: {
    loading: { type: Boolean, default: true },
    errorType: { type: String, default: 'no-error' },
  },
  render(h) {
    /**
     * identifier content
     * @param type
     * @returns {*}
     */
    const identifier = type => {
      switch (type) {
        case 'service-error':
          return (
            <div class="error-prompt-content">
              <img class={'errorImg'} src={img_error} />
              <h4>服务器出错</h4>
              <p>蛋定！伸个懒腰喝杯水，过会再试试吧</p>
              <Button type={'primary'} on-click={this.reload}>
                刷新试试
              </Button>
            </div>
          );
        //暂时不使用
        // case 'no-result':
        //   return (
        //     <div class="error-prompt-content">
        //       <img class={'errorImg'} src={img_null}/>
        //       <p>抱歉,没有搜索到你要的结果</p>
        //     </div>
        //   );
        default:
          break;
      }
    };

    /**
     * prompt block outside identifier content
     * @param errorType
     * @returns {null}
     */
    const promptblock = errorType => {
      return errorType === 'no-error' ? null : (
        <div class="table--mask">{identifier(errorType)}</div>
      );
    };

    return this.loading ? (
      <div>
        <div class="table--spinner" />
      </div>
    ) : (
      promptblock(this.errorType)
    );
  },
  methods: {
    reload() {
      this.$emit('reload');
    },
  },
};
