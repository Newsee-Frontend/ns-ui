import Vue from 'vue'
import gridIcon from '../../../Icon/grid-icon';
import {stopPropagation} from '../../../../utils/index';
const setIconInfo = [{icon: "shezhi-", event: 'headerSetting'}, {icon: "unfold", event: 'headerSearch'}];


Vue.component('grid-operation', this);

export default {
  name: 'default-grid-operation',
  components: {gridIcon},
  data() {
    return {};
  },
  props: {
    headSetSw: {
      type: Object, default: function () {
        return {
          set: false,
          search: false
        }
      }
    }
  },
  render(h) {
    return h(
      'div',
      {'class': 'header-set'},
      setIconInfo.map((item, index) => {
        return h('div', {
            class: ['header-set_part fl',
              {'header-set_active': this.headSetSw.set && index === 0},
              {'header-set_active': this.headSetSw.search && index === 1}
            ],
            on: {
              click: ($event) => this[item.event]($event)
            }
          },
          [
            h('grid-icon', {
                attrs: {"icon-class": item.icon},
              }, []
            )
          ])
      })
    );
  },
  created() {

  },
  mounted() {
  },
  methods: {
    headerSetting(e) {
      this.headSetSw.search = false;
      this.headSetSw.set = !this.headSetSw.set;
      stopPropagation(e);
    },
    headerSearch(e) {
      this.headSetSw.set = false;
      this.headSetSw.search = !this.headSetSw.search;
      stopPropagation(e);
    }
  },
  beforeDestroy() {

  },

};


