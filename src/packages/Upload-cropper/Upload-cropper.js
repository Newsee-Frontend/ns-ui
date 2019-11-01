import create from '../../create/create';
import Upload from '../Upload/Upload';
import CropperDialog from './components/cropper-dialog';
export default create({
  name: 'upload-cropper',

  components: { Upload, CropperDialog },

  props: {
    value: [Array],
    type: {
      type: String,
      default: 'picture-single',
    },
    width: {
      type: [String, Number],
      default: '148px',
    },
    height: {
      type: [String, Number],
      default: '148px',
    },
    disabled: { type: Boolean, default: false },
    beforeUpload: Function,
    limit: Number, //最多上传
    exceedLimitHiddenEntrance: {
      type: Boolean,
      default: false,
    }, //照片墙超过后是否隐藏入口

    //截图的size
    fixedNumber: {
      type: Array,
      default: () => [320, 160],
    },

    outputCropType: String, //输出的类型  data（base64） 或者 blob
  },

  data() {
    return {
      childUpload: [],
      showDialog: false,
      imgFile: '',
    };
  },

  computed: {},

  watch: {
    value(val) {
      this.childUpload = val;
    },
  },

  render(h) {
    const upload = h(Upload, {
      attrs: {
        action: 'string',
        value: this.childUpload,
        type: this.type,
        autoUpload: false,
        width: this.width,
        height: this.height,
        disabled: this.disabled,
        beforeUpload: this.beforeUpload,
        limit: this.limit,
        exceedLimitHiddenEntrance: this.exceedLimitHiddenEntrance,
        'on-change': this.changeFile,
      },
      on: {
        input: e => this.handleModel(e),
        change: e => this.$emit('change', e),
      },
    });

    const cropperDialog = h(CropperDialog, {
      attrs: {
        visible: this.showDialog,
        imgFile: this.imgFile,
        fixedNumber: this.fixedNumber,
        outputCropType: this.outputCropType,
      },
      on: {
        'update:visible': value => {
          this.showDialog = value;
        },
        close: () => {
          this.showDialog = false;
        },

        uploadImg: data => {
          this.$emit('uploadImg', data);
        },
      },
    });

    return h(
      'div',
      {
        class: this.recls([this.type]),
      },
      [upload, cropperDialog]
    );
  },

  methods: {
    handleModel(e) {
      this.childUpload = e;
      this.$emit('input', this.childUpload);
    },

    changeFile(file) {
      this.imgFile = URL.createObjectURL(file.raw);
      this.showDialog = true;
    },
  },

  created() {},

  mounted() {},
});
