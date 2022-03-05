import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _get from "@babel/runtime-corejs3/helpers/get";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _Symbol !== "undefined" && _getIteratorMethod(o) || o["@@iterator"]; if (!it) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context15; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context15 = Object.prototype.toString.call(o)).call(_context15, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Math$log from "@babel/runtime-corejs3/core-js-stable/math/log10";
import _bindInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/bind";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import { mean, merge } from 'lodash-es';
import { PathCurve } from '@wings-j/canvas';
import { Ease, Animate } from '@wings-j/web-sdk';
/**
 * 上下文
 */

var context = {
  type: '',
  audio: document.createElement('audio'),
  width: 1024,
  height: 1024,
  rate: 60,
  time: false,
  size: 512,
  slice: [0, 512],
  gain: 1,
  pow: 1,
  db: false,
  effect: {
    trace: 1
  },
  filter: {
    type: '',
    frequency: 0,
    q: 0,
    gain: 1
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
   */
  function Graph(context, visualize, audio) {
    _classCallCheck(this, Graph);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "option", {});

    _defineProperty(this, "visualize", void 0);

    _defineProperty(this, "audio", void 0);

    this.context = context;
    this.visualize = visualize;
    this.audio = audio;
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


var preset$4 = {
  color: '#000000',
  gradientColor: null,
  dynamicColor: null,
  gap: 0
};
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
  function Bar(context, visualize, audio, option) {
    var _this;

    _classCallCheck(this, Bar);

    _this = _super.call(this, context, visualize, audio);

    _this.config(_Object$assign({}, preset$4, option));

    return _this;
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
          _this2 = this;

      var data = _Array$from((_this$audio$get = (_this$audio = this.audio) === null || _this$audio === void 0 ? void 0 : _this$audio.get()) !== null && _this$audio$get !== void 0 ? _this$audio$get : []);

      this.visualize.update(function () {
        var length = data.length;
        var width = _this2.context.width / length;

        for (var i = 0; i < length; i++) {
          var _this2$option$dynamic;

          var x = -_this2.context.width / 2 + i * width;
          var y = _this2.context.height / 2;
          var w = width - _this2.option.gap;
          var h = -(data[i] * _this2.context.height);

          if (((_this2$option$dynamic = _this2.option.dynamicColor) === null || _this2$option$dynamic === void 0 ? void 0 : _this2$option$dynamic.length) === 2) {
            _this2.visualize.brush.fillStyle = calcDeltaColor(_this2.option.dynamicColor[0], _this2.option.dynamicColor[1], data[i]);
          }

          _this2.visualize.brush.fillRect(x, y, w, h);
        }
      });
    }
  }]);

  return Bar;
}(Graph);
/**
 * 曲线
 */


var preset$3 = {
  color: '#000000',
  gradientColor: null,
  dynamicColor: null,
  width: 1,
  mirror: false,
  reverse: false,
  backforth: false,
  smooth: false
};
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
  function Curve(context, visualize, audio, option) {
    var _this3;

    _classCallCheck(this, Curve);

    _this3 = _super2.call(this, context, visualize, audio);

    _this3.config(_Object$assign({}, preset$3, option));

    return _this3;
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
          _this4 = this;

      var data = (_this$audio$get2 = (_this$audio2 = this.audio) === null || _this$audio2 === void 0 ? void 0 : _this$audio2.get()) !== null && _this$audio$get2 !== void 0 ? _this$audio$get2 : [];

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
        var _this4$option$dynamic;

        if (((_this4$option$dynamic = _this4.option.dynamicColor) === null || _this4$option$dynamic === void 0 ? void 0 : _this4$option$dynamic.length) === 2) {
          var average = mean(data);
          brush.strokeStyle = calcDeltaColor(_this4.option.dynamicColor[0], _this4.option.dynamicColor[1], average);
        }

        var points = [];
        var dw = _this4.context.width / d.length;
        var startX = -_this4.context.width / 2;
        var direction = 1;

        for (var i = 0, l = d.length; i < l; i++) {
          var x = startX + dw * i;
          var y = -(direction * d[i] * _this4.context.height) / 2;
          points.push([x, y]);

          if (_this4.option.backforth) {
            direction *= -1;
          }
        }

        var path = PathCurve(points, _this4.option.smooth ? 'bezier' : undefined);
        brush.stroke(path);
      });
    }
  }]);

  return Curve;
}(Graph);
/**
 * 圆圈
 */


