(function() {
  tinymce.PluginManager.add('formatpainter', function(editor) {
    let active = false
    let cached = null
    let buttonApi = null
    let nextFormatId = 0

    const getBlock = node => editor.dom.getParent(node, current => editor.dom.isBlock(current)) || node
    const getStyle = (node, name) => editor.dom.getStyle(node, name, true) || ''
    const applyInlineStyles = () => {
      const styles = Object.keys(cached.inlineStyles).reduce((result, name) => {
        if (cached.inlineStyles[name]) result[name] = cached.inlineStyles[name]
        return result
      }, {})
      if (!Object.keys(styles).length) return

      const formatName = `nsFormatPainterInline${nextFormatId++}`
      editor.formatter.register(formatName, { inline: 'span', styles })
      try {
        editor.formatter.apply(formatName)
      } finally {
        editor.formatter.unregister(formatName)
      }
    }
    const applyBlockStyles = () => {
      const blocks = editor.selection.getSelectedBlocks()
      if (!blocks.length) blocks.push(getBlock(editor.selection.getNode()))
      blocks.forEach(block => {
        Object.keys(cached.blockStyles).forEach(name => {
          if (cached.blockStyles[name]) editor.dom.setStyle(block, name, cached.blockStyles[name])
        })
      })
    }

    const captureFormat = () => {
      const node = editor.selection.getNode()
      const block = getBlock(node)
      const normalize = value => value === 'transparent' ? '' : value
      cached = {
        inlineStyles: {
          'font-family': getStyle(node, 'font-family'),
          'font-size': getStyle(node, 'font-size'),
          color: normalize(getStyle(node, 'color')),
          'background-color': normalize(getStyle(node, 'background-color')),
        },
        blockStyles: {
          'line-height': getStyle(block, 'line-height'),
          'text-align': getStyle(block, 'text-align'),
        },
        toggles: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'].reduce((result, name) => {
          result[name] = editor.formatter.match(name)
          return result
        }, {}),
      }
    }

    const setActive = value => {
      if (buttonApi && typeof buttonApi.setActive === 'function') buttonApi.setActive(!!value)
    }

    const deactivate = () => {
      active = false
      setActive(false)
      editor.getBody().style.cursor = ''
    }

    const toggle = () => {
      if (active) {
        deactivate()
        return
      }
      captureFormat()
      active = true
      setActive(true)
      editor.getBody().style.cursor = 'copy'
    }

    const applyOnce = () => {
      if (!active || !cached || editor.selection.isCollapsed()) return
      editor.undoManager.transact(() => {
        const toggles = {
          bold: cached.toggles.bold,
          italic: cached.toggles.italic,
          underline: cached.toggles.underline,
          strikethrough: cached.toggles.strikethrough,
          subscript: cached.toggles.subscript,
          superscript: cached.toggles.superscript,
        }
        Object.keys(toggles).forEach(name => {
          const isActive = editor.formatter.match(name)
          if (toggles[name] && !isActive) editor.formatter.apply(name)
          if (!toggles[name] && isActive) editor.formatter.remove(name)
        })
        applyInlineStyles()
        applyBlockStyles()
      })
      deactivate()
    }

    const onSetup = api => {
      buttonApi = api
      return () => {
        buttonApi = null
      }
    }
    const menuText = editor.settings.language === 'zh_CN' ? '格式刷' : 'Format Painter'
    const menuTooltip = editor.settings.language === 'zh_CN' ? '复制格式' : 'Copy formatting'

    editor.ui.registry.addToggleButton('formatpainter', {
      text: menuText,
      tooltip: menuTooltip,
      onAction: toggle,
      onSetup,
    })
    editor.ui.registry.addToggleMenuItem('formatpainter', {
      text: menuText,
      onAction: toggle,
      onSetup,
    })
    editor.on('MouseUp KeyUp', applyOnce)
    editor.on('KeyDown', event => {
      if (active && event.keyCode === 27) deactivate()
    })
    editor.on('remove', () => {
      cached = null
      buttonApi = null
    })
  })
})()
