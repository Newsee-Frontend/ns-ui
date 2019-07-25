import create from '../../create/create';
import iconClass from '../Icon-class/Icon-class';

const uploadTypes = ['singlePicture', 'pictureWall', 'otherFileList'];
export default create({
  name: 'upload',

  components: { iconClass },

  data() {
    return {
      picSingleUrl: '',
      childUpload: []
    };
  },

  props: {
    value: [Array],
    type: {
      type: String, default: 'singlePicture', validate: t => {
        return uploadTypes.some(t);
      },
    },
    width: {
      type: [String, Number],
      default: '148px',
    },
    height: {
      type: [String, Number],
      default: '148px',
    },
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
    beforeRemove: Function,
    limit: Number, //最多上传
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
  },

  watch: {
    value(val, oldVal) {
      this.setVal(val);
    }
  },

  render(h) {
    const addIconDom = h('icon-class', {
      class: 'avatar-uploader-icon',
      props: {
        'icon-class': 'add',
      },
      'style': this.icon_style,
    });

    const singlePicImg = h('img', {
      'attrs': {
        'src': this.picSingleUrl,
        'alt': '',
      },
      'class': 'avatar',
    });


    return h('el-upload',
      {
        'class': [this.recls([this.type])],
        'ref': 'upload',
        'style': this.type === 'singlePicture' && this.convert_style,
        'attrs': {
          'action': this.action,
          'disabled': this.disabled,
          'headers': this.headers,
          'list-type': this.type === 'pictureWall' ? 'picture-card' : '',
          'with-credentials': true,
          'limit': this.limit,
          'show-file-list': this.type !== 'singlePicture',
          'file-list': this.childUpload,
          'before-upload': this.beforeAvatarUpload,
          'on-exceed': this.onExceed.bind(this),
          'on-success': this.onSuccess.bind(this),
          'before-remove': this.beforeRemoveFun.bind(this),
          'on-remove': this.onRemove.bind(this)
        },
      },
      [
        this.type === 'singlePicture' && this.picSingleUrl && singlePicImg,
        this.type === 'otherFileList' ? null : addIconDom,
        this.$slots.default,
      ],
    );
  },

  methods: {
    //childUpload 设置值
    setVal(val) {
      if (val instanceof Array) {
        this.childUpload = this.addAttribute(val);
        this.picSingleUrl = val.length > 0 ? val[0][this.keyRefer.url] : '';
      } else {
        throw('The format of the data is error in upload-components，example： [\\n\' +\n' +
          '            \'{"fileName": "xxx-picture.jpg", "fileUrl": "https://xxxx.xxxxx.com/xxx-picture.jpg"}\\n\' +\n' +
          '            \']\'');
      }
    },

    // add  name和url
    addAttribute(list){
      list.forEach((item)=>{
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
      } else if(this.type !== 'otherFileList'){
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
    onSuccess(response,row) {
      let val = response.resultData;
      if (val instanceof Array) {
        let addAttributeVal =  this.addAttribute(val);
        if (this.type === 'singlePicture') {
          this.childUpload = addAttributeVal;
          this.picSingleUrl = val.length > 0 ? val[0][this.keyRefer.url] : '';
        }else{
          this.childUpload = this.childUpload.concat(addAttributeVal)
        }
        this.$emit('input',  this.childUpload);
        this.$emit('change');
      } else {
        throw('The format of the data is error in upload-components，example： [\\n\' +\n' +
          '            \'{"fileName": "xxx-picture.jpg", "fileUrl": "https://xxxx.xxxxx.com/xxx-picture.jpg"}\\n\' +\n' +
          '            \']\'');
      }
    },

    //移除的钩子
    onRemove(file, fileList) {
      const uid = file.uid;
      this.childUpload.forEach((item, index)=>{
        if(item.uid === uid) {
          this.childUpload.splice(index, 1);
        }
      });
      this.$emit('input',  this.childUpload);
      this.$emit('change');
    },

// 文件超出个数限制时的钩子
    onExceed(files, fileList) {
      this.$emit('on-exceed');
    },

//删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemoveFun(file, fileList) {
      if (this.beforeRemove) {
        return this.beforeRemove(file, fileList);
      }
    },

    /**
     * 外暴方法 清空已上传的文件列表, 不支持在before-upload方法中调用
     */
    clearFiles() {
      this.$refs.upload.clearFiles();
    },

  },

  created() {
    this.setVal(this.value);
  },

  mounted() {
  },
});
