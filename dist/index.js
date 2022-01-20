import _Reflect$construct from '@babel/runtime-corejs3/core-js-stable/reflect/construct'
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray'
import _assertThisInitialized from '@babel/runtime-corejs3/helpers/assertThisInitialized'
import _inherits from '@babel/runtime-corejs3/helpers/inherits'
import _possibleConstructorReturn from '@babel/runtime-corejs3/helpers/possibleConstructorReturn'
import _getPrototypeOf from '@babel/runtime-corejs3/helpers/getPrototypeOf'
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck'
import _createClass from '@babel/runtime-corejs3/helpers/createClass'
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty'

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = _Reflect$construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !_Reflect$construct) return false
  if (_Reflect$construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}

import 'core-js/modules/es.array.iterator.js'
import 'core-js/modules/es.object.to-string.js'
import 'core-js/modules/es.typed-array.uint8-array.js'
import 'core-js/modules/es.typed-array.copy-within.js'
import 'core-js/modules/es.typed-array.every.js'
import 'core-js/modules/es.typed-array.fill.js'
import 'core-js/modules/es.typed-array.filter.js'
import 'core-js/modules/es.typed-array.find.js'
import 'core-js/modules/es.typed-array.find-index.js'
import 'core-js/modules/es.typed-array.for-each.js'
import 'core-js/modules/es.typed-array.includes.js'
import 'core-js/modules/es.typed-array.index-of.js'
import 'core-js/modules/es.typed-array.iterator.js'
import 'core-js/modules/es.typed-array.join.js'
import 'core-js/modules/es.typed-array.last-index-of.js'
import 'core-js/modules/es.typed-array.map.js'
import 'core-js/modules/es.typed-array.reduce.js'
import 'core-js/modules/es.typed-array.reduce-right.js'
import 'core-js/modules/es.typed-array.reverse.js'
import 'core-js/modules/es.typed-array.set.js'
import 'core-js/modules/es.typed-array.slice.js'
import 'core-js/modules/es.typed-array.some.js'
import 'core-js/modules/es.typed-array.sort.js'
import 'core-js/modules/es.typed-array.subarray.js'
import 'core-js/modules/es.typed-array.to-locale-string.js'
import 'core-js/modules/es.typed-array.to-string.js'
import 'core-js/modules/es.regexp.to-string.js'
import _Object$freeze from '@babel/runtime-corejs3/core-js-stable/object/freeze'
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map'
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from'
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign'
import _reverseInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reverse'
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat'
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice'
import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind'
import _ from 'lodash-es'
/**
 * 上下文
 */

var context = {
  type: '',
  audio: null,
  rate: 60,
  size: 512,
  pow: 1,
  width: 1024,
  height: 1024,
  effect: {
    trace: 1
  }
}

_Object$freeze(context)
/**
 * FFT
 */

var max = 256 // 2**8

/**
 * 类
 */

var Fft = /*#__PURE__*/ (function () {
  /**
   * 构造方法
   * @param audio 音频组件
   * @param size 采样宽度。2的幂
   */
  function Fft(context) {
    _classCallCheck(this, Fft)

    _defineProperty(this, 'size', void 0)

    _defineProperty(this, 'pow', void 0)

    _defineProperty(this, 'analyser', void 0)

    this.size = context.size
    this.pow = context.pow
    var audioContext = new AudioContext()
    var source = audioContext.createMediaElementSource(context.audio)
    var analyser = audioContext.createAnalyser()
    this.analyser = analyser
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = context.size
  }
  /**
   * 获取数据
   */

  _createClass(Fft, [
    {
      key: 'get',
      value: function get() {
        var _context,
          _this = this

        var data = new Uint8Array(this.size)
        this.analyser.getByteFrequencyData(data)

        var output = _mapInstanceProperty((_context = _Array$from(data))).call(_context, function (a) {
          return Math.pow(a / max, _this.pow)
        })

        return output
      }
    }
  ])

  return Fft
})()
/**
 * 动画控制
 */

