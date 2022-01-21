var WebAudioWave = (function (D3) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var D3__namespace = /*#__PURE__*/_interopNamespace(D3);

  /**
   * 上下文
   */
  const context = {
      type: '',
      audio: null,
      frameRate: 60,
      fftSize: 512,
      pow: 1,
      svgWidth: '100%',
      svgHeight: '100%',
      viewBoxWidth: 1000,
      viewBoxHeight: 1000
  };
  Object.freeze(context);

  /**
   * FFT
   */
  /**
   * 类
   */
  class Fft {
      size;
      pow;
      analyser;
      /**
       * 构造方法
       * @param audio 音频组件
       * @param size 采样宽度。2的幂
       */
      constructor(context) {
          this.size = context.fftSize;
          this.pow = context.pow;
          let audioContext = new AudioContext();
          let source = audioContext.createMediaElementSource(context.audio);
          let analyser = audioContext.createAnalyser();
          this.analyser = analyser;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          analyser.fftSize = context.fftSize;
      }
      /**
       * 获取数据
       */
      get() {
          let data = new Uint8Array(this.size);
          this.analyser.getByteFrequencyData(data);
          const max = 256; // 2**8
          let output = Array.from(data).map(a => {
              a = a / max;
              if (this.pow !== 1) {
                  a = a ** this.pow;
              }
              return a;
          });
          return output;
      }
  }

  /**
   * 动画控制
   */
  /**
   * 状态
   */
  var State;
  (function (State) {
      State[State["stop"] = 0] = "stop";
      State[State["play"] = 1] = "play";
      State[State["pause"] = 2] = "pause";
  })(State || (State = {}));
  /**
   * 类
   */
  class Animate {
      callback;
      duration;
      currentTime = 0;
      accumulateTime = 0;
      lastTime = 0;
      state = State.stop;
      timer = 0;
      /**
       * 构造方法
       * @param callback 回调
       * @param option 选项
       */
      constructor(callback, context) {
          this.callback = callback;
          this.duration = Math.floor(1000 / context.frameRate);
      }
      /**
       * 运行
       */
      run() {
          if (this.state === State.play) {
              this.timer = window.requestAnimationFrame(time => {
                  if (this.lastTime !== 0) {
                      let delta = time - this.lastTime;
                      this.currentTime += delta;
                      this.accumulateTime += delta;
                      if (this.accumulateTime >= this.duration) {
                          this.accumulateTime %= this.duration;
                          this.callback(this.currentTime);
                      }
                  }
                  this.lastTime = time;
                  this.run();
              });
          }
      }
      /**
       * 开始
       */
      play() {
          this.state = State.play;
          this.run();
      }
      /**
       * 暂停
       */
      pause() {
          this.state = State.pause;
          window.cancelAnimationFrame(this.timer);
      }
      /**
       * 停止
       */
      stop() {
          this.state = State.stop;
          window.cancelAnimationFrame(this.timer);
          this.currentTime = 0;
          this.accumulateTime = 0;
          this.lastTime = 0;
      }
  }

  /**
   * 图形
   */
  /**
   * 类
   */
  class Graph {
      root;
      width = context.viewBoxWidth;
      height = context.viewBoxHeight;
      option = {};
      /**
       * 构造方法
       * @param 根元素
       */
      constructor(root, width, height, option) {
          this.root = root;
          width && (this.width = width);
          height && (this.height = height);
          this.option = Object.assign({}, option);
      }
  }
  /**
   * 类型
   */
  var Type;
  (function (Type) {
      Type["bar"] = "bar";
  })(Type || (Type = {}));

  /**
   * 渐变颜色
   */
  /**
   * 方法
   * @param start 起始颜色
   * @param end 停止颜色
   * @param n 阶段数量
   * @return 颜色数组
   */
  function gradientColor(start, end, n) {
      n--;
      let sr = parseInt(start.slice(1, 3), 16);
      let sg = parseInt(start.slice(3, 5), 16);
      let sb = parseInt(start.slice(5, 7), 16);
      let er = parseInt(end.slice(1, 3), 16);
      let eg = parseInt(end.slice(3, 5), 16);
      let eb = parseInt(end.slice(5, 7), 16);
      let dr = (er - sr) / n;
      let dg = (eg - sg) / n;
      let db = (eb - sb) / n;
      let result = [];
      for (let i = 0; i < n; i++) {
          let r = Math.round(sr + i * dr)
              .toString(16)
              .padStart(2, '0');
          let g = Math.round(sg + i * dg)
              .toString(16)
              .padStart(2, '0');
          let b = Math.round(sb + i * db)
              .toString(16)
              .padStart(2, '0');
          result.push(`#${r}${g}${b}`);
      }
      result.push(end);
      return result;
  }

  /**
   * 柱形
   */
  const option$2 = {
      color: '#000000',
      gradientColor: null,
      gradientColorNumber: 10,
      gap: 0,
      mirrorX: false,
      mirrorY: false,
      reverseX: false,
      reverseY: false
  };
  /**
   * 类
   */
  class Bar extends Graph {
      up;
      down;
      gradientColorList = null;
      /**
       * 构造方法
       * @param root 根元素
       * @param width 宽度
       * @param height 高度
       */
      constructor(root, width, height) {
          super(root, width, height, option$2);
          this.up = this.root.append('g').classed('web-audio-wave_bar_up', true);
          this.down = this.root.append('g').classed('web-audio-wave_bar_up', true).attr('transform', 'scale(1,-1)').style('display', 'none');
      }
      /**
       * 绘制
       * @name data 数据
       */
      draw(data) {
          let d = data;
          if (this.option.reverseX) {
              d.reverse();
          }
          if (this.option.mirrorX) {
              let t = Array.from(d);
              d = d.reverse().concat(t);
          }
          let gap = this.option.gap;
          let dw = this.width / d.length - gap;
          let mh = this.height / 2;
          const render = (d, g) => {
              g.selectAll('rect')
                  .data(d)
                  .join(enter => enter
                  .append('rect')
                  .attr('x', (d, i) => {
                  return -this.width / 2 + (dw + gap) * i;
              })
                  .attr('width', dw)
                  .attr('fill', this.option.color), update => update
                  .attr('height', d => d * mh)
                  .attr('fill', d => {
                  if (this.gradientColorList) {
                      return this.gradientColorList[Math.floor(d * this.option.gradientColorNumber)];
                  }
                  else {
                      return this.option.color;
                  }
              }), exit => exit.remove());
          };
          render(d, this.up);
          if (this.option.mirrorY) {
              render(d, this.down);
          }
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
          if (this.option.gradientColor) {
              this.gradientColorList = gradientColor(...this.option.gradientColor, this.option.gradientColorNumber);
          }
          else {
              this.gradientColorList = null;
          }
          if (this.option.mirrorY) {
              this.down.style('display', 'block');
          }
          else {
              this.down.style('display', 'none');
          }
          if (this.option.reverseY) {
              this.up.attr('transform', `translate(0,${this.height / 2}) scale(1,-1)`);
              this.down.attr('transform', `translate(0,${-this.height / 2}) scale(1,1)`);
          }
          else {
              this.up.attr('transform', `scale(1,1)`);
              this.down.attr('transform', `scale(1,-1)`);
          }
      }
  }

  /**
   * 曲线
   */
  const option$1 = {
      color: '#000000',
      gradientColor: null,
      gradientColorNumber: 10,
      gradientType: 'amplitude',
      reverse: false,
      strokeWidth: 1
  };
  const linearGradientId = 'web-audio-wave_curve_linear-gradient';
  /**
   * 类
   */
  class Curve extends Graph {
      path;
      linearGradient;
      gradientColorList = null;
      /**
       * 构造方法
       * @param root 根元素
       * @param width 宽度
       * @param height 高度
       */
      constructor(root, width, height) {
          super(root, width, height, option$1);
          this.path = root.append('path').attr('fill', 'none').attr('stroke-width', this.option.strokeWidth);
          this.linearGradient = root
              .append('defs')
              .append('linearGradient')
              .attr('id', linearGradientId)
              .attr('x1', '0%')
              .attr('y1', '0%')
              .attr('x2', '100%')
              .attr('y2', '0%');
      }
      /**
       * 绘制
       * @param data 数据。归一化
       */
      draw(data) {
          let d;
          if (this.option.reverse) {
              d = Array.from(data).concat(data.reverse());
          }
          else {
              let origin = Array.from(data);
              d = data.reverse().concat(origin);
          }
          let dw = this.width / d.length;
          let halfHeight = this.height / 2;
          let startX = -this.width / 2;
          let direction = 1;
          let pathD = `M ${startX},0`;
          let sum = 0;
          for (let i = 0, l = d.length; i < l; i++) {
              let x = startX + dw * i;
              let y = direction * d[i] * halfHeight;
              pathD += ` L ${x},${y}`;
              direction *= -1;
              sum += d[i];
          }
          this.path.attr('d', pathD);
          if (this.option.gradientType === 'amplitude' && this.gradientColorList) {
              this.path.attr('stroke', this.gradientColorList[Math.floor((sum / d.length) * this.option.gradientColorNumber)]);
          }
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
          if (this.option.gradientColor) {
              this.gradientColorList = gradientColor(...this.option.gradientColor, this.option.gradientColorNumber);
              this.linearGradient.selectChildren().remove();
              this.linearGradient
                  .append('stop')
                  .attr('stop-color', this.option.gradientColor?.[0] ?? this.option.color)
                  .attr('offset', '0%');
              this.linearGradient
                  .append('stop')
                  .attr('stop-color', this.option.gradientColor?.[1] ?? this.option.color)
                  .attr('offset', '100%');
          }
          this.path.attr('stroke', this.option.color); // default
          if (this.option.gradientColor && this.option.gradientType === 'frequency') {
              this.path.attr('stroke', `url(#${linearGradientId})`);
          }
          this.path.attr('stroke-width', this.option.strokeWidth);
      }
  }

  /**
   * 圆形
   */
  const option = {
      color: '#000000',
      gradientColor: null,
      gradientColorNumber: 10,
      colorType: 'stroke',
      number: 1,
      strokeWidth: 1,
      gradientStrokeWidth: null,
      gradientStrokeWidthNumber: 10
  };
  /**
   * 类
   */
  class Circle extends Graph {
      gradientColorList = null;
      gradientStrokeWidthList = null;
      /**
       * 构造方法
       * @param root 根元素
       * @param width 宽度
       * @param height 高度
       */
      constructor(root, width, height) {
          super(root, width, height, option);
      }
      /**
       * 绘制
       * @param data 数据。归一化
       */
      draw(data) {
          let groups = [];
          let length = Math.floor(data.length / this.option.number);
          for (let i = 0, n = this.option.number; i < n; i++) {
              groups[i] = data.slice(i * length, (i + 1) * length).reduce((p, c) => p + c, 0) / length;
          }
          let radius = Math.min(this.width, this.height) / 2;
          this.root
              .selectAll('circle')
              .data(groups)
              .join(enter => enter.append('circle').attr('fill', 'none').attr('stroke', 'none').attr('stroke-width', this.option.strokeWidth), update => update
              .attr('r', d => radius * d)
              .attr(this.option.colorType, d => {
              if (this.gradientColorList) {
                  return this.gradientColorList[Math.floor(d * this.option.gradientColorNumber)];
              }
              else {
                  return this.option.color;
              }
          })
              .attr('stroke-width', d => {
              if (this.gradientStrokeWidthList) {
                  return this.gradientStrokeWidthList[Math.floor(d * this.option.gradientStrokeWidthNumber)];
              }
              else {
                  return this.option.strokeWidth;
              }
          }), exit => exit.remove());
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
          if (this.option.gradientColor) {
              this.gradientColorList = gradientColor(...this.option.gradientColor, this.option.gradientColorNumber);
          }
          else {
              this.gradientColorList = null;
          }
          if (this.option.colorType === 'fill') {
              this.root.selectAll('circle').attr('stroke', 'none');
          }
          else {
              this.root.selectAll('circle').attr('fill', 'none');
          }
          if (this.option.gradientStrokeWidth) {
              this.gradientStrokeWidthList = [];
              let d = (this.option.gradientStrokeWidth[1] - this.option.gradientStrokeWidth[0]) / this.option.gradientStrokeWidthNumber;
              for (let i = 0; i < this.option.gradientStrokeWidthNumber; i++) {
                  this.gradientStrokeWidthList.push(this.option.gradientStrokeWidth[0] + i * d);
              }
          }
          else {
              this.gradientStrokeWidthList = null;
          }
      }
  }

  /**
   * 可视化
   */
  /**
   * 类
   */
  class Visualize {
      graph;
      svg;
      root;
      /**
       * 构造方法
       * @param context 上下文
       */
      constructor(context) {
          let svg = D3__namespace.create('svg');
          this.svg = svg.node();
          let root = svg.append('g').attr('transform', 'scale(1,-1)');
          this.root = root;
          svg.attr('width', context.svgWidth);
          svg.attr('height', context.svgHeight);
          svg.attr('viewBox', `${-context.viewBoxWidth / 2} ${-context.viewBoxHeight / 2} ${context.viewBoxWidth} ${context.viewBoxHeight}`);
          if (context.type === 'bar') {
              this.graph = new Bar(this.root, context.viewBoxWidth, context.viewBoxHeight);
          }
          else if (context.type === 'curve') {
              this.graph = new Curve(this.root, context.viewBoxWidth, context.viewBoxHeight);
          }
          else if (context.type === 'circle') {
              this.graph = new Circle(this.root, context.viewBoxWidth, context.viewBoxHeight);
          }
      }
      /**
       * 更新
       * @param data 数据
       */
      update(data) {
          this.graph?.draw(data.slice(0, Math.floor(data.length / 2)));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          this.graph?.config(option);
      }
  }

  /**
   * 类
   */
  class WebAudioWave {
      context;
      animate;
      visualize;
      fft = null;
      get svg() {
          return this.visualize.svg;
      }
      /**
       * 构造方法
       * @param type 类型
       * @param audio 音频组件
       * @param option 选项
       */
      constructor(type, audio, option) {
          if (!type) {
              throw new Error('Missing parameter: type');
          }
          if (!type) {
              throw new Error('Missing parameter: audio');
          }
          this.context = Object.assign({}, context, option);
          this.context.type = type;
          this.context.audio = audio;
          this.visualize = new Visualize(this.context);
          this.animate = new Animate(this.callback.bind(this), this.context);
      }
      /**
       * 回调方法
       */
      callback() {
          this.visualize.update(this.fft?.get() ?? []);
      }
      /**
       * 播放
       */
      play() {
          if (!this.fft) {
              this.fft = new Fft(this.context); // 因为浏览器的音频权限策略，延迟初始化
          }
          this.animate.play();
      }
      /**
       * 停止
       */
      stop() {
          this.animate.stop();
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          this.visualize.config(option);
      }
  }

  return WebAudioWave;

})(d3);
