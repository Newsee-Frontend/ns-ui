import create from '../../create/create';
import iconClass from '../Icon-class/Icon-class';

const uploadTypes = ['picture-single', 'picture-wall', 'file'];
export default create({
  name: 'upload',

  components: { iconClass },

  data() {
    return {
      picSingleUrl: '',
      childUpload: [],
    };
  },

  props: {
    /**
     * 绑定值
     */
    value: [Array],

    /**
     * 文件列表的类型
     */
    type: {
      type: String,
      default: 'picture-single',
      validate: t => {
        return uploadTypes.some(t);
      },
    },

    /**
     * 宽度
     */
    width: {
      type: [String, Number],
      default: '148px',
    },

    /**
     * 高度
     */
    height: {
      type: [String, Number],
      default: '148px',
    },

    /**
     * 上传时附带的额外参数
     */
    data: {
      type: Object,
      default: () => {},
    },

    /**
     * 上传的文件字段名
     */
    name: {
      type: String,
      default: 'file',
    },

    /**
     * 是否支持多选文件
     */
    multiple: {
      type: Boolean,
      default: false,
    },

    /**
     * 必选参数，上传的地址
     */
    action: { type: String },

    /**
     * 是否禁用
     */
    disabled: { type: Boolean, default: false },

    /**
     * 设置上传的请求头部
     */
    headers: Object,

    /**
     * 键值映射
     */
    keyRefer: {
      type: Object,
      default: function() {
        return {
          url: 'fileUrl',
        };
      },
    },

    /**
     * 文件类型
     */
    fileType: {
      type: Array,
      default: function() {
        return ['jpeg', 'jpg', 'png'];
      },
    },

    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    beforeUpload: Function,

    /**
     * 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
     */
    beforeRemove: Function,

    /**
     * 最大允许上传个数
     */
    limit: Number, 

    /**
     * 是否启用拖拽上传
     */
    drag: {
      type: Boolean,
      default: false,
    }, 

    /**
     * 接受上传的文件类型
     */
    accept: String,

    /**
     * 照片墙超过后是否隐藏入口
     */
    exceedLimitHiddenEntrance: {
      type: Boolean,
      default: false,
    }, 

    /**
     * 是否立即上传
     */
    autoUpload: {
      type: Boolean,
      default: true,
    },

    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     */
    onChange: Function,

    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    onPreview: Function,

    /**
     * 文件列表移除文件时的钩子
     */
    onRemove: Function,

    /**
     * 文件超出个数限制时的钩子
     */
    onExceed: Function,
  },

  computed: {
    convert_style() {
      return {
        width: this.convert_width || this.width,
        height: this.convert_height || this.height,
        lineHeight: this.convert_height || this.height,
      };
    },

    icon_style() {
      return {
        'font-size': parseInt(this.convert_width || this.width) * 0.14 + 'px',
      };
    },

    hiddenEntrance() {
      return {
        'hidden-pictureWall':
          this.limit &&
          this.exceedLimitHiddenEntrance &&
          this.type === 'picture-wall' &&
          this.limit <= this.childUpload.length,
      };
    },
  },

  watch: {
    value(val) {
      this.setVal(val);
    },

    childUpload() {
      this.$emit('change');
    },
  },

  render(h) {
    const addIconDom = h('icon-class', {
      class: 'avatar-uploader-icon',
      props: {
        'icon-class': 'add',
      },
      style: this.icon_style,
    });

    const singlePicImg = h('img', {
      attrs: {
        src: this.picSingleUrl,
        alt: '',
      },
      class: 'avatar',
    });

    return h(
      'el-upload',
      {
        class: [this.recls([this.type]), this.hiddenEntrance],
        ref: 'upload',
        style: this.type === 'picture-single' && this.convert_style,
        attrs: {
          action: this.action,
          data: this.data,
          name: this.name,
          disabled: this.disabled,
          headers: this.headers,
          drag: this.drag,
          multiple: this.multiple,
          accept: this.accept,
          'list-type': this.type === 'picture-wall' ? 'picture-card' : '',
          'with-credentials': true,
          limit: this.limit,
          'show-file-list': this.type !== 'picture-single',
          'file-list': this.childUpload,
          'auto-upload': this.autoUpload,
          'before-upload': this.beforeAvatarUpload,
          'on-exceed': this.onFileExceed.bind(this),
          'on-success': this.onSuccess.bind(this),
          'on-error': this.onError.bind(this),
          'before-remove': this.beforeRemoveFun.bind(this),
          'on-remove': this.onFileRemove.bind(this),
          'on-change': this.onChange,
          'on-preview': this.onPreview,
        },
      },
      [
        this.type === 'picture-single' && this.picSingleUrl && singlePicImg,
        this.type === 'file' ? null : addIconDom,
        this.$slots.default,
      ]
    );
  },

  methods: {
    //childUpload 设置值
    setVal(val) {
      if (val instanceof Array) {
        this.childUpload = this.addAttribute(val);
        this.picSingleUrl = val.length > 0 ? val[0][this.keyRefer.url] : '';
      } else {
        throw "The format of the data is error in upload-components，example： [\\n' +\n" +
          '            \'{"fileName": "xxx-picture.jpg", "fileUrl": "https://xxxx.xxxxx.com/xxx-picture.jpg"}\\n\' +\n' +
          "            ']'";
      }
    },

    // add  name和url
    addAttribute(list) {
      list.forEach(item => {
        item.name = item.fileName;
        item.url = item.fileUrl;
      });
      return list;
    },

    /**
     * image-type name handle (add 'image/')
     * @param arr
     * @returns {Array}
     */
    addImageType(arr) {
      let n = arr.map(item => {
        return 'image/' + item;
      });
      return n;
    },

    //校验格式
    beforeAvatarUpload(file) {
      let type = file.type;
      let imageTypeList = this.addImageType(this.fileType);
      if (this.beforeUpload) {
        return this.beforeUpload(file);
      } else if (this.type !== 'file') {
        if (imageTypeList.indexOf(type) === -1) {
          this.$message.error(`上传图片只能是${this.fileType.join(',')}格式!`);
          return false;
        }
      } else if (this.type === 'picture-single') {
        if (file.size / 1024 / 1024 > 3) {
          return this.$message.error('上传图片大小不能超过3M');
        }
      }
      return true;
    },

    //图片成功
    onSuccess(response, row) {
      let val = response.resultData;
      /**
       * 文件上传成功触发
       * @event success
       * @property { Array } response 上传成功后的响应信息  
       */
      this.$emit('success', response);
      if (val instanceof Array) {
        let addAttributeVal = this.addAttribute(val);
        if (this.type === 'picture-single') {
          this.childUpload = addAttributeVal;
          this.picSingleUrl = val.length > 0 ? val[0][this.keyRefer.url] : '';
        } else {
          this.childUpload = this.childUpload.concat(addAttributeVal);
        }
        this.$emit('input', this.childUpload);
      } else {
        throw "The format of the data is error in upload-components，example： [\\n' +\n" +
          '            \'{"fileName": "xxx-picture.jpg", "fileUrl": "https://xxxx.xxxxx.com/xxx-picture.jpg"}\\n\' +\n' +
          "            ']'";
      }
    },

    //error 图片上传失败
    onError(err, file, fileList) {
      /**
       *  图片上传失败
       * @event error
       * @property { String } err  错误信息
       * @property { Object } file 上传失败的文件信息
       * @property { Array } fileList 文件列表
       */
      this.$emit('error', err, file, fileList);
    },

    //移除的钩子
    onFileRemove(file, fileList) {
      const uid = file.uid;
      this.childUpload = (this.childUpload || []).filter(item => {
        return item.uid !== uid;
      });
      this.$emit('input', this.childUpload);
      this.onRemove && this.onRemove(file, fileList);
    },

    // 文件超出个数限制时的钩子
    onFileExceed(files, fileList) {
      /**
       * 当文件超出个数限制时触发
       * @event on-exceed
       */
      this.$emit('on-exceed');
      this.onExceed && this.onExceed(files, fileList);
    },

    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemoveFun(file, fileList) {
      if (this.beforeRemove) {
        return this.beforeRemove(file, fileList);
      }
    },

    /**
     * @public
     * 清空已上传的文件列表, 不支持在before-upload方法中调用
     */
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
  
    /**
     * @public
     * 取消上传请求
     */
    abort() {
      this.$refs.upload.abort();
    },

    /**
     * @public
     * 手动上传文件列表
     */
    submit() {
      this.$refs.upload.submit();
    },
  },

  created() {
    this.setVal(this.value);
  },

  mounted() {},
});
