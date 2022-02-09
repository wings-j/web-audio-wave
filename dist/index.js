import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _get from "@babel/runtime-corejs3/helpers/get";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context12; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context12 = Object.prototype.toString.call(o)).call(_context12, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import "core-js/modules/es.date.to-string.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array-buffer.slice.js";
import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.copy-within.js";
import "core-js/modules/es.typed-array.every.js";
import "core-js/modules/es.typed-array.fill.js";
import "core-js/modules/es.typed-array.filter.js";
import "core-js/modules/es.typed-array.find.js";
import "core-js/modules/es.typed-array.find-index.js";
import "core-js/modules/es.typed-array.for-each.js";
import "core-js/modules/es.typed-array.includes.js";
import "core-js/modules/es.typed-array.index-of.js";
import "core-js/modules/es.typed-array.iterator.js";
import "core-js/modules/es.typed-array.join.js";
import "core-js/modules/es.typed-array.last-index-of.js";
import "core-js/modules/es.typed-array.map.js";
import "core-js/modules/es.typed-array.reduce.js";
import "core-js/modules/es.typed-array.reduce-right.js";
import "core-js/modules/es.typed-array.reverse.js";
import "core-js/modules/es.typed-array.set.js";
import "core-js/modules/es.typed-array.slice.js";
import "core-js/modules/es.typed-array.some.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.subarray.js";
import "core-js/modules/es.typed-array.to-locale-string.js";
import "core-js/modules/es.typed-array.to-string.js";
import _Object$freeze from "@babel/runtime-corejs3/core-js-stable/object/freeze";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _padStartInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/pad-start";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _reverseInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/reverse";
import _fillInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/fill";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _bindInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/bind";
import { mean, merge } from 'lodash-es';
import { Animate } from '@wings-j/web-sdk';
/**
 * 上下文
 */

var context = {
  type: '',
  audio: document.createElement('audio'),
  rate: 60,
  size: 512,
  gain: 1,
  pow: 1,
  width: 1024,
  height: 1024,
  effect: {
    trace: 1
  }
};

_Object$freeze(context);
/**
 * 图形
 */

/**
 * 类
 */


var Graph = /*#__PURE__*/function () {
  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   * @param option 选项
   */
  function Graph(context, visualize, audio, option) {
    _classCallCheck(this, Graph);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "option", {});

    _defineProperty(this, "visualize", void 0);

    _defineProperty(this, "audio", void 0);

    this.context = context;
    this.visualize = visualize;
    this.audio = audio;
    this.config(option);
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Graph, [{
    key: "config",
    value: function config(option) {
      _Object$assign(this.option, option);
    }
  }]);

  return Graph;
}();
/**
 * 计算中间颜色
 */

/**
 * 方法
 * @param start 起始颜色
 * @param end 停止颜色
 * @param delta 变化比例
 * @return 颜色
 */


function calcDeltaColor(start, end, delta) {
  var _context, _context2, _context3, _context4, _context5;

  var sr = _parseInt(_sliceInstanceProperty(start).call(start, 1, 3), 16);

  var sg = _parseInt(_sliceInstanceProperty(start).call(start, 3, 5), 16);

  var sb = _parseInt(_sliceInstanceProperty(start).call(start, 5, 7), 16);

  var er = _parseInt(_sliceInstanceProperty(end).call(end, 1, 3), 16);

  var eg = _parseInt(_sliceInstanceProperty(end).call(end, 3, 5), 16);

  var eb = _parseInt(_sliceInstanceProperty(end).call(end, 5, 7), 16);

  var dr = er - sr;
  var dg = eg - sg;
  var db = eb - sb;

  var result = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "#".concat(_padStartInstanceProperty(_context3 = Math.round(sr + delta * dr).toString(16)).call(_context3, 2, '0'))).call(_context2, _padStartInstanceProperty(_context4 = Math.round(sg + delta * dg).toString(16)).call(_context4, 2, '0'))).call(_context, _padStartInstanceProperty(_context5 = Math.round(sb + delta * db).toString(16)).call(_context5, 2, '0'));

  return result;
}
/**
 * 柱形
 */

/**
 * 类
 */


