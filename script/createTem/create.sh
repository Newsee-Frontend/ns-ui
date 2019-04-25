#!/usr/bin/env sh
set -e

dev_path='src/packages'
template_src='artisan/src/pages'
style_entry="index.scss"


 createTemplatePath() {
    if [ ! -d $template_src/$ORGNAME/$DIRNAME  ];then

        mkdir $template_src/$ORGNAME/$DIRNAME

        templatepage_path=$template_src/$ORGNAME/$DIRNAME/$DIRNAME.vue
        touch $templatepage_path

        echo "<!--UI 组件库 - $DIRNAME - 页面测试-->" >> $templatepage_path

        while read line
          do
          echo $line >> $templatepage_path
        done  < ./script/createTem/templatepage.vue

        echo "File - $templatepage_path create successfull. "
    else
        echo File exist - $template_src/$ORGNAME/$DIRNAME
    fi
}


echo "Enter components name : "
read DIRNAME

echo "Enter organization of components : "
read ORGNAME

echo "Your inputs: $DIRNAME - are you sure? (y/n)"
read -p -n $REPLY

if [[ $REPLY =~ ^[Yy]$ ]]
then
  if [ ! -d $dev_path/$DIRNAME  ];then

    # -- create dev dir --
    mkdir $dev_path/$DIRNAME
    mkdir $dev_path/$DIRNAME/style
    echo "文件夹 - $DIRNAME 创建完成"

    style_entry_path=$dev_path/$DIRNAME/style/$style_entry
    touch $style_entry_path

    template_path=$dev_path/$DIRNAME/$DIRNAME.js
    touch $template_path

    while read line
      do
      echo $line >> $template_path
    done  < ./script/createTem/template.js


    echo "File - $style_entry $DIRNAME.js create successfull."

    # -- create template test dir --
    if [ ! -d $template_src/$ORGNAME  ];then
      mkdir $template_src/$ORGNAME
      createTemplatePath
    else
      createTemplatePath
    fi
  else
    echo Dir exist - $dev_path/$DIRNAME
  fi
fi


