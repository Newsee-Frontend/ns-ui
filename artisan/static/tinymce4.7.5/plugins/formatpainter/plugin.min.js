(function () {
  tinymce.PluginManager.add('formatpainter', function (editor) {
    var active = false;
    var cached = null;
    var buttonApi = null;

    function getBlock(node) {
      return editor.dom.getParent(node, function (n) {
        return editor.dom.isBlock(n);
      });
    }

    function normalizeColor(val) {
      if (!val) return '';
      if (val === 'transparent') return '';
      return val;
    }

    function captureFormat() {
      var node = editor.selection.getNode();
      var block = getBlock(node) || node;

      var dom = editor.dom;

      var fontFamily = dom.getStyle(node, 'font-family', true) || '';
      var fontSize = dom.getStyle(node, 'font-size', true) || '';
      var color = normalizeColor(dom.getStyle(node, 'color', true));
      var backgroundColor = normalizeColor(dom.getStyle(node, 'background-color', true));
      var lineHeight = dom.getStyle(block, 'line-height', true) || '';
      var textAlign = dom.getStyle(block, 'text-align', true) || '';

      cached = {
        inlineStyles: {
          'font-family': fontFamily,
          'font-size': fontSize,
          color: color,
          'background-color': backgroundColor,
        },
        blockStyles: {
          'line-height': lineHeight,
          'text-align': textAlign,
        },
        toggles: {
          bold: editor.formatter.match('bold'),
          italic: editor.formatter.match('italic'),
          underline: editor.formatter.match('underline'),
          strikethrough: editor.formatter.match('strikethrough'),
          subscript: editor.formatter.match('subscript'),
          superscript: editor.formatter.match('superscript'),
        },
      };
    }

    function setButtonActive(next) {
      if (buttonApi && typeof buttonApi.active === 'function') {
        buttonApi.active(!!next);
      }
    }

    function deactivate() {
      active = false;
      setButtonActive(false);
      editor.getBody().style.cursor = '';
    }

    function activate() {
      if (!cached) {
        captureFormat();
      }
      active = true;
      setButtonActive(true);
      editor.getBody().style.cursor = 'copy';
    }

    function toggle() {
      if (active) {
        deactivate();
        return;
      }
      captureFormat();
      activate();
    }

    function applyInlineStyles(styles) {
      var html = editor.selection.getContent({ format: 'html' });
      if (!html) return;

      var styleText = '';
      for (var k in styles) {
        if (styles.hasOwnProperty(k) && styles[k]) {
          styleText += k + ':' + styles[k] + ';';
        }
      }

      if (!styleText) return;

      editor.selection.setContent('<span style="' + tinymce.DOM.encode(styleText) + '">' + html + '</span>');
    }

    function ensureToggle(formatName, desiredOn) {
      var isOn = editor.formatter.match(formatName);
      if (!!desiredOn !== !!isOn) {
        var cmdMap = {
          bold: 'Bold',
          italic: 'Italic',
          underline: 'Underline',
          strikethrough: 'Strikethrough',
          subscript: 'Subscript',
          superscript: 'Superscript',
        };
        var cmd = cmdMap[formatName];
        if (cmd) {
          editor.execCommand(cmd);
        }
      }
    }

    function applyBlockStyles(block, styles) {
      if (!block) return;
      for (var k in styles) {
        if (styles.hasOwnProperty(k) && styles[k]) {
          editor.dom.setStyle(block, k, styles[k]);
        }
      }
    }

    function applyOnce() {
      if (!active || !cached) return;
      if (editor.selection.isCollapsed()) return;

      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        var block = getBlock(node);

        applyInlineStyles(cached.inlineStyles);

        ensureToggle('bold', cached.toggles.bold);
        ensureToggle('italic', cached.toggles.italic);
        ensureToggle('underline', cached.toggles.underline);
        ensureToggle('strikethrough', cached.toggles.strikethrough);
        ensureToggle('subscript', cached.toggles.subscript);
        ensureToggle('superscript', cached.toggles.superscript);

        applyBlockStyles(block, cached.blockStyles);
      });

      deactivate();
    }

    editor.addButton('formatpainter', {
      text: editor.settings.language === 'zh_CN' ? '格式刷' : 'Format Painter',
      tooltip: editor.settings.language === 'zh_CN' ? '复制格式' : 'Copy formatting',
      onclick: toggle,
      onpostrender: function () {
        buttonApi = this;
      },
    });

    editor.on('MouseUp KeyUp', function () {
      applyOnce();
    });

    editor.on('KeyDown', function (e) {
      if (active && e.keyCode === 27) {
        deactivate();
      }
    });

    editor.on('remove', function () {
      cached = null;
      buttonApi = null;
    });
  });
})();
