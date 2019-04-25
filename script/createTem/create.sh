#!/usr/bin/env sh

WORKDIR=shtest

dev_path='shtest'
template_src='shtest22'
style_entry="index.scss"


set -e
echo "Enter folder name : "
read DIRNAME

echo "Your inputs: $DIRNAME - are you sure? (y/n)"
read -p -n $REPLY

if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo 11111
  if [ ! -d $DIRNAME  ];then
    mkdir $dev_path/$DIRNAME
    mkdir $dev_path/$DIRNAME/style
    echo "文件夹 - $DIRNAME 创建完成"

    style_entry_path=$dev_path/$DIRNAME/style/$style_entry
    touch $style_entry_path

    template_path=$dev_path/$DIRNAME/$DIRNAME.js
    touch $template_path
    echo "first line" > $template_path

    echo "文件 - $style_entry $DIRNAME.js 创建完成"

  else
    echo dir exist
  fi
fi
