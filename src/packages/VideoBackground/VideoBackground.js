import create from '../../create/create';

export default create({
  name: 'video-background',
  props: {
    sources: { type: Array, required: true },
    img: { type: String },
  },
  data() {
    return {
      videoRatio: null,
    };
  },

  render(h) {

    const sourcePart = (s, i) => {
      return <source src={s} key={i} type={this.getMediaType(s)}/>;
    };

    return (
      <section class={this.recls()}>
        <video autoPlay loop muted ref={'video'}>
          {
            this.sources.map((s, i) => sourcePart(s, i))
          }
        </video>
        <div class={'video-slots'}>
          {
            this.$slots.default
          }
        </div>
      </section>
    );
  },

  methods: {
    resize() {
      this.setContainerHeight();

      if (this.videoCanPlay()) {
        this.setVideoSize();
      }
    },

    videoCanPlay() {
      return !!this.$refs.video.canPlayType;
    },

    setImageUrl() {
      if (this.img) {
        this.$el.style.backgroundImage = `url(${this.img})`;
      }
    },

    setContainerHeight() {
      this.$el.style.height = `${window.innerHeight}px`;
    },

    setVideoSize() {
      let width, height, containerRatio = this.$el.offsetWidth / this.$el.offsetHeight;

      if (containerRatio > this.videoRatio) {
        width = this.$el.offsetWidth;
      } else {
        height = this.$el.offsetHeight;
      }

      this.$refs.video.style.width = width ? `${width}px` : 'auto';
      this.$refs.video.style.height = height ? `${height}px` : 'auto';
    },

    getMediaType(src) {
      return 'video/' + src.split('.').pop();
    },
  },
  mounted() {
    this.setImageUrl();
    this.setContainerHeight();
    if (this.videoCanPlay()) {
      this.$refs.video.oncanplay = () => {
        if (!this.$refs.video) return;
        this.videoRatio = this.$refs.video.videoWidth / this.$refs.video.videoHeight;
        this.setVideoSize();
        this.$refs.video.style.visibility = 'visible';
      };
    }

    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
});
