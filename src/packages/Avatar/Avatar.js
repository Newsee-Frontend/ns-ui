import create from '../../create/create';
export default create({
  name: 'avatar',

  props: {
    type: { type: String, default: 'normal' },//round 或 normal
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    borderRadius: { type: String },    // 控制头像的border-Redius，type 为 round 则失效
    dynamicSrc: { type: String, default: null },
  },

  computed: {
    isRound() {
      return this.type === 'round';
    },
    avatarStyle() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        borderRadius: !this.isRound && this.borderRadius,
      };
    },
  },
  render(h) {
    return (
      <div
        class={this.recls({ 'round': this.isRound })}
        style={this.avatarStyle}
        on-click={this.click}
      >
        <img
          src={this.dynamicSrc1}
          alt="avatar"
        />
      </div>
    );
  },

  created(){
  },

  methods: {
    click() {
      this.$emit('click');
    },
  },
});
