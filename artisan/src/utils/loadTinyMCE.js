let loadPromise = null

export default function loadTinyMCE () {
  if (typeof window === 'undefined') return Promise.reject(new Error('TinyMCE 只能在浏览器环境加载'))
  if (window.tinymce && typeof window.tinymce.init === 'function') return Promise.resolve(window.tinymce)
  if (loadPromise) return loadPromise
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  console.log(process.env.IP_CONFIG);
  const baseUrl = process.env.IP_CONFIG || ''
  const script = document.createElement('script')
  script.src = baseUrl.replace(/\/$/, '') + '/v10/resource/baseStatic/_NEAP_STATIC/tinymce5.1.0/tinymce.min.js'
  script.async = true
  script.setAttribute('data-neap-tinymce', 'true')

  loadPromise = new Promise(function (resolve, reject) {
    script.onload = function () {
      if (window.tinymce && typeof window.tinymce.init === 'function') {
        resolve(window.tinymce)
      } else {
        loadPromise = null
        reject(new Error('TinyMCE 脚本加载后未找到 window.tinymce'))
      }
    }
    script.onerror = function () {
      loadPromise = null
      reject(new Error('TinyMCE 脚本加载失败：' + script.src))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

