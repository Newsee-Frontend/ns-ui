export default {
  name: 'render',
  functional: true,
  props: {
    node: Object,
    parent: null,
    tpl: Function,
    index: Number,
    nodeMouseOver: Function,
    level: Number,
    multiple: Boolean
  },
  render (h, ctx) {
    const {node, parent, index, nodeMouseOver, tpl, level, multiple} = ctx.props
    const {selected, disabled = false} = node
    let titleClass
    if (disabled) {
      titleClass = 'node-title-disabled'
    }
    //多选 node有select
    else if(!multiple){
      titleClass = selected ? 'node-title node-selected' : 'node-title'
    }
    return (
      <div
        class={[titleClass, 'tpl-div']}
        onMouseover={() => nodeMouseOver(node, index, parent)}
        style={'user-select: none;'}
        onClick={() => {
          if (disabled) return
          ctx.parent.nodeSelected(node, {level, index}, parent)
        }}>
        {tpl(node, parent, index)}
      </div>
    )
  }
}
