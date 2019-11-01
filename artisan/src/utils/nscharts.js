'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var _echarts = require('echarts'),
  _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}

function assign(e, t) {
  for (var o in t) !0 === t.hasOwnProperty(o) && (e[o] = t[o]);
  return e;
}

(Number.prototype.toFixed = function(e) {
  var t = Math.pow(10, e),
    o = Math.round(this * t) / t + '';
  if (0 !== e) {
    -1 === o.indexOf('.') && (o += '.');
    for (var r = o.length - o.indexOf('.') - 1, i = 0; i < e - r; i++) o += '0';
  }
  return o;
}),
  _echarts2.default.registerTheme('customed', {
    color: ['#1595ff', '#00c7a0', '#f6c041', '#f66d41', '#f641ab', '#a44cf4'],
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textStyle: {},
    title: { textStyle: { color: '#333' }, subtextStyle: { color: '#aaa' } },
    line: {
      itemStyle: { normal: { borderWidth: '0' } },
      lineStyle: { normal: { width: '2' } },
      symbolSize: '5',
      symbol: 'emptyCircle',
      smooth: !0,
    },
    radar: {
      itemStyle: { normal: { borderWidth: '0' } },
      lineStyle: { normal: { width: '2' } },
      symbolSize: '2',
      symbol: 'emptyCircle',
      smooth: !0,
    },
    bar: {
      itemStyle: {
        normal: { barBorderWidth: 0, barBorderColor: '#ccc' },
        emphasis: { barBorderWidth: 0, barBorderColor: '#ccc' },
      },
    },
    pie: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    scatter: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    boxplot: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    parallel: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    sankey: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    funnel: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    gauge: {
      itemStyle: {
        normal: { borderWidth: 0, borderColor: '#ccc' },
        emphasis: { borderWidth: 0, borderColor: '#ccc' },
      },
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#c23531',
          color0: '#314656',
          borderColor: '#c23531',
          borderColor0: '#314656',
          borderWidth: 1,
        },
      },
    },
    graph: {
      itemStyle: { normal: { borderWidth: 0, borderColor: '#ccc' } },
      lineStyle: { normal: { width: 1, color: '#aaa' } },
      symbolSize: '2',
      symbol: 'emptyCircle',
      smooth: !0,
      color: ['#1595ff', '#00c7a0', '#f6c041', '#f66d41', '#f641ab', '#a44cf4'],
      label: { normal: { textStyle: { color: '#333333' } } },
    },
    map: {
      itemStyle: {
        normal: { areaColor: '#eee', borderColor: '#444', borderWidth: 0.5 },
        emphasis: { areaColor: 'rgba(255,215,0,0.8)', borderColor: '#444', borderWidth: 1 },
      },
      label: {
        normal: { textStyle: { color: '#000' } },
        emphasis: { textStyle: { color: 'rgb(100,0,0)' } },
      },
    },
    geo: {
      itemStyle: {
        normal: { areaColor: '#eee', borderColor: '#444', borderWidth: 0.5 },
        emphasis: { areaColor: 'rgba(255,215,0,0.8)', borderColor: '#444', borderWidth: 1 },
      },
      label: {
        normal: { textStyle: { color: '#000' } },
        emphasis: { textStyle: { color: 'rgb(100,0,0)' } },
      },
    },
    categoryAxis: {
      axisLine: { show: !1, lineStyle: { color: '#333' } },
      axisTick: { show: !1, lineStyle: { color: '#333' } },
      axisLabel: { show: !0, textStyle: { color: '#666666' } },
      splitLine: { show: !1, lineStyle: { color: ['#ccc'] } },
      splitArea: {
        show: !1,
        areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] },
      },
    },
    valueAxis: {
      axisLine: { show: !1, lineStyle: { color: 'red' } },
      axisTick: { show: !1, lineStyle: { color: '#333' } },
      axisLabel: { show: !0, textStyle: { color: '#999999' } },
      splitLine: { show: !0, lineStyle: { color: ['#efefef'] } },
      splitArea: {
        show: !1,
        areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] },
      },
    },
    logAxis: {
      axisLine: { show: !1, lineStyle: { color: 'red' } },
      axisTick: { show: !1, lineStyle: { color: '#333' } },
      axisLabel: { show: !1, textStyle: { color: '#333' } },
      splitLine: { show: !1, lineStyle: { color: ['#ccc'] } },
      splitArea: { show: !1, areaStyle: { color: ['red', 'rgba(200,200,200,0.3)'] } },
    },
    timeAxis: {
      axisLine: { show: !1, lineStyle: { color: 'red' } },
      axisTick: { show: !1, lineStyle: { color: '#333' } },
      axisLabel: { show: !1, textStyle: { color: '#333' } },
      splitLine: { show: !1, lineStyle: { color: ['#ccc'] } },
      splitArea: {
        show: !1,
        areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] },
      },
    },
    toolbox: {
      iconStyle: { normal: { borderColor: '#999999' }, emphasis: { borderColor: '#666666' } },
    },
    legend: { textStyle: { color: '#333333' } },
    tooltip: {
      axisPointer: {
        lineStyle: { color: '#ccc', width: 1 },
        crossStyle: { color: '#ccc', width: 1 },
      },
    },
    timeline: {
      lineStyle: { color: '#293c55', width: '1' },
      itemStyle: { normal: { color: '#293c55', borderWidth: 1 }, emphasis: { color: '#a9334c' } },
      controlStyle: {
        normal: { color: '#293c55', borderColor: '#293c55', borderWidth: 0.5 },
        emphasis: { color: '#293c55', borderColor: '#293c55', borderWidth: 0.5 },
      },
      checkpointStyle: { color: '#2b181c', borderColor: 'rgba(194,53,49, 0.5)' },
      label: {
        normal: { textStyle: { color: '#293c55' } },
        emphasis: { textStyle: { color: '#293c55' } },
      },
    },
    visualMap: { color: ['#1595ff', '#00c7a0', '#f6c041', '#f66d41', '#f641ab', '#a44cf4'] },
    dataZoom: {
      backgroundColor: 'rgba(47,69,84,0)',
      dataBackgroundColor: 'rgba(47,69,84,0.3)',
      fillerColor: 'rgba(167,183,204,0.4)',
      handleColor: '#a7b7cc',
      handleSize: '100%',
      textStyle: { color: '#333' },
    },
    markPoint: {
      label: {
        normal: { textStyle: { color: '#333333' } },
        emphasis: { textStyle: { color: '#333333' } },
      },
    },
  }),
  (exports.default = {
    _tooltipStyle: {
      padding: [11, 16],
      width: 159,
      height: 64,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#e5e5e5',
      extraCssText: 'box-shadow: 0 3px 6px 0 rgba(0,0,0,0.24);',
      textStyle: { color: '#333', fontSize: 14 },
    },
    _colorList: [
      {
        normal: {
          color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1595ff' },
            {
              offset: 1,
              color: '#8c53ca',
            },
          ]),
        },
      },
      {
        normal: {
          color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ffa87a' },
            {
              offset: 1,
              color: '#ff6161',
            },
          ]),
        },
      },
      {
        normal: {
          color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a5ec27' },
            {
              offset: 1,
              color: '#4ed552',
            },
          ]),
        },
      },
      {
        normal: {
          color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#11d6cb' },
            { offset: 1, color: '#23c8c4' },
          ]),
        },
      },
    ],
    pieChart: function(e, t, o) {
      for (
        var r = assign(
            {
              centerPosition: ['30%', '50%'],
              radiusScale: ['50%', '70%'],
              textPosition: ['29%', '44%'],
              text: ['', ''],
              color: '#333',
              fontSize: 12,
              subtextFontSize: 12,
              legendPosition: ['50%', '25%'],
              legendMaxRowNum: 5,
              legendFontSize: 12,
              tooltipConfine: !1,
              tooltipUnit: '',
              clickFn: null,
            },
            o
          ),
          i = [],
          a = [],
          l = e.length >= r.legendMaxRowNum ? r.legendMaxRowNum : e.length,
          n = 15 * l + 10 * (l - 1),
          s = 0;
        s < e.length;
        s++
      )
        i.push({
          name: e[s].targetItem,
          icon: 'circle',
        }),
          a.push({ name: e[s].targetItem, value: e[s].actualTarget });
      var c = _echarts2.default.init(document.getElementById(t), 'customed'),
        d = assign(
          {
            trigger: 'item',
            confine: r.tooltipConfine,
            formatter: function(e) {
              var t = r.tooltipUnit;
              return (
                4 < parseInt(e.value).toString().length &&
                  ((e.value = (parseFloat(e.value) / 1e4).toFixed(2)),
                  (t = -1 < r.tooltipUnit.indexOf('万') ? t.replace('万', '亿') : '万' + t)),
                e.name + '<br>' + e.value + t + ' (' + e.percent + '%)'
              );
            },
          },
          this.__tooltipStyle
        );
      c.setOption({
        title: {
          text: r.text[0],
          subtext: r.text[1],
          left: r.textPosition[0],
          top: r.textPosition[1],
          itemGap: 0,
          textAlign: 'center',
          triggerEvent: !0,
          textStyle: {
            fontWeight: 'bold',
            lineHeight: r.fontSize,
            fontSize: r.fontSize,
            color: r.color,
          },
          subtextStyle: {
            fontWeight: 'bold',
            lineHeight: r.subtextFontSize,
            fontSize: r.subtextFontSize,
            color: r.color,
          },
        },
        tooltip: d,
        legend: {
          left: r.legendPosition[0],
          top: r.legendPosition[1],
          height: n,
          orient: 'vertical',
          selectedMode: !1,
          data: i,
          textStyle: { lineHeight: 15, fontSize: r.legendFontSize },
        },
        series: [
          {
            type: 'pie',
            radius: r.radiusScale,
            center: r.centerPosition,
            avoidLabelOverlap: !1,
            data: a,
            label: { show: !1 },
          },
        ],
      }),
        r.clickFn && c.on('click', r.clickFn);
    },
    simplePieChart: function(e, t, o) {
      var r;
      1 == e.length
        ? (r = parseFloat(e[0][0].actualTarget))
        : (r = (e[0][0].actualTarget / e[1][0].actualTarget) * 100);
      var i = assign(
          {
            centerPosition: ['50%', '50%'],
            radiusScale: ['50%', '70%'],
            textPosition: ['49%', '44%'],
            text: '',
            color: '#333',
            fontSize: 12,
            subtextFontSize: 12,
            tooltipText: ['', ''],
            clickFn: null,
          },
          o
        ),
        a = _echarts2.default.init(document.getElementById(t), 'customed'),
        l = assign(
          {
            trigger: 'item',
            formatter: function(e) {
              return 0 == e.dataIndex ? i.tooltipText[0] : i.tooltipText[1];
            },
          },
          this._tooltipStyle
        );
      a.setOption({
        title: {
          text: i.text,
          subtext: r.toFixed(2) + '%',
          left: i.textPosition[0],
          top: i.textPosition[1],
          itemGap: 0,
          textAlign: 'center',
          triggerEvent: !0,
          textStyle: {
            fontWeight: 'bold',
            lineHeight: i.fontSize,
            fontSize: i.fontSize,
            color: i.color,
          },
          subtextStyle: {
            fontWeight: 'bold',
            lineHeight: i.subtextFontSize,
            fontSize: i.subtextFontSize,
            color: i.color,
          },
        },
        tooltip: l,
        series: [
          {
            type: 'pie',
            radius: i.radiusScale,
            center: i.centerPosition,
            avoidLabelOverlap: !1,
            hoverAnimation: !1,
            data: [
              {
                name: '',
                value: r,
                itemStyle: {
                  color: new _echarts2.default.graphic.LinearGradient(0, 0.5, 0.5, 1, [
                    { offset: 0, color: '#DDFF36' },
                    { offset: 1, color: '#00FFA0' },
                  ]),
                },
              },
              { name: '', value: 100 - r, itemStyle: { color: '#000', opacity: 0.5 } },
            ],
            label: { show: !1 },
          },
        ],
      }),
        i.clickFn && a.on('click', i.clickFn);
    },
    labelLinePieChart: function(e, t, o) {
      for (
        var r = assign(
            {
              centerPosition: ['30%', '50%'],
              radiusScale: ['50%', '70%'],
              legendPosition: ['50%', '25%'],
              legendMaxRowNum: 5,
              legendFontSize: 12,
              labelLineLength: 10,
              labelLineLength2: 10,
              tooltipUnit: '',
              clickFn: null,
            },
            o
          ),
          i = [],
          a = [],
          l = e.length >= r.legendMaxRowNum ? r.legendMaxRowNum : e.length,
          n = 15 * l + 10 * (l - 1),
          s = 0;
        s < e.length;
        s++
      )
        i.push({
          name: e[s].targetItem,
          icon: 'circle',
        }),
          a.push({ value: e[s].actualTarget, name: e[s].targetItem });
      var c = _echarts2.default.init(document.getElementById(t), 'customed'),
        d = assign(
          {
            trigger: 'item',
            formatter: function(e) {
              var t = r.tooltipUnit;
              return (
                4 < parseInt(e.value).toString().length &&
                  ((e.value = (parseFloat(e.value) / 1e4).toFixed(2)),
                  (t = -1 < r.tooltipUnit.indexOf('万') ? t.replace('万', '亿') : '万' + t)),
                e.name + '<br>' + e.value + t + ' (' + e.percent + '%)'
              );
            },
          },
          this._tooltipStyle
        );
      c.setOption({
        tooltip: d,
        legend: {
          left: r.legendPosition[0],
          top: r.legendPosition[1],
          height: n,
          orient: 'vertical',
          selectedMode: !1,
          data: i,
          textStyle: { lineHeight: 15, fontSize: r.legendFontSize },
        },
        series: [
          {
            type: 'pie',
            radius: r.radiusScale,
            center: r.centerPosition,
            avoidLabelOverlap: !0,
            data: a,
            label: { lineHeight: 12, formatter: '{b}：{c} ({d}%)' },
            labelLine: { length: r.labelLineLength, length2: r.labelLineLength2 },
          },
        ],
      }),
        r.clickFn && c.on('click', r.clickFn);
    },
    columnChart: function(e, t, o) {
      var l = assign(
          {
            gridLeft: 30,
            gridTop: 60,
            gridRight: 30,
            gridBottom: 30,
            legendTop: 10,
            legendName: [''],
            tooltipUnit: '',
            xAxisFontSize: 12,
            xAxisMaxCharNum: 2,
            xAxisFilter: '',
            yAxisUnit: '',
            yAxisSplitNum: 5,
            dataZoomStyle: [0, 100, !1],
            showPlan: !1,
            clickFn: null,
          },
          o
        ),
        r = [],
        i = [];
      if (l.showPlan) {
        if (1 < e.length) throw '当设置showPlan的值为true时，数组长度不能大于1';
        for (var a = [], n = [], s = 0; s < e[0].length; s++)
          r.push(e[0][s].departmentName.replace(l.xAxisFilter, '')),
            a.push(e[0][s].shouldTarget),
            n.push(e[0][s].actualTarget);
        i.push({
          type: 'bar',
          name: l.legendName[0],
          data: a,
          itemStyle: this._colorList[0],
          barMaxWidth: 20,
          barCategoryGap: '30%',
        }),
          i.push({
            type: 'bar',
            name: l.legendName[1],
            data: n,
            itemStyle: this._colorList[1],
            barMaxWidth: 20,
            barCategoryGap: '30%',
          });
      } else
        for (var c = [], d = 0; d < e.length; d++) {
          c.push([]);
          for (var g = 0; g < e[d].length; g++)
            0 == d && r.push(e[d][g].departmentName.replace(l.xAxisFilter, '')),
              c[d].push(e[d][g].actualTarget);
          i.push({
            type: 'bar',
            name: l.legendName[d],
            data: c[d],
            itemStyle: this._colorList[d],
            barMaxWidth: 20,
            barCategoryGap: '30%',
          });
        }
      var h = _echarts2.default.init(document.getElementById(t), 'customed'),
        m = assign(
          {
            trigger: 'axis',
            formatter: function(e) {
              for (var t = e[0].name, o = 0; o < e.length; o++) {
                t +=
                  '<br>' +
                  ('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                    e[o].color.colorStops[0].color +
                    ';"></span>') +
                  e[o].seriesName +
                  '：' +
                  e[o].value +
                  l.tooltipUnit;
              }
              return t;
            },
          },
          this._tooltipStyle
        );
      h.setOption({
        tooltip: m,
        grid: {
          left: l.gridLeft,
          top: l.gridTop,
          right: l.gridRight,
          bottom: l.gridBottom,
          containLabel: !0,
        },
        legend: { top: l.legendTop, data: l.legendName },
        xAxis: {
          offset: 0,
          data: r,
          axisLabel: {
            lineHeight: l.xAxisFontSize,
            fontSize: l.xAxisFontSize,
            formatter: function(e) {
              for (
                var t = '', o = l.xAxisMaxCharNum, r = Math.ceil(e.length / o), i = 0;
                i < r;
                i++
              ) {
                var a = e.slice(i * o, (i + 1) * o);
                0 < r - 1 && (a += '\n'), (t += a);
              }
              return t;
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: l.yAxisSplitNum,
          axisLabel: {
            formatter: function(e) {
              return e + l.yAxisUnit;
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            zoomOnMouseWheel: !1,
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            show: l.dataZoomStyle[2],
            zoomLock: !0,
          },
        ],
        series: i,
      }),
        l.clickFn && h.on('click', l.clickFn);
    },
    stackedBarChart: function(e, t, o) {
      var l = assign(
          {
            gridLeft: 30,
            gridTop: 60,
            gridRight: 30,
            gridBottom: 30,
            legendTop: 10,
            legendName: [''],
            tooltipUnit: '',
            xAxisFontSize: 12,
            xAxisMaxCharNum: 2,
            xAxisFilter: '',
            yAxisUnit: '',
            yAxisSplitNum: 5,
            dataZoomStyle: [0, 100, !1],
            clickFn: null,
          },
          o
        ),
        r = [],
        i = [],
        a = [],
        n = l.legendName[0],
        s = {};
      l.legendName.shift();
      for (var c = 0; c < e.length; c++) {
        a.push([]);
        for (var d = 0; d < e[c].length; d++)
          0 != c
            ? a[c].push(e[c][d].actualTarget)
            : (r.push(e[c][d].departmentName.replace(l.xAxisFilter, '')),
              (s[e[c][d].departmentName.replace(l.xAxisFilter, '')] = e[c][d].actualTarget));
        0 != c &&
          i.push({
            type: 'bar',
            name: l.legendName[c - 1],
            data: a[c],
            itemStyle: this._colorList[c - 1],
            barMaxWidth: 20,
            barCategoryGap: '30%',
            stack: '1',
          });
      }
      var g = _echarts2.default.init(document.getElementById(t), 'customed'),
        h = assign(
          {
            trigger: 'axis',
            formatter: function(e) {
              e.unshift({
                seriesName: n,
                value: s[e[0].name],
                color: { colorStops: [{ color: 'white' }] },
              });
              for (var t = e[1].name, o = 0; o < e.length; o++) {
                var r =
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                  e[o].color.colorStops[0].color +
                  ';"></span>';
                0 == o && (r = ''),
                  (t += '<br>' + r + e[o].seriesName + '：' + e[o].value + l.tooltipUnit);
              }
              return t;
            },
          },
          this._tooltipStyle
        );
      g.setOption({
        tooltip: h,
        grid: {
          left: l.gridLeft,
          top: l.gridTop,
          right: l.gridRight,
          bottom: l.gridBottom,
          containLabel: !0,
        },
        legend: { top: l.legendTop, data: l.legendName },
        xAxis: {
          offset: 0,
          data: r,
          axisLabel: {
            lineHeight: l.xAxisFontSize,
            fontSize: l.xAxisFontSize,
            formatter: function(e) {
              for (
                var t = '', o = l.xAxisMaxCharNum, r = Math.ceil(e.length / o), i = 0;
                i < r;
                i++
              ) {
                var a = e.slice(i * o, (i + 1) * o);
                0 < r - 1 && (a += '\n'), (t += a);
              }
              return t;
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: l.yAxisSplitNum,
          axisLabel: {
            formatter: function(e) {
              return e + l.yAxisUnit;
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            zoomOnMouseWheel: !1,
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            show: l.dataZoomStyle[2],
            zoomLock: !0,
          },
        ],
        series: i,
      });
    },
    barChart: function(e, t, o) {
      for (
        var r = assign(
            {
              gridLeft: 30,
              gridTop: 30,
              gridRight: 30,
              gridBottom: 30,
              tooltipUnit: '',
              yAxisUnit: '',
              yAxisFontSize: 12,
              yAxisFilter: '',
              clickFn: null,
            },
            o
          ),
          i = [],
          a = [],
          l = 0;
        l < e[0].length;
        l++
      )
        i.push(e[0][e[0].length - 1 - l].departmentName.replace(r.yAxisFilter, '')),
          a.push(e[0][e[0].length - 1 - l].actualTarget);
      var n = _echarts2.default.init(document.getElementById(t), 'customed'),
        s = assign(
          { trigger: 'item', formatter: '{b0}<br>{c0}' + r.tooltipUnit },
          this._tooltipStyle
        );
      n.setOption({
        tooltip: s,
        grid: {
          left: r.gridLeft,
          top: r.gridTop,
          right: r.gridRight,
          bottom: r.gridBottom,
          containLabel: !0,
        },
        xAxis: { type: 'value', show: !1 },
        yAxis: { data: i, axisLabel: { fontSize: r.yAxisFontSize } },
        series: [
          {
            type: 'bar',
            data: a,
            barWidth: 14,
            barGap: 10,
            smooth: !0,
            label: {
              show: !0,
              position: 'right',
              offset: [5, 1],
              textStyle: { color: '#000', fontSize: 13 },
              formatter: '{c}' + r.yAxisUnit,
            },
            itemStyle: {
              color: new _echarts2.default.graphic.LinearGradient(0, 0, 0.5, 1, [
                { offset: 0, color: '#1595ff' },
                { offset: 1, color: '#12edff' },
              ]),
            },
          },
        ],
      });
    },
    ganttChart: function(e, t, o) {
      for (
        var a = assign(
            {
              gridLeft: 0,
              gridTop: 60,
              gridRight: 30,
              gridBottom: 30,
              scale: 3,
              xAxisFontSize: 12,
              clickFn: null,
            },
            o
          ),
          r = [],
          i = [],
          l = [],
          n = e[0].date.slice(0, 4),
          s = e[0].date.slice(4),
          c = 0;
        c < e.length;
        c++
      ) {
        r.push(e[c].actualTarget), i.push(c * a.scale);
        for (var d = [], g = 0; g < e.length; g++) d[g] = 0;
        (d[c] = 1 * a.scale),
          l.push({
            type: 'bar',
            name: e[c].actualTarget,
            data: d,
            barMaxWidth: 24,
            stack: '1',
            itemStyle: {
              color: new _echarts2.default.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#1595FF' },
                { offset: 1, color: '#12EDFF' },
              ]),
            },
            label: {
              show: !0,
              fontSize: 13,
              offset: [0, 2],
              color: '#fff',
              formatter: function(e) {
                return e.seriesIndex - 1 == e.dataIndex ? e.name : '';
              },
            },
          });
      }
      l.unshift({
        type: 'bar',
        name: 'blank',
        data: i,
        barMaxWidth: 24,
        stack: '1',
        itemStyle: { opacity: 0 },
      });
      var h = _echarts2.default.init(document.getElementById(t), 'customed'),
        m = assign(
          {
            trigger: 'item',
            formatter: function(e) {
              if ('blank' == e.seriesName) return '';
              var t = 1 * n,
                o = t,
                r = 1 * s + e.dataIndex * a.scale,
                i = r + a.scale - 1;
              return (
                12 < i && ((o += 1), (i -= 12), 12 < r && ((t += 1), (r -= 12))),
                e.name +
                  '<br>' +
                  t +
                  r.toString().replace(/^(\d)$/, '0$1') +
                  '~' +
                  o +
                  i.toString().replace(/^(\d)$/, '0$1')
              );
            },
          },
          this._tooltipStyle
        );
      h.setOption({
        tooltip: m,
        grid: {
          left: a.gridLeft,
          top: a.gridTop,
          right: a.gridRight,
          bottom: a.gridBottom,
          containLabel: !0,
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#666',
              lineHeight: a.xAxisFontSize,
              fontSize: a.xAxisFontSize,
              formatter: function(e) {
                var t = 1 * n,
                  o = 1 * s + e;
                return (
                  12 < o && ((t += 1), (o -= 12)),
                  o.toString().replace(/^(\d)$/, '0$1'),
                  t + '' + o.toString().replace(/^(\d)$/, '0$1')
                );
              },
            },
          },
        ],
        yAxis: [{ show: !1, data: r }],
        series: l,
      }),
        a.clickFn && h.on('click', a.clickFn);
    },
    lineChart: function(e, t, o) {
      for (
        var l = assign(
            {
              gridLeft: 30,
              gridTop: 60,
              gridRight: 30,
              gridBottom: 30,
              legendTop: 10,
              legendName: [''],
              tooltipUnit: '',
              xAxisFontSize: 12,
              xAxisMaxCharNum: 8,
              xAxisFilter: '',
              yAxisUnit: '',
              yAxisSplitNum: 5,
              dataZoomStyle: [0, 100, !1],
              clickFn: null,
            },
            o
          ),
          r = [
            { color: '#15a3ff' },
            { color: '#ff6161' },
            { color: '#4ed552' },
            { color: '#ffc715' },
          ],
          i = [
            {
              normal: {
                color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#15a3ff',
                  },
                  { offset: 1, color: 'rgba(41,197,255,0.20)' },
                ]),
                opacity: 0.3,
              },
            },
            {
              normal: {
                color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#ff6161' },
                  { offset: 1, color: 'rgba(255,97,97,0.25)' },
                ]),
                opacity: 0.3,
              },
            },
            {
              normal: {
                color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#4ed552' },
                  { offset: 1, color: 'rgba(78,213,82,0.20)' },
                ]),
                opacity: 0.3,
              },
            },
            {
              normal: {
                color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#ffc715' },
                  { offset: 1, color: 'rgba(255,199,21,0.20)' },
                ]),
                opacity: 0.3,
              },
            },
          ],
          a = [],
          n = [],
          s = [],
          c = 0;
        c < e.length;
        c++
      ) {
        s.push([]);
        for (var d = 0; d < e[c].length; d++) {
          var g = e[c][d].date;
          5 == g.length && (g = g.slice(0, 4) + '0' + g.slice(4)),
            0 == c && a.push(g.replace(l.xAxisFilter, '')),
            s[c].push(e[c][d].actualTarget);
        }
        n.push({
          type: 'line',
          name: l.legendName[c],
          data: s[c],
          itemStyle: r[c],
          areaStyle: i[c],
        });
      }
      var h = _echarts2.default.init(document.getElementById(t), 'customed'),
        m = assign(
          {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: { color: '#ccc', width: 1 },
              label: { precision: 2 },
              z: 0,
            },
            formatter: function(e) {
              for (var t = e[0].name, o = 0; o < e.length; o++)
                t += '<br>' + e[o].marker + e[o].seriesName + '：' + e[o].value + l.tooltipUnit;
              return t;
            },
          },
          this._tooltipStyle
        );
      h.setOption({
        tooltip: m,
        grid: {
          left: l.gridLeft,
          top: l.gridTop,
          right: l.gridRight,
          bottom: l.gridBottom,
          containLabel: !0,
        },
        legend: { top: l.legendTop, data: l.legendName },
        xAxis: {
          boundaryGap: !1,
          data: a,
          axisLabel: {
            lineHeight: l.xAxisFontSize,
            fontSize: l.xAxisFontSize,
            formatter: function(e) {
              for (
                var t = '', o = l.xAxisMaxCharNum, r = Math.ceil(e.length / o), i = 0;
                i < r;
                i++
              ) {
                var a = e.slice(i * o, (i + 1) * o);
                0 < r - 1 && (a += '\n'), (t += a);
              }
              return t;
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: l.yAxisSplitNum,
          axisLabel: {
            formatter: function(e) {
              return e + l.yAxisUnit;
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            zoomOnMouseWheel: !1,
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            show: l.dataZoomStyle[2],
            zoomLock: !0,
          },
        ],
        series: n,
      }),
        l.clickFn && h.on('click', l.clickFn);
    },
    barLineChart: function(e, t, o) {
      for (
        var l = assign(
            {
              gridLeft: 30,
              gridTop: 60,
              gridRight: 30,
              gridBottom: 30,
              legendTop: 10,
              legendName: ['', ''],
              tooltipUnit: '',
              xAxisFontSize: 12,
              xAxisMaxCharNum: 2,
              xAxisFilter: '',
              yAxisUnit: '',
              dataZoomStyle: [0, 100, !1],
              clickFn: null,
            },
            o
          ),
          r = [],
          i = [],
          a = [],
          n = [],
          s = 0;
        s < e.length;
        s++
      )
        r.push(e[s].departmentName.replace(l.xAxisFilter, '')),
          i.push(e[s].shouldTarget),
          a.push(e[s].actualTarget);
      n.push({ type: 'line', name: l.legendName[0], data: i, itemStyle: { color: '#4ED552' } }),
        n.push({
          type: 'bar',
          name: l.legendName[1],
          data: a,
          barMaxWidth: 20,
          itemStyle: {
            color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#1595ff' },
              { offset: 1, color: '#8c53ca' },
            ]),
          },
        });
      var c = _echarts2.default.init(document.getElementById(t), 'customed'),
        d = assign(
          {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: { color: '#ccc', width: 1 },
              label: { precision: 2 },
              z: 0,
            },
            formatter: function(e) {
              for (var t = e[0].name, o = 0; o < e.length; o++) {
                t +=
                  '<br>' +
                  ('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                    (e[o].color.colorStops ? e[o].color.colorStops[0].color : e[o].color) +
                    ';"></span>') +
                  e[o].seriesName +
                  '：' +
                  e[o].value +
                  l.tooltipUnit;
              }
              return t;
            },
          },
          this._tooltipStyle
        );
      c.setOption({
        tooltip: d,
        grid: {
          left: l.gridLeft,
          top: l.gridTop,
          right: l.gridRight,
          bottom: l.gridBottom,
          containLabel: !0,
        },
        legend: { top: l.legendTop, data: l.legendName },
        xAxis: {
          data: r,
          axisLabel: {
            lineHeight: l.xAxisFontSize,
            fontSize: l.xAxisFontSize,
            formatter: function(e) {
              for (
                var t = '', o = l.xAxisMaxCharNum, r = Math.ceil(e.length / o), i = 0;
                i < r;
                i++
              ) {
                var a = e.slice(i * o, (i + 1) * o);
                0 < r - 1 && (a += '\n'), (t += a);
              }
              return t;
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: l.yAxisSplitNum,
          axisLabel: {
            formatter: function(e) {
              return e + l.yAxisUnit;
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            zoomOnMouseWheel: !1,
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            start: l.dataZoomStyle[0],
            end: l.dataZoomStyle[1],
            show: l.dataZoomStyle[2],
            zoomLock: !0,
          },
        ],
        series: n,
      }),
        l.clickFn && c.on('click', l.clickFn);
    },
    barDoubleLineChart: function(e, t, o) {
      for (
        var l = assign(
            {
              gridLeft: 30,
              gridTop: 60,
              gridRight: 30,
              gridBottom: 30,
              legendTop: 10,
              legendName: ['', '', ''],
              tooltipUnit: '',
              xAxisFontSize: 12,
              xAxisMaxCharNum: 2,
              xAxisFilter: '',
              yAxisUnit: '',
              yAxisSplitNum: 5,
              dataZoomStyle: [0, 100, !1],
              showPlan: !1,
              clickFn: null,
            },
            o
          ),
          r = [],
          i = [],
          a = [],
          n = [],
          s = [],
          c = 0;
        c < e[0].length;
        c++
      )
        r.push(e[0][c].departmentName.replace(l.xAxisFilter, '')), i.push(e[0][c].actualTarget);
      s.push({
        type: 'bar',
        name: l.legendName[0],
        data: i,
        barMaxWidth: 20,
        itemStyle: {
          color: new _echarts2.default.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1595ff' },
            { offset: 1, color: '#8c53ca' },
          ]),
        },
      });
      for (var d = 0; d < e[1].length; d++) a.push(e[1][d].actualTarget);
      s.push({ type: 'line', name: l.legendName[1], data: a, itemStyle: { color: '#4ED552' } });
      for (var g = 0; g < e[2].length; g++) n.push(e[2][g].actualTarget);
      s.push({ type: 'line', name: l.legendName[2], data: n, itemStyle: { color: '#ff6161' } });
      var h = _echarts2.default.init(document.getElementById(t), 'customed'),
        m = assign(
          {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: { color: '#ccc', width: 1 },
              label: { precision: 2 },
              z: 0,
            },
            formatter: function(e) {
              for (var t = e[0].name, o = 0; o < e.length; o++) {
                t +=
                  '<br>' +
                  ('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                    (e[o].color.colorStops ? e[o].color.colorStops[0].color : e[o].color) +
                    ';"></span>') +
                  e[o].seriesName +
                  '：' +
                  e[o].value +
                  l.tooltipUnit;
              }
              return t;
            },
          },
          this._tooltipStyle
        );
      h.setOption({
        tooltip: m,
        grid: {
          left: l.gridLeft,
          top: l.gridTop,
          right: l.gridRight,
          bottom: l.gridBottom,
          containLabel: !0,
        },
        legend: { top: l.legendTop, data: l.legendName },
        xAxis: {
          data: r,
          axisLabel: {
            lineHeight: l.xAxisFontSize,
            fontSize: l.xAxisFontSize,
            formatter: function(e) {
              for (
                var t = '', o = l.xAxisMaxCharNum, r = Math.ceil(e.length / o), i = 0;
                i < r;
                i++
              ) {
                var a = e.slice(i * o, (i + 1) * o);
                0 < r - 1 && (a += '\n'), (t += a);
              }
              return t;
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: l.yAxisSplitNum,
          axisLabel: {
            formatter: function(e) {
              return e + l.yAxisUnit;
            },
          },
        },
        series: s,
      });
    },
  });
