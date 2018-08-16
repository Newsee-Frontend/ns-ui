<template>
  <canvas id="vue-matrix-raindrop"></canvas>
</template>
<script>
  export default {
    name: 'matrix-raindrop',
    //插件的各种参数
    props: {
      canvasWidth: {type: Number, default: 800},//canvas宽度
      canvasHeight: {type: Number, default: 600}, //canvas高度
      fontSize: {type: Number, default: 20},  //下落字体大小
      fontFamily: {type: String, default: 'arial'},  //字体类型
      textContent: {type: String, default: 'abcdefghijklmnopqrstuvwxyz'}, //字体文本内容，会随机从字符串里取一个
      //字体颜色
      textColor: {
        type: String, default: '#0F0',
        validator: function (value) {
          const colorReg = /^#([0-9a-fA-F]{6})|([0-9a-fA-F]{3})$/g;
          return colorReg.test(value);
        }
      },
      //canvas背景颜色，可自定义
      backgroundColor: {
        type: String, default: 'rgba(0,0,0,0.1)',
        validator: function (value) {
          let reg = /^[rR][gG][Bb][Aa][\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$/;
          return reg.test(value);
        }
      },
      //下落速度
      speed: {
        type: Number, default: 2,
        validator: function (value) {
          return value % 1 === 0;
        }
      }
    },
    mounted: function () {
      this.initRAF();
      this.initCanvas();
      this.initRainDrop();
      this.animationUpdate();
    },
    methods: {
      //初始化requestAnitaionFrame，注意兼容性
      initRAF() {
        window.requestAnimationFrame = (function () {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        })();
        window.cancelAnimationFrame = (function () {
          return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
              window.clearTimeout(id);
            };
        })();
      },
      //初始化canvas
      initCanvas() {
        this.canvas = document.getElementById('vue-matrix-raindrop');
        //需要判断获取到的canvas是否是真的canvas
        if (this.canvas.tagName.toLowerCase() !== 'canvas') {
          console.error("Error! Invalid canvas! Please check the canvas's id!")
        }
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvasCtx = this.canvas.getContext('2d');
        this.canvasCtx.font = this.fontSize + 'px ' + this.fontFamily;
        this.columns = this.canvas.width / this.fontSize;
      },
      //初始化数字雨下落的初始y轴位置
      initRainDrop() {
        for (let i = 0; i < this.columns; i++) {
          this.rainDropPositionArray.push(0);
        }
      },
      //核心动画函数，控制数字雨下落
      animationUpdate() {
        //控制雨滴下落的速度
        this.speedCnt++;
        //speed为1最快，越大越慢
        if (this.speedCnt === this.speed) {
          this.speedCnt = 0;
          //绘制背景
          this.canvasCtx.fillStyle = this.backgroundColor;
          this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          //绘制文字
          this.canvasCtx.fillStyle = this.textColor;
          //遍历每一列的数字雨，然后在canvas上绘制该数字字母
          for (let i = 0, len = this.rainDropPositionArray.length; i < len; i++) {
            this.rainDropPositionArray[i]++;
            let randomTextIndex = Math.floor(Math.random() * this.textContent.length);
            let randomText = this.textContent[randomTextIndex];
            let textYPostion = this.rainDropPositionArray[i] * this.fontSize;
            this.canvasCtx.fillText(randomText, i * this.fontSize, textYPostion);
            //数字雨触碰canvas底部则一定概率重新回到顶部继续下落
            if (textYPostion > this.canvasHeight) {
              if (Math.random() > 0.9) {
                this.rainDropPositionArray[i] = 0;
              }
            }
          }
        }
        window.requestAnimationFrame(this.animationUpdate)
      }
    },
    data() {
      return {
        canvasCtx: null,
        canvas: null,
        columns: 0,
        rainDropPositionArray: [],
        speedCnt: 0
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
