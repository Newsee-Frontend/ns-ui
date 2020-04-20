export default {
  props: {
    node: { type: Object },
    slotRander: { type: Function },
  },
  render(h) {
    return <span class="menu-slot">{this.slotRander ? this.slotRander(h, this.node) : ''}</span>;
  },
};
