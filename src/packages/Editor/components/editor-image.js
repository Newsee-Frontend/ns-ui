import Dialog from '../../Dialog/Dialog';
import Button from '../../Button/Button';
import editorBtn from './editor-btn';

export default {
  name: 'editor-image',
  components: { Dialog, Button, editorBtn },
  props: {
    pluginConfig: { type: Object },
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
    };
  },
  watch: {
    dialogVisible(value) {
      this.$refs['editor-image-dialog'].turnState(value);
    },
  },
  render(h) {
    const upload = () => {
      return h(
        'el-upload',
        {
          class: 'editor-slide-upload',
          props: {
            multiple: true,
            'show-file-list': true,
            'before-upload': this.beforeUpload,
            action: this.pluginConfig.action,
            headers: this.pluginConfig.headers,
            'list-type': 'picture-card',
            'on-remove': this.handleRemove,
            'on-success': this.handleSuccess,
          },
        },
        [<i class="el-icon-upload" />]
      );
    };

    const DialogUpload = () => {
      return (
        <Dialog
          ref={'editor-image-dialog'}
          custom-class={'editor-image-dialog'}
          title={'上传'}
          autoHeight={true}
          size={'small'}
          modal={false}
          on-close={this.dialogClose}
        >
          {upload()}
          <div class={`v-modal ${!this.dialogVisible ? 'hide' : ''}`} />
          <div slot="footer">
            <Button
              on-click={_ => {
                this.dialogVisible = false;
              }}
            >
              取 消
            </Button>
            <Button type={'primary'} on-click={this.handleSubmit}>
              确 定
            </Button>
          </div>
        </Dialog>
      );
    };

    return h(
      'div',
      {
        class: 'editor-image',
      },
      [
        h('editor-btn', {
          class: 'editor-upload__btn',
          props: {
            'icon-class': 'image',
          },
          on: {
            'editor-btn-click': _ => {
              this.dialogVisible = true;
            },
          },
        }),
        DialogUpload(),
      ]
    );
  },
  methods: {
    /**
     * check all img info (key:hasSuccess =  true)
     */
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess);
    },
    /**
     * submit to editor
     */
    handleSubmit() {
      const imgInfoList = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！');
        return;
      }
      this.$emit('image-submit', imgInfoList);
      this.listObj = {};
      this.dialogVisible = false;
    },

    /**
     * before upload
     * @param file
     * @returns {boolean}
     */
    beforeUpload(file) {
      if (this.pluginConfig.beforeUpload && this.pluginConfig.beforeUpload(file) !== true) {
        return false;
      }
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function() {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height,
          };
        };
        resolve(true);
      });
    },

    /**
     * handle success
     * @param response
     * @param file
     */
    handleSuccess(response, file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      const responseHandleFn = this.pluginConfig.response;

      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          // this.listObj[objKeyArr[i]].url = response.files.file;
          this.listObj[objKeyArr[i]].url = responseHandleFn(response);
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    },
    /**
     * remove img in picture-card
     * @param file
     */
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    /**
     * dialog close
     */
    dialogClose() {
      this.dialogVisible = false;
    },
  },
};
