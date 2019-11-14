export default {
  data() {
    return {
      isFirstRender: true,
    };
  },
  props: {
    loadState: {
      type: Object,
      default() {
        return {
          data: false,
          head: false,
        };
      },
    },
  },
  computed: {
    //load state
    isLoadReady() {
      const s = this.loadState.data && this.loadState.head;
      if (this.isFirstRender) {
        if (s) {
          this.isFirstRender = false;
        }
      }
      return s;
    },

    //table render switch
    isMainReady() {
      return this.isLoadReady || !this.isFirstRender;
    },

    //mask state for head
    mask_head_state() {
      if (!this.isFirstRender) {
        return !this.loadState.head;
      } else {
        return !this.isReady;
      }
    },
    //mask state for body
    mask_body_state() {
      return this.loadState.data;
    },
  },
};