var Bar = /*#__PURE__*/function (_Graph) {
  _inherits(Bar, _Graph);

  var _super = _createSuper(Bar);

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  function Bar(context, visualize, audio) {
    _classCallCheck(this, Bar);

    return _super.call(this, context, visualize, audio);
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Bar, [{
    key: "config",
    value: function config(option) {
      var _this$option$gradient;

      _get(_getPrototypeOf(Bar.prototype), "config", this).call(this, option);

      this.visualize.brush.fillStyle = this.option.color;

      if ((_this$option$gradient = this.option.gradientColor) !== null && _this$option$gradient !== void 0 && _this$option$gradient.length) {
        var gradient = this.visualize.brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0);

        for (var i = 0, l = this.option.gradientColor.length; i < l; i++) {
          gradient.addColorStop(1 / (l - 1) * i, this.option.gradientColor[i]);
        }

        this.visualize.brush.fillStyle = gradient;
      }
    }
    /**
     * 更新
     */

  }, {
    key: "update",
    value: function update() {
      var _this$audio$get,
          _this$audio,
          _this = this;

      var data = _Array$from((_this$audio$get = (_this$audio = this.audio) === null || _this$audio === void 0 ? void 0 : _this$audio.get()) !== null && _this$audio$get !== void 0 ? _this$audio$get : []);

      this.visualize.update(function () {
        var length = data.length;
        var width = _this.context.width / length;

        for (var i = 0; i < length; i++) {
          var _this$option$dynamicC;

          var x = -_this.context.width / 2 + i * width;
          var y = _this.context.height / 2;
          var w = width - _this.option.gap;
          var h = -(data[i] * _this.context.height);

          if (((_this$option$dynamicC = _this.option.dynamicColor) === null || _this$option$dynamicC === void 0 ? void 0 : _this$option$dynamicC.length) === 2) {
            _this.visualize.brush.fillStyle = calcDeltaColor(_this.option.dynamicColor[0], _this.option.dynamicColor[1], data[i]);
          }

          _this.visualize.brush.fillRect(x, y, w, h);
        }
      });
    }
  }]);

  return Bar;
}(Graph);
/**
 * 画曲线
 */

/**
 * 计算控制点
 * @param points 点数组，[{x:float,y:float}]
 * @param i 点索引
 * @param a 系数a
 * @param b 系数b
 * @return 控制点，{pa:{x:float,y:float},pb:{x:float,y:float}}
 */


function calcControlPoint(points, i, a, b) {
  var pax;
  var pay;

  if (i < 1) {
    //处理极端情形
    pax = points[0][0] + (points[1][0] - points[0][0]) * a;
    pay = points[0][1] + (points[1][1] - points[0][1]) * a;
  } else {
    pax = points[i][0] + (points[i + 1][0] - points[i - 1][0]) * a;
    pay = points[i][1] + (points[i + 1][1] - points[i - 1][1]) * a;
  }

  var pbx;
  var pby;

  if (i > points.length - 3) {
    //处理极端情形
    var last = points.length - 1;
    pbx = points[last][0] - (points[last][0] - points[last - 1][0]) * b;
    pby = points[last][1] - (points[last][1] - points[last - 1][1]) * b;
  } else {
    pbx = points[i + 1][0] - (points[i + 2][0] - points[i][0]) * b;
    pby = points[i + 1][1] - (points[i + 2][1] - points[i][1]) * b;
  }

  return {
    pa: [pax, pay],
    pb: [pbx, pby]
  };
}
/**
 * 函数
 * @param points 点数组
 * @param type 类型
 * @param a 系数a。可省略
 * @param b 系数b。可省略
 * @return 路径
 */


function generatePath(points, type) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$a = _ref.a,
      a = _ref$a === void 0 ? 0.25 : _ref$a,
      _ref$b = _ref.b,
      b = _ref$b === void 0 ? 0.25 : _ref$b;

  var path = new Path2D();
  path.moveTo(points[0][0], points[0][1]);

  for (var i = 1, l = points.length; i < l; i++) {
    if (type === 'bezier') {
      var ctrlPoint = calcControlPoint(points, i - 1, a, b);
      path.bezierCurveTo(ctrlPoint.pa[0], ctrlPoint.pa[1], ctrlPoint.pb[0], ctrlPoint.pb[1], points[i][0], points[i][1]);
    } else {
      path.lineTo(points[i][0], points[i][1]);
    }
  }

  return path;
}
/**
 * 曲线
 */

/**
 * 类
 */