/**
 * 状态
 */

var State

;(function (State) {
  State[(State['stop'] = 0)] = 'stop'
  State[(State['play'] = 1)] = 'play'
  State[(State['pause'] = 2)] = 'pause'
})(State || (State = {}))
/**
 * 类
 */

var Animate = /*#__PURE__*/ (function () {
  /**
   * 构造方法
   * @param callback 回调
   * @param option 选项
   */
  function Animate(callback, context) {
    _classCallCheck(this, Animate)

    _defineProperty(this, 'callback', void 0)

    _defineProperty(this, 'duration', void 0)

    _defineProperty(this, 'currentTime', 0)

    _defineProperty(this, 'accumulateTime', 0)

    _defineProperty(this, 'lastTime', 0)

    _defineProperty(this, 'state', State.stop)

    _defineProperty(this, 'timer', 0)

    this.callback = callback
    this.duration = Math.floor(1000 / context.rate)
  }
  /**
   * 运行
   */

  _createClass(Animate, [
    {
      key: 'run',
      value: function run() {
        var _this2 = this

        if (this.state === State.play) {
          this.timer = window.requestAnimationFrame(function (time) {
            if (_this2.lastTime !== 0) {
              var delta = time - _this2.lastTime
              _this2.currentTime += delta
              _this2.accumulateTime += delta

              if (_this2.accumulateTime >= _this2.duration) {
                _this2.accumulateTime %= _this2.duration

                _this2.callback(_this2.currentTime)
              }
            }

            _this2.lastTime = time

            _this2.run()
          })
        }
      }
      /**
       * 开始
       */
    },
    {
      key: 'play',
      value: function play() {
        this.state = State.play
        this.run()
      }
      /**
       * 暂停
       */
    },
    {
      key: 'pause',
      value: function pause() {
        this.state = State.pause
        window.cancelAnimationFrame(this.timer)
      }
      /**
       * 停止
       */
    },
    {
      key: 'stop',
      value: function stop() {
        this.state = State.stop
        window.cancelAnimationFrame(this.timer)
        this.currentTime = 0
        this.accumulateTime = 0
        this.lastTime = 0
      }
    }
  ])

  return Animate
})()
/**
 * 图形
 */

/**
 * 类
 */

var Graph = /*#__PURE__*/ _createClass(
  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  function Graph(c, width, height, option) {
    _classCallCheck(this, Graph)

    _defineProperty(this, 'c', void 0)

    _defineProperty(this, 'width', context.width)

    _defineProperty(this, 'height', context.height)

    _defineProperty(this, 'option', {})

    this.c = c
    width && (this.width = width)
    height && (this.height = height)
    this.option = _Object$assign({}, option)
  }
)
/**
 * 柱形
 */

var option$2 = {
  color: '#000000',
  gap: 0,
  mirrorX: false,
  mirrorY: false,
  reverseX: false,
  reverseY: false,
  gradientColor: null,
  gradientNumber: 10
}
/**
 * 类
 */

var Bar = /*#__PURE__*/ (function (_Graph) {
  _inherits(Bar, _Graph)

  var _super = _createSuper(Bar)

  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  function Bar(c, width, height) {
    _classCallCheck(this, Bar)

    return _super.call(this, c, width, height, option$2)
  }
  /**
   * 绘制
   * @name data 数据
   */

  _createClass(Bar, [
    {
      key: 'draw',
      value: function draw(data) {
        if (this.option.reverseX) {
          _reverseInstanceProperty(data).call(data)
        }

        if (this.option.mirrorX) {
          var _context2

          data = _concatInstanceProperty(data).call(data, _reverseInstanceProperty((_context2 = _Array$from(data))).call(_context2))
        }

        var length = data.length
        var width = Math.floor(this.width / length)

        for (var i = 0; i < length; i++) {
          var x = -this.width / 2 + i * width
          var y = 0
          var w = width - this.option.gap
          var h = -(data[i] * this.height) / 2

          if (this.option.reverseY) {
            h = -h
          }

          if (this.option.mirrorY) {
            y -= h
            h *= 2
          }

          this.c.fillRect(x, y, w, h)
        }
      }
      /**
       * 配置
       * @param option 选项
       */
    },
    {
      key: 'config',
      value: function config(option) {
        _Object$assign(this.option, option)

        this.c.fillStyle = this.option.color
      }
    }
  ])

  return Bar
})(Graph)
/**
 * 曲线
 */

