// 该文件包含 JavaScript 代码，用于初始化 TinyMCE 编辑器并配置其选项。

document.addEventListener('DOMContentLoaded', function () {
    tinymce.init({
        selector: '#mytextarea',
        inline: true,
        //skin:'oxide-dark',
        language: 'zh_CN',
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave  autoresize ',
        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
        height: 650, //编辑器高度
        min_height: 200,
        /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
            '/static/reset.css',
            '/static/ax.css',
            '/static/css.css',
        ],*/
        fontsize_formats: '12px 13px 14px 16px 18px 20px 24px 28px 32px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        importcss_append: true,
        //自定义文件选择器的回调内容
        file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === 'file') {
                callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
            }
            if (meta.filetype === 'image') {
                callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
            }
            if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
            }
        },
        toolbar_sticky: true,
        autosave_ask_before_unload: false,
    });
});