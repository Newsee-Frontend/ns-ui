const merge = require('webpack-merge');
import create from '../../create/create';
import editorImage from './components/editor-image';
import plugins from './plugins';
import defaultConfig from './plugins-config';

import toolbar from './toolbar';
import editorBtn from './components/editor-btn';


export default create({
  name: 'editor',
  components: { editorImage, editorBtn },
  props: {
    value: { type: String, default: '' },
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      },
    },
    model: {
      type: String, default: 'normal', validate: t => {
        return ['normal', 'simple', 'rich'].indexOf(t) > -1;
      },
    },
    height: { type: Number, required: false, default: 360 },
    toolbar: {
      type: Array, required: false,
      default() {
        return [];
      },
    },
    menubar: { type: String, default: 'file edit insert view format table' },
    pluginsConfig: { type: Object, required: false, default: defaultConfig },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      isEn: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
      },
    };
  },
  computed: {
    language() {
      return this.languageTypeList[this.isEn ? 'en' : 'zh'];
    },
    toolbarConfig() {
      return this.toolbar.length > 0 ? this.toolbar : toolbar[this.model];
    },
    customContainerStyle() {
      return {
        top: (this.toolbarConfig.length * 34 + 4 + (this.fullscreen ? 88 : 0)) + 'px',
      };
    },
    pluginsConf() {
      console.log('editor - 插件参数配置信息如下：');
      console.log(merge(defaultConfig, this.pluginsConfig));
      return merge(defaultConfig, this.pluginsConfig);
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    },
    language(val) {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    },
    model(val) {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    },
  },
  render(h) {
    return (
      <div class={`${this.recls()} ${this.fullscreen ? 'fullscreen' : ''}`}>
        <textarea id={this.tinymceId} class={'editor-textarea'}/>
        <ul class={'editor-custom-btn-container'} style={this.customContainerStyle}>
          <li>
            <editor-image plugin-config={this.pluginsConf['editor-image']} on-image-submit={this.imageSubmit}/>
          </li>
          <li>
            <editor-btn icon-class={'language'} on-editor-btn-click={() => {
              this.isEn = !this.isEn;
            }}/>
          </li>
        </ul>
      </div>
    );
  },
  methods: {
    //init
    initTinymce() {
      const _this = this;
      console.log('init tinymce');
      window.tinymce.init({
        language: this.language,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbarConfig,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
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
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state;
          });
        },
      });
    },

    destroyTinymce() {
      console.log('destroy tinymce');
      const editor = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        editor.execCommand('mceFullScreen');
      }

      if (editor) {
        editor.destroy();
      }
    },

    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },

    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSubmit(arr) {
      const _this = this;
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    },
  },

  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    console.log('deactivated');
    this.destroyTinymce();
  },
  destroyed() {
    console.log('destroyed');
    this.destroyTinymce();
  },
});