var option$1 = {
  color: '#000000',
  strokeWidth: 1,
  reverse: false,
  gradientColor: null,
  gradientColorNumber: 10,
  gradientType: 'amplitude'
}
/**
 * 类
 */

var Curve = /*#__PURE__*/ (function (_Graph2) {
  _inherits(Curve, _Graph2)

  var _super2 = _createSuper(Curve)

  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  function Curve(c, width, height) {
    _classCallCheck(this, Curve)

    return _super2.call(this, c, width, height, option$1)
  }
  /**
   * 绘制
   * @param data 数据。归一化
   */

  _createClass(Curve, [
    {
      key: 'draw',
      value: function draw(data) {}
      /**
       * 配置
       * @param option 选项
       */
    },
    {
      key: 'config',
      value: function config(option) {}
    }
  ])

  return Curve
})(Graph)
/**
 * 圆形
 */

var option = {
  color: '#000000',
  colorType: 'stroke',
  number: 1,
  strokeWidth: 1,
  gradientStrokeWidth: null,
  gradientStrokeWidthNumber: 10,
  gradientColor: null,
  gradientColorNumber: 10
}
/**
 * 类
 */

var Circle = /*#__PURE__*/ (function (_Graph3) {
  _inherits(Circle, _Graph3)

  var _super3 = _createSuper(Circle)

  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  function Circle(c, width, height) {
    var _this3

    _classCallCheck(this, Circle)

    _this3 = _super3.call(this, c, width, height, option)

    _defineProperty(_assertThisInitialized(_this3), 'gradientColorList', null)

    _defineProperty(_assertThisInitialized(_this3), 'gradientStrokeWidthList', null)

    return _this3
  }
  /**
   * 绘制
   * @param data 数据。归一化
   */

  _createClass(Circle, [
    {
      key: 'draw',
      value: function draw(data) {}
      /**
       * 配置
       * @param option 选项
       */
    },
    {
      key: 'config',
      value: function config(option) {
        _Object$assign(this.option, option)
      }
    }
  ])

  return Circle
})(Graph)
/**
 * 可视化
 */

/**
 * 类
 */

