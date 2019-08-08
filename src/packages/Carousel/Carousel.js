import create from '../../create/create';

export default create({
  name: 'carousel',

  data() {
    return {};
  },
  props: {
    list: { type: Array, default: []},
    height: String,
    width: String,
    'initial-index': { type: Number, default: 0 },
    trigger: { type: String, default: 'click'}, //指示器的触发方式	click hover
    autoplay: { type: Boolean, default:  true},
    interval: { type: Number, default: 3000},
    'indicator-position':  String,
    arrow: String,  //切换箭头的显示时机，always/hover/never
    type: String, //走马灯的类型
    loop: { type: Boolean, default: true},
    direction: {type: String, default: 'horizontal'}
  },

  computed: {

  },

  watch: {},

  render(h) {
     const carouselItem = (item)=> (
       <el-carousel-item
         key={item.name}
         name={item.name}
         label={item.label}
       >
         <img src={item.src} />
       </el-carousel-item>
     );

     return (
       <el-carousel
         ref="carousel"
         class={this.recls()}
         style={{width:this.convert_width}}
         height={this.convert_height}
         initialIndex={this.initialIndex}
         trigger={this.trigger}
         autoplay={this.autoplay}
         interval={this.interval}
         indicatorPosition={this.indicatorPosition}
         arrow={this.arrow}
         type={this.type}
         loop={this.loop}
         direction={this.direction}
         onChange={this.change}
       >
         { this.list.map( item => {
           return carouselItem(item)
         })}
       </el-carousel>
     )
  },

  methods: {
    change: function(e) {
      this.$emit('change', e)
    },

    setActiveItem: function(index) {
      this.$refs.carousel.setActiveItem(index);
    },

    prev: function() {
      this.$refs.carousel.prev();
    },

    next: function(){
      this.$refs.carousel.next();
    },
  }
  ,

  created() {
  },

  mounted() {
  },
});