var Curve = /*#__PURE__*/function (_Graph2) {
  _inherits(Curve, _Graph2);

  var _super2 = _createSuper(Curve);

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  function Curve(context, visualize, audio) {
    _classCallCheck(this, Curve);

    return _super2.call(this, context, visualize, audio);
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Curve, [{
    key: "config",
    value: function config(option) {
      var _this$option$gradient2;

      _get(_getPrototypeOf(Curve.prototype), "config", this).call(this, option);

      var brush = this.visualize.brush;
      brush.strokeStyle = this.option.color;
      brush.lineWidth = this.option.width;

      if ((_this$option$gradient2 = this.option.gradientColor) !== null && _this$option$gradient2 !== void 0 && _this$option$gradient2.length) {
        var gradient = brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0);

        for (var i = 0, l = this.option.gradientColor.length; i < l; i++) {
          gradient.addColorStop(1 / (l - 1) * i, this.option.gradientColor[i]);
        }

        brush.strokeStyle = gradient;
      }
    }
    /**
     * 绘制
     */

  }, {
    key: "update",
    value: function update() {
      var _this$audio$get2,
          _this$audio2,
          _this2 = this;

      var data = _Array$from((_this$audio$get2 = (_this$audio2 = this.audio) === null || _this$audio2 === void 0 ? void 0 : _this$audio2.get()) !== null && _this$audio$get2 !== void 0 ? _this$audio$get2 : []);

      var d = _Array$from(data);

      if (_reverseInstanceProperty(this.option)) {
        _reverseInstanceProperty(d).call(d);
      }

      if (this.option.mirror) {
        var _context6;

        d = _concatInstanceProperty(d).call(d, _reverseInstanceProperty(_context6 = _Array$from(d)).call(_context6));
      }

      var brush = this.visualize.brush;
      this.visualize.update(function () {
        var _this2$option$dynamic;

        if (((_this2$option$dynamic = _this2.option.dynamicColor) === null || _this2$option$dynamic === void 0 ? void 0 : _this2$option$dynamic.length) === 2) {
          var average = mean(data);
          brush.strokeStyle = calcDeltaColor(_this2.option.dynamicColor[0], _this2.option.dynamicColor[1], average);
        }

        var points = [];
        var dw = _this2.context.width / d.length;
        var startX = -_this2.context.width / 2;
        var direction = 1;

        for (var i = 0, l = d.length; i < l; i++) {
          var x = startX + dw * i;
          var y = -(direction * d[i] * _this2.context.height) / 2;
          points.push([x, y]);

          if (_this2.option.backforth) {
            direction *= -1;
          }
        }

        var path;

        if (_this2.option.smooth) {
          path = generatePath(points, 'bezier');
        } else {
          path = generatePath(points);
        }

        brush.stroke(path);
      });
    }
  }]);

  return Curve;
}(Graph);
/**
 * 圆形
 */

/**
 * 类
 */