var Visualize = /*#__PURE__*/ (function () {
  /**
   * 构造方法
   * @param context 上下文
   */
  function Visualize(context) {
    _classCallCheck(this, Visualize)

    _defineProperty(this, 'context', void 0)

    _defineProperty(this, 'wrap', void 0)

    _defineProperty(this, 'canvas', void 0)

    _defineProperty(this, 'c', void 0)

    _defineProperty(this, 'offscreen', void 0)

    _defineProperty(this, 'o', void 0)

    _defineProperty(this, 'graph', void 0)

    this.context = context
    this.wrap = [-context.width / 2, -context.height / 2, context.width, context.height]
    this.canvas = document.createElement('canvas')
    this.c = this.canvas.getContext('2d')
    this.offscreen = document.createElement('canvas')
    this.o = this.offscreen.getContext('2d')
    this.canvas.setAttribute('width', context.width.toString())
    this.canvas.setAttribute('height', context.height.toString())
    this.c.translate(context.width / 2, context.height / 2)
    this.offscreen.setAttribute('width', context.width.toString())
    this.offscreen.setAttribute('height', context.height.toString())
    this.o.translate(context.width / 2, context.height / 2)

    if (context.type === 'bar') {
      this.graph = new Bar(this.o, context.width, context.height)
    } else if (context.type === 'curve') {
      this.graph = new Curve(this.o, context.width, context.height)
    } else if (context.type === 'circle') {
      this.graph = new Circle(this.o, context.width, context.height)
    }
  }
  /**
   * 更新
   * @param data 数据
   */

  _createClass(Visualize, [
    {
      key: 'update',
      value: function update(data) {
        var _this$o, _this$graph, _this$c, _this$c2, _context4

        ;(_this$o = this.o).clearRect.apply(_this$o, _toConsumableArray(this.wrap))

        if (this.context.effect.trace < 1) {
          var _this$o2, _context3

          this.o.globalAlpha = this.context.effect.trace

          ;(_this$o2 = this.o).drawImage.apply(_this$o2, _concatInstanceProperty((_context3 = [this.canvas])).call(_context3, _toConsumableArray(this.wrap)))

          this.o.globalAlpha = 1
        }

        ;(_this$graph = this.graph) === null || _this$graph === void 0
          ? void 0
          : _this$graph.draw(_sliceInstanceProperty(data).call(data, 0, Math.floor(data.length / 2)))

        ;(_this$c = this.c).clearRect.apply(_this$c, _toConsumableArray(this.wrap))

        ;(_this$c2 = this.c).drawImage.apply(_this$c2, _concatInstanceProperty((_context4 = [this.offscreen])).call(_context4, _toConsumableArray(this.wrap)))
      }
      /**
       * 配置
       * @param option 选项
       */
    },
    {
      key: 'config',
      value: function config(option) {
        var _this$graph2

        ;(_this$graph2 = this.graph) === null || _this$graph2 === void 0 ? void 0 : _this$graph2.config(option)
      }
    }
  ])

  return Visualize
})()
/**
 * 类
 */

var WebAudioWave = /*#__PURE__*/ (function () {
  /**
   * 构造方法
   * @param type 类型
   * @param audio 音频组件
   * @param option 选项
   */
  function WebAudioWave(type, audio, option) {
    var _context5

    _classCallCheck(this, WebAudioWave)

    _defineProperty(this, 'context', void 0)

    _defineProperty(this, 'animate', void 0)

    _defineProperty(this, 'visualize', void 0)

    _defineProperty(this, 'fft', null)

    if (!type) {
      throw new Error('Missing parameter: type')
    }

    if (!type) {
      throw new Error('Missing parameter: audio')
    }

    this.context = _.merge({}, context, option)
    this.context.type = type
    this.context.audio = audio
    this.visualize = new Visualize(this.context)
    this.animate = new Animate(_bindInstanceProperty((_context5 = this.callback)).call(_context5, this), this.context)
  }
  /**
   * 回调方法
   */

  _createClass(WebAudioWave, [
    {
      key: 'canvas',
      get: function get() {
        return this.visualize.canvas
      }
    },
    {
      key: 'callback',
      value: function callback() {
        var _this$fft$get, _this$fft

        this.visualize.update(
          (_this$fft$get = (_this$fft = this.fft) === null || _this$fft === void 0 ? void 0 : _this$fft.get()) !== null && _this$fft$get !== void 0
            ? _this$fft$get
            : []
        )
      }
      /**
       * 播放
       */
    },
    {
      key: 'play',
      value: function play() {
        if (!this.fft) {
          this.fft = new Fft(this.context) // 因为浏览器的音频权限策略，延迟初始化
        }

        this.animate.play()
      }
      /**
       * 停止
       */
    },
    {
      key: 'stop',
      value: function stop() {
        this.animate.stop()
      }
      /**
       * 配置
       * @param option 选项
       */
    },
    {
      key: 'config',
      value: function config(option) {
        this.visualize.config(option)
      }
    }
  ])

  return WebAudioWave
})()

export { WebAudioWave as default }
