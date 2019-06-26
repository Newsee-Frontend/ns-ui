import create from '../../create/create';
import iconClass from '../Icon-class/Icon-class';

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
    value: [Array],
    width: [String, Number],
    height: [String, Number],
    action: { type: String }, //request url
    disabled: { type: Boolean, default: false },
    headers: Object,
    keyRefer: {
      type: Object,
      default: function() {
        return {
          url: 'fileUrl',
        };
      },
    },
    fileType: {
      type: Array,
      default: function() {
        return ['jpeg', 'png'];
      },
    },
    beforeUpload: Function,
  },

  computed: {
    convert_style() {
      return {
        width: this.convert_width,
        height: this.convert_height,
        lineHeight: this.convert_height,
      };
    },

    icon_style() {
      return {
        'font-size': parseInt(this.convert_width) * 0.14 + 'px',
      };
    },
  },

  watch: {
    value(val) {
      this.setVal(val);
    },

    childUpload(arr) {
      this.$emit('input', arr);
    },
  },

  render(h) {
    return h('el-upload',
      {
        'class': ['avatar-uploader', this.recls()],
        'style': this.convert_style,
        'attrs': {
          'action': this.action,
          'disabled': this.disabled,
          'headers': this.headers,
          'with-credentials': true,
          'show-file-list': false,
          'before-upload': this.beforeAvatarUpload,
          'on-success': this.onSuccess.bind(this),
          'on-change': this.changeUpload.bind(this),
        },
      },
      [
        this.picSingleUrl && h('img', {
          'attrs': {
            'src': this.picSingleUrl,
            'alt': '',
          },
          'class': 'avatar',
        }),
        h('icon-class', {
          class: 'avatar-uploader-icon',
          props: {
            'icon-class': 'add',
          },
          'style': this.icon_style,
        }),
      ],
    );
  },

  methods: {
    //childUpload 设置值
    setVal(val) {
      if (val instanceof Array) {
        this.childUpload = val;
        this.picSingleUrl = val.length > 0 ? val[0][this.keyRefer.url] : '';
      } else {
        throw('The format of the data is error in upload-components，example： [\\n\' +\n' +
          '            \'{"fileName": "xxx-picture.jpg", "fileUrl": "https://xxxx.xxxxx.com/xxx-picture.jpg"}\\n\' +\n' +
          '            \']\'');
      }
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
      } else {
        if (imageTypeList.indexOf(type) === -1) {
          this.$message.error(`上传头像图片只能是${this.fileType.join(',')}格式!`);
          return false;
        }
        if (file.size / 1024 / 1024 > 3) {
          return this.$message.error('上传头像图片大小不能超过3M');
        }
      }
      return true;
    },

    //图片成功
    onSuccess(response) {
      this.setVal(response.resultData);
    },
    changeUpload(re) {
      console.log(re, '---------------------------');
      this.$emit('change');
    },


  },

  created() {
    this.setVal(this.value);
  },

  mounted() {
  },
})
;
