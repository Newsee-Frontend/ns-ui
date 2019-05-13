import Vue from 'vue';
import VueParticles from 'vue-particles';

Vue.use(VueParticles);
import create from '../../create/create';

console.log(VueParticles);

export default create({
  name: 'particles',
  inheritAttrs: false,
  props: {
    color: { type: String, default: '#dedede' },
    particleOpacity: { type: Number, default: 0.7 },
    particlesNumber: { type: Number, default: 80 },
    shapeType: { type: String, default: 'circle' },
    particleSize: { type: Number, default: 4 },
    linesColor: { type: String, default: '#dedede' },
    lineLinked: { type: Boolean, default: true },
    lineOpacity: { type: Number, default: 0.4 },
    linesDistance: { type: Number, default: 150 },
    moveSpeed: { type: Number, default: 3 },
    hoverEffect: { type: Boolean, default: true },
    clickEffect: { type: Boolean, default: true },
    clickMode: { type: String, default: 'push' },
  },

  render(h) {
    return (
      h(
        'vue-particles',
        {
          'class': {
            ...this.recls(),
          },
          props: {
            ...this.$attrs,
            color: this.color,
          },
        },
      )
    );
  },
  methods: {},
});
