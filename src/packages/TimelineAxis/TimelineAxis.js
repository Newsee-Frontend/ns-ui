import create from '../../create/create';
import Timeline from '../Timeline/Timeline.js';

export default create({
  name: 'timeline-axis',

  components: {
    Timeline,
  },

  data() {
    return {};
  },
  props: {
    options: { type: Array, default: [] },

    keyRefer: {
      type: Object,
      default: () => {
        return {
          'pTitle': 'title',
          'pActive': 'active',
          'children': 'children',
          'cTiTle': 'title',
          'cActive': 'active',
          'cObvious' : 'obvious',   // 子时间轴内容是否清晰
          'cDate': 'date',
          'cInfo': 'info'
        }
      }
    },
  },

  computed: {
    childKeyRefer(){
      let { cActive } = this.keyRefer;
      return { active: cActive }
    },

    perentKeyRefer(){
      let { pActive } = this.keyRefer;
      return { active: pActive }
    }
  },

  watch: {},

  render(h) {
    let {pTitle, cTiTle, children, cObvious, cDate, cInfo} = this.keyRefer;
    const childrenNode = (childList) => (
      <timeline
        class="children-nodes"
        hideTimestamp
        keyRefer={this.childKeyRefer}
        options={childList}
        {
          ...{
          scopedSlots: {
            default: props => {
              return (
                <div class={
                  props.item[cObvious]? 'deep-grey-text' : 'grey-text'
                }>
                  { props.item[cTiTle]? <span>[{props.item[cTiTle]}]&nbsp;&nbsp;</span>: null}
                  { props.item[cDate]? <span>{props.item[cDate]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: null}
                  { props.item[cInfo]? <span>{props.item[cInfo]}&nbsp;&nbsp;</span>: null}
                </div>
              );
            },
          },
          }
        }
      >
      </timeline>
    );

    return (
      <div
        class={this.recls()}
      >
        <timeline
          options={this.options}
          keyRefer={this.perentKeyRefer}
          {...{
            scopedSlots: {
              default: props => {
                return (
                  <div class="parent-node">
                    <div class="parent-node-title">
                      {props.item[pTitle]}
                    </div>
                    {props.item[children].length > 0 && childrenNode(props.item[children])}
                  </div>
                );
              },
            },
          }}
        >
        </timeline>
      </div>
    );
  },

  methods: {},

  created() {
  },

  mounted() {
  },
});
