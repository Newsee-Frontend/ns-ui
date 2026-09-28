const MEDIA_ACCEPT =
  '.mp4,.webm,.ogg,.ogv,.mp3,.wav,.m4a,.aac,.mov,.avi,.flv,.mkv,.wmv'

const MEDIA_DIALOG_TITLES = ['insert/edit media', '插入/编辑媒体']

const resolveEditor = vm => {
  if (vm && vm.windowManager) return vm
  if (vm && vm.tinymceId && window.tinymce) {
    return window.tinymce.get(vm.tinymceId) || vm
  }
  return vm
}

const showError = (editor, message) => {
  if (editor && editor.windowManager && editor.windowManager.alert) {
    editor.windowManager.alert(message)
  }
}

const blockDialog = message => {
  const dialog = document.querySelector('.tox-dialog')
  if (!dialog) return () => {}
  const busy = document.createElement('div')
  busy.className = 'tox-dialog__busy-spinner'
  busy.setAttribute('aria-label', message || 'Loading...')
  const spinner = document.createElement('div')
  spinner.className = 'tox-spinner'
  for (let i = 0; i < 3; i++) {
    spinner.appendChild(document.createElement('div'))
  }
  busy.appendChild(spinner)
  dialog.appendChild(busy)
  return () => {
    if (busy.parentNode) {
      busy.parentNode.removeChild(busy)
    }
  }
}

const uploadMediaFile = (editor, file, uploadConfig, callback) => {
  if (!file) return

  const { beforeUpload, action, headers, response } = uploadConfig || {}
  if (beforeUpload && beforeUpload(file) === false) return
  if (!action) {
    showError(editor, '未配置媒体上传地址（editor-media.action）')
    return
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('filename', file.name || 'media')

  const unblockDialog = blockDialog('上传中...')
  const xhr = new XMLHttpRequest()
  let completed = false
  const finish = () => {
    if (completed) return false
    completed = true
    unblockDialog()
    return true
  }

  xhr.open('post', action, true)
  xhr.withCredentials = true
  Object.keys(headers || {}).forEach(item => {
    if (headers[item] !== null && headers[item] !== undefined) {
      xhr.setRequestHeader(item, headers[item])
    }
  })
  xhr.onload = () => {
    if (!finish()) return
    if (xhr.status < 200 || xhr.status >= 300) {
      showError(editor, `上传失败: ${xhr.status}`)
      return
    }

    let url
    try {
      const result = JSON.parse(xhr.response)
      url = typeof response === 'function' ? response(result) : ''
    } catch (e) {
      showError(editor, '上传成功但解析返回结果失败')
      return
    }
    if (!url) {
      showError(editor, '上传成功但未获取到文件地址')
      return
    }
    callback(url)
  }
  const handleFailure = () => {
    if (!finish()) return
    showError(editor, '上传失败')
  }
  xhr.onerror = handleFailure
  xhr.onabort = handleFailure
  xhr.ontimeout = handleFailure
  xhr.send(formData)
}

export const createMediaFilePicker = (vm, uploadConfig) => (callback, value, meta) => {
  if (meta && meta.filetype !== 'media') return

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = (uploadConfig && uploadConfig.accept) || MEDIA_ACCEPT
  input.style.display = 'none'
  document.body.appendChild(input)

  let cleaned = false
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    window.removeEventListener('focus', onFocus)
    if (input.parentNode) input.parentNode.removeChild(input)
  }
  const onFocus = () => {
    setTimeout(() => {
      if (!input.files || !input.files.length) cleanup()
    }, 0)
  }

  input.addEventListener('change', () => {
    const file = input.files && input.files[0]
    try {
      uploadMediaFile(resolveEditor(vm), file, uploadConfig, callback)
    } finally {
      cleanup()
    }
  })
  input.addEventListener('cancel', cleanup, { once: true })
  window.addEventListener('focus', onFocus, { once: true })
  try {
    input.click()
  } catch (error) {
    cleanup()
    throw error
  }
}

const makeUploadTab = editor => ({
  title: editor.settings.language === 'zh_CN' ? '上传媒体文件' : 'Upload media file',
  name: 'upload',
  items: [
    {
      type: 'urlinput',
      name: 'source1',
      filetype: 'media',
      label: 'Media file URL',
    },
  ],
})

const injectUploadTab = (editor, args) => {
  if (!args || !MEDIA_DIALOG_TITLES.includes(String(args.title || '').toLowerCase())) return

  const tabs = args.body && Array.isArray(args.body.tabs) ? args.body.tabs : null
  if (!tabs || tabs.some(tab => tab && tab.name === 'upload')) return

  const insertAt = tabs.length > 2 ? 2 : tabs.length
  tabs.splice(insertAt, 0, makeUploadTab(editor))
}

export const patchMediaUploadTab = editor => {
  if (!editor || editor._nsMediaUploadPatched) return
  const wm = editor.windowManager
  if (!wm || typeof wm.open !== 'function') return

  const originalOpen = wm.open
  wm.open = function(args) {
    injectUploadTab(editor, args)
    return originalOpen.call(this, args)
  }
  editor._nsMediaUploadPatched = true
}
