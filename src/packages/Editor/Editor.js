import create from '../../create/create';
import plugins from './plugins';
import defaultConfig from './plugins-config';

import toolbar from './toolbar';

import config from './config/config';
import { createMediaFilePicker, patchMediaUploadTab } from './media-upload-tab';

export default create({
  name: 'editor',
  props: {
    value: { type: String, default: '' },
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      },
    },
    model: {
      type: String,
      default: 'normal',
      validate: t => {
        return ['normal', 'simple', 'rich'].indexOf(t) > -1;
      },
    },
    branding: { type: Boolean, default: false },
    height: { type: Number, required: false, default: 360 },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: { type: String, default: 'file edit insert view format table' },
    pluginsConfig: { type: Object, required: false, default: () => defaultConfig },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
    };
  },
  computed: {
    toolbarConfig() {
      return this.toolbar.length > 0 ? this.toolbar : toolbar[this.model];
    },
    pluginsConf() {
      return Object.assign(defaultConfig, this.pluginsConfig);
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    },
    model() {
      this.reinitTinymce();
    },
  },
  render(h) {
    return (
      <div class={`${this.recls()} ${this.fullscreen ? 'fullscreen' : ''}`}>
        <textarea id={this.tinymceId} class={'editor-textarea'} />
      </div>
    );
  },
  methods: {
    //init
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        language: 'zh_CN',
        selector: `#${this.tinymceId}`,
        cache_suffix: '?v=5.1.21',
        height: this.height,
        branding: this.branding,
        body_class: 'panel-body ',
        object_resizing: true,
        toolbar: this.toolbarConfig,
        menubar: this.menubar,
        menu: {
          format: {
            title: '格式',
            items: 'bold italic underline strikethrough superscript subscript code | formats blocks fontselect fontsizeselect align lineheightselect | forecolor backcolor | removeformat formatpainter',
          },
        },
        plugins: plugins,
        lineheight_formats: config.lineheight_formats,
        fontsize_formats: config.fontsize_formats,
        font_formats: config.font_formats,
        end_container_on_empty_block: true,
        paste_data_images: true,
        automatic_uploads: true,
        file_picker_types: 'media',
        file_picker_callback: createMediaFilePicker(this, this.pluginsConf['editor-media']),
        images_upload_handler: (blobInfo, success, failure) => {
          let { beforeUpload, action, headers, response } = this.pluginsConf['editor-image'];
          const imageFile = blobInfo.blob();

          if (beforeUpload && beforeUpload(imageFile) === false) {
            success('');
            return;
          }

          if (action) {
            //入参拼接
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('filename', blobInfo.filename());

            //请求发送
            const xhr = new XMLHttpRequest();
            xhr.open('post', action, true);
            xhr.withCredentials = true;
            for (let item in headers || {}) {
              if (headers.hasOwnProperty(item) && headers[item] !== null) {
                xhr.setRequestHeader(item, headers[item]);
              }
            }
            xhr.send(formData);

            //返回
            xhr.onload = () => {
              if (xhr.status === 200) {
                success(response(JSON.parse(xhr.response)));
              } else if (failure) {
                failure('上传失败: ' + xhr.status);
              }
            };
            xhr.onerror = () => {
              if (failure) failure('上传失败');
            };
          } else {
            success('');
          }
        },
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        convert_urls: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent());
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', e => {
            _this.fullscreen = e.state
          })
          editor.on('PastePostProcess', () => {
            setTimeout(() => {
              const pendingImages = editor.dom.select('img').some(image => {
                const source = image.getAttribute('src') || ''
                return source.indexOf('data:image/') === 0
              })
              if (pendingImages && typeof editor.uploadImages === 'function') {
                editor.uploadImages().catch(() => {})
              }
            }, 0)
          })
          patchMediaUploadTab(editor)
        },
      });
    },

    destroyTinymce() {
      const editor = window.tinymce && window.tinymce.get(this.tinymceId);
      if (!editor) return;
      if (this.fullscreen) {
        try {
          editor.execCommand('mceFullScreen');
        } catch (e) {}
      }
      try {
        editor.destroy();
      } catch (e) {
        try {
          editor.remove();
        } catch (err) {}
      }
      this.hasInit = false;
    },

    reinitTinymce() {
      this.destroyTinymce();
      this.tinymceId = 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      this.$nextTick(() => this.initTinymce());
    },

    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },

    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
  },

  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
});
