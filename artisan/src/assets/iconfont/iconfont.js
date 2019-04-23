/*=====================================================================================================================
 * svg config
 * svg-config, add func to handle fill in order to control the color of svg by switch-fill
 * created: 2017/11/21.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
=====================================================================================================================*/
import Sprite from './svg-sprite';

(function(window) {
  //all svg-sprite-data
  const AllSprite = Sprite ? Sprite : [];
  //Circular array
  AllSprite.map((item, index) => {
    funs(0);

    /*Nested method to ensure that the next cycle is executed after each cycle is executed
    嵌套方法，保证每次循环执行完毕后再执行下一次循环*/
    function funs(index) {
      if (index === AllSprite.length) return;
      //this is sprite-data we need ( import !!!!!!!!!!!!!!!!! )
      let svgSprite = item.data;
      const script = (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      })();
      const shouldInjectCss = script.getAttribute('data-injectcss');
      const ready = function(fn) {
        if (document.addEventListener) {
          if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
            setTimeout(fn, 0);
          } else {
            var loadFn = function() {
              document.removeEventListener('DOMContentLoaded', loadFn, false);
              fn();
            };
            document.addEventListener('DOMContentLoaded', loadFn, false);
          }
        } else if (document.attachEvent) {
          IEContentLoaded(window, fn);
        }

        function IEContentLoaded(w, fn) {
          var d = w.document,
            done = false,
            init = function() {
              if (!done) {
                done = true;
                fn();
              }
            };
          var polling = function() {
            try {
              d.documentElement.doScroll('left');
            } catch (e) {
              setTimeout(polling, 50);
              return;
            }
            init();
          };
          polling();
          d.onreadystatechange = function() {
            if (d.readyState === 'complete') {
              d.onreadystatechange = null;
              init();
            }
          };
        }
      };
      const before = function(el, target) {
        target.parentNode.insertBefore(el, target);
      };
      const prepend = function(el, target) {
        if (target.firstChild) {
          before(el, target.firstChild);
        } else {
          target.appendChild(el);
        }
      };

      //judge remove fill or not by key of fill in svg-sprite-data
      function judgeFill(svg) {
        const path = svg.getElementsByTagName('path');
        //judge fill-switch is open or close
        if (item.fill) {
          for (var i = 0; i < path.length; i++) {
            //remove attribute 'fill'
            path[i].removeAttribute('fill');
          }
        } else {
          return;
        }
      }

      //append
      function appendSvg() {
        var div, svg;
        div = document.createElement('div');
        div.innerHTML = svgSprite;
        svgSprite = null;
        svg = div.getElementsByTagName('svg')[0];
        if (svg) {
          svg.setAttribute('aria-hidden', 'true');
          svg.style.position = 'absolute';
          svg.style.width = 0;
          svg.style.height = 0;
          svg.style.overflow = 'hidden';
          prepend(svg, document.body);
          //judge remove fill or not by key of fill in svg-sprite-data
          judgeFill(svg);
        }
      }
      if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
        window.__iconfont__svg__cssinject__ = true;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          );
        } catch (e) {
          console && console.log(e);
        }
      }
      ready(appendSvg);
      funs(index + 1);
    }
  });
})(window);