var preset$2 = {
  color: '#000000',
  gradientColor: null,
  dynamicColor: null,
  width: 1,
  fill: false,
  average: false
};
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
  function Circle(context, visualize, audio, option) {
    var _this5;

    _classCallCheck(this, Circle);

    _this5 = _super3.call(this, context, visualize, audio);

    _this5.config(_Object$assign({}, preset$2, option));

    return _this5;
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
      brush.fillStyle = this.option.color;
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
          _this6 = this;

      var brush = this.visualize.brush;
      var data = (_this$audio$get3 = (_this$audio3 = this.audio) === null || _this$audio3 === void 0 ? void 0 : _this$audio3.get()) !== null && _this$audio$get3 !== void 0 ? _this$audio$get3 : [];
      this.visualize.update(function () {
        if (_this6.option.average) {
          var _this6$option$dynamic;

          var average = mean(data);
          brush.beginPath();
          brush.moveTo(_this6.maxRadius * average, 0);
          brush.arc(0, 0, _this6.maxRadius * average, 0, 360);
          brush.closePath();

          if (((_this6$option$dynamic = _this6.option.dynamicColor) === null || _this6$option$dynamic === void 0 ? void 0 : _this6$option$dynamic.length) === 2) {
            var color = calcDeltaColor(_this6.option.dynamicColor[0], _this6.option.dynamicColor[1], average);
            brush.fillStyle = color;
          }

          if (_fillInstanceProperty(_this6.option)) {
            _fillInstanceProperty(brush).call(brush);
          } else {
            brush.stroke();
          }
        } else {
          if (_fillInstanceProperty(_this6.option)) {
            var _iterator = _createForOfIteratorHelper(data),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _this6$option$dynamic2;

                var a = _step.value;
                brush.beginPath();
                brush.moveTo(_this6.maxRadius * a, 0);
                brush.arc(0, 0, _this6.maxRadius * a, 0, 360);
                brush.closePath();

                if (((_this6$option$dynamic2 = _this6.option.dynamicColor) === null || _this6$option$dynamic2 === void 0 ? void 0 : _this6$option$dynamic2.length) === 2) {
                  var _color = calcDeltaColor(_this6.option.dynamicColor[0], _this6.option.dynamicColor[1], a);

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
                var _this6$option$dynamic3;

                var _a = _step2.value;
                brush.beginPath();
                brush.moveTo(_this6.maxRadius * _a, 0);
                brush.arc(0, 0, _this6.maxRadius * _a, 0, 360);
                brush.closePath();

                if (((_this6$option$dynamic3 = _this6.option.dynamicColor) === null || _this6$option$dynamic3 === void 0 ? void 0 : _this6$option$dynamic3.length) === 2) {
                  var _color2 = calcDeltaColor(_this6.option.dynamicColor[0], _this6.option.dynamicColor[1], _a);

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
 * 波纹
 */


var preset$1 = {
  color: '#000000',
  dynamicColor: null,
  width: 1,
  fill: false,
  threshold: 0,
  period: context.rate,
  interval: context.rate,
  minRadius: 0,
  maxRadius: 0,
  ease: undefined
};
/**
 * 单元
 */

var Unit = /*#__PURE__*/function () {
  function Unit(option, color) {
    _classCallCheck(this, Unit);

    _defineProperty(this, "option", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "time", 0);

    this.option = option;
    this.color = color;
  }
  /**
   * 更新
   */


  _createClass(Unit, [{
    key: "finished",
    get: function get() {
      return this.time >= this.option.period;
    }
  }, {
    key: "phase",
    get: function get() {
      return Math.min(this.time / this.option.period, 1);
    }
  }, {
    key: "update",
    value: function update() {
      this.time++;
    }
    /**
     * 数据
     */

  }, {
    key: "get",
    value: function get() {
      var _context7;

      var phase = this.phase;

      if (this.option.ease) {
        if (typeof this.option.ease === 'string') {
          phase = Ease[this.option.ease](phase);
        } else {
          phase = this.option.ease(phase);
        }
      }

      var radius = (this.option.maxRadius - this.option.minRadius) * phase + this.option.minRadius;

      var color = this.color + _padStartInstanceProperty(_context7 = Math.floor(255 * (1 - phase)).toString(16)).call(_context7, 2, '0');

      return {
        radius: radius,
        color: color
      };
    }
  }]);

  return Unit;
}();
/**
 * 类
 */


var Ripple = /*#__PURE__*/function (_Graph4) {
  _inherits(Ripple, _Graph4);

  var _super4 = _createSuper(Ripple);

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  function Ripple(context, visualize, audio, option) {
    var _this7;

    _classCallCheck(this, Ripple);

    _this7 = _super4.call(this, context, visualize, audio);

    _defineProperty(_assertThisInitialized(_this7), "units", new _Set());

    _defineProperty(_assertThisInitialized(_this7), "count", 0);

    _this7.config(_Object$assign({}, preset$1, {
      period: context.rate,
      interval: context.rate,
      maxRadius: Math.min(_this7.context.width, _this7.context.height) / 2
    }, option));

    return _this7;
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Ripple, [{
    key: "config",
    value: function config(option) {
      _get(_getPrototypeOf(Ripple.prototype), "config", this).call(this, option);

      var brush = this.visualize.brush;
      brush.lineWidth = this.option.width;
    }
    /**
     * 更新
     */

  }, {
    key: "update",
    value: function update() {
      var _this8 = this;

      this.count++;
      var brush = this.visualize.brush;

      if (this.count >= this.option.interval) {
        var _this$audio$get4, _this$audio4;

        var data = (_this$audio$get4 = (_this$audio4 = this.audio) === null || _this$audio4 === void 0 ? void 0 : _this$audio4.get()) !== null && _this$audio$get4 !== void 0 ? _this$audio$get4 : [];
        var average = mean(data);

        if (average >= this.option.threshold) {
          var _this$option$dynamicC;

          this.count = 0;
          var color = this.option.color;

          if (((_this$option$dynamicC = this.option.dynamicColor) === null || _this$option$dynamicC === void 0 ? void 0 : _this$option$dynamicC.length) === 2) {
            color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average);
          }

          this.units.add(new Unit(this.option, color));
        }
      }

      this.visualize.update(function () {
        var _context8;

        var _iterator3 = _createForOfIteratorHelper(_valuesInstanceProperty(_context8 = _this8.units).call(_context8)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var a = _step3.value;

            var _a$get = a.get(),
                radius = _a$get.radius,
                _color3 = _a$get.color;

            brush.beginPath();
            brush.moveTo(radius, 0);
            brush.arc(0, 0, radius, 0, 360);
            brush.closePath();

            if (_fillInstanceProperty(_this8.option)) {
              brush.fillStyle = _color3;

              _fillInstanceProperty(brush).call(brush);
            } else {
              brush.strokeStyle = _color3;
              brush.stroke();
            }

            a.update();

            if (a.finished) {
              _this8.units["delete"](a);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
    }
  }]);

  return Ripple;
}(Graph);
/**
 * 轮环
 */


var preset = {
  color: '#000000',
  gradientColor: null,
  dynamicColor: null,
  width: 1,
  mirror: false,
  period: context.rate * 10,
  base: Math.min(context.width, context.height) / 4,
  baseDynamic: false,
  amplitude: Math.min(context.width, context.height) / 4,
  smooth: false,
  clockwise: true,
  rotate: 0
};
/**
 * 类
 */

var Round = /*#__PURE__*/function (_Graph5) {
  _inherits(Round, _Graph5);

  var _super5 = _createSuper(Round);

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  function Round(context, visualize, audio, option) {
    var _this9;

    _classCallCheck(this, Round);

    _this9 = _super5.call(this, context, visualize, audio);

    _defineProperty(_assertThisInitialized(_this9), "time", 0);

    _this9.config(_Object$assign({}, preset, {
      period: context.rate * 10,
      base: Math.min(_this9.context.width, _this9.context.height) / 4,
      amplitude: Math.min(_this9.context.width, _this9.context.height) / 4
    }, option));

    return _this9;
  }
  /**
   * 配置
   * @param option 选项
   */


  _createClass(Round, [{
    key: "maxRadius",
    get: function get() {
      return Math.min(this.context.width, this.context.height) / 2;
    }
  }, {
    key: "config",
    value: function config(option) {
      var _this$option$gradient4;

      _get(_getPrototypeOf(Round.prototype), "config", this).call(this, option);

      var brush = this.visualize.brush;
      brush.strokeStyle = this.option.color;
      brush.lineWidth = this.option.width;

      if ((_this$option$gradient4 = this.option.gradientColor) !== null && _this$option$gradient4 !== void 0 && _this$option$gradient4.length) {
        var gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius);

        for (var i = 0, l = this.option.gradientColor.length; i < l; i++) {
          gradient.addColorStop(1 / (l - 1) * i, this.option.gradientColor[i]);
        }

        brush.strokeStyle = gradient;
      }
    }
    /**
     * 更新
     */

  }, {
    key: "update",
    value: function update() {
      var _this$audio$get5,
          _this$audio5,
          _this10 = this;

      var data = (_this$audio$get5 = (_this$audio5 = this.audio) === null || _this$audio5 === void 0 ? void 0 : _this$audio5.get()) !== null && _this$audio$get5 !== void 0 ? _this$audio$get5 : [];

      var d = _Array$from(data);

      if (this.option.mirror) {
        var _context9;

        d = _concatInstanceProperty(d).call(d, _reverseInstanceProperty(_context9 = _Array$from(d)).call(_context9));
      }

      var average = mean(data);
      var brush = this.visualize.brush;
      this.visualize.update(function () {
        var _this10$option$dynami;

        var offset = Math.PI * 2 * (_this10.time / _this10.option.period);
        var delta = Math.PI * 2 / d.length;
        var base = _this10.option.base + (_this10.option.baseDynamic ? average * _this10.option.amplitude : 0);
        var direction = 1;

        var points = _mapInstanceProperty(d).call(d, function (a, i) {
          var radian = i * delta * (_this10.option.clockwise ? 1 : -1) + offset * _this10.option.rotate;
          var radius = a * _this10.option.amplitude * direction + base;
          var x = Math.cos(radian) * radius;
          var y = Math.sin(radian) * radius;
          direction *= -1;
          return [x, y];
        });

        var path = PathCurve(points, _this10.option.smooth ? 'bezier' : undefined, {
          close: true
        });

        if (((_this10$option$dynami = _this10.option.dynamicColor) === null || _this10$option$dynami === void 0 ? void 0 : _this10$option$dynami.length) === 2) {
          var color = calcDeltaColor(_this10.option.dynamicColor[0], _this10.option.dynamicColor[1], average);
          brush.strokeStyle = color;
        }

        brush.stroke(path);
      });
      this.time++;

      if (this.time >= this.option.period) {
        this.time = 0;
      }
    }
  }]);

  return Round;
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
    var _context$width, _context$height;

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
    var width = (_context$width = context.width) !== null && _context$width !== void 0 ? _context$width : 0;
    var height = (_context$height = context.height) !== null && _context$height !== void 0 ? _context$height : 0;
    this.canvas.setAttribute('width', width.toString());
    this.canvas.setAttribute('height', height.toString());
    this.c.translate(width / 2, height / 2);
    this.offscreen.setAttribute('width', width.toString());
    this.offscreen.setAttribute('height', height.toString());
    this.o.translate(width / 2, height / 2);
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
      var _this$o, _this$context$effect, _this$c, _this$c2, _context11;

      (_this$o = this.o).clearRect.apply(_this$o, _toConsumableArray(this.wrap));

      if (((_this$context$effect = this.context.effect) === null || _this$context$effect === void 0 ? void 0 : _this$context$effect.trace) < 1) {
        var _this$context$effect$, _this$o2, _context10;

        this.o.globalAlpha = (_this$context$effect$ = this.context.effect.trace) !== null && _this$context$effect$ !== void 0 ? _this$context$effect$ : 1;

        (_this$o2 = this.o).drawImage.apply(_this$o2, _concatInstanceProperty(_context10 = [this.canvas]).call(_context10, _toConsumableArray(this.wrap)));

        this.o.globalAlpha = 1;
      }

      draw(this.o);

      (_this$c = this.c).clearRect.apply(_this$c, _toConsumableArray(this.wrap));

      (_this$c2 = this.c).drawImage.apply(_this$c2, _concatInstanceProperty(_context11 = [this.offscreen]).call(_context11, _toConsumableArray(this.wrap)));
    }
  }]);

  return Visualize;
}();
/**
 * 分析
 */


var max = 256; // 2**8

/**
 * 类
 */

var Audio = /*#__PURE__*/function () {
  // 头结点
  // 尾结点
  // 最后第二个结点
  // 最后第一个结点

  /**
   * 构造方法
   * @param context 上下文
   */
  function Audio(context) {
    _classCallCheck(this, Audio);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "_context", void 0);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "analyser", void 0);

    _defineProperty(this, "second", void 0);

    _defineProperty(this, "last", void 0);

    this.context = context;
    this._context = new AudioContext();
    this.source = this._context.createMediaElementSource(context.audio);
    this.source.connect(this._context.destination);
    this.analyser = this._context.createAnalyser();
    this.analyser.fftSize = context.size * 2; // *2

    this.source.connect(this.analyser);
    this.second = this.source;
    this.last = this.analyser;

    if (context.gain !== 1) {
      this.addGain();
    }
  }
  /**
   * 获取数据
   * @return 数据
   */


  _createClass(Audio, [{
    key: "get",
    value: function get() {
      var _context12, _Array$from$slice, _context13, _this$context$slice;

      var data = new Uint8Array(this.analyser.fftSize);

      if (this.context.time) {
        this.analyser.getByteTimeDomainData(data);
      } else {
        this.analyser.getByteFrequencyData(data);
      }

      var d = _mapInstanceProperty(_context12 = _sliceInstanceProperty(_Array$from$slice = _sliceInstanceProperty(_context13 = _Array$from(data)).call(_context13, 0, Math.floor(data.length / 2)) // /2
      ).apply(_Array$from$slice, _toConsumableArray((_this$context$slice = _sliceInstanceProperty(this.context)) !== null && _this$context$slice !== void 0 ? _this$context$slice : [0]))).call(_context12, function (a) {
        return a / max;
      });

      if (this.context.db) {
        d = _mapInstanceProperty(d).call(d, function (a) {
          return Math.min(1 + _Math$log(a), 1);
        });
      }

      return d;
    }
    /**
     * 添加结点
     * @param node 结点
     */

  }, {
    key: "add",
    value: function add(node) {
      this.second.disconnect(this.last);
      this.second.connect(node);
      node.connect(this.last);
      this.second = node;
    }
    /**
     * 添加增益
     * @param value 值
     */

  }, {
    key: "addGain",
    value: function addGain() {
      var _this$context$gain;

      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_this$context$gain = this.context.gain) !== null && _this$context$gain !== void 0 ? _this$context$gain : 1;

      var gain = this._context.createGain();

      gain.gain.value = value;
      this.add(gain);
    }
    /**
     * 添加滤波器
     */

  }, {
    key: "addFilter",
    value: function addFilter(type, frequency, q) {
      var gain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var filter = this._context.createBiquadFilter();

      filter.type = type;
      filter.frequency.value = frequency;
      filter.Q.value = q;
      filter.gain.value = gain;
      this.add(filter);
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
  function WebAudioWave(type, audio, option, graphOption) {
    var _context14,
        _this11 = this;

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
    this.animate = new Animate(_bindInstanceProperty(_context14 = this.callback).call(_context14, this), this.context.rate);
    this.visualize = new Visualize(this.context);
    this.audio = new Audio(this.context);

    if (_filterInstanceProperty(this.context).type) {
      this.audio.addFilter(_filterInstanceProperty(this.context).type, _filterInstanceProperty(this.context).frequency, _filterInstanceProperty(this.context).q, _filterInstanceProperty(this.context).gain);
    }

    if (this.context.type === 'bar') {
      this.graph = new Bar(this.context, this.visualize, this.audio, graphOption);
    } else if (this.context.type === 'curve') {
      this.graph = new Curve(this.context, this.visualize, this.audio, graphOption);
    } else if (this.context.type === 'circle') {
      this.graph = new Circle(this.context, this.visualize, this.audio, graphOption);
    } else if (this.context.type === 'ripple') {
      this.graph = new Ripple(this.context, this.visualize, this.audio, graphOption);
    } else if (this.context.type === 'round') {
      this.graph = new Round(this.context, this.visualize, this.audio, graphOption);
    }

    audio.addEventListener('play', function () {
      _this11.play();
    });
    audio.addEventListener('pause', function () {
      _this11.stop();
    });
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
      this.audio._context.resume();

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

export { Audio, Visualize, WebAudioWave as default };
