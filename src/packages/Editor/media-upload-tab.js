const MEDIA_ACCEPT =
  '.mp4,.webm,.ogg,.ogv,.mp3,.wav,.m4a,.aac,.mov,.avi,.flv,.mkv,.wmv';

const getSelectedFile = evt => {
  if (!evt || !evt.control) return null;
  const ctrl = evt.control;
  const value = typeof ctrl.value === 'function' ? ctrl.value() : ctrl.value;
  if (value && value.blob && typeof value.blob === 'function') return value.blob();
  if (value instanceof File || value instanceof Blob) return value;
  if (value && value[0]) return value[0];
  return null;
};

const DEFAULT_MEDIA_WIDTH = '300';
const DEFAULT_MEDIA_HEIGHT = '150';

const isAudioUrl = url => {
  const ext = String(url || '')
    .split('?')[0]
    .split('.')
    .pop()
    .toLowerCase();
  return /^(mp3|wav|m4a|aac|ogg)$/.test(ext);
};

const buildMediaHtml = (url, width, height) => {
  if (isAudioUrl(url)) {
    return `<audio controls="controls">\n<source src="${url}">\n</audio>`;
  }
  return (
    `<video width="${width}" height="${height}" controls="controls">\n` +
    `<source src="${url}">\n</video>`
  );
};

const activateGeneralTab = win => {
  const tabs = win.find('tabpanel')[0];
  if (tabs) tabs.activateTab(0);
};

const applyUploadedUrl = (win, url) => {
  const src = win.find('#source1');
  const widthCtrl = win.find('#width');
  const heightCtrl = win.find('#height');
  const embed = win.find('#embed');
  const width =
    (widthCtrl && widthCtrl.length && widthCtrl.value()) || DEFAULT_MEDIA_WIDTH;
  const height =
    (heightCtrl && heightCtrl.length && heightCtrl.value()) || DEFAULT_MEDIA_HEIGHT;

  if (src && src.length) src.value(url);
  if (widthCtrl && widthCtrl.length && !widthCtrl.value()) widthCtrl.value(DEFAULT_MEDIA_WIDTH);
  if (heightCtrl && heightCtrl.length && !heightCtrl.value()) heightCtrl.value(DEFAULT_MEDIA_HEIGHT);
  if (embed && embed.length) embed.value(buildMediaHtml(url, width, height));

  activateGeneralTab(win);
  if (src && src.length) src.fire('change');
  setTimeout(() => activateGeneralTab(win), 0);
  setTimeout(() => activateGeneralTab(win), 80);
};

const createThrobber = win => {
  const Factory = window.tinymce && window.tinymce.ui && window.tinymce.ui.Factory;
  const Throbber = Factory && Factory.get && Factory.get('Throbber');
  if (!Throbber || !win.getEl) return null;
  return new Throbber(win.getEl());
};

const uploadMediaFile = (editor, win, file, uploadConfig) => {
  if (!file) return;
  const { beforeUpload, action, headers, response } = uploadConfig || {};
  if (beforeUpload && beforeUpload(file) === false) return;
  if (!action) {
    editor.windowManager.alert('未配置媒体上传地址（editor-media.action）');
    return;
  }
  const throbber = createThrobber(win);
  if (throbber) throbber.show();
  const hideLoading = () => {
    if (throbber) throbber.hide();
  };

  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename', file.name || 'media');

  const xhr = new XMLHttpRequest();
  xhr.open('post', action, true);
  xhr.withCredentials = true;
  for (let item in headers || {}) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.onload = () => {
    hideLoading();
    if (xhr.status !== 200) {
      editor.windowManager.alert('上传失败: ' + xhr.status);
      return;
    }
    let url = '';
    try {
      url = response ? response(JSON.parse(xhr.response)) : '';
    } catch (e) {
      editor.windowManager.alert('上传成功但解析返回结果失败');
      return;
    }
    if (!url) {
      editor.windowManager.alert('上传成功但未获取到文件地址');
      return;
    }
    applyUploadedUrl(win, url);
  };
  xhr.onerror = () => {
    hideLoading();
    editor.windowManager.alert('上传失败');
  };
  xhr.send(formData);
};

const bindClickToBrowse = (dropzoneCtrl, accept) => {
  const el = dropzoneCtrl.getEl && dropzoneCtrl.getEl();
  if (!el || el._nsMediaBrowseBound) return;
  el._nsMediaBrowseBound = true;
  el.style.cursor = 'pointer';

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;';
  document.body.appendChild(input);

  el.addEventListener('click', evt => {
    if (evt.target === input) return;
    evt.preventDefault();
    input.value = '';
    input.click();
  });
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;
    dropzoneCtrl.value = () => file;
    dropzoneCtrl.fire('change');
  });
  dropzoneCtrl.on('remove', () => {
    if (input.parentNode) input.parentNode.removeChild(input);
  });
};

const makeUploadTab = (editor, uploadConfig) => {
  const accept = (uploadConfig && uploadConfig.accept) || MEDIA_ACCEPT;
  const onFileChange = e => {
    const file = getSelectedFile(e);
    uploadMediaFile(editor, e.control.rootControl, file, uploadConfig);
  };
  return {
    title: editor.settings.language === 'zh_CN' ? '上传媒体文件' : 'Upload media file',
    type: 'form',
    layout: 'flex',
    direction: 'column',
    align: 'stretch',
    padding: '20 20 20 20',
    items: [
      {
        type: 'dropzone',
        accept,
        height: 100,
        text: editor.settings.language === 'zh_CN' ? '将文件拖放到此处' : 'Drop a file here',
        onchange: onFileChange,
        onPostRender() {
          bindClickToBrowse(this, accept);
        },
      },
    ],
  };
};

const injectUploadTab = (editor, args, uploadConfig) => {
  if (!args || args.title !== 'Insert/edit media' || !args.body || !args.body.length) return;
  for (let i = 0; i < args.body.length; i++) {
    const title = args.body[i].title;
    if (title === 'Upload media file' || title === '上传媒体文件') return;
  }
  const insertAt = args.body.length > 2 ? 2 : args.body.length;
  args.body.splice(insertAt, 0, makeUploadTab(editor, uploadConfig));
};

export const patchMediaUploadTab = (editor, uploadConfig) => {
  if (!editor || editor._nsMediaUploadPatched) return;
  editor._nsMediaUploadPatched = true;

  const applyPatch = () => {
    if (!editor.windowManager || editor.windowManager._nsMediaUploadPatched) return;
    const wm = editor.windowManager;
    wm._nsMediaUploadPatched = true;
    const origOpen = wm.open;
    wm.open = function(args) {
      injectUploadTab(editor, args, uploadConfig);
      return origOpen.call(this, args);
    };
  };

  if (editor.windowManager) {
    applyPatch();
  } else {
    editor.on('PostRender', applyPatch);
  }
};