var Circle = /*#__PURE__*/function (_Graph3) {
  _inherits(Circle, _Graph3);

  var _super3 = _createSuper(Circle);

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  function Circle(context, visualize, audio) {
    _classCallCheck(this, Circle);

    return _super3.call(this, context, visualize, audio);
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Circle, [{
    key: "maxRadius",
    get: function get() {
      return Math.min(this.context.width, this.context.height) / 2;
    }
  }, {
    key: "config",
    value: function config(option) {
      var _this$option$gradient3;

      _get(_getPrototypeOf(Circle.prototype), "config", this).call(this, option);

      var brush = this.visualize.brush;
      brush.strokeStyle = this.option.color;
      brush.lineWidth = this.option.width;

      if ((_this$option$gradient3 = this.option.gradientColor) !== null && _this$option$gradient3 !== void 0 && _this$option$gradient3.length) {
        var gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius);

        for (var i = 0, l = this.option.gradientColor.length; i < l; i++) {
          gradient.addColorStop(1 / (l - 1) * i, this.option.gradientColor[i]);
        }

        brush.strokeStyle = gradient;
        brush.fillStyle = gradient;
      }
    }
    /**
     * 更新
     */

  }, {
    key: "update",
    value: function update() {
      var _this$audio$get3,
          _this$audio3,
          _this3 = this;

      var brush = this.visualize.brush;
      var data = (_this$audio$get3 = (_this$audio3 = this.audio) === null || _this$audio3 === void 0 ? void 0 : _this$audio3.get()) !== null && _this$audio$get3 !== void 0 ? _this$audio$get3 : [];
      this.visualize.update(function () {
        if (_this3.option.average) {
          var _this3$option$dynamic;

          var average = mean(data);
          brush.beginPath();
          brush.moveTo(_this3.maxRadius * average, 0);
          brush.arc(0, 0, _this3.maxRadius * average, 0, 360);
          brush.closePath();

          if (((_this3$option$dynamic = _this3.option.dynamicColor) === null || _this3$option$dynamic === void 0 ? void 0 : _this3$option$dynamic.length) === 2) {
            var color = calcDeltaColor(_this3.option.dynamicColor[0], _this3.option.dynamicColor[1], average);
            brush.fillStyle = color;
          }

          if (_fillInstanceProperty(_this3.option)) {
            _fillInstanceProperty(brush).call(brush);
          } else {
            brush.stroke();
          }
        } else {
          if (_fillInstanceProperty(_this3.option)) {
            var _iterator = _createForOfIteratorHelper(data),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _this3$option$dynamic2;

                var a = _step.value;
                brush.beginPath();
                brush.moveTo(_this3.maxRadius * a, 0);
                brush.arc(0, 0, _this3.maxRadius * a, 0, 360);
                brush.closePath();

                if (((_this3$option$dynamic2 = _this3.option.dynamicColor) === null || _this3$option$dynamic2 === void 0 ? void 0 : _this3$option$dynamic2.length) === 2) {
                  var _color = calcDeltaColor(_this3.option.dynamicColor[0], _this3.option.dynamicColor[1], a);

                  brush.fillStyle = _color;
                }

                _fillInstanceProperty(brush).call(brush);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          } else {
            var _iterator2 = _createForOfIteratorHelper(data),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _this3$option$dynamic3;

                var _a = _step2.value;
                brush.beginPath();
                brush.moveTo(_this3.maxRadius * _a, 0);
                brush.arc(0, 0, _this3.maxRadius * _a, 0, 360);
                brush.closePath();

                if (((_this3$option$dynamic3 = _this3.option.dynamicColor) === null || _this3$option$dynamic3 === void 0 ? void 0 : _this3$option$dynamic3.length) === 2) {
                  var _color2 = calcDeltaColor(_this3.option.dynamicColor[0], _this3.option.dynamicColor[1], _a);

                  brush.strokeStyle = _color2;
                }

                brush.stroke();
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }
      });
    }
  }]);

  return Circle;
}(Graph);
/**
 * 可视化
 */

/**
 * 类
 */


var Visualize = /*#__PURE__*/function () {
  /**
   * 构造方法
   * @param context 上下文
   */
  function Visualize(context) {
    _classCallCheck(this, Visualize);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "c", void 0);

    _defineProperty(this, "offscreen", void 0);

    _defineProperty(this, "o", void 0);

    _defineProperty(this, "canvas", void 0);

    this.context = context;
    this.canvas = document.createElement('canvas');
    this.c = this.canvas.getContext('2d');
    this.offscreen = document.createElement('canvas');
    this.o = this.offscreen.getContext('2d');
    this.canvas.setAttribute('width', context.width.toString());
    this.canvas.setAttribute('height', context.height.toString());
    this.c.translate(context.width / 2, context.height / 2);
    this.offscreen.setAttribute('width', context.width.toString());
    this.offscreen.setAttribute('height', context.height.toString());
    this.o.translate(context.width / 2, context.height / 2);
  }
  /**
   * 更新
   * @param draw 绘制
   */


  _createClass(Visualize, [{
    key: "wrap",
    get: function get() {
      return [-this.context.width / 2, -this.context.height / 2, this.context.width, this.context.height];
    }
  }, {
    key: "brush",
    get: function get() {
      return this.o;
    }
  }, {
    key: "update",
    value: function update(draw) {
      var _this$o, _this$c, _this$c2, _context8;

      (_this$o = this.o).clearRect.apply(_this$o, _toConsumableArray(this.wrap));

      if (this.context.effect.trace < 1) {
        var _this$o2, _context7;

        this.o.globalAlpha = this.context.effect.trace;

        (_this$o2 = this.o).drawImage.apply(_this$o2, _concatInstanceProperty(_context7 = [this.canvas]).call(_context7, _toConsumableArray(this.wrap)));

        this.o.globalAlpha = 1;
      }

      draw();

      (_this$c = this.c).clearRect.apply(_this$c, _toConsumableArray(this.wrap));

      (_this$c2 = this.c).drawImage.apply(_this$c2, _concatInstanceProperty(_context8 = [this.offscreen]).call(_context8, _toConsumableArray(this.wrap)));
    }
  }]);

  return Visualize;
}();
/**
 * 分析
 */

