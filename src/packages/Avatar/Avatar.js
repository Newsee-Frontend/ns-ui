import create from '../../utils/create';
import { convertUnits } from  '../../utils/auto-from'

export default create({
  name: 'avatar',

  data() {
    return {
    };
  },
  props: {
    type: { type: String, default: 'normal' },
    borderRadius: { type: [Number, String], default: null },    // 控制头像的border-Redius， 优先级高于type
    width: { type: [Number, String], default: '32px' },
    height: { type: [Number, String], default: '32px' },
    scale: { type: [Number, String] }, // the value of width / height  如果传值，优先按比例计算出宽度
    dynamicSrc: { type: String, default: null }
  },


  watch: {},

  render(h) {
    let avatar_height = convertUnits(this.height);

    let avatar_width = this.scale
      ? parseInt(convertUnits(this.height)) * parseFloat(this.scale) + 'px'
      : convertUnits(this.width)

    let  avatar_borderRadius =  this.borderRadius?  convertUnits(this.borderRadius) : '';
    return (
      <div
        class={ this.recls() }>
        <div
          class="avatar-cont"
          style={{ height: avatar_height, width: avatar_width }}
        >
          <img
            src= { this.dynamicSrc }
            alt="avatar"
            class={["avatar-cont", this.type === 'round' && 'avatar-round']}
            style={ this.borderRadius && { borderRadius:  avatar_borderRadius}}
          />
        </div>
      </div>
    )
  },

  methods: {},

  created() {
  },

  mounted() {
  },
});
