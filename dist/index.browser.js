var WebAudioWave = (function () {
  'use strict';

  /**
   * 上下文
   */
  const context = {
      type: '',
      audio: null,
      rate: 60,
      size: 512,
      pow: 1,
      width: 1024,
      height: 1024
  };
  Object.freeze(context);

  /**
   * FFT
   */
  const max = 256; // 2**8
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
          this.size = context.size;
          this.pow = context.pow;
          let audioContext = new AudioContext();
          let source = audioContext.createMediaElementSource(context.audio);
          let analyser = audioContext.createAnalyser();
          this.analyser = analyser;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          analyser.fftSize = context.size;
      }
      /**
       * 获取数据
       */
      get() {
          let data = new Uint8Array(this.size);
          this.analyser.getByteFrequencyData(data);
          let output = Array.from(data).map(a => (a / max) ** this.pow);
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
          this.duration = Math.floor(1000 / context.rate);
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
      c;
      width = context.width;
      height = context.height;
      option = {};
      /**
       * 构造方法
       * @param c 绘图环境
       * @param width 宽度
       * @param height 高度
       */
      constructor(c, width, height, option) {
          this.c = c;
          width && (this.width = width);
          height && (this.height = height);
          this.option = Object.assign({}, option);
      }
  }

  /**
   * 柱形
   */
  const option$2 = {
      color: '#000000',
      gap: 0,
      mirrorX: false,
      mirrorY: false,
      reverseX: false,
      reverseY: false,
      gradientColor: null,
      gradientColorNumber: 10
  };
  /**
   * 类
   */
  class Bar extends Graph {
      /**
       * 构造方法
       * @param c 绘图环境
       * @param width 宽度
       * @param height 高度
       */
      constructor(c, width, height) {
          super(c, width, height, option$2);
      }
      /**
       * 绘制
       * @name data 数据
       */
      draw(data) { }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
      }
  }

  /**
   * 曲线
   */
  const option$1 = {
      color: '#000000',
      strokeWidth: 1,
      reverse: false,
      gradientColor: null,
      gradientColorNumber: 10,
      gradientType: 'amplitude'
  };
  /**
   * 类
   */
  class Curve extends Graph {
      /**
       * 构造方法
       * @param c 绘图环境
       * @param width 宽度
       * @param height 高度
       */
      constructor(c, width, height) {
          super(c, width, height, option$1);
      }
      /**
       * 绘制
       * @param data 数据。归一化
       */
      draw(data) { }
      /**
       * 配置
       * @param option 选项
       */
      config(option) { }
  }

  /**
   * 圆形
   */
  const option = {
      color: '#000000',
      colorType: 'stroke',
      number: 1,
      strokeWidth: 1,
      gradientStrokeWidth: null,
      gradientStrokeWidthNumber: 10,
      gradientColor: null,
      gradientColorNumber: 10
  };
  /**
   * 类
   */
  class Circle extends Graph {
      gradientColorList = null;
      gradientStrokeWidthList = null;
      /**
       * 构造方法
       * @param c 绘图环境
       * @param width 宽度
       * @param height 高度
       */
      constructor(c, width, height) {
          super(c, width, height, option);
      }
      /**
       * 绘制
       * @param data 数据。归一化
       */
      draw(data) { }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
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
      canvas;
      c;
      /**
       * 构造方法
       * @param context 上下文
       */
      constructor(context) {
          this.canvas = document.createElement('canvas');
          this.c = this.canvas.getContext('2d');
          this.canvas.setAttribute('width', context.width.toString());
          this.canvas.setAttribute('height', context.height.toString());
          if (context.type === 'bar') {
              this.graph = new Bar(this.c, context.width, context.height);
          }
          else if (context.type === 'curve') {
              this.graph = new Curve(this.c, context.width, context.height);
          }
          else if (context.type === 'circle') {
              this.graph = new Circle(this.c, context.width, context.height);
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
      get canvas() {
          return this.visualize.canvas;
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

})();