/**
 * 滤波类型
 */


var Type;

(function (Type) {
  Type["lowpass"] = "lowpass";
  Type["highpass"] = "highpass";
  Type["bandpass"] = "bandpass";
  Type["lowshelf"] = "lowshelf";
  Type["highshelf"] = "highshelf";
  Type["peaking"] = "peaking";
  Type["notch"] = "notch";
  Type["allpass"] = "allpass";
})(Type || (Type = {}));

var max = 256; // 2**8

/**
 * 类
 */

var Audio = /*#__PURE__*/function () {
  // 尾结点

  /**
   * 构造方法
   * @param context 上下文
   */
  function Audio(context) {
    _classCallCheck(this, Audio);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "analyser", void 0);

    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(context.audio);
    this.source.connect(this.context.destination);
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = context.size;
    var nodes = [];
    nodes.push(this.source);
    var gain = this.context.createGain();
    gain.gain.value = context.gain;
    nodes.push(gain);
    nodes.push(this.analyser);

    for (var i = 0; i < nodes.length - 1; i++) {
      nodes[i].connect(nodes[i + 1]);
    }
  }
  /**
   * 获取数据
   */


  _createClass(Audio, [{
    key: "get",
    value: function get() {
      return Audio.get(this.analyser);
    }
  }], [{
    key: "get",
    value:
    /**
     * 获取数据
     * @param analyser 分析器
     * @return 数据
     */
    function get(analyser) {
      var _context9, _context10;

      var data = new Uint8Array(analyser.fftSize);
      analyser.getByteFrequencyData(data);

      var output = _sliceInstanceProperty(_context9 = _mapInstanceProperty(_context10 = _Array$from(data)).call(_context10, function (a) {
        return a / max;
      })).call(_context9, 0, Math.floor(data.length / 2));

      return output;
    }
  }]);

  return Audio;
}();
/**
 * index
 */

/**
 * 类
 */


var WebAudioWave = /*#__PURE__*/function () {
  /**
   * 构造方法
   * @param type 类型
   * @param audio 音频组件
   * @param option 选项
   */
  function WebAudioWave(type, audio, option) {
    var _context11;

    _classCallCheck(this, WebAudioWave);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "animate", void 0);

    _defineProperty(this, "visualize", void 0);

    _defineProperty(this, "audio", void 0);

    _defineProperty(this, "graph", void 0);

    if (!type) {
      throw new Error('Missing parameter: type');
    }

    if (!type) {
      throw new Error('Missing parameter: audio');
    }

    this.context = merge({}, context, option);
    this.context.type = type;
    this.context.audio = audio;
    this.animate = new Animate(_bindInstanceProperty(_context11 = this.callback).call(_context11, this), this.context.rate);
    this.visualize = new Visualize(this.context);

    if (this.context.type === 'bar') {
      this.graph = new Bar(this.context, this.visualize, this.audio);
    } else if (this.context.type === 'curve') {
      this.graph = new Curve(this.context, this.visualize, this.audio);
    } else if (this.context.type === 'circle') {
      this.graph = new Circle(this.context, this.visualize, this.audio);
    }
  }
  /**
   * 回调方法
   */


  _createClass(WebAudioWave, [{
    key: "canvas",
    get: function get() {
      return this.visualize.canvas;
    }
  }, {
    key: "callback",
    value: function callback() {
      var _this$graph;

      (_this$graph = this.graph) === null || _this$graph === void 0 ? void 0 : _this$graph.update();
    }
    /**
     * 播放
     */

  }, {
    key: "play",
    value: function play() {
      if (!this.audio && this.context.audio && this.graph) {
        this.audio = new Audio(this.context); // 因为浏览器的音频权限策略，延迟初始化

        this.graph.audio = this.audio;
      }

      this.animate.play();
    }
    /**
     * 停止
     */

  }, {
    key: "stop",
    value: function stop() {
      this.animate.stop();
    }
    /**
     * 配置
     * @param option 选项
     */

  }, {
    key: "config",
    value: function config(option) {
      var _this$graph2;

      (_this$graph2 = this.graph) === null || _this$graph2 === void 0 ? void 0 : _this$graph2.config(option);
    }
  }]);

  return WebAudioWave;
}();

export { WebAudioWave as default };
