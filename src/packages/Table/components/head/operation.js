import iconClass from '../../../Icon-class/Icon-class';

import { stopPropagation } from '../../../../utils/event';

export default {
  name: 'head-operation',
  components: { iconClass },
  data() {
    return {
      settingInfo: [
        { icon: 'setting', event: 'headerSetting' },
        { icon: 'unfold', event: 'headerSearch' },
      ],
    };
  },

  props: {
    settingState: { type: Object },
  },

  render(h) {
    return h(
      'div',
      { class: 'head-setting' },
      this.settingInfo.map((item, index) => {
        return h(
          'div',
          {
            class: [
              'head-setting__part fl',
              { 'header-set_active': this.settingState.setting && index === 0 },
              { 'header-set_active': this.settingState.search && index === 1 },
            ],
            on: {
              click: $event => this[item.event]($event),
            },
          },
          [
            h(
              'icon-class',
              {
                props: { 'icon-class': item.icon },
              },
              []
            ),
          ]
        );
      })
    );
  },
  methods: {
    headerSetting(e) {
      this.settingState.search = false;
      this.settingState.setting = !this.settingState.setting;
      stopPropagation(e);
    },
    headerSearch(e) {
      this.settingState.setting = false;
      this.settingState.search = !this.settingState.search;
      stopPropagation(e);
    },
  },
  beforeDestroy() {},
};
