var WebAudioWave = (function (exports) {
  'use strict';

  /**
   * 上下文
   */
  const context = {
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
  Object.freeze(context);

  /**
   * 图形
   */
  /**
   * 类
   */
  class Graph {
      context;
      option = {};
      visualize;
      audio;
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio) {
          this.context = context;
          this.visualize = visualize;
          this.audio = audio;
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          Object.assign(this.option, option);
      }
  }

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
      let sr = parseInt(start.slice(1, 3), 16);
      let sg = parseInt(start.slice(3, 5), 16);
      let sb = parseInt(start.slice(5, 7), 16);
      let er = parseInt(end.slice(1, 3), 16);
      let eg = parseInt(end.slice(3, 5), 16);
      let eb = parseInt(end.slice(5, 7), 16);
      let dr = er - sr;
      let dg = eg - sg;
      let db = eb - sb;
      let result = `#${Math.round(sr + delta * dr)
        .toString(16)
        .padStart(2, '0')}${Math.round(sg + delta * dg)
        .toString(16)
        .padStart(2, '0')}${Math.round(sb + delta * db)
        .toString(16)
        .padStart(2, '0')}`;
      return result;
  }

  /**
   * 柱形
   */
  const preset$4 = {
      color: '#000000',
      gradientColor: null,
      dynamicColor: null,
      gap: 0
  };
  /**
   * 类
   */
  class Bar extends Graph {
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio, option) {
          super(context, visualize, audio);
          this.config(Object.assign({}, preset$4, option));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          super.config(option);
          this.visualize.brush.fillStyle = this.option.color;
          if (this.option.gradientColor?.length) {
              let gradient = this.visualize.brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0);
              for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
                  gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i]);
              }
              this.visualize.brush.fillStyle = gradient;
          }
      }
      /**
       * 更新
       */
      update() {
          let data = Array.from(this.audio?.get() ?? []);
          this.visualize.update(() => {
              let length = data.length;
              let width = this.context.width / length;
              for (let i = 0; i < length; i++) {
                  let x = -this.context.width / 2 + i * width;
                  let y = this.context.height / 2;
                  let w = width - this.option.gap;
                  let h = -(data[i] * this.context.height);
                  if (this.option.dynamicColor?.length === 2) {
                      this.visualize.brush.fillStyle = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], data[i]);
                  }
                  this.visualize.brush.fillRect(x, y, w, h);
              }
          });
      }
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeGlobal$1 = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var root$1 = root;

  /** Built-in value references. */
  var Symbol$4 = root$1.Symbol;

  var Symbol$5 = Symbol$4;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$a.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$a.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$9.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$2(value) {
    return nativeObjectToString.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$5 ? Symbol$5.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString$2(value);
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray$8 = Array.isArray;

  var isArray$9 = isArray$8;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$w(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject$w(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root$1['__core-js_shared__'];

  var coreJsData$1 = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$8 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$8.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject$w(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /** Built-in value references. */
  var objectCreate$2 = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject$w(proto)) {
        return {};
      }
      if (objectCreate$2) {
        return objectCreate$2(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var baseCreate$1 = baseCreate;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply$d(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var defineProperty$h = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var defineProperty$i = defineProperty$h;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty$i ? identity : function(func, string) {
    return defineProperty$i(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  var baseSetToString$1 = baseSetToString;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString$1);

  var setToString$1 = setToString;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$3 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$3 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty$i) {
      defineProperty$i(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$7.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply$d(func, this, otherArgs);
    };
  }

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + '');
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$2 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$2;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject$w(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;

    return value === proto;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
  }

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$5.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments$1 = isArguments;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

  /** Built-in value references. */
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  var isBuffer$1 = isBuffer;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal$1.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  var nodeUtil$1 = nodeUtil;

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  var isTypedArray$3 = isTypedArray$2;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$4.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$9(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$3(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$3.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject$w(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  var nativeCreate$1 = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$2.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$1.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root$1, 'Map');

  var Map$1 = Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$1 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  var getPrototype$1 = getPrototype;

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root$1.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$3 = root$1.Uint8Array;

  var Uint8Array$4 = Uint8Array$3;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$4(result).set(new Uint8Array$4(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate$1(getPrototype$1(object))
      : {};
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  var baseFor$1 = baseFor;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray$9(srcValue),
          isBuff = !isArr && isBuffer$1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray$3(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray$9(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;
        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject$w(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor$1(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject$w(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * Computes the mean of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the mean.
   * @example
   *
   * _.mean([4, 2, 8, 6]);
   * // => 5
   */
  function mean(array) {
    return baseMean(array, identity);
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge$1 = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  var merge$2 = merge$1;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var FunctionPrototype$6 = Function.prototype;
  var bind$g = FunctionPrototype$6.bind;
  var call$w = FunctionPrototype$6.call;
  var callBind$1 = bind$g && bind$g.bind(call$w);

  var functionUncurryThis$1 = bind$g ? function (fn) {
    return fn && callBind$1(call$w, fn);
  } : function (fn) {
    return fn && function () {
      return call$w.apply(fn, arguments);
    };
  };

  var ceil$1 = Math.ceil;
  var floor$6 = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$d = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$6 : ceil$1)(number);
  };

  var check$1 = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$1x =
    // eslint-disable-next-line es/no-global-this -- safe
    check$1(typeof globalThis == 'object' && globalThis) ||
    check$1(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check$1(typeof self == 'object' && self) ||
    check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var shared$9 = {exports: {}};

  var isPure = true;

  var global$1w = global$1x;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$g = Object.defineProperty;

  var setGlobal$5 = function (key, value) {
    try {
      defineProperty$g(global$1w, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$1w[key] = value;
    } return value;
  };

  var global$1v = global$1x;
  var setGlobal$4 = setGlobal$5;

  var SHARED$1 = '__core-js_shared__';
  var store$7 = global$1v[SHARED$1] || setGlobal$4(SHARED$1, {});

  var sharedStore$1 = store$7;

  var store$6 = sharedStore$1;

  (shared$9.exports = function (key, value) {
    return store$6[key] || (store$6[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.19.1',
    mode: 'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var global$1u = global$1x;

  var TypeError$v = global$1u.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$c = function (it) {
    if (it == undefined) throw TypeError$v("Can't call method on " + it);
    return it;
  };

  var global$1t = global$1x;
  var requireObjectCoercible$b = requireObjectCoercible$c;

  var Object$c = global$1t.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$k = function (argument) {
    return Object$c(requireObjectCoercible$b(argument));
  };

  var uncurryThis$T = functionUncurryThis$1;
  var toObject$j = toObject$k;

  var hasOwnProperty$1 = uncurryThis$T({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1$1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$1(toObject$j(it), key);
  };

  var uncurryThis$S = functionUncurryThis$1;

  var id$2 = 0;
  var postfix$1 = Math.random();
  var toString$i = uncurryThis$S(1.0.toString);

  var uid$8 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$i(++id$2 + postfix$1, 36);
  };

  var path$m = {};

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$E = function (argument) {
    return typeof argument == 'function';
  };

  var path$l = path$m;
  var global$1s = global$1x;
  var isCallable$D = isCallable$E;

  var aFunction$1 = function (variable) {
    return isCallable$D(variable) ? variable : undefined;
  };

  var getBuiltIn$j = function (namespace, method) {
    return arguments.length < 2 ? aFunction$1(path$l[namespace]) || aFunction$1(global$1s[namespace])
      : path$l[namespace] && path$l[namespace][method] || global$1s[namespace] && global$1s[namespace][method];
  };

  var getBuiltIn$i = getBuiltIn$j;

  var engineUserAgent$1 = getBuiltIn$i('navigator', 'userAgent') || '';

  var global$1r = global$1x;
  var userAgent$7 = engineUserAgent$1;

  var process$4 = global$1r.process;
  var Deno$1 = global$1r.Deno;
  var versions$1 = process$4 && process$4.versions || Deno$1 && Deno$1.version;
  var v8$1 = versions$1 && versions$1.v8;
  var match$1, version$1;

  if (v8$1) {
    match$1 = v8$1.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version$1 = match$1[0] > 0 && match$1[0] < 4 ? 1 : +(match$1[0] + match$1[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version$1 && userAgent$7) {
    match$1 = userAgent$7.match(/Edge\/(\d+)/);
    if (!match$1 || match$1[1] >= 74) {
      match$1 = userAgent$7.match(/Chrome\/(\d+)/);
      if (match$1) version$1 = +match$1[1];
    }
  }

  var engineV8Version$1 = version$1;

  var fails$P = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$4 = engineV8Version$1;
  var fails$O = fails$P;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$O(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$4 && V8_VERSION$4 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$4 = nativeSymbol$1;

  var useSymbolAsUid$1 = NATIVE_SYMBOL$4
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$1q = global$1x;
  var shared$8 = shared$9.exports;
  var hasOwn$p = hasOwnProperty_1$1;
  var uid$7 = uid$8;
  var NATIVE_SYMBOL$3 = nativeSymbol$1;
  var USE_SYMBOL_AS_UID$3 = useSymbolAsUid$1;

  var WellKnownSymbolsStore$2 = shared$8('wks');
  var Symbol$3 = global$1q.Symbol;
  var symbolFor$1 = Symbol$3 && Symbol$3['for'];
  var createWellKnownSymbol$1 = USE_SYMBOL_AS_UID$3 ? Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$7;

  var wellKnownSymbol$F = function (name) {
    if (!hasOwn$p(WellKnownSymbolsStore$2, name) || !(NATIVE_SYMBOL$3 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL$3 && hasOwn$p(Symbol$3, name)) {
        WellKnownSymbolsStore$2[name] = Symbol$3[name];
      } else if (USE_SYMBOL_AS_UID$3 && symbolFor$1) {
        WellKnownSymbolsStore$2[name] = symbolFor$1(description);
      } else {
        WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1(description);
      }
    } return WellKnownSymbolsStore$2[name];
  };

  var wellKnownSymbol$E = wellKnownSymbol$F;

  var TO_STRING_TAG$8 = wellKnownSymbol$E('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$8] = 'z';

  var toStringTagSupport$1 = String(test$1) === '[object z]';

  var uncurryThis$R = functionUncurryThis$1;

  var toString$h = uncurryThis$R({}.toString);
  var stringSlice$7 = uncurryThis$R(''.slice);

  var classofRaw$3 = function (it) {
    return stringSlice$7(toString$h(it), 8, -1);
  };

  var global$1p = global$1x;
  var TO_STRING_TAG_SUPPORT$5 = toStringTagSupport$1;
  var isCallable$C = isCallable$E;
  var classofRaw$2 = classofRaw$3;
  var wellKnownSymbol$D = wellKnownSymbol$F;

  var TO_STRING_TAG$7 = wellKnownSymbol$D('toStringTag');
  var Object$b = global$1p.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS$1 = classofRaw$2(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet$1 = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$m = TO_STRING_TAG_SUPPORT$5 ? classofRaw$2 : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet$1(O = Object$b(it), TO_STRING_TAG$7)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS$1 ? classofRaw$2(O)
      // ES3 arguments fallback
      : (result = classofRaw$2(O)) == 'Object' && isCallable$C(O.callee) ? 'Arguments' : result;
  };

  var global$1o = global$1x;
  var classof$l = classof$m;

  var String$9 = global$1o.String;

  var toString$g = function (argument) {
    if (classof$l(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$9(argument);
  };

  var uncurryThis$Q = functionUncurryThis$1;
  var toIntegerOrInfinity$c = toIntegerOrInfinity$d;
  var toString$f = toString$g;
  var requireObjectCoercible$a = requireObjectCoercible$c;

  var charAt$7 = uncurryThis$Q(''.charAt);
  var charCodeAt$2 = uncurryThis$Q(''.charCodeAt);
  var stringSlice$6 = uncurryThis$Q(''.slice);

  var createMethod$7 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$f(requireObjectCoercible$a($this));
      var position = toIntegerOrInfinity$c(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$2(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$2(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$7(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$6(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte$1 = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$7(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$7(true)
  };

  var uncurryThis$P = functionUncurryThis$1;
  var isCallable$B = isCallable$E;
  var store$5 = sharedStore$1;

  var functionToString$2 = uncurryThis$P(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$B(store$5.inspectSource)) {
    store$5.inspectSource = function (it) {
      return functionToString$2(it);
    };
  }

  var inspectSource$7 = store$5.inspectSource;

  var global$1n = global$1x;
  var isCallable$A = isCallable$E;
  var inspectSource$6 = inspectSource$7;

  var WeakMap$3 = global$1n.WeakMap;

  var nativeWeakMap$1 = isCallable$A(WeakMap$3) && /native code/.test(inspectSource$6(WeakMap$3));

  var isCallable$z = isCallable$E;

  var isObject$v = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$z(it);
  };

  var fails$N = fails$P;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors$1 = !fails$N(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectDefineProperty$1 = {};

  var global$1m = global$1x;
  var isObject$u = isObject$v;

  var document$4 = global$1m.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$3 = isObject$u(document$4) && isObject$u(document$4.createElement);

  var documentCreateElement$3 = function (it) {
    return EXISTS$3 ? document$4.createElement(it) : {};
  };

  var DESCRIPTORS$o = descriptors$1;
  var fails$M = fails$P;
  var createElement$2 = documentCreateElement$3;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine$1 = !DESCRIPTORS$o && !fails$M(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement$2('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var global$1l = global$1x;
  var isObject$t = isObject$v;

  var String$8 = global$1l.String;
  var TypeError$u = global$1l.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$t = function (argument) {
    if (isObject$t(argument)) return argument;
    throw TypeError$u(String$8(argument) + ' is not an object');
  };

  var call$v = Function.prototype.call;

  var functionCall$1 = call$v.bind ? call$v.bind(call$v) : function () {
    return call$v.apply(call$v, arguments);
  };

  var uncurryThis$O = functionUncurryThis$1;

  var objectIsPrototypeOf$1 = uncurryThis$O({}.isPrototypeOf);

  var global$1k = global$1x;
  var getBuiltIn$h = getBuiltIn$j;
  var isCallable$y = isCallable$E;
  var isPrototypeOf$9 = objectIsPrototypeOf$1;
  var USE_SYMBOL_AS_UID$2 = useSymbolAsUid$1;

  var Object$a = global$1k.Object;

  var isSymbol$7 = USE_SYMBOL_AS_UID$2 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$h('Symbol');
    return isCallable$y($Symbol) && isPrototypeOf$9($Symbol.prototype, Object$a(it));
  };

  var global$1j = global$1x;

  var String$7 = global$1j.String;

  var tryToString$9 = function (argument) {
    try {
      return String$7(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$1i = global$1x;
  var isCallable$x = isCallable$E;
  var tryToString$8 = tryToString$9;

  var TypeError$t = global$1i.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$e = function (argument) {
    if (isCallable$x(argument)) return argument;
    throw TypeError$t(tryToString$8(argument) + ' is not a function');
  };

  var aCallable$d = aCallable$e;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$9 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$d(func);
  };

  var global$1h = global$1x;
  var call$u = functionCall$1;
  var isCallable$w = isCallable$E;
  var isObject$s = isObject$v;

  var TypeError$s = global$1h.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$3 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$w(fn = input.toString) && !isObject$s(val = call$u(fn, input))) return val;
    if (isCallable$w(fn = input.valueOf) && !isObject$s(val = call$u(fn, input))) return val;
    if (pref !== 'string' && isCallable$w(fn = input.toString) && !isObject$s(val = call$u(fn, input))) return val;
    throw TypeError$s("Can't convert object to primitive value");
  };

  var global$1g = global$1x;
  var call$t = functionCall$1;
  var isObject$r = isObject$v;
  var isSymbol$6 = isSymbol$7;
  var getMethod$8 = getMethod$9;
  var ordinaryToPrimitive$2 = ordinaryToPrimitive$3;
  var wellKnownSymbol$C = wellKnownSymbol$F;

  var TypeError$r = global$1g.TypeError;
  var TO_PRIMITIVE$2 = wellKnownSymbol$C('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$3 = function (input, pref) {
    if (!isObject$r(input) || isSymbol$6(input)) return input;
    var exoticToPrim = getMethod$8(input, TO_PRIMITIVE$2);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$t(exoticToPrim, input, pref);
      if (!isObject$r(result) || isSymbol$6(result)) return result;
      throw TypeError$r("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive$2(input, pref);
  };

  var toPrimitive$2 = toPrimitive$3;
  var isSymbol$5 = isSymbol$7;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$8 = function (argument) {
    var key = toPrimitive$2(argument, 'string');
    return isSymbol$5(key) ? key : key + '';
  };

  var global$1f = global$1x;
  var DESCRIPTORS$n = descriptors$1;
  var IE8_DOM_DEFINE$3 = ie8DomDefine$1;
  var anObject$s = anObject$t;
  var toPropertyKey$7 = toPropertyKey$8;

  var TypeError$q = global$1f.TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$2 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty$1.f = DESCRIPTORS$n ? $defineProperty$2 : function defineProperty(O, P, Attributes) {
    anObject$s(O);
    P = toPropertyKey$7(P);
    anObject$s(Attributes);
    if (IE8_DOM_DEFINE$3) try {
      return $defineProperty$2(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$q('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$c = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$m = descriptors$1;
  var definePropertyModule$b = objectDefineProperty$1;
  var createPropertyDescriptor$b = createPropertyDescriptor$c;

  var createNonEnumerableProperty$h = DESCRIPTORS$m ? function (object, key, value) {
    return definePropertyModule$b.f(object, key, createPropertyDescriptor$b(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var shared$7 = shared$9.exports;
  var uid$6 = uid$8;

  var keys$2 = shared$7('keys');

  var sharedKey$8 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$6(key));
  };

  var hiddenKeys$b = {};

  var NATIVE_WEAK_MAP$1 = nativeWeakMap$1;
  var global$1e = global$1x;
  var uncurryThis$N = functionUncurryThis$1;
  var isObject$q = isObject$v;
  var createNonEnumerableProperty$g = createNonEnumerableProperty$h;
  var hasOwn$o = hasOwnProperty_1$1;
  var shared$6 = sharedStore$1;
  var sharedKey$7 = sharedKey$8;
  var hiddenKeys$a = hiddenKeys$b;

  var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
  var TypeError$p = global$1e.TypeError;
  var WeakMap$2 = global$1e.WeakMap;
  var set$3, get$3, has$1;

  var enforce$1 = function (it) {
    return has$1(it) ? get$3(it) : set$3(it, {});
  };

  var getterFor$1 = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$q(it) || (state = get$3(it)).type !== TYPE) {
        throw TypeError$p('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP$1 || shared$6.state) {
    var store$4 = shared$6.state || (shared$6.state = new WeakMap$2());
    var wmget$1 = uncurryThis$N(store$4.get);
    var wmhas$1 = uncurryThis$N(store$4.has);
    var wmset$1 = uncurryThis$N(store$4.set);
    set$3 = function (it, metadata) {
      if (wmhas$1(store$4, it)) throw new TypeError$p(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      wmset$1(store$4, it, metadata);
      return metadata;
    };
    get$3 = function (it) {
      return wmget$1(store$4, it) || {};
    };
    has$1 = function (it) {
      return wmhas$1(store$4, it);
    };
  } else {
    var STATE$1 = sharedKey$7('state');
    hiddenKeys$a[STATE$1] = true;
    set$3 = function (it, metadata) {
      if (hasOwn$o(it, STATE$1)) throw new TypeError$p(OBJECT_ALREADY_INITIALIZED$1);
      metadata.facade = it;
      createNonEnumerableProperty$g(it, STATE$1, metadata);
      return metadata;
    };
    get$3 = function (it) {
      return hasOwn$o(it, STATE$1) ? it[STATE$1] : {};
    };
    has$1 = function (it) {
      return hasOwn$o(it, STATE$1);
    };
  }

  var internalState$1 = {
    set: set$3,
    get: get$3,
    has: has$1,
    enforce: enforce$1,
    getterFor: getterFor$1
  };

  var FunctionPrototype$5 = Function.prototype;
  var apply$c = FunctionPrototype$5.apply;
  var bind$f = FunctionPrototype$5.bind;
  var call$s = FunctionPrototype$5.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply$1 = typeof Reflect == 'object' && Reflect.apply || (bind$f ? call$s.bind(apply$c) : function () {
    return call$s.apply(apply$c, arguments);
  });

  var objectGetOwnPropertyDescriptor$1 = {};

  var objectPropertyIsEnumerable$1 = {};

  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG$1 = getOwnPropertyDescriptor$5 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable$1.f = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$5(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$2;

  var global$1d = global$1x;
  var uncurryThis$M = functionUncurryThis$1;
  var fails$L = fails$P;
  var classof$k = classofRaw$3;

  var Object$9 = global$1d.Object;
  var split$2 = uncurryThis$M(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject$1 = fails$L(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$9('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$k(it) == 'String' ? split$2(it, '') : Object$9(it);
  } : Object$9;

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$5 = indexedObject$1;
  var requireObjectCoercible$9 = requireObjectCoercible$c;

  var toIndexedObject$g = function (it) {
    return IndexedObject$5(requireObjectCoercible$9(it));
  };

  var DESCRIPTORS$l = descriptors$1;
  var call$r = functionCall$1;
  var propertyIsEnumerableModule$3 = objectPropertyIsEnumerable$1;
  var createPropertyDescriptor$a = createPropertyDescriptor$c;
  var toIndexedObject$f = toIndexedObject$g;
  var toPropertyKey$6 = toPropertyKey$8;
  var hasOwn$n = hasOwnProperty_1$1;
  var IE8_DOM_DEFINE$2 = ie8DomDefine$1;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor$1.f = DESCRIPTORS$l ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$f(O);
    P = toPropertyKey$6(P);
    if (IE8_DOM_DEFINE$2) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$n(O, P)) return createPropertyDescriptor$a(!call$r(propertyIsEnumerableModule$3.f, O, P), O[P]);
  };

  var fails$K = fails$P;
  var isCallable$v = isCallable$E;

  var replacement$1 = /#|\.prototype\./;

  var isForced$4 = function (feature, detection) {
    var value = data$1[normalize$1(feature)];
    return value == POLYFILL$1 ? true
      : value == NATIVE$1 ? false
      : isCallable$v(detection) ? fails$K(detection)
      : !!detection;
  };

  var normalize$1 = isForced$4.normalize = function (string) {
    return String(string).replace(replacement$1, '.').toLowerCase();
  };

  var data$1 = isForced$4.data = {};
  var NATIVE$1 = isForced$4.NATIVE = 'N';
  var POLYFILL$1 = isForced$4.POLYFILL = 'P';

  var isForced_1$1 = isForced$4;

  var uncurryThis$L = functionUncurryThis$1;
  var aCallable$c = aCallable$e;

  var bind$e = uncurryThis$L(uncurryThis$L.bind);

  // optional / simple context binding
  var functionBindContext$1 = function (fn, that) {
    aCallable$c(fn);
    return that === undefined ? fn : bind$e ? bind$e(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var global$1c = global$1x;
  var apply$b = functionApply$1;
  var uncurryThis$K = functionUncurryThis$1;
  var isCallable$u = isCallable$E;
  var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor$1.f;
  var isForced$3 = isForced_1$1;
  var path$k = path$m;
  var bind$d = functionBindContext$1;
  var createNonEnumerableProperty$f = createNonEnumerableProperty$h;
  var hasOwn$m = hasOwnProperty_1$1;

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof Wrapper) {
        switch (arguments.length) {
          case 0: return new NativeConstructor();
          case 1: return new NativeConstructor(a);
          case 2: return new NativeConstructor(a, b);
        } return new NativeConstructor(a, b, c);
      } return apply$b(NativeConstructor, this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export$1 = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;

    var nativeSource = GLOBAL ? global$1c : STATIC ? global$1c[TARGET] : (global$1c[TARGET] || {}).prototype;

    var target = GLOBAL ? path$k : path$k[TARGET] || createNonEnumerableProperty$f(path$k, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && hasOwn$m(nativeSource, key);

      targetProperty = target[key];

      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$4(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key];

      // export native or implementation
      sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

      if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

      // bind timers to global for call from export context
      if (options.bind && USE_NATIVE) resultProperty = bind$d(sourceProperty, global$1c);
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && isCallable$u(sourceProperty)) resultProperty = uncurryThis$K(sourceProperty);
      // default case
      else resultProperty = sourceProperty;

      // add a flag to not completely full polyfills
      if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$f(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty$f(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
        if (!hasOwn$m(path$k, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty$f(path$k, VIRTUAL_PROTOTYPE, {});
        }
        // export virtual prototype methods
        createNonEnumerableProperty$f(path$k[VIRTUAL_PROTOTYPE], key, sourceProperty);
        // export real prototype methods
        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty$f(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var DESCRIPTORS$k = descriptors$1;
  var hasOwn$l = hasOwnProperty_1$1;

  var FunctionPrototype$4 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor$1 = DESCRIPTORS$k && Object.getOwnPropertyDescriptor;

  var EXISTS$2 = hasOwn$l(FunctionPrototype$4, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER$1 = EXISTS$2 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE$1 = EXISTS$2 && (!DESCRIPTORS$k || (DESCRIPTORS$k && getDescriptor$1(FunctionPrototype$4, 'name').configurable));

  var functionName$1 = {
    EXISTS: EXISTS$2,
    PROPER: PROPER$1,
    CONFIGURABLE: CONFIGURABLE$1
  };

  var toIntegerOrInfinity$b = toIntegerOrInfinity$d;

  var max$5 = Math.max;
  var min$8 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$9 = function (index, length) {
    var integer = toIntegerOrInfinity$b(index);
    return integer < 0 ? max$5(integer + length, 0) : min$8(integer, length);
  };

  var toIntegerOrInfinity$a = toIntegerOrInfinity$d;

  var min$7 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$b = function (argument) {
    return argument > 0 ? min$7(toIntegerOrInfinity$a(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$a = toLength$b;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$g = function (obj) {
    return toLength$a(obj.length);
  };

  var toIndexedObject$e = toIndexedObject$g;
  var toAbsoluteIndex$8 = toAbsoluteIndex$9;
  var lengthOfArrayLike$f = lengthOfArrayLike$g;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$6 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$e($this);
      var length = lengthOfArrayLike$f(O);
      var index = toAbsoluteIndex$8(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes$1 = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$6(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$6(false)
  };

  var uncurryThis$J = functionUncurryThis$1;
  var hasOwn$k = hasOwnProperty_1$1;
  var toIndexedObject$d = toIndexedObject$g;
  var indexOf$2 = arrayIncludes$1.indexOf;
  var hiddenKeys$9 = hiddenKeys$b;

  var push$8 = uncurryThis$J([].push);

  var objectKeysInternal$1 = function (object, names) {
    var O = toIndexedObject$d(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$k(hiddenKeys$9, key) && hasOwn$k(O, key) && push$8(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$k(O, key = names[i++])) {
      ~indexOf$2(result, key) || push$8(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$7 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$3 = objectKeysInternal$1;
  var enumBugKeys$6 = enumBugKeys$7;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$5 = Object.keys || function keys(O) {
    return internalObjectKeys$3(O, enumBugKeys$6);
  };

  var DESCRIPTORS$j = descriptors$1;
  var definePropertyModule$a = objectDefineProperty$1;
  var anObject$r = anObject$t;
  var toIndexedObject$c = toIndexedObject$g;
  var objectKeys$4 = objectKeys$5;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties$1 = DESCRIPTORS$j ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$r(O);
    var props = toIndexedObject$c(Properties);
    var keys = objectKeys$4(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$a.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$g = getBuiltIn$j;

  var html$4 = getBuiltIn$g('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$q = anObject$t;
  var defineProperties$1 = objectDefineProperties$1;
  var enumBugKeys$5 = enumBugKeys$7;
  var hiddenKeys$8 = hiddenKeys$b;
  var html$3 = html$4;
  var documentCreateElement$2 = documentCreateElement$3;
  var sharedKey$6 = sharedKey$8;

  var GT$1 = '>';
  var LT$1 = '<';
  var PROTOTYPE$3 = 'prototype';
  var SCRIPT$1 = 'script';
  var IE_PROTO$3 = sharedKey$6('IE_PROTO');

  var EmptyConstructor$1 = function () { /* empty */ };

  var scriptTag$1 = function (content) {
    return LT$1 + SCRIPT$1 + GT$1 + content + LT$1 + '/' + SCRIPT$1 + GT$1;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX$1 = function (activeXDocument) {
    activeXDocument.write(scriptTag$1(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame$1 = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$2('iframe');
    var JS = 'java' + SCRIPT$1 + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$3.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag$1('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument$1;
  var NullProtoObject$1 = function () {
    try {
      activeXDocument$1 = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject$1 = typeof document != 'undefined'
      ? document.domain && activeXDocument$1
        ? NullProtoObjectViaActiveX$1(activeXDocument$1) // old IE
        : NullProtoObjectViaIFrame$1()
      : NullProtoObjectViaActiveX$1(activeXDocument$1); // WSH
    var length = enumBugKeys$5.length;
    while (length--) delete NullProtoObject$1[PROTOTYPE$3][enumBugKeys$5[length]];
    return NullProtoObject$1();
  };

  hiddenKeys$8[IE_PROTO$3] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate$1 = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor$1[PROTOTYPE$3] = anObject$q(O);
      result = new EmptyConstructor$1();
      EmptyConstructor$1[PROTOTYPE$3] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$3] = O;
    } else result = NullProtoObject$1();
    return Properties === undefined ? result : defineProperties$1(result, Properties);
  };

  var fails$J = fails$P;

  var correctPrototypeGetter$1 = !fails$J(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$1b = global$1x;
  var hasOwn$j = hasOwnProperty_1$1;
  var isCallable$t = isCallable$E;
  var toObject$i = toObject$k;
  var sharedKey$5 = sharedKey$8;
  var CORRECT_PROTOTYPE_GETTER$2 = correctPrototypeGetter$1;

  var IE_PROTO$2 = sharedKey$5('IE_PROTO');
  var Object$8 = global$1b.Object;
  var ObjectPrototype$5 = Object$8.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$2 ? Object$8.getPrototypeOf : function (O) {
    var object = toObject$i(O);
    if (hasOwn$j(object, IE_PROTO$2)) return object[IE_PROTO$2];
    var constructor = object.constructor;
    if (isCallable$t(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$8 ? ObjectPrototype$5 : null;
  };

  var createNonEnumerableProperty$e = createNonEnumerableProperty$h;

  var redefine$e = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty$e(target, key, value);
  };

  var fails$I = fails$P;
  var isCallable$s = isCallable$E;
  var create$9 = objectCreate$1;
  var getPrototypeOf$7 = objectGetPrototypeOf$1;
  var redefine$d = redefine$e;
  var wellKnownSymbol$B = wellKnownSymbol$F;

  var ITERATOR$b = wellKnownSymbol$B('iterator');
  var BUGGY_SAFARI_ITERATORS$3 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype$1, arrayIterator$1;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator$1 = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator$1)) BUGGY_SAFARI_ITERATORS$3 = true;
    else {
      PrototypeOfArrayIteratorPrototype$1 = getPrototypeOf$7(getPrototypeOf$7(arrayIterator$1));
      if (PrototypeOfArrayIteratorPrototype$1 !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype$1;
    }
  }

  var NEW_ITERATOR_PROTOTYPE$1 = IteratorPrototype$4 == undefined || fails$I(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$4[ITERATOR$b].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE$1) IteratorPrototype$4 = {};
  else IteratorPrototype$4 = create$9(IteratorPrototype$4);

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$s(IteratorPrototype$4[ITERATOR$b])) {
    redefine$d(IteratorPrototype$4, ITERATOR$b, function () {
      return this;
    });
  }

  var iteratorsCore$1 = {
    IteratorPrototype: IteratorPrototype$4,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$3
  };

  var TO_STRING_TAG_SUPPORT$4 = toStringTagSupport$1;
  var classof$j = classof$m;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString$1 = TO_STRING_TAG_SUPPORT$4 ? {}.toString : function toString() {
    return '[object ' + classof$j(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT$3 = toStringTagSupport$1;
  var defineProperty$f = objectDefineProperty$1.f;
  var createNonEnumerableProperty$d = createNonEnumerableProperty$h;
  var hasOwn$i = hasOwnProperty_1$1;
  var toString$e = objectToString$1;
  var wellKnownSymbol$A = wellKnownSymbol$F;

  var TO_STRING_TAG$6 = wellKnownSymbol$A('toStringTag');

  var setToStringTag$a = function (it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;
      if (!hasOwn$i(target, TO_STRING_TAG$6)) {
        defineProperty$f(target, TO_STRING_TAG$6, { configurable: true, value: TAG });
      }
      if (SET_METHOD && !TO_STRING_TAG_SUPPORT$3) {
        createNonEnumerableProperty$d(target, 'toString', toString$e);
      }
    }
  };

  var iterators$1 = {};

  var IteratorPrototype$3 = iteratorsCore$1.IteratorPrototype;
  var create$8 = objectCreate$1;
  var createPropertyDescriptor$9 = createPropertyDescriptor$c;
  var setToStringTag$9 = setToStringTag$a;
  var Iterators$a = iterators$1;

  var returnThis$3 = function () { return this; };

  var createIteratorConstructor$3 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$8(IteratorPrototype$3, { next: createPropertyDescriptor$9(1, next) });
    setToStringTag$9(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators$a[TO_STRING_TAG] = returnThis$3;
    return IteratorConstructor;
  };

  var global$1a = global$1x;
  var isCallable$r = isCallable$E;

  var String$6 = global$1a.String;
  var TypeError$o = global$1a.TypeError;

  var aPossiblePrototype$3 = function (argument) {
    if (typeof argument == 'object' || isCallable$r(argument)) return argument;
    throw TypeError$o("Can't set " + String$6(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThis$I = functionUncurryThis$1;
  var anObject$p = anObject$t;
  var aPossiblePrototype$2 = aPossiblePrototype$3;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$I(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$p(O);
      aPossiblePrototype$2(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$y = _export$1;
  var call$q = functionCall$1;
  var FunctionName$2 = functionName$1;
  var createIteratorConstructor$2 = createIteratorConstructor$3;
  var getPrototypeOf$6 = objectGetPrototypeOf$1;
  var setToStringTag$8 = setToStringTag$a;
  var redefine$c = redefine$e;
  var wellKnownSymbol$z = wellKnownSymbol$F;
  var Iterators$9 = iterators$1;
  var IteratorsCore$1 = iteratorsCore$1;

  var PROPER_FUNCTION_NAME$4 = FunctionName$2.PROPER;
  var BUGGY_SAFARI_ITERATORS$2 = IteratorsCore$1.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$a = wellKnownSymbol$z('iterator');
  var KEYS$1 = 'keys';
  var VALUES$1 = 'values';
  var ENTRIES$1 = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator$5 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$2(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$2 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS$1: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES$1: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES$1: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$a]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$2 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$6(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag$8(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        Iterators$9[TO_STRING_TAG] = returnThis$2;
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$4 && DEFAULT == VALUES$1 && nativeIterator && nativeIterator.name !== VALUES$1) {
      {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$q(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES$1),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS$1),
        entries: getIterationMethod(ENTRIES$1)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$c(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$y({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ((FORCED) && IterablePrototype[ITERATOR$a] !== defaultIterator) {
      redefine$c(IterablePrototype, ITERATOR$a, defaultIterator, { name: DEFAULT });
    }
    Iterators$9[NAME] = defaultIterator;

    return methods;
  };

  var charAt$6 = stringMultibyte$1.charAt;
  var toString$d = toString$g;
  var InternalStateModule$9 = internalState$1;
  var defineIterator$4 = defineIterator$5;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$8 = InternalStateModule$9.set;
  var getInternalState$8 = InternalStateModule$9.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$4(String, 'String', function (iterated) {
    setInternalState$8(this, {
      type: STRING_ITERATOR,
      string: toString$d(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$8(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt$6(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var call$p = functionCall$1;
  var anObject$o = anObject$t;
  var getMethod$7 = getMethod$9;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$o(iterator);
    try {
      innerResult = getMethod$7(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$p(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$o(innerResult);
    return value;
  };

  var anObject$n = anObject$t;
  var iteratorClose$1 = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$n(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
  };

  var wellKnownSymbol$y = wellKnownSymbol$F;
  var Iterators$8 = iterators$1;

  var ITERATOR$9 = wellKnownSymbol$y('iterator');
  var ArrayPrototype$2 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$4 = function (it) {
    return it !== undefined && (Iterators$8.Array === it || ArrayPrototype$2[ITERATOR$9] === it);
  };

  var uncurryThis$H = functionUncurryThis$1;
  var fails$H = fails$P;
  var isCallable$q = isCallable$E;
  var classof$i = classof$m;
  var getBuiltIn$f = getBuiltIn$j;
  var inspectSource$5 = inspectSource$7;

  var noop$1 = function () { /* empty */ };
  var empty$1 = [];
  var construct$2 = getBuiltIn$f('Reflect', 'construct');
  var constructorRegExp$1 = /^\s*(?:class|function)\b/;
  var exec$4 = uncurryThis$H(constructorRegExp$1.exec);
  var INCORRECT_TO_STRING$1 = !constructorRegExp$1.exec(noop$1);

  var isConstructorModern$1 = function (argument) {
    if (!isCallable$q(argument)) return false;
    try {
      construct$2(noop$1, empty$1, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy$1 = function (argument) {
    if (!isCallable$q(argument)) return false;
    switch (classof$i(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING$1 || !!exec$4(constructorRegExp$1, inspectSource$5(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$7 = !construct$2 || fails$H(function () {
    var called;
    return isConstructorModern$1(isConstructorModern$1.call)
      || !isConstructorModern$1(Object)
      || !isConstructorModern$1(function () { called = true; })
      || called;
  }) ? isConstructorLegacy$1 : isConstructorModern$1;

  var toPropertyKey$5 = toPropertyKey$8;
  var definePropertyModule$9 = objectDefineProperty$1;
  var createPropertyDescriptor$8 = createPropertyDescriptor$c;

  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey$5(key);
    if (propertyKey in object) definePropertyModule$9.f(object, propertyKey, createPropertyDescriptor$8(0, value));
    else object[propertyKey] = value;
  };

  var classof$h = classof$m;
  var getMethod$6 = getMethod$9;
  var Iterators$7 = iterators$1;
  var wellKnownSymbol$x = wellKnownSymbol$F;

  var ITERATOR$8 = wellKnownSymbol$x('iterator');

  var getIteratorMethod$6 = function (it) {
    if (it != undefined) return getMethod$6(it, ITERATOR$8)
      || getMethod$6(it, '@@iterator')
      || Iterators$7[classof$h(it)];
  };

  var global$19 = global$1x;
  var call$o = functionCall$1;
  var aCallable$b = aCallable$e;
  var anObject$m = anObject$t;
  var tryToString$7 = tryToString$9;
  var getIteratorMethod$5 = getIteratorMethod$6;

  var TypeError$n = global$19.TypeError;

  var getIterator$4 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$5(argument) : usingIterator;
    if (aCallable$b(iteratorMethod)) return anObject$m(call$o(iteratorMethod, argument));
    throw TypeError$n(tryToString$7(argument) + ' is not iterable');
  };

  var global$18 = global$1x;
  var bind$c = functionBindContext$1;
  var call$n = functionCall$1;
  var toObject$h = toObject$k;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod$3 = isArrayIteratorMethod$4;
  var isConstructor$6 = isConstructor$7;
  var lengthOfArrayLike$e = lengthOfArrayLike$g;
  var createProperty$3 = createProperty$4;
  var getIterator$3 = getIterator$4;
  var getIteratorMethod$4 = getIteratorMethod$6;

  var Array$8 = global$18.Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$h(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$6(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$c(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$4(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array$8 && isArrayIteratorMethod$3(iteratorMethod))) {
      iterator = getIterator$3(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call$n(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$3(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$e(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$8(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$3(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$w = wellKnownSymbol$F;

  var ITERATOR$7 = wellKnownSymbol$w('iterator');
  var SAFE_CLOSING$1 = false;

  try {
    var called$1 = 0;
    var iteratorWithReturn$1 = {
      next: function () {
        return { done: !!called$1++ };
      },
      'return': function () {
        SAFE_CLOSING$1 = true;
      }
    };
    iteratorWithReturn$1[ITERATOR$7] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn$1, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING$1) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$7] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var $$x = _export$1;
  var from = arrayFrom;
  var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;

  var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration$3(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$x({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
    from: from
  });

  var path$j = path$m;

  path$j.Array.from;

  var classof$g = classofRaw$3;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$7 = Array.isArray || function isArray(argument) {
    return classof$g(argument) == 'Array';
  };

  var global$17 = global$1x;
  var isArray$6 = isArray$7;
  var isConstructor$5 = isConstructor$7;
  var isObject$p = isObject$v;
  var wellKnownSymbol$v = wellKnownSymbol$F;

  var SPECIES$9 = wellKnownSymbol$v('species');
  var Array$7 = global$17.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$3 = function (originalArray) {
    var C;
    if (isArray$6(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$5(C) && (C === Array$7 || isArray$6(C.prototype))) C = undefined;
      else if (isObject$p(C)) {
        C = C[SPECIES$9];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$7 : C;
  };

  var arraySpeciesConstructor$2 = arraySpeciesConstructor$3;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$5 = function (originalArray, length) {
    return new (arraySpeciesConstructor$2(originalArray))(length === 0 ? 0 : length);
  };

  var fails$G = fails$P;
  var wellKnownSymbol$u = wellKnownSymbol$F;
  var V8_VERSION$3 = engineV8Version$1;

  var SPECIES$8 = wellKnownSymbol$u('species');

  var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$3 >= 51 || !fails$G(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$8] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$w = _export$1;
  var global$16 = global$1x;
  var fails$F = fails$P;
  var isArray$5 = isArray$7;
  var isObject$o = isObject$v;
  var toObject$g = toObject$k;
  var lengthOfArrayLike$d = lengthOfArrayLike$g;
  var createProperty$2 = createProperty$4;
  var arraySpeciesCreate$4 = arraySpeciesCreate$5;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
  var wellKnownSymbol$t = wellKnownSymbol$F;
  var V8_VERSION$2 = engineV8Version$1;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol$t('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$m = global$16.TypeError;

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$2 >= 51 || !fails$F(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$o(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$5(O);
  };

  var FORCED$9 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$w({ target: 'Array', proto: true, forced: FORCED$9 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$g(this);
      var A = arraySpeciesCreate$4(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$d(E);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError$m(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError$m(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$2(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var objectGetOwnPropertyNames$1 = {};

  var internalObjectKeys$2 = objectKeysInternal$1;
  var enumBugKeys$4 = enumBugKeys$7;

  var hiddenKeys$7 = enumBugKeys$4.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$2(O, hiddenKeys$7);
  };

  var objectGetOwnPropertyNamesExternal = {};

  var uncurryThis$G = functionUncurryThis$1;

  var arraySlice$c = uncurryThis$G([].slice);

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var classof$f = classofRaw$3;
  var toIndexedObject$b = toIndexedObject$g;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;
  var arraySlice$b = arraySlice$c;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice$b(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$f(it) == 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$b(it));
  };

  var objectGetOwnPropertySymbols$1 = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols$1.f = Object.getOwnPropertySymbols;

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$s = wellKnownSymbol$F;

  wellKnownSymbolWrapped.f = wellKnownSymbol$s;

  var path$i = path$m;
  var hasOwn$h = hasOwnProperty_1$1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$e = objectDefineProperty$1.f;

  var defineWellKnownSymbol$l = function (NAME) {
    var Symbol = path$i.Symbol || (path$i.Symbol = {});
    if (!hasOwn$h(Symbol, NAME)) defineProperty$e(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var bind$b = functionBindContext$1;
  var uncurryThis$F = functionUncurryThis$1;
  var IndexedObject$4 = indexedObject$1;
  var toObject$f = toObject$k;
  var lengthOfArrayLike$c = lengthOfArrayLike$g;
  var arraySpeciesCreate$3 = arraySpeciesCreate$5;

  var push$7 = uncurryThis$F([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$5 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$f($this);
      var self = IndexedObject$4(O);
      var boundFunction = bind$b(callbackfn, that);
      var length = lengthOfArrayLike$c(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$3;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$7(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$7(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration$1 = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$5(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$5(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$5(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$5(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$5(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$5(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$5(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$5(7)
  };

  var $$v = _export$1;
  var global$15 = global$1x;
  var getBuiltIn$e = getBuiltIn$j;
  var apply$a = functionApply$1;
  var call$m = functionCall$1;
  var uncurryThis$E = functionUncurryThis$1;
  var DESCRIPTORS$i = descriptors$1;
  var NATIVE_SYMBOL$2 = nativeSymbol$1;
  var fails$E = fails$P;
  var hasOwn$g = hasOwnProperty_1$1;
  var isArray$4 = isArray$7;
  var isCallable$p = isCallable$E;
  var isObject$n = isObject$v;
  var isPrototypeOf$8 = objectIsPrototypeOf$1;
  var isSymbol$4 = isSymbol$7;
  var anObject$l = anObject$t;
  var toObject$e = toObject$k;
  var toIndexedObject$a = toIndexedObject$g;
  var toPropertyKey$4 = toPropertyKey$8;
  var $toString$1 = toString$g;
  var createPropertyDescriptor$7 = createPropertyDescriptor$c;
  var nativeObjectCreate = objectCreate$1;
  var objectKeys$3 = objectKeys$5;
  var getOwnPropertyNamesModule$3 = objectGetOwnPropertyNames$1;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols$1;
  var getOwnPropertyDescriptorModule$4 = objectGetOwnPropertyDescriptor$1;
  var definePropertyModule$8 = objectDefineProperty$1;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable$1;
  var arraySlice$a = arraySlice$c;
  var redefine$b = redefine$e;
  var shared$5 = shared$9.exports;
  var sharedKey$4 = sharedKey$8;
  var hiddenKeys$6 = hiddenKeys$b;
  var uid$5 = uid$8;
  var wellKnownSymbol$r = wellKnownSymbol$F;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
  var setToStringTag$7 = setToStringTag$a;
  var InternalStateModule$8 = internalState$1;
  var $forEach$1 = arrayIteration$1.forEach;

  var HIDDEN = sharedKey$4('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$2 = 'prototype';
  var TO_PRIMITIVE$1 = wellKnownSymbol$r('toPrimitive');

  var setInternalState$7 = InternalStateModule$8.set;
  var getInternalState$7 = InternalStateModule$8.getterFor(SYMBOL);

  var ObjectPrototype$4 = Object[PROTOTYPE$2];
  var $Symbol = global$15.Symbol;
  var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE$2];
  var TypeError$l = global$15.TypeError;
  var QObject = global$15.QObject;
  var $stringify$1 = getBuiltIn$e('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$4.f;
  var nativeDefineProperty$1 = definePropertyModule$8.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule$2.f;
  var push$6 = uncurryThis$E([].push);

  var AllSymbols = shared$5('symbols');
  var ObjectPrototypeSymbols = shared$5('op-symbols');
  var StringToSymbolRegistry = shared$5('string-to-symbol-registry');
  var SymbolToStringRegistry = shared$5('symbol-to-string-registry');
  var WellKnownSymbolsStore$1 = shared$5('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$i && fails$E(function () {
    return nativeObjectCreate(nativeDefineProperty$1({}, 'a', {
      get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$4, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$4[P];
    nativeDefineProperty$1(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$4) {
      nativeDefineProperty$1(ObjectPrototype$4, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty$1;

  var wrap$1 = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
    setInternalState$7(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$i) symbol.description = description;
    return symbol;
  };

  var $defineProperty$1 = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$4) $defineProperty$1(ObjectPrototypeSymbols, P, Attributes);
    anObject$l(O);
    var key = toPropertyKey$4(P);
    anObject$l(Attributes);
    if (hasOwn$g(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$g(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$7(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$g(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$7(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty$1(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$l(O);
    var properties = toIndexedObject$a(Properties);
    var keys = objectKeys$3(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!DESCRIPTORS$i || call$m($propertyIsEnumerable$1, properties, key)) $defineProperty$1(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey$4(V);
    var enumerable = call$m(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype$4 && hasOwn$g(AllSymbols, P) && !hasOwn$g(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$g(this, P) || !hasOwn$g(AllSymbols, P) || hasOwn$g(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$a(O);
    var key = toPropertyKey$4(P);
    if (it === ObjectPrototype$4 && hasOwn$g(AllSymbols, key) && !hasOwn$g(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
    if (descriptor && hasOwn$g(AllSymbols, key) && !(hasOwn$g(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$a(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!hasOwn$g(AllSymbols, key) && !hasOwn$g(hiddenKeys$6, key)) push$6(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$4;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$a(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (hasOwn$g(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$g(ObjectPrototype$4, key))) {
        push$6(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL$2) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$8(SymbolPrototype, this)) throw TypeError$l('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$1(arguments[0]);
      var tag = uid$5(description);
      var setter = function (value) {
        if (this === ObjectPrototype$4) call$m(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$g(this, HIDDEN) && hasOwn$g(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$7(1, value));
      };
      if (DESCRIPTORS$i && USE_SETTER) setSymbolDescriptor(ObjectPrototype$4, tag, { configurable: true, set: setter });
      return wrap$1(tag, description);
    };

    SymbolPrototype = $Symbol[PROTOTYPE$2];

    redefine$b(SymbolPrototype, 'toString', function toString() {
      return getInternalState$7(this).tag;
    });

    redefine$b($Symbol, 'withoutSetter', function (description) {
      return wrap$1(uid$5(description), description);
    });

    propertyIsEnumerableModule$2.f = $propertyIsEnumerable$1;
    definePropertyModule$8.f = $defineProperty$1;
    getOwnPropertyDescriptorModule$4.f = $getOwnPropertyDescriptor$1;
    getOwnPropertyNamesModule$3.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$3.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap$1(wellKnownSymbol$r(name), name);
    };

    if (DESCRIPTORS$i) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty$1(SymbolPrototype, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$7(this).description;
        }
      });
    }
  }

  $$v({ global: true, wrap: true, forced: !NATIVE_SYMBOL$2, sham: !NATIVE_SYMBOL$2 }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys$3(WellKnownSymbolsStore$1), function (name) {
    defineWellKnownSymbol$k(name);
  });

  $$v({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$2 }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = $toString$1(key);
      if (hasOwn$g(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol$4(sym)) throw TypeError$l(sym + ' is not a symbol');
      if (hasOwn$g(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$v({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$2, sham: !DESCRIPTORS$i }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty$1,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1
  });

  $$v({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$2 }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  $$v({ target: 'Object', stat: true, forced: fails$E(function () { getOwnPropertySymbolsModule$3.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule$3.f(toObject$e(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify$1) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$2 || fails$E(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify$1([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify$1({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify$1(Object(symbol)) != '{}';
    });

    $$v({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice$a(arguments);
        var $replacer = replacer;
        if (!isObject$n(replacer) && it === undefined || isSymbol$4(it)) return; // IE8 returns string on undefined
        if (!isArray$4(replacer)) replacer = function (key, value) {
          if (isCallable$p($replacer)) value = call$m($replacer, this, key, value);
          if (!isSymbol$4(value)) return value;
        };
        args[1] = replacer;
        return apply$a($stringify$1, null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!SymbolPrototype[TO_PRIMITIVE$1]) {
    var valueOf = SymbolPrototype.valueOf;
    // eslint-disable-next-line no-unused-vars -- required for .length
    redefine$b(SymbolPrototype, TO_PRIMITIVE$1, function (hint) {
      // TODO: improve hint logic
      return call$m(valueOf, this);
    });
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag$7($Symbol, SYMBOL);

  hiddenKeys$6[HIDDEN] = true;

  var defineWellKnownSymbol$j = defineWellKnownSymbol$l;

  // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator
  defineWellKnownSymbol$j('asyncIterator');

  var defineWellKnownSymbol$i = defineWellKnownSymbol$l;

  // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance
  defineWellKnownSymbol$i('hasInstance');

  var defineWellKnownSymbol$h = defineWellKnownSymbol$l;

  // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
  defineWellKnownSymbol$h('isConcatSpreadable');

  var defineWellKnownSymbol$g = defineWellKnownSymbol$l;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol$g('iterator');

  var defineWellKnownSymbol$f = defineWellKnownSymbol$l;

  // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match
  defineWellKnownSymbol$f('match');

  var defineWellKnownSymbol$e = defineWellKnownSymbol$l;

  // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall
  defineWellKnownSymbol$e('matchAll');

  var defineWellKnownSymbol$d = defineWellKnownSymbol$l;

  // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace
  defineWellKnownSymbol$d('replace');

  var defineWellKnownSymbol$c = defineWellKnownSymbol$l;

  // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search
  defineWellKnownSymbol$c('search');

  var defineWellKnownSymbol$b = defineWellKnownSymbol$l;

  // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species
  defineWellKnownSymbol$b('species');

  var defineWellKnownSymbol$a = defineWellKnownSymbol$l;

  // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split
  defineWellKnownSymbol$a('split');

  var defineWellKnownSymbol$9 = defineWellKnownSymbol$l;

  // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive
  defineWellKnownSymbol$9('toPrimitive');

  var defineWellKnownSymbol$8 = defineWellKnownSymbol$l;

  // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag
  defineWellKnownSymbol$8('toStringTag');

  var defineWellKnownSymbol$7 = defineWellKnownSymbol$l;

  // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables
  defineWellKnownSymbol$7('unscopables');

  var global$14 = global$1x;
  var setToStringTag$6 = setToStringTag$a;

  // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag
  setToStringTag$6(global$14.JSON, 'JSON', true);

  var path$h = path$m;

  path$h.Symbol;

  var toIndexedObject$9 = toIndexedObject$g;
  var Iterators$6 = iterators$1;
  var InternalStateModule$7 = internalState$1;
  var defineIterator$3 = defineIterator$5;

  var ARRAY_ITERATOR$1 = 'Array Iterator';
  var setInternalState$6 = InternalStateModule$7.set;
  var getInternalState$6 = InternalStateModule$7.getterFor(ARRAY_ITERATOR$1);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  defineIterator$3(Array, 'Array', function (iterated, kind) {
    setInternalState$6(this, {
      type: ARRAY_ITERATOR$1,
      target: toIndexedObject$9(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$6(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators$6.Arguments = Iterators$6.Array;

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var DOMIterables = domIterables;
  var global$13 = global$1x;
  var classof$e = classof$m;
  var createNonEnumerableProperty$c = createNonEnumerableProperty$h;
  var Iterators$5 = iterators$1;
  var wellKnownSymbol$q = wellKnownSymbol$F;

  var TO_STRING_TAG$5 = wellKnownSymbol$q('toStringTag');

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$13[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && classof$e(CollectionPrototype) !== TO_STRING_TAG$5) {
      createNonEnumerableProperty$c(CollectionPrototype, TO_STRING_TAG$5, COLLECTION_NAME);
    }
    Iterators$5[COLLECTION_NAME] = Iterators$5.Array;
  }

  var $$u = _export$1;
  var isArray$3 = isArray$7;

  // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray
  $$u({ target: 'Array', stat: true }, {
    isArray: isArray$3
  });

  var path$g = path$m;

  path$g.Array.isArray;

  var defineWellKnownSymbol$6 = defineWellKnownSymbol$l;

  // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement
  defineWellKnownSymbol$6('asyncDispose');

  var defineWellKnownSymbol$5 = defineWellKnownSymbol$l;

  // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement
  defineWellKnownSymbol$5('dispose');

  var defineWellKnownSymbol$4 = defineWellKnownSymbol$l;

  // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching
  defineWellKnownSymbol$4('matcher');

  var defineWellKnownSymbol$3 = defineWellKnownSymbol$l;

  // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators
  defineWellKnownSymbol$3('metadata');

  var defineWellKnownSymbol$2 = defineWellKnownSymbol$l;

  // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable
  defineWellKnownSymbol$2('observable');

  // TODO: remove from `core-js@4`
  var defineWellKnownSymbol$1 = defineWellKnownSymbol$l;

  // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching
  defineWellKnownSymbol$1('patternMatch');

  // TODO: remove from `core-js@4`
  var defineWellKnownSymbol = defineWellKnownSymbol$l;

  defineWellKnownSymbol('replaceAll');

  var $$t = _export$1;
  var global$12 = global$1x;
  var isArray$2 = isArray$7;
  var isConstructor$4 = isConstructor$7;
  var isObject$m = isObject$v;
  var toAbsoluteIndex$7 = toAbsoluteIndex$9;
  var lengthOfArrayLike$b = lengthOfArrayLike$g;
  var toIndexedObject$8 = toIndexedObject$g;
  var createProperty$1 = createProperty$4;
  var wellKnownSymbol$p = wellKnownSymbol$F;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
  var un$Slice = arraySlice$c;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

  var SPECIES$7 = wellKnownSymbol$p('species');
  var Array$6 = global$12.Array;
  var max$4 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$t({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$8(this);
      var length = lengthOfArrayLike$b(O);
      var k = toAbsoluteIndex$7(start, length);
      var fin = toAbsoluteIndex$7(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$2(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$4(Constructor) && (Constructor === Array$6 || isArray$2(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$m(Constructor)) {
          Constructor = Constructor[SPECIES$7];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array$6 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array$6 : Constructor)(max$4(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var path$f = path$m;

  var entryVirtual$7 = function (CONSTRUCTOR) {
    return path$f[CONSTRUCTOR + 'Prototype'];
  };

  var entryVirtual$6 = entryVirtual$7;

  entryVirtual$6('Array').slice;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var defineProperty$d = {exports: {}};

  var $$s = _export$1;
  var DESCRIPTORS$h = descriptors$1;
  var objectDefinePropertyModile = objectDefineProperty$1;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  $$s({ target: 'Object', stat: true, forced: !DESCRIPTORS$h, sham: !DESCRIPTORS$h }, {
    defineProperty: objectDefinePropertyModile.f
  });

  var path$e = path$m;

  var Object$7 = path$e.Object;

  var defineProperty$c = defineProperty$d.exports = function defineProperty(it, key, desc) {
    return Object$7.defineProperty(it, key, desc);
  };

  if (Object$7.defineProperty.sham) defineProperty$c.sham = true;

  var parent$1 = defineProperty$d.exports;

  var defineProperty$b = parent$1;

  var parent = defineProperty$b;

  var defineProperty$a = parent;

  var defineProperty$9 = defineProperty$a;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$9(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$9(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$11 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$D = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$C = fails$D;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$C(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var call$l = Function.prototype.call;

  var functionCall = call$l.bind ? call$l.bind(call$l) : function () {
    return call$l.apply(call$l, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$3(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$6 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var FunctionPrototype$3 = Function.prototype;
  var bind$a = FunctionPrototype$3.bind;
  var call$k = FunctionPrototype$3.call;
  var callBind = bind$a && bind$a.bind(call$k);

  var functionUncurryThis = bind$a ? function (fn) {
    return fn && callBind(call$k, fn);
  } : function (fn) {
    return fn && function () {
      return call$k.apply(fn, arguments);
    };
  };

  var uncurryThis$D = functionUncurryThis;

  var toString$c = uncurryThis$D({}.toString);
  var stringSlice$5 = uncurryThis$D(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$5(toString$c(it), 8, -1);
  };

  var global$10 = global$11;
  var uncurryThis$C = functionUncurryThis;
  var fails$B = fails$D;
  var classof$d = classofRaw$1;

  var Object$6 = global$10.Object;
  var split$1 = uncurryThis$C(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$B(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$6('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$d(it) == 'String' ? split$1(it, '') : Object$6(it);
  } : Object$6;

  var global$$ = global$11;

  var TypeError$k = global$$.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$8 = function (it) {
    if (it == undefined) throw TypeError$k("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$3 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$8;

  var toIndexedObject$7 = function (it) {
    return IndexedObject$3(requireObjectCoercible$7(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$o = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$n = isCallable$o;

  var isObject$l = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$n(it);
  };

  var global$_ = global$11;
  var isCallable$m = isCallable$o;

  var aFunction = function (argument) {
    return isCallable$m(argument) ? argument : undefined;
  };

  var getBuiltIn$d = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$_[namespace]) : global$_[namespace] && global$_[namespace][method];
  };

  var uncurryThis$B = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$B({}.isPrototypeOf);

  var getBuiltIn$c = getBuiltIn$d;

  var engineUserAgent = getBuiltIn$c('navigator', 'userAgent') || '';

  var global$Z = global$11;
  var userAgent$6 = engineUserAgent;

  var process$3 = global$Z.process;
  var Deno = global$Z.Deno;
  var versions = process$3 && process$3.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$6) {
    match = userAgent$6.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$6.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$A = fails$D;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$A(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$Y = global$11;
  var getBuiltIn$b = getBuiltIn$d;
  var isCallable$l = isCallable$o;
  var isPrototypeOf$7 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var Object$5 = global$Y.Object;

  var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$b('Symbol');
    return isCallable$l($Symbol) && isPrototypeOf$7($Symbol.prototype, Object$5(it));
  };

  var global$X = global$11;

  var String$5 = global$X.String;

  var tryToString$6 = function (argument) {
    try {
      return String$5(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$W = global$11;
  var isCallable$k = isCallable$o;
  var tryToString$5 = tryToString$6;

  var TypeError$j = global$W.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$a = function (argument) {
    if (isCallable$k(argument)) return argument;
    throw TypeError$j(tryToString$5(argument) + ' is not a function');
  };

  var aCallable$9 = aCallable$a;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$5 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$9(func);
  };

  var global$V = global$11;
  var call$j = functionCall;
  var isCallable$j = isCallable$o;
  var isObject$k = isObject$l;

  var TypeError$i = global$V.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$j(fn = input.toString) && !isObject$k(val = call$j(fn, input))) return val;
    if (isCallable$j(fn = input.valueOf) && !isObject$k(val = call$j(fn, input))) return val;
    if (pref !== 'string' && isCallable$j(fn = input.toString) && !isObject$k(val = call$j(fn, input))) return val;
    throw TypeError$i("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$U = global$11;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$8 = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$8(global$U, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$U[key] = value;
    } return value;
  };

  var global$T = global$11;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$T[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.19.1',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var global$S = global$11;
  var requireObjectCoercible$6 = requireObjectCoercible$8;

  var Object$4 = global$S.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$d = function (argument) {
    return Object$4(requireObjectCoercible$6(argument));
  };

  var uncurryThis$A = functionUncurryThis;
  var toObject$c = toObject$d;

  var hasOwnProperty = uncurryThis$A({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$c(it), key);
  };

  var uncurryThis$z = functionUncurryThis;

  var id$1 = 0;
  var postfix = Math.random();
  var toString$b = uncurryThis$z(1.0.toString);

  var uid$4 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id$1 + postfix, 36);
  };

  var global$R = global$11;
  var shared$3 = shared$4.exports;
  var hasOwn$f = hasOwnProperty_1;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared$3('wks');
  var Symbol$2 = global$R.Symbol;
  var symbolFor = Symbol$2 && Symbol$2['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$3;

  var wellKnownSymbol$o = function (name) {
    if (!hasOwn$f(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL && hasOwn$f(Symbol$2, name)) {
        WellKnownSymbolsStore[name] = Symbol$2[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var global$Q = global$11;
  var call$i = functionCall;
  var isObject$j = isObject$l;
  var isSymbol$2 = isSymbol$3;
  var getMethod$4 = getMethod$5;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$n = wellKnownSymbol$o;

  var TypeError$h = global$Q.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$n('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$j(input) || isSymbol$2(input)) return input;
    var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$i(exoticToPrim, input, pref);
      if (!isObject$j(result) || isSymbol$2(result)) return result;
      throw TypeError$h("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol$1 = isSymbol$3;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol$1(key) ? key : key + '';
  };

  var global$P = global$11;
  var isObject$i = isObject$l;

  var document$3 = global$P.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$i(document$3) && isObject$i(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$g = descriptors;
  var fails$z = fails$D;
  var createElement$1 = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$g && !fails$z(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$f = descriptors;
  var call$h = functionCall;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$5 = createPropertyDescriptor$6;
  var toIndexedObject$6 = toIndexedObject$7;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$e = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$f ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$6(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$e(O, P)) return createPropertyDescriptor$5(!call$h(propertyIsEnumerableModule$1.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var global$O = global$11;
  var isObject$h = isObject$l;

  var String$4 = global$O.String;
  var TypeError$g = global$O.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$k = function (argument) {
    if (isObject$h(argument)) return argument;
    throw TypeError$g(String$4(argument) + ' is not an object');
  };

  var global$N = global$11;
  var DESCRIPTORS$e = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$j = anObject$k;
  var toPropertyKey$1 = toPropertyKey$3;

  var TypeError$f = global$N.TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$e ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$j(O);
    P = toPropertyKey$1(P);
    anObject$j(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$f('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$d = descriptors;
  var definePropertyModule$7 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$6;

  var createNonEnumerableProperty$b = DESCRIPTORS$d ? function (object, key, value) {
    return definePropertyModule$7.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$a = {exports: {}};

  var uncurryThis$y = functionUncurryThis;
  var isCallable$i = isCallable$o;
  var store$1 = sharedStore;

  var functionToString$1 = uncurryThis$y(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$i(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString$1(it);
    };
  }

  var inspectSource$4 = store$1.inspectSource;

  var global$M = global$11;
  var isCallable$h = isCallable$o;
  var inspectSource$3 = inspectSource$4;

  var WeakMap$1 = global$M.WeakMap;

  var nativeWeakMap = isCallable$h(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

  var shared$2 = shared$4.exports;
  var uid$2 = uid$4;

  var keys$1 = shared$2('keys');

  var sharedKey$3 = function (key) {
    return keys$1[key] || (keys$1[key] = uid$2(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$L = global$11;
  var uncurryThis$x = functionUncurryThis;
  var isObject$g = isObject$l;
  var createNonEnumerableProperty$a = createNonEnumerableProperty$b;
  var hasOwn$d = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$e = global$L.TypeError;
  var WeakMap = global$L.WeakMap;
  var set$2, get$2, has;

  var enforce = function (it) {
    return has(it) ? get$2(it) : set$2(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$g(it) || (state = get$2(it)).type !== TYPE) {
        throw TypeError$e('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = uncurryThis$x(store.get);
    var wmhas = uncurryThis$x(store.has);
    var wmset = uncurryThis$x(store.set);
    set$2 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$e(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get$2 = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;
    set$2 = function (it, metadata) {
      if (hasOwn$d(it, STATE)) throw new TypeError$e(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$a(it, STATE, metadata);
      return metadata;
    };
    get$2 = function (it) {
      return hasOwn$d(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$d(it, STATE);
    };
  }

  var internalState = {
    set: set$2,
    get: get$2,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$c = descriptors;
  var hasOwn$c = hasOwnProperty_1;

  var FunctionPrototype$2 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$c && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$c(FunctionPrototype$2, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$c || (DESCRIPTORS$c && getDescriptor(FunctionPrototype$2, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$K = global$11;
  var isCallable$g = isCallable$o;
  var hasOwn$b = hasOwnProperty_1;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$b;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$2 = inspectSource$4;
  var InternalStateModule$6 = internalState;
  var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;

  var getInternalState$5 = InternalStateModule$6.get;
  var enforceInternalState = InternalStateModule$6.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$a.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$g(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$b(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
        createNonEnumerableProperty$9(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$K) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$9(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$g(this) && getInternalState$5(this).source || inspectSource$2(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$5 = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$9 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$5 : ceil)(number);
  };

  var toIntegerOrInfinity$8 = toIntegerOrInfinity$9;

  var max$3 = Math.max;
  var min$6 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$6 = function (index, length) {
    var integer = toIntegerOrInfinity$8(index);
    return integer < 0 ? max$3(integer + length, 0) : min$6(integer, length);
  };

  var toIntegerOrInfinity$7 = toIntegerOrInfinity$9;

  var min$5 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$9 = function (argument) {
    return argument > 0 ? min$5(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$8 = toLength$9;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$a = function (obj) {
    return toLength$8(obj.length);
  };

  var toIndexedObject$5 = toIndexedObject$7;
  var toAbsoluteIndex$5 = toAbsoluteIndex$6;
  var lengthOfArrayLike$9 = lengthOfArrayLike$a;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$4 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$5($this);
      var length = lengthOfArrayLike$9(O);
      var index = toAbsoluteIndex$5(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$4(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$4(false)
  };

  var uncurryThis$w = functionUncurryThis;
  var hasOwn$a = hasOwnProperty_1;
  var toIndexedObject$4 = toIndexedObject$7;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var push$5 = uncurryThis$w([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$4(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$a(hiddenKeys$3, key) && hasOwn$a(O, key) && push$5(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$a(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$5(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$a = getBuiltIn$d;
  var uncurryThis$v = functionUncurryThis;
  var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
  var anObject$i = anObject$k;

  var concat$4 = uncurryThis$v([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$3 = getBuiltIn$a('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$2.f(anObject$i(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
    return getOwnPropertySymbols ? concat$4(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$9 = hasOwnProperty_1;
  var ownKeys$2 = ownKeys$3;
  var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$6 = objectDefineProperty;

  var copyConstructorProperties$3 = function (target, source) {
    var keys = ownKeys$2(source);
    var defineProperty = definePropertyModule$6.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$3.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$9(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$y = fails$D;
  var isCallable$f = isCallable$o;

  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$f(detection) ? fails$y(detection)
      : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';

  var isForced_1 = isForced$2;

  var global$J = global$11;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$b;
  var redefine$9 = redefine$a.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties$2 = copyConstructorProperties$3;
  var isForced$1 = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$J;
    } else if (STATIC) {
      target = global$J[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$J[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$2(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$2(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$8(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$9(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$m = wellKnownSymbol$o;

  var TO_STRING_TAG$4 = wellKnownSymbol$m('toStringTag');
  var test = {};

  test[TO_STRING_TAG$4] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var global$I = global$11;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$e = isCallable$o;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$l = wellKnownSymbol$o;

  var TO_STRING_TAG$3 = wellKnownSymbol$l('toStringTag');
  var Object$3 = global$I.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$c = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$3(it), TO_STRING_TAG$3)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
  };

  var global$H = global$11;
  var classof$b = classof$c;

  var String$3 = global$H.String;

  var toString$a = function (argument) {
    if (classof$b(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$3(argument);
  };

  var anObject$h = anObject$k;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$h(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$x = fails$D;
  var global$G = global$11;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$G.RegExp;

  regexpStickyHelpers.UNSUPPORTED_Y = fails$x(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$x(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$b = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$g = anObject$k;
  var toIndexedObject$3 = toIndexedObject$7;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$b ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$g(O);
    var props = toIndexedObject$3(Properties);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$5.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$9 = getBuiltIn$d;

  var html$2 = getBuiltIn$9('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$f = anObject$k;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html$1 = html$2;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$f(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$w = fails$D;
  var global$F = global$11;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$F.RegExp;

  var regexpUnsupportedDotAll = fails$w(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$v = fails$D;
  var global$E = global$11;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$E.RegExp;

  var regexpUnsupportedNcg = fails$v(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$g = functionCall;
  var uncurryThis$u = functionUncurryThis;
  var toString$9 = toString$a;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared = shared$4.exports;
  var create$7 = objectCreate;
  var getInternalState$4 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$5 = uncurryThis$u(''.charAt);
  var indexOf = uncurryThis$u(''.indexOf);
  var replace$4 = uncurryThis$u(''.replace);
  var stringSlice$4 = uncurryThis$u(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$g(nativeExec, re1, 'a');
    call$g(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$4(re);
      var str = toString$9(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$g(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = call$g(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$4(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$4(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call$g(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$4(match.input, charsAdded);
          match[0] = stringSlice$4(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$g(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$7(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$r = _export;
  var exec$3 = regexpExec$3;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$r({ target: 'RegExp', proto: true, forced: /./.exec !== exec$3 }, {
    exec: exec$3
  });

  var FunctionPrototype$1 = Function.prototype;
  var apply$9 = FunctionPrototype$1.apply;
  var bind$9 = FunctionPrototype$1.bind;
  var call$f = FunctionPrototype$1.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$9 ? call$f.bind(apply$9) : function () {
    return call$f.apply(apply$9, arguments);
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$t = functionUncurryThis;
  var redefine$8 = redefine$a.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$u = fails$D;
  var wellKnownSymbol$k = wellKnownSymbol$o;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$b;

  var SPECIES$6 = wellKnownSymbol$k('species');
  var RegExpPrototype$1 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$k(KEY);

    var DELEGATES_TO_SYMBOL = !fails$u(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$u(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$6] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = uncurryThis$t(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$t(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$2 || $exec === RegExpPrototype$1.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      redefine$8(String.prototype, KEY, methods[0]);
      redefine$8(RegExpPrototype$1, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$7(RegExpPrototype$1[SYMBOL], 'sham', true);
  };

  var isObject$f = isObject$l;
  var classof$a = classofRaw$1;
  var wellKnownSymbol$j = wellKnownSymbol$o;

  var MATCH$2 = wellKnownSymbol$j('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp$1 = function (it) {
    var isRegExp;
    return isObject$f(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$a(it) == 'RegExp');
  };

  var uncurryThis$s = functionUncurryThis;
  var fails$t = fails$D;
  var isCallable$d = isCallable$o;
  var classof$9 = classof$c;
  var getBuiltIn$8 = getBuiltIn$d;
  var inspectSource$1 = inspectSource$4;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct$1 = getBuiltIn$8('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$2 = uncurryThis$s(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function (argument) {
    if (!isCallable$d(argument)) return false;
    try {
      construct$1(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable$d(argument)) return false;
    switch (classof$9(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$1(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$3 = !construct$1 || fails$t(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$D = global$11;
  var isConstructor$2 = isConstructor$3;
  var tryToString$4 = tryToString$6;

  var TypeError$d = global$D.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$5 = function (argument) {
    if (isConstructor$2(argument)) return argument;
    throw TypeError$d(tryToString$4(argument) + ' is not a constructor');
  };

  var anObject$e = anObject$k;
  var aConstructor$4 = aConstructor$5;
  var wellKnownSymbol$i = wellKnownSymbol$o;

  var SPECIES$5 = wellKnownSymbol$i('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$6 = function (O, defaultConstructor) {
    var C = anObject$e(O).constructor;
    var S;
    return C === undefined || (S = anObject$e(C)[SPECIES$5]) == undefined ? defaultConstructor : aConstructor$4(S);
  };

  var uncurryThis$r = functionUncurryThis;
  var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
  var toString$8 = toString$a;
  var requireObjectCoercible$5 = requireObjectCoercible$8;

  var charAt$4 = uncurryThis$r(''.charAt);
  var charCodeAt$1 = uncurryThis$r(''.charCodeAt);
  var stringSlice$3 = uncurryThis$r(''.slice);

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$8(requireObjectCoercible$5($this));
      var position = toIntegerOrInfinity$6(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$4(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$3(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var charAt$3 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt$3(S, index).length : 1);
  };

  var uncurryThis$q = functionUncurryThis;

  var arraySlice$9 = uncurryThis$q([].slice);

  var global$C = global$11;
  var call$e = functionCall;
  var anObject$d = anObject$k;
  var isCallable$c = isCallable$o;
  var classof$8 = classofRaw$1;
  var regexpExec$1 = regexpExec$3;

  var TypeError$c = global$C.TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$c(exec)) {
      var result = call$e(exec, R, S);
      if (result !== null) anObject$d(result);
      return result;
    }
    if (classof$8(R) === 'RegExp') return call$e(regexpExec$1, R, S);
    throw TypeError$c('RegExp#exec called on incompatible receiver');
  };

  var apply$8 = functionApply;
  var call$d = functionCall;
  var uncurryThis$p = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var isRegExp$1 = isRegexp$1;
  var anObject$c = anObject$k;
  var requireObjectCoercible$4 = requireObjectCoercible$8;
  var speciesConstructor$5 = speciesConstructor$6;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var toLength$7 = toLength$9;
  var toString$7 = toString$a;
  var getMethod$3 = getMethod$5;
  var arraySlice$8 = arraySlice$9;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers = regexpStickyHelpers;
  var fails$s = fails$D;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$4 = Math.min;
  var $push = [].push;
  var exec$1 = uncurryThis$p(/./.exec);
  var push$4 = uncurryThis$p($push);
  var stringSlice$2 = uncurryThis$p(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$s(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegExpWellKnownSymbolLogic$2('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString$7(requireObjectCoercible$4(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp$1(separator)) {
          return call$d(nativeSplit, string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = call$d(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            push$4(output, stringSlice$2(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) apply$8($push, output, arraySlice$8(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !exec$1(separatorCopy, '')) push$4(output, '');
        } else push$4(output, stringSlice$2(string, lastLastIndex));
        return output.length > lim ? arraySlice$8(output, 0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : call$d(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible$4(this);
        var splitter = separator == undefined ? undefined : getMethod$3(separator, SPLIT);
        return splitter
          ? call$d(splitter, separator, O, limit)
          : call$d(internalSplit, toString$7(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject$c(this);
        var S = toString$7(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor$5(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
          var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$2(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$4(toLength$7(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex$2(S, q, unicodeMatching);
          } else {
            push$4(A, stringSlice$2(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$4(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$4(A, stringSlice$2(S, p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$7 = classof$c;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$7(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$7 = redefine$a.exports;
  var toString$6 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$7(Object.prototype, 'toString', toString$6, { unsafe: true });
  }

  var DESCRIPTORS$a = descriptors;
  var FUNCTION_NAME_EXISTS = functionName.EXISTS;
  var uncurryThis$o = functionUncurryThis;
  var defineProperty$7 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var functionToString = uncurryThis$o(FunctionPrototype.toString);
  var nameRE = /^\s*function ([^ (]*)/;
  var regExpExec$2 = uncurryThis$o(nameRE.exec);
  var NAME$1 = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS$a && !FUNCTION_NAME_EXISTS) {
    defineProperty$7(FunctionPrototype, NAME$1, {
      configurable: true,
      get: function () {
        try {
          return regExpExec$2(nameRE, functionToString(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var entryVirtual$5 = entryVirtual$7;

  entryVirtual$5('Array').concat;

  var DESCRIPTORS$9 = descriptors$1;
  var uncurryThis$n = functionUncurryThis$1;
  var call$c = functionCall$1;
  var fails$r = fails$P;
  var objectKeys = objectKeys$5;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols$1;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable$1;
  var toObject$b = toObject$k;
  var IndexedObject$2 = indexedObject$1;

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$6 = Object.defineProperty;
  var concat$3 = uncurryThis$n([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails$r(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$9 && $assign({ b: 1 }, $assign(defineProperty$6({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$6(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$b(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject$2(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$3(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$9 || call$c(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  var $$q = _export$1;
  var assign = objectAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  $$q({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
    assign: assign
  });

  var path$d = path$m;

  path$d.Object.assign;

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


  function pathCurve(points, type) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$a = _ref.a,
        a = _ref$a === void 0 ? 0.25 : _ref$a,
        _ref$b = _ref.b,
        b = _ref$b === void 0 ? 0.25 : _ref$b,
        _ref$close = _ref.close,
        close = _ref$close === void 0 ? false : _ref$close;

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

    if (close) {
      path.lineTo(points[0][0], points[0][1]);
    }

    return path;
  }

  /**
   * 曲线
   */
  const preset$3 = {
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
  class Curve extends Graph {
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio, option) {
          super(context, visualize, audio);
          this.config(Object.assign({}, preset$3, option));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          super.config(option);
          let brush = this.visualize.brush;
          brush.strokeStyle = this.option.color;
          brush.lineWidth = this.option.width;
          if (this.option.gradientColor?.length) {
              let gradient = brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0);
              for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
                  gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i]);
              }
              brush.strokeStyle = gradient;
          }
      }
      /**
       * 绘制
       */
      update() {
          let data = this.audio?.get() ?? [];
          let d = Array.from(data);
          if (this.option.reverse) {
              d.reverse();
          }
          if (this.option.mirror) {
              d = d.concat(Array.from(d).reverse());
          }
          let brush = this.visualize.brush;
          this.visualize.update(() => {
              if (this.option.dynamicColor?.length === 2) {
                  let average = mean(data);
                  brush.strokeStyle = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average);
              }
              let points = [];
              let dw = this.context.width / d.length;
              let startX = -this.context.width / 2;
              let direction = 1;
              for (let i = 0, l = d.length; i < l; i++) {
                  let x = startX + dw * i;
                  let y = -(direction * d[i] * this.context.height) / 2;
                  points.push([x, y]);
                  if (this.option.backforth) {
                      direction *= -1;
                  }
              }
              let path = pathCurve(points, this.option.smooth ? 'bezier' : undefined);
              brush.stroke(path);
          });
      }
  }

  /**
   * 圆圈
   */
  const preset$2 = {
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
  class Circle extends Graph {
      get maxRadius() {
          return Math.min(this.context.width, this.context.height) / 2;
      }
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio, option) {
          super(context, visualize, audio);
          this.config(Object.assign({}, preset$2, option));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          super.config(option);
          let brush = this.visualize.brush;
          brush.strokeStyle = this.option.color;
          brush.fillStyle = this.option.color;
          brush.lineWidth = this.option.width;
          if (this.option.gradientColor?.length) {
              let gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius);
              for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
                  gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i]);
              }
              brush.strokeStyle = gradient;
              brush.fillStyle = gradient;
          }
      }
      /**
       * 更新
       */
      update() {
          let brush = this.visualize.brush;
          let data = this.audio?.get() ?? [];
          this.visualize.update(() => {
              if (this.option.average) {
                  let average = mean(data);
                  brush.beginPath();
                  brush.moveTo(this.maxRadius * average, 0);
                  brush.arc(0, 0, this.maxRadius * average, 0, 360);
                  brush.closePath();
                  if (this.option.dynamicColor?.length === 2) {
                      let color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average);
                      brush.fillStyle = color;
                  }
                  if (this.option.fill) {
                      brush.fill();
                  }
                  else {
                      brush.stroke();
                  }
              }
              else {
                  if (this.option.fill) {
                      for (let a of data) {
                          brush.beginPath();
                          brush.moveTo(this.maxRadius * a, 0);
                          brush.arc(0, 0, this.maxRadius * a, 0, 360);
                          brush.closePath();
                          if (this.option.dynamicColor?.length === 2) {
                              let color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a);
                              brush.fillStyle = color;
                          }
                          brush.fill();
                      }
                  }
                  else {
                      for (let a of data) {
                          brush.beginPath();
                          brush.moveTo(this.maxRadius * a, 0);
                          brush.arc(0, 0, this.maxRadius * a, 0, 360);
                          brush.closePath();
                          if (this.option.dynamicColor?.length === 2) {
                              let color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a);
                              brush.strokeStyle = color;
                          }
                          brush.stroke();
                      }
                  }
              }
          });
      }
  }

  var global$B = global$1x;
  var uncurryThis$m = functionUncurryThis$1;
  var aCallable$8 = aCallable$e;
  var isObject$e = isObject$v;
  var hasOwn$8 = hasOwnProperty_1$1;
  var arraySlice$7 = arraySlice$c;

  var Function$3 = global$B.Function;
  var concat$2 = uncurryThis$m([].concat);
  var join$2 = uncurryThis$m([].join);
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!hasOwn$8(factories, argsLength)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      factories[argsLength] = Function$3('C,a', 'return new C(' + join$2(list, ',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind = Function$3.bind || function bind(that /* , ...args */) {
    var F = aCallable$8(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice$7(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = concat$2(partArgs, arraySlice$7(arguments));
      return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
    };
    if (isObject$e(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
  };

  var global$A = global$1x;
  var isConstructor$1 = isConstructor$7;
  var tryToString$3 = tryToString$9;

  var TypeError$b = global$A.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$3 = function (argument) {
    if (isConstructor$1(argument)) return argument;
    throw TypeError$b(tryToString$3(argument) + ' is not a constructor');
  };

  var $$p = _export$1;
  var getBuiltIn$7 = getBuiltIn$j;
  var apply$7 = functionApply$1;
  var bind$8 = functionBind;
  var aConstructor$2 = aConstructor$3;
  var anObject$b = anObject$t;
  var isObject$d = isObject$v;
  var create$6 = objectCreate$1;
  var fails$q = fails$P;

  var nativeConstruct = getBuiltIn$7('Reflect', 'construct');
  var ObjectPrototype$3 = Object.prototype;
  var push$3 = [].push;

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails$q(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });

  var ARGS_BUG = !fails$q(function () {
    nativeConstruct(function () { /* empty */ });
  });

  var FORCED$8 = NEW_TARGET_BUG || ARGS_BUG;

  $$p({ target: 'Reflect', stat: true, forced: FORCED$8, sham: FORCED$8 }, {
    construct: function construct(Target, args /* , newTarget */) {
      aConstructor$2(Target);
      anObject$b(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor$2(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        apply$7(push$3, $args, args);
        return new (apply$7(bind$8, Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = create$6(isObject$d(proto) ? proto : ObjectPrototype$3);
      var result = apply$7(Target, instance, args);
      return isObject$d(result) ? result : instance;
    }
  });

  var path$c = path$m;

  path$c.Reflect.construct;

  var hasOwn$7 = hasOwnProperty_1$1;

  var isDataDescriptor$1 = function (descriptor) {
    return descriptor !== undefined && (hasOwn$7(descriptor, 'value') || hasOwn$7(descriptor, 'writable'));
  };

  var $$o = _export$1;
  var call$b = functionCall$1;
  var isObject$c = isObject$v;
  var anObject$a = anObject$t;
  var isDataDescriptor = isDataDescriptor$1;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor$1;
  var getPrototypeOf$5 = objectGetPrototypeOf$1;

  // `Reflect.get` method
  // https://tc39.es/ecma262/#sec-reflect.get
  function get$1(target, propertyKey /* , receiver */) {
    var receiver = arguments.length < 3 ? target : arguments[2];
    var descriptor, prototype;
    if (anObject$a(target) === receiver) return target[propertyKey];
    descriptor = getOwnPropertyDescriptorModule$2.f(target, propertyKey);
    if (descriptor) return isDataDescriptor(descriptor)
      ? descriptor.value
      : descriptor.get === undefined ? undefined : call$b(descriptor.get, receiver);
    if (isObject$c(prototype = getPrototypeOf$5(target))) return get$1(prototype, propertyKey, receiver);
  }

  $$o({ target: 'Reflect', stat: true }, {
    get: get$1
  });

  var path$b = path$m;

  path$b.Reflect.get;

  var $$n = _export$1;
  var fails$p = fails$P;
  var toIndexedObject$2 = toIndexedObject$g;
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor$1.f;
  var DESCRIPTORS$8 = descriptors$1;

  var FAILS_ON_PRIMITIVES$3 = fails$p(function () { nativeGetOwnPropertyDescriptor$1(1); });
  var FORCED$7 = !DESCRIPTORS$8 || FAILS_ON_PRIMITIVES$3;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  $$n({ target: 'Object', stat: true, forced: FORCED$7, sham: !DESCRIPTORS$8 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$1(toIndexedObject$2(it), key);
    }
  });

  var path$a = path$m;

  var Object$2 = path$a.Object;

  var getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
    return Object$2.getOwnPropertyDescriptor(it, key);
  };

  if (Object$2.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$1.sham = true;

  var $$m = _export$1;
  var setPrototypeOf$6 = objectSetPrototypeOf$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  $$m({ target: 'Object', stat: true }, {
    setPrototypeOf: setPrototypeOf$6
  });

  var path$9 = path$m;

  path$9.Object.setPrototypeOf;

  var $$l = _export$1;
  var fails$o = fails$P;
  var toObject$a = toObject$k;
  var nativeGetPrototypeOf = objectGetPrototypeOf$1;
  var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter$1;

  var FAILS_ON_PRIMITIVES$2 = fails$o(function () { nativeGetPrototypeOf(1); });

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  $$l({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !CORRECT_PROTOTYPE_GETTER$1 }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject$a(it));
    }
  });

  var path$8 = path$m;

  path$8.Object.getPrototypeOf;

  var $$k = _export$1;
  var DESCRIPTORS$7 = descriptors$1;
  var create$5 = objectCreate$1;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  $$k({ target: 'Object', stat: true, sham: !DESCRIPTORS$7 }, {
    create: create$5
  });

  var path$7 = path$m;

  path$7.Object;

  var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;

  WrappedWellKnownSymbolModule.f('iterator');

  var getBuiltIn$6 = getBuiltIn$j;
  var uncurryThis$l = functionUncurryThis$1;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames$1;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols$1;
  var anObject$9 = anObject$t;

  var concat$1 = uncurryThis$l([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$6('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$9(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$6 = hasOwnProperty_1$1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor$1;
  var definePropertyModule$4 = objectDefineProperty$1;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$6(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var uncurryThis$k = functionUncurryThis$1;
  var arraySlice$6 = arraySlice$c;

  var replace$3 = uncurryThis$k(''.replace);
  var split = uncurryThis$k(''.split);
  var join$1 = uncurryThis$k([].join);

  var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
  var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
  var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
  var IS_FIREFOX_OR_SAFARI_STACK = /@[^\n]*\n/.test(TEST) && !/zxcasd/.test(TEST);

  var clearErrorStack$1 = function (stack, dropEntries) {
    if (typeof stack != 'string') return stack;
    if (IS_V8_OR_CHAKRA_STACK) {
      while (dropEntries--) stack = replace$3(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
    } else if (IS_FIREFOX_OR_SAFARI_STACK) {
      return join$1(arraySlice$6(split(stack, '\n'), dropEntries), '\n');
    } return stack;
  };

  var isObject$b = isObject$v;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$h;

  // `InstallErrorCause` abstract operation
  // https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
  var installErrorCause$1 = function (O, options) {
    if (isObject$b(options) && 'cause' in options) {
      createNonEnumerableProperty$6(O, 'cause', options.cause);
    }
  };

  var global$z = global$1x;
  var bind$7 = functionBindContext$1;
  var call$a = functionCall$1;
  var anObject$8 = anObject$t;
  var tryToString$2 = tryToString$9;
  var isArrayIteratorMethod$2 = isArrayIteratorMethod$4;
  var lengthOfArrayLike$8 = lengthOfArrayLike$g;
  var isPrototypeOf$6 = objectIsPrototypeOf$1;
  var getIterator$2 = getIterator$4;
  var getIteratorMethod$3 = getIteratorMethod$6;
  var iteratorClose = iteratorClose$2;

  var TypeError$a = global$z.TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$6 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$7(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$8(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$3(iterable);
      if (!iterFn) throw TypeError$a(tryToString$2(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod$2(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$8(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$6(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator$2(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = call$a(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$6(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var toString$5 = toString$g;

  var normalizeStringArgument$1 = function (argument, $default) {
    return argument === undefined ? arguments.length < 2 ? '' : $default : toString$5(argument);
  };

  var fails$n = fails$P;
  var createPropertyDescriptor$3 = createPropertyDescriptor$c;

  var errorStackInstallable = !fails$n(function () {
    var error = Error('a');
    if (!('stack' in error)) return true;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(error, 'stack', createPropertyDescriptor$3(1, 7));
    return error.stack !== 7;
  });

  var $$j = _export$1;
  var global$y = global$1x;
  var isPrototypeOf$5 = objectIsPrototypeOf$1;
  var getPrototypeOf$4 = objectGetPrototypeOf$1;
  var setPrototypeOf$5 = objectSetPrototypeOf$1;
  var copyConstructorProperties = copyConstructorProperties$1;
  var create$4 = objectCreate$1;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$h;
  var createPropertyDescriptor$2 = createPropertyDescriptor$c;
  var clearErrorStack = clearErrorStack$1;
  var installErrorCause = installErrorCause$1;
  var iterate$5 = iterate$6;
  var normalizeStringArgument = normalizeStringArgument$1;
  var wellKnownSymbol$h = wellKnownSymbol$F;
  var ERROR_STACK_INSTALLABLE = errorStackInstallable;

  var TO_STRING_TAG$2 = wellKnownSymbol$h('toStringTag');
  var Error$1 = global$y.Error;
  var push$2 = [].push;

  var $AggregateError = function AggregateError(errors, message /* , options */) {
    var options = arguments.length > 2 ? arguments[2] : undefined;
    var isInstance = isPrototypeOf$5(AggregateErrorPrototype, this);
    var that;
    if (setPrototypeOf$5) {
      that = setPrototypeOf$5(new Error$1(undefined), isInstance ? getPrototypeOf$4(this) : AggregateErrorPrototype);
    } else {
      that = isInstance ? this : create$4(AggregateErrorPrototype);
      createNonEnumerableProperty$5(that, TO_STRING_TAG$2, 'Error');
    }
    createNonEnumerableProperty$5(that, 'message', normalizeStringArgument(message, ''));
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty$5(that, 'stack', clearErrorStack(that.stack, 1));
    installErrorCause(that, options);
    var errorsArray = [];
    iterate$5(errors, push$2, { that: errorsArray });
    createNonEnumerableProperty$5(that, 'errors', errorsArray);
    return that;
  };

  if (setPrototypeOf$5) setPrototypeOf$5($AggregateError, Error$1);
  else copyConstructorProperties($AggregateError, Error$1);

  var AggregateErrorPrototype = $AggregateError.prototype = create$4(Error$1.prototype, {
    constructor: createPropertyDescriptor$2(1, $AggregateError),
    message: createPropertyDescriptor$2(1, ''),
    name: createPropertyDescriptor$2(1, 'AggregateError')
  });

  // `AggregateError` constructor
  // https://tc39.es/ecma262/#sec-aggregate-error-constructor
  $$j({ global: true }, {
    AggregateError: $AggregateError
  });

  var global$x = global$1x;

  var nativePromiseConstructor = global$x.Promise;

  var redefine$6 = redefine$e;

  var redefineAll$4 = function (target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];
      else redefine$6(target, key, src[key], options);
    } return target;
  };

  var getBuiltIn$5 = getBuiltIn$j;
  var definePropertyModule$3 = objectDefineProperty$1;
  var wellKnownSymbol$g = wellKnownSymbol$F;
  var DESCRIPTORS$6 = descriptors$1;

  var SPECIES$4 = wellKnownSymbol$g('species');

  var setSpecies$4 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$5(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$3.f;

    if (DESCRIPTORS$6 && Constructor && !Constructor[SPECIES$4]) {
      defineProperty(Constructor, SPECIES$4, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var global$w = global$1x;
  var isPrototypeOf$4 = objectIsPrototypeOf$1;

  var TypeError$9 = global$w.TypeError;

  var anInstance$6 = function (it, Prototype) {
    if (isPrototypeOf$4(Prototype, it)) return it;
    throw TypeError$9('Incorrect invocation');
  };

  var anObject$7 = anObject$t;
  var aConstructor$1 = aConstructor$3;
  var wellKnownSymbol$f = wellKnownSymbol$F;

  var SPECIES$3 = wellKnownSymbol$f('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$4 = function (O, defaultConstructor) {
    var C = anObject$7(O).constructor;
    var S;
    return C === undefined || (S = anObject$7(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor$1(S);
  };

  var userAgent$5 = engineUserAgent$1;

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$5);

  var classof$6 = classofRaw$3;
  var global$v = global$1x;

  var engineIsNode = classof$6(global$v.process) == 'process';

  var global$u = global$1x;
  var apply$6 = functionApply$1;
  var bind$6 = functionBindContext$1;
  var isCallable$b = isCallable$E;
  var hasOwn$5 = hasOwnProperty_1$1;
  var fails$m = fails$P;
  var html = html$4;
  var arraySlice$5 = arraySlice$c;
  var createElement = documentCreateElement$3;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var set$1 = global$u.setImmediate;
  var clear = global$u.clearImmediate;
  var process$2 = global$u.process;
  var Dispatch = global$u.Dispatch;
  var Function$2 = global$u.Function;
  var MessageChannel = global$u.MessageChannel;
  var String$2 = global$u.String;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$u.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    if (hasOwn$5(queue, id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$u.postMessage(String$2(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      var args = arraySlice$5(arguments, 1);
      queue[++counter] = function () {
        apply$6(isCallable$b(fn) ? fn : Function$2(fn), undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$6(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$u.addEventListener &&
      isCallable$b(global$u.postMessage) &&
      !global$u.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$m(post)
    ) {
      defer = post;
      global$u.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set$1,
    clear: clear
  };

  var userAgent$4 = engineUserAgent$1;
  var global$t = global$1x;

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$4) && global$t.Pebble !== undefined;

  var userAgent$3 = engineUserAgent$1;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$3);

  var global$s = global$1x;
  var bind$5 = functionBindContext$1;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver = global$s.MutationObserver || global$s.WebKitMutationObserver;
  var document$2 = global$s.document;
  var process$1 = global$s.process;
  var Promise$1 = global$s.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$s, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = bind$5(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      // strange IE + webpack dev server bug - use .bind(global)
      macrotask = bind$5(macrotask, global$s);
      notify$1 = function () {
        macrotask(flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var newPromiseCapability$2 = {};

  var aCallable$7 = aCallable$e;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$7(resolve);
    this.reject = aCallable$7(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$6 = anObject$t;
  var isObject$a = isObject$v;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$2 = function (C, x) {
    anObject$6(C);
    if (isObject$a(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$r = global$1x;

  var hostReportErrors$1 = function (a, b) {
    var console = global$r.console;
    if (console && console.error) {
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$4 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var engineIsBrowser = typeof window == 'object';

  var $$i = _export$1;
  var IS_PURE = isPure;
  var global$q = global$1x;
  var getBuiltIn$4 = getBuiltIn$j;
  var call$9 = functionCall$1;
  var NativePromise$1 = nativePromiseConstructor;
  var redefineAll$3 = redefineAll$4;
  var setToStringTag$5 = setToStringTag$a;
  var setSpecies$3 = setSpecies$4;
  var aCallable$6 = aCallable$e;
  var isCallable$a = isCallable$E;
  var isObject$9 = isObject$v;
  var anInstance$5 = anInstance$6;
  var inspectSource = inspectSource$7;
  var iterate$4 = iterate$6;
  var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
  var speciesConstructor$3 = speciesConstructor$4;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve$1 = promiseResolve$2;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule$3 = newPromiseCapability$2;
  var perform$3 = perform$4;
  var InternalStateModule$5 = internalState$1;
  var isForced = isForced_1$1;
  var wellKnownSymbol$e = wellKnownSymbol$F;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE = engineIsNode;
  var V8_VERSION = engineV8Version$1;

  var SPECIES$2 = wellKnownSymbol$e('species');
  var PROMISE = 'Promise';

  var getInternalState$3 = InternalStateModule$5.get;
  var setInternalState$5 = InternalStateModule$5.set;
  var getInternalPromiseState = InternalStateModule$5.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise$1 && NativePromise$1.prototype;
  var PromiseConstructor = NativePromise$1;
  var PromisePrototype = NativePromisePrototype;
  var TypeError$8 = global$q.TypeError;
  var document$1 = global$q.document;
  var process = global$q.process;
  var newPromiseCapability = newPromiseCapabilityModule$3.f;
  var newGenericPromiseCapability = newPromiseCapability;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$q.dispatchEvent);
  var NATIVE_REJECTION_EVENT = isCallable$a(global$q.PromiseRejectionEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;

  var Internal, OwnPromiseCapability, PromiseWrapper;

  var FORCED$6 = isForced(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We need Promise#finally in the pure version for preventing prototype pollution
    if (!PromisePrototype['finally']) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$2] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED$6 || !checkCorrectnessOfIteration$2(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$9(it) && isCallable$a(then = it.then) ? then : false;
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$8('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              call$9(then, result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$q.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$q['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call$9(task, global$q, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform$3(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call$9(task, global$q, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$4 = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$8("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            call$9(then, value,
              bind$4(internalResolve, wrapper, state),
              bind$4(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED$6) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$5(this, PromisePrototype);
      aCallable$6(executor);
      call$9(Internal, this);
      var state = getInternalState$3(this);
      try {
        executor(bind$4(internalResolve, state), bind$4(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromisePrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$5(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll$3(PromisePrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reactions = state.reactions;
        var reaction = newPromiseCapability(speciesConstructor$3(this, PromiseConstructor));
        reaction.ok = isCallable$a(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable$a(onRejected) && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
        state.parent = true;
        reactions[reactions.length] = reaction;
        if (state.state != PENDING) notify(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$3(promise);
      this.promise = promise;
      this.resolve = bind$4(internalResolve, state);
      this.reject = bind$4(internalReject, state);
    };
    newPromiseCapabilityModule$3.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  $$i({ global: true, wrap: true, forced: FORCED$6 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$5(PromiseConstructor, PROMISE, false, true);
  setSpecies$3(PROMISE);

  PromiseWrapper = getBuiltIn$4(PROMISE);

  // statics
  $$i({ target: PROMISE, stat: true, forced: FORCED$6 }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      call$9(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  $$i({ target: PROMISE, stat: true, forced: IS_PURE  }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve$1(this === PromiseWrapper ? PromiseConstructor : this, x);
    }
  });

  $$i({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$3(function () {
        var $promiseResolve = aCallable$6(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$4(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$9($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform$3(function () {
        var $promiseResolve = aCallable$6(C.resolve);
        iterate$4(iterable, function (promise) {
          call$9($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$h = _export$1;
  var call$8 = functionCall$1;
  var aCallable$5 = aCallable$e;
  var newPromiseCapabilityModule$2 = newPromiseCapability$2;
  var perform$2 = perform$4;
  var iterate$3 = iterate$6;

  // `Promise.allSettled` method
  // https://tc39.es/ecma262/#sec-promise.allsettled
  $$h({ target: 'Promise', stat: true }, {
    allSettled: function allSettled(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$2(function () {
        var promiseResolve = aCallable$5(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$3(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$8(promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'fulfilled', value: value };
            --remaining || resolve(values);
          }, function (error) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = { status: 'rejected', reason: error };
            --remaining || resolve(values);
          });
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$g = _export$1;
  var aCallable$4 = aCallable$e;
  var getBuiltIn$3 = getBuiltIn$j;
  var call$7 = functionCall$1;
  var newPromiseCapabilityModule$1 = newPromiseCapability$2;
  var perform$1 = perform$4;
  var iterate$2 = iterate$6;

  var PROMISE_ANY_ERROR = 'No one promise resolved';

  // `Promise.any` method
  // https://tc39.es/ecma262/#sec-promise.any
  $$g({ target: 'Promise', stat: true }, {
    any: function any(iterable) {
      var C = this;
      var AggregateError = getBuiltIn$3('AggregateError');
      var capability = newPromiseCapabilityModule$1.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$1(function () {
        var promiseResolve = aCallable$4(C.resolve);
        var errors = [];
        var counter = 0;
        var remaining = 1;
        var alreadyResolved = false;
        iterate$2(iterable, function (promise) {
          var index = counter++;
          var alreadyRejected = false;
          remaining++;
          call$7(promiseResolve, C, promise).then(function (value) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyResolved = true;
            resolve(value);
          }, function (error) {
            if (alreadyRejected || alreadyResolved) return;
            alreadyRejected = true;
            errors[index] = error;
            --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
          });
        });
        --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var $$f = _export$1;
  var NativePromise = nativePromiseConstructor;
  var fails$l = fails$P;
  var getBuiltIn$2 = getBuiltIn$j;
  var isCallable$9 = isCallable$E;
  var speciesConstructor$2 = speciesConstructor$4;
  var promiseResolve = promiseResolve$2;

  // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
  var NON_GENERIC = !!NativePromise && fails$l(function () {
    NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
  });

  // `Promise.prototype.finally` method
  // https://tc39.es/ecma262/#sec-promise.prototype.finally
  $$f({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
    'finally': function (onFinally) {
      var C = speciesConstructor$2(this, getBuiltIn$2('Promise'));
      var isFunction = isCallable$9(onFinally);
      return this.then(
        isFunction ? function (x) {
          return promiseResolve(C, onFinally()).then(function () { return x; });
        } : onFinally,
        isFunction ? function (e) {
          return promiseResolve(C, onFinally()).then(function () { throw e; });
        } : onFinally
      );
    }
  });

  var path$6 = path$m;

  path$6.Promise;

  var $$e = _export$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$4;

  // `Promise.try` method
  // https://github.com/tc39/proposal-promise-try
  $$e({ target: 'Promise', stat: true }, {
    'try': function (callbackfn) {
      var promiseCapability = newPromiseCapabilityModule.f(this);
      var result = perform(callbackfn);
      (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
      return promiseCapability.promise;
    }
  });

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  }(runtime));

  var $$d = _export$1;
  var $map$1 = arrayIteration$1.map;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$4 = entryVirtual$7;

  entryVirtual$4('Array').map;

  var $$c = _export$1;
  var toObject$9 = toObject$k;
  var nativeKeys = objectKeys$5;
  var fails$k = fails$P;

  var FAILS_ON_PRIMITIVES$1 = fails$k(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$c({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return nativeKeys(toObject$9(it));
    }
  });

  var path$5 = path$m;

  path$5.Object.keys;

  var $$b = _export$1;
  var $includes$1 = arrayIncludes$1.includes;

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$b({ target: 'Array', proto: true }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$3 = entryVirtual$7;

  entryVirtual$3('Array').includes;

  var isObject$8 = isObject$v;
  var classof$5 = classofRaw$3;
  var wellKnownSymbol$d = wellKnownSymbol$F;

  var MATCH$1 = wellKnownSymbol$d('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$8(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
  };

  var global$p = global$1x;
  var isRegExp = isRegexp;

  var TypeError$7 = global$p.TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw TypeError$7("The method doesn't accept regular expressions");
    } return it;
  };

  var wellKnownSymbol$c = wellKnownSymbol$F;

  var MATCH = wellKnownSymbol$c('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var $$a = _export$1;
  var uncurryThis$j = functionUncurryThis$1;
  var notARegExp = notARegexp;
  var requireObjectCoercible$3 = requireObjectCoercible$c;
  var toString$4 = toString$g;
  var correctIsRegExpLogic = correctIsRegexpLogic;

  var stringIndexOf$1 = uncurryThis$j(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $$a({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf$1(
        toString$4(requireObjectCoercible$3(this)),
        toString$4(notARegExp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  var entryVirtual$2 = entryVirtual$7;

  entryVirtual$2('String').includes;

  var fails$j = fails$P;

  var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$j(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */
  var $$9 = _export$1;
  var uncurryThis$i = functionUncurryThis$1;
  var $IndexOf = arrayIncludes$1.indexOf;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

  var un$IndexOf = uncurryThis$i([].indexOf);

  var NEGATIVE_ZERO$1 = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict$2('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  $$9({ target: 'Array', proto: true, forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$1 }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO$1
        // convert -0 to +0
        ? un$IndexOf(this, searchElement, fromIndex) || 0
        : $IndexOf(this, searchElement, fromIndex);
    }
  });

  var entryVirtual$1 = entryVirtual$7;

  entryVirtual$1('Array').indexOf;

  var $$8 = _export$1;
  var global$o = global$1x;
  var getBuiltIn$1 = getBuiltIn$j;
  var apply$5 = functionApply$1;
  var uncurryThis$h = functionUncurryThis$1;
  var fails$i = fails$P;

  var Array$5 = global$o.Array;
  var $stringify = getBuiltIn$1('JSON', 'stringify');
  var exec = uncurryThis$h(/./.exec);
  var charAt$2 = uncurryThis$h(''.charAt);
  var charCodeAt = uncurryThis$h(''.charCodeAt);
  var replace$2 = uncurryThis$h(''.replace);
  var numberToString = uncurryThis$h(1.0.toString);

  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var fix = function (match, offset, string) {
    var prev = charAt$2(string, offset - 1);
    var next = charAt$2(string, offset + 1);
    if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
      return '\\u' + numberToString(charCodeAt(match, 0), 16);
    } return match;
  };

  var FORCED$5 = fails$i(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
      || $stringify('\uDEAD') !== '"\\udead"';
  });

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    $$8({ target: 'JSON', stat: true, forced: FORCED$5 }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        for (var i = 0, l = arguments.length, args = Array$5(l); i < l; i++) args[i] = arguments[i];
        var result = apply$5($stringify, null, args);
        return typeof result == 'string' ? replace$2(result, tester, fix) : result;
      }
    });
  }

  var path$4 = path$m;

  // eslint-disable-next-line es/no-json -- safe
  if (!path$4.JSON) path$4.JSON = { stringify: JSON.stringify };

  var internalMetadata = {exports: {}};

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails$h = fails$P;

  var arrayBufferNonExtensible = fails$h(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  var fails$g = fails$P;
  var isObject$7 = isObject$v;
  var classof$4 = classofRaw$3;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails$g(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
    if (!isObject$7(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$4(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$f = fails$P;

  var freezing = !fails$f(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$7 = _export$1;
  var uncurryThis$g = functionUncurryThis$1;
  var hiddenKeys = hiddenKeys$b;
  var isObject$6 = isObject$v;
  var hasOwn$4 = hasOwnProperty_1$1;
  var defineProperty$5 = objectDefineProperty$1.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames$1;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible = objectIsExtensible;
  var uid$1 = uid$8;
  var FREEZING = freezing;

  var REQUIRED = false;
  var METADATA = uid$1('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty$5(it, METADATA, { value: {
      objectID: 'O' + id++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$6(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn$4(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwn$4(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$4(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$g([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      $$7({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;

  var $$6 = _export$1;
  var global$n = global$1x;
  var InternalMetadataModule = internalMetadata.exports;
  var fails$e = fails$P;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$h;
  var iterate$1 = iterate$6;
  var anInstance$4 = anInstance$6;
  var isCallable$8 = isCallable$E;
  var isObject$5 = isObject$v;
  var setToStringTag$4 = setToStringTag$a;
  var defineProperty$4 = objectDefineProperty$1.f;
  var forEach$1 = arrayIteration$1.forEach;
  var DESCRIPTORS$5 = descriptors$1;
  var InternalStateModule$4 = internalState$1;

  var setInternalState$4 = InternalStateModule$4.set;
  var internalStateGetterFor$1 = InternalStateModule$4.getterFor;

  var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$n[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var exported = {};
    var Constructor;

    if (!DESCRIPTORS$5 || !isCallable$8(NativeConstructor)
      || !(IS_WEAK || NativePrototype.forEach && !fails$e(function () { new NativeConstructor().entries().next(); }))
    ) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else {
      Constructor = wrapper(function (target, iterable) {
        setInternalState$4(anInstance$4(target, Prototype), {
          type: CONSTRUCTOR_NAME,
          collection: new NativeConstructor()
        });
        if (iterable != undefined) iterate$1(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      forEach$1(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';
        if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
          createNonEnumerableProperty$4(Prototype, KEY, function (a, b) {
            var collection = getInternalState(this).collection;
            if (!IS_ADDER && IS_WEAK && !isObject$5(a)) return KEY == 'get' ? undefined : false;
            var result = collection[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
        }
      });

      IS_WEAK || defineProperty$4(Prototype, 'size', {
        configurable: true,
        get: function () {
          return getInternalState(this).collection.size;
        }
      });
    }

    setToStringTag$4(Constructor, CONSTRUCTOR_NAME, false, true);

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$6({ global: true, forced: true }, exported);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineProperty$3 = objectDefineProperty$1.f;
  var create$3 = objectCreate$1;
  var redefineAll$2 = redefineAll$4;
  var bind$3 = functionBindContext$1;
  var anInstance$3 = anInstance$6;
  var iterate = iterate$6;
  var defineIterator$2 = defineIterator$5;
  var setSpecies$2 = setSpecies$4;
  var DESCRIPTORS$4 = descriptors$1;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule$3 = internalState$1;

  var setInternalState$3 = InternalStateModule$3.set;
  var internalStateGetterFor = InternalStateModule$3.getterFor;

  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance$3(that, Prototype);
        setInternalState$3(that, {
          type: CONSTRUCTOR_NAME,
          index: create$3(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$4) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$4) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll$2(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS$4) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$4) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll$2(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$4) defineProperty$3(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator$2(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$3(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies$2(CONSTRUCTOR_NAME);
    }
  };

  var collection = collection$1;
  var collectionStrong = collectionStrong$1;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var path$3 = path$m;

  path$3.Map;

  var $$5 = _export$1;
  var global$m = global$1x;
  var apply$4 = functionApply$1;
  var isCallable$7 = isCallable$E;
  var userAgent$2 = engineUserAgent$1;
  var arraySlice$4 = arraySlice$c;

  var MSIE = /MSIE .\./.test(userAgent$2); // <- dirty ie9- check
  var Function$1 = global$m.Function;

  var wrap = function (scheduler) {
    return function (handler, timeout /* , ...arguments */) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? arraySlice$4(arguments, 2) : undefined;
      return scheduler(boundArgs ? function () {
        apply$4(isCallable$7(handler) ? handler : Function$1(handler), this, args);
      } : handler, timeout);
    };
  };

  // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
  $$5({ global: true, bind: true, forced: MSIE }, {
    // `setTimeout` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    setTimeout: wrap(global$m.setTimeout),
    // `setInterval` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    setInterval: wrap(global$m.setInterval)
  });

  var path$2 = path$m;

  path$2.setInterval;

  var $$4 = _export$1;
  var global$l = global$1x;
  var toAbsoluteIndex$4 = toAbsoluteIndex$9;
  var toIntegerOrInfinity$5 = toIntegerOrInfinity$d;
  var lengthOfArrayLike$7 = lengthOfArrayLike$g;
  var toObject$8 = toObject$k;
  var arraySpeciesCreate$2 = arraySpeciesCreate$5;
  var createProperty = createProperty$4;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var TypeError$6 = global$l.TypeError;
  var max$2 = Math.max;
  var min$3 = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject$8(this);
      var len = lengthOfArrayLike$7(O);
      var actualStart = toAbsoluteIndex$4(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$3(max$2(toIntegerOrInfinity$5(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError$6(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate$2(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var entryVirtual = entryVirtual$7;

  entryVirtual('Array').splice;

  var path$1 = path$m;

  path$1.setTimeout;

  // a string of all valid unicode whitespaces
  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$f = functionUncurryThis$1;
  var requireObjectCoercible$2 = requireObjectCoercible$c;
  var toString$3 = toString$g;
  var whitespaces$1 = whitespaces$2;

  var replace$1 = uncurryThis$f(''.replace);
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
    return function ($this) {
      var string = toString$3(requireObjectCoercible$2($this));
      if (TYPE & 1) string = replace$1(string, ltrim, '');
      if (TYPE & 2) string = replace$1(string, rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
  };

  var global$k = global$1x;
  var fails$d = fails$P;
  var uncurryThis$e = functionUncurryThis$1;
  var toString$2 = toString$g;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$2;

  var charAt$1 = uncurryThis$e(''.charAt);
  var n$ParseFloat = global$k.parseFloat;
  var Symbol$1 = global$k.Symbol;
  var ITERATOR$6 = Symbol$1 && Symbol$1.iterator;
  var FORCED$4 = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$6 && !fails$d(function () { n$ParseFloat(Object(ITERATOR$6)); }));

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$4 ? function parseFloat(string) {
    var trimmedString = trim(toString$2(string));
    var result = n$ParseFloat(trimmedString);
    return result === 0 && charAt$1(trimmedString, 0) == '-' ? -0 : result;
  } : n$ParseFloat;

  var $$3 = _export$1;
  var $parseFloat = numberParseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  $$3({ global: true, forced: parseFloat != $parseFloat }, {
    parseFloat: $parseFloat
  });

  var path = path$m;

  path.parseFloat;

  var wellKnownSymbol$b = wellKnownSymbol$o;
  var create$2 = objectCreate;
  var definePropertyModule$2 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$b('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule$2.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$c = fails$D;

  var correctPrototypeGetter = !fails$c(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$j = global$11;
  var hasOwn$3 = hasOwnProperty_1;
  var isCallable$6 = isCallable$o;
  var toObject$7 = toObject$d;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$1 = global$j.Object;
  var ObjectPrototype$2 = Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
    var object = toObject$7(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$6(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$1 ? ObjectPrototype$2 : null;
  };

  var fails$b = fails$D;
  var isCallable$5 = isCallable$o;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var redefine$5 = redefine$a.exports;
  var wellKnownSymbol$a = wellKnownSymbol$o;

  var ITERATOR$5 = wellKnownSymbol$a('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$b(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$5(IteratorPrototype$2[ITERATOR$5])) {
    redefine$5(IteratorPrototype$2, ITERATOR$5, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$2 = objectDefineProperty.f;
  var hasOwn$2 = hasOwnProperty_1;
  var wellKnownSymbol$9 = wellKnownSymbol$o;

  var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');

  var setToStringTag$3 = function (it, TAG, STATIC) {
    if (it && !hasOwn$2(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
      defineProperty$2(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$1 = createPropertyDescriptor$6;
  var setToStringTag$2 = setToStringTag$3;
  var Iterators$4 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(1, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var global$i = global$11;
  var isCallable$4 = isCallable$o;

  var String$1 = global$i.String;
  var TypeError$5 = global$i.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$4(argument)) return argument;
    throw TypeError$5("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThis$d = functionUncurryThis;
  var anObject$5 = anObject$k;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$d(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$5(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$2 = _export;
  var call$6 = functionCall;
  var FunctionName$1 = functionName;
  var isCallable$3 = isCallable$o;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$3;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$b;
  var redefine$4 = redefine$a.exports;
  var wellKnownSymbol$8 = wellKnownSymbol$o;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol$8('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$4) {
            setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$3(CurrentIteratorPrototype[ITERATOR$4])) {
            redefine$4(CurrentIteratorPrototype, ITERATOR$4, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$3 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty$3(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$6(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$4(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$2({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      redefine$4(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
    }
    Iterators$3[NAME] = defaultIterator;

    return methods;
  };

  var toIndexedObject$1 = toIndexedObject$7;
  var addToUnscopables = addToUnscopables$1;
  var Iterators$2 = iterators;
  var InternalStateModule$2 = internalState;
  var defineIterator = defineIterator$1;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$1(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$2(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators$2.Arguments = Iterators$2.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // eslint-disable-next-line es/no-typed-arrays -- safe
  var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var redefine$3 = redefine$a.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$3(target, key, src[key], options);
    return target;
  };

  var global$h = global$11;
  var isPrototypeOf$3 = objectIsPrototypeOf;

  var TypeError$4 = global$h.TypeError;

  var anInstance$2 = function (it, Prototype) {
    if (isPrototypeOf$3(Prototype, it)) return it;
    throw TypeError$4('Incorrect invocation');
  };

  var global$g = global$11;
  var toIntegerOrInfinity$4 = toIntegerOrInfinity$9;
  var toLength$6 = toLength$9;

  var RangeError$5 = global$g.RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex$2 = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity$4(it);
    var length = toLength$6(number);
    if (number !== length) throw RangeError$5('Wrong length or index');
    return length;
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754
  var global$f = global$11;

  var Array$4 = global$f.Array;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor$4 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = Array$4(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number != number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$4(log(number) / LN2);
      if (number * (c = pow(2, -exponent)) < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = (number * c - 1) * pow(2, mantissaLength);
        exponent = exponent + eBias;
      } else {
        mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
        exponent = 0;
      }
    }
    for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
    buffer[--index] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;
    for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa = mantissa + pow(2, mantissaLength);
      exponent = exponent - eBias;
    } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  var toObject$6 = toObject$d;
  var toAbsoluteIndex$3 = toAbsoluteIndex$6;
  var lengthOfArrayLike$6 = lengthOfArrayLike$a;

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
    var O = toObject$6(this);
    var length = lengthOfArrayLike$6(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$3(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$3(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var global$e = global$11;
  var uncurryThis$c = functionUncurryThis;
  var DESCRIPTORS$3 = descriptors;
  var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
  var FunctionName = functionName;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$b;
  var redefineAll = redefineAll$1;
  var fails$a = fails$D;
  var anInstance$1 = anInstance$2;
  var toIntegerOrInfinity$3 = toIntegerOrInfinity$9;
  var toLength$5 = toLength$9;
  var toIndex$1 = toIndex$2;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var defineProperty$1 = objectDefineProperty.f;
  var arrayFill = arrayFill$1;
  var arraySlice$3 = arraySlice$9;
  var setToStringTag = setToStringTag$3;
  var InternalStateModule$1 = internalState;

  var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var getInternalState$1 = InternalStateModule$1.get;
  var setInternalState$1 = InternalStateModule$1.set;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var NativeArrayBuffer = global$e[ARRAY_BUFFER];
  var $ArrayBuffer = NativeArrayBuffer;
  var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
  var $DataView = global$e[DATA_VIEW];
  var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE];
  var ObjectPrototype$1 = Object.prototype;
  var Array$3 = global$e.Array;
  var RangeError$4 = global$e.RangeError;
  var fill = uncurryThis$c(arrayFill);
  var reverse = uncurryThis$c([].reverse);

  var packIEEE754 = IEEE754.pack;
  var unpackIEEE754 = IEEE754.unpack;

  var packInt8 = function (number) {
    return [number & 0xFF];
  };

  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };

  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };

  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };

  var packFloat32 = function (number) {
    return packIEEE754(number, 23, 4);
  };

  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };

  var addGetter$1 = function (Constructor, key) {
    defineProperty$1(Constructor[PROTOTYPE], key, { get: function () { return getInternalState$1(this)[key]; } });
  };

  var get = function (view, count, index, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$1(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState$1(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice$3(bytes, start, start + count);
    return isLittleEndian ? pack : reverse(pack);
  };

  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$1(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState$1(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = conversion(+value);
    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  };

  if (!NATIVE_ARRAY_BUFFER$1) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, ArrayBufferPrototype$1);
      var byteLength = toIndex$1(length);
      setInternalState$1(this, {
        bytes: fill(Array$3(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$3) this.byteLength = byteLength;
    };

    ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$1(this, DataViewPrototype$1);
      anInstance$1(buffer, ArrayBufferPrototype$1);
      var bufferLength = getInternalState$1(buffer).byteLength;
      var offset = toIntegerOrInfinity$3(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$4('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$5(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$4(WRONG_LENGTH$1);
      setInternalState$1(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });
      if (!DESCRIPTORS$3) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype$1 = $DataView[PROTOTYPE];

    if (DESCRIPTORS$3) {
      addGetter$1($ArrayBuffer, 'byteLength');
      addGetter$1($DataView, 'buffer');
      addGetter$1($DataView, 'byteLength');
      addGetter$1($DataView, 'byteOffset');
    }

    redefineAll(DataViewPrototype$1, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$2 && NativeArrayBuffer.name !== ARRAY_BUFFER;
    /* eslint-disable no-new -- required for testing */
    if (!fails$a(function () {
      NativeArrayBuffer(1);
    }) || !fails$a(function () {
      new NativeArrayBuffer(-1);
    }) || fails$a(function () {
      new NativeArrayBuffer();
      new NativeArrayBuffer(1.5);
      new NativeArrayBuffer(NaN);
      return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
    /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$1(this, ArrayBufferPrototype$1);
        return new NativeArrayBuffer(toIndex$1(length));
      };

      $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;

      for (var keys = getOwnPropertyNames$1(NativeArrayBuffer), j = 0, key; keys.length > j;) {
        if (!((key = keys[j++]) in $ArrayBuffer)) {
          createNonEnumerableProperty$2($ArrayBuffer, key, NativeArrayBuffer[key]);
        }
      }

      ArrayBufferPrototype$1.constructor = $ArrayBuffer;
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(NativeArrayBuffer, 'name', ARRAY_BUFFER);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (setPrototypeOf$3 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$1) {
      setPrototypeOf$3(DataViewPrototype$1, ObjectPrototype$1);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = uncurryThis$c(DataViewPrototype$1.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype$1, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
  }

  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  setToStringTag($DataView, DATA_VIEW);

  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var $$1 = _export;
  var uncurryThis$b = functionUncurryThis;
  var fails$9 = fails$D;
  var ArrayBufferModule$1 = arrayBuffer;
  var anObject$4 = anObject$k;
  var toAbsoluteIndex$2 = toAbsoluteIndex$6;
  var toLength$4 = toLength$9;
  var speciesConstructor$1 = speciesConstructor$6;

  var ArrayBuffer$3 = ArrayBufferModule$1.ArrayBuffer;
  var DataView$2 = ArrayBufferModule$1.DataView;
  var DataViewPrototype = DataView$2.prototype;
  var un$ArrayBufferSlice = uncurryThis$b(ArrayBuffer$3.prototype.slice);
  var getUint8 = uncurryThis$b(DataViewPrototype.getUint8);
  var setUint8 = uncurryThis$b(DataViewPrototype.setUint8);

  var INCORRECT_SLICE = fails$9(function () {
    return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
  });

  // `ArrayBuffer.prototype.slice` method
  // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
  $$1({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
    slice: function slice(start, end) {
      if (un$ArrayBufferSlice && end === undefined) {
        return un$ArrayBufferSlice(anObject$4(this), start); // FF fix
      }
      var length = anObject$4(this).byteLength;
      var first = toAbsoluteIndex$2(start, length);
      var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
      var result = new (speciesConstructor$1(this, ArrayBuffer$3))(toLength$4(fin - first));
      var viewSource = new DataView$2(this);
      var viewTarget = new DataView$2(result);
      var index = 0;
      while (first < fin) {
        setUint8(viewTarget, index++, getUint8(viewSource, first++));
      } return result;
    }
  });

  var typedArrayConstructor = {exports: {}};

  var wellKnownSymbol$7 = wellKnownSymbol$o;

  var ITERATOR$3 = wellKnownSymbol$7('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$3] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$3] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var NATIVE_ARRAY_BUFFER = arrayBufferNative;
  var DESCRIPTORS$2 = descriptors;
  var global$d = global$11;
  var isCallable$2 = isCallable$o;
  var isObject$4 = isObject$l;
  var hasOwn$1 = hasOwnProperty_1;
  var classof$3 = classof$c;
  var tryToString$1 = tryToString$6;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$b;
  var redefine$2 = redefine$a.exports;
  var defineProperty = objectDefineProperty.f;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var wellKnownSymbol$6 = wellKnownSymbol$o;
  var uid = uid$4;

  var Int8Array$3 = global$d.Int8Array;
  var Int8ArrayPrototype = Int8Array$3 && Int8Array$3.prototype;
  var Uint8ClampedArray = global$d.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
  var TypedArray$1 = Int8Array$3 && getPrototypeOf(Int8Array$3);
  var TypedArrayPrototype$1 = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
  var ObjectPrototype = Object.prototype;
  var TypeError$3 = global$d.TypeError;

  var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR$2 = uid('TYPED_ARRAY_CONSTRUCTOR');
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$2 && classof$3(global$d.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQIRED = false;
  var NAME, Constructor, Prototype;

  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };

  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };

  var isView = function isView(it) {
    if (!isObject$4(it)) return false;
    var klass = classof$3(it);
    return klass === 'DataView'
      || hasOwn$1(TypedArrayConstructorsList, klass)
      || hasOwn$1(BigIntArrayConstructorsList, klass);
  };

  var isTypedArray$1 = function (it) {
    if (!isObject$4(it)) return false;
    var klass = classof$3(it);
    return hasOwn$1(TypedArrayConstructorsList, klass)
      || hasOwn$1(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$m = function (it) {
    if (isTypedArray$1(it)) return it;
    throw TypeError$3('Target is not a typed array');
  };

  var aTypedArrayConstructor$3 = function (C) {
    if (isCallable$2(C) && (!setPrototypeOf$2 || isPrototypeOf$2(TypedArray$1, C))) return C;
    throw TypeError$3(tryToString$1(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod$n = function (KEY, property, forced) {
    if (!DESCRIPTORS$2) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$d[ARRAY];
      if (TypedArrayConstructor && hasOwn$1(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArrayPrototype$1[KEY] || forced) {
      redefine$2(TypedArrayPrototype$1, KEY, forced ? property
        : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype[KEY] || property);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$2) return;
    if (setPrototypeOf$2) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$d[ARRAY];
        if (TypedArrayConstructor && hasOwn$1(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) { /* empty */ }
      }
      if (!TypedArray$1[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return redefine$2(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
        } catch (error) { /* empty */ }
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$d[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        redefine$2(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME in TypedArrayConstructorsList) {
    Constructor = global$d[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$1(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
    else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
  }

  for (NAME in BigIntArrayConstructorsList) {
    Constructor = global$d[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$1(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$2(TypedArray$1) || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw TypeError$3('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
      if (global$d[NAME]) setPrototypeOf$2(global$d[NAME], TypedArray$1);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
    TypedArrayPrototype$1 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
      if (global$d[NAME]) setPrototypeOf$2(global$d[NAME].prototype, TypedArrayPrototype$1);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
    setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
  }

  if (DESCRIPTORS$2 && !hasOwn$1(TypedArrayPrototype$1, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQIRED = true;
    defineProperty(TypedArrayPrototype$1, TO_STRING_TAG, { get: function () {
      return isObject$4(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
    } });
    for (NAME in TypedArrayConstructorsList) if (global$d[NAME]) {
      createNonEnumerableProperty$1(global$d[NAME], TYPED_ARRAY_TAG$1, NAME);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
    TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$2,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$3,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$1
  };

  /* eslint-disable no-new -- required for testing */

  var global$c = global$11;
  var fails$8 = fails$D;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  var ArrayBuffer$2 = global$c.ArrayBuffer;
  var Int8Array$2 = global$c.Int8Array;

  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$8(function () {
    Int8Array$2(1);
  }) || !fails$8(function () {
    new Int8Array$2(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$2();
    new Int8Array$2(null);
    new Int8Array$2(1.5);
    new Int8Array$2(iterable);
  }, true) || fails$8(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
  });

  var isObject$3 = isObject$l;

  var floor$3 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es/no-number-isinteger -- safe
  var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
    return !isObject$3(it) && isFinite(it) && floor$3(it) === it;
  };

  var global$b = global$11;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$9;

  var RangeError$3 = global$b.RangeError;

  var toPositiveInteger$1 = function (it) {
    var result = toIntegerOrInfinity$2(it);
    if (result < 0) throw RangeError$3("The argument can't be less than 0");
    return result;
  };

  var global$a = global$11;
  var toPositiveInteger = toPositiveInteger$1;

  var RangeError$2 = global$a.RangeError;

  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw RangeError$2('Wrong offset');
    return offset;
  };

  var uncurryThis$a = functionUncurryThis;
  var aCallable$3 = aCallable$a;

  var bind$2 = uncurryThis$a(uncurryThis$a.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : bind$2 ? bind$2(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$2 = classof$c;
  var getMethod$2 = getMethod$5;
  var Iterators$1 = iterators;
  var wellKnownSymbol$5 = wellKnownSymbol$o;

  var ITERATOR$2 = wellKnownSymbol$5('iterator');

  var getIteratorMethod$2 = function (it) {
    if (it != undefined) return getMethod$2(it, ITERATOR$2)
      || getMethod$2(it, '@@iterator')
      || Iterators$1[classof$2(it)];
  };

  var global$9 = global$11;
  var call$5 = functionCall;
  var aCallable$2 = aCallable$a;
  var anObject$3 = anObject$k;
  var tryToString = tryToString$6;
  var getIteratorMethod$1 = getIteratorMethod$2;

  var TypeError$2 = global$9.TypeError;

  var getIterator$1 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
    if (aCallable$2(iteratorMethod)) return anObject$3(call$5(iteratorMethod, argument));
    throw TypeError$2(tryToString(argument) + ' is not iterable');
  };

  var wellKnownSymbol$4 = wellKnownSymbol$o;
  var Iterators = iterators;

  var ITERATOR$1 = wellKnownSymbol$4('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$1] === it);
  };

  var bind$1 = functionBindContext;
  var call$4 = functionCall;
  var aConstructor = aConstructor$5;
  var toObject$5 = toObject$d;
  var lengthOfArrayLike$5 = lengthOfArrayLike$a;
  var getIterator = getIterator$1;
  var getIteratorMethod = getIteratorMethod$2;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

  var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject$5(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = call$4(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = bind$1(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike$5(O);
    result = new (aTypedArrayConstructor$2(C))(length);
    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var classof$1 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$1 = Array.isArray || function isArray(argument) {
    return classof$1(argument) == 'Array';
  };

  var global$8 = global$11;
  var isArray = isArray$1;
  var isConstructor = isConstructor$3;
  var isObject$2 = isObject$l;
  var wellKnownSymbol$3 = wellKnownSymbol$o;

  var SPECIES$1 = wellKnownSymbol$3('species');
  var Array$2 = global$8.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array$2 || isArray(C.prototype))) C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var uncurryThis$9 = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toObject$4 = toObject$d;
  var lengthOfArrayLike$4 = lengthOfArrayLike$a;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push$1 = uncurryThis$9([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$4($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind(callbackfn, that);
      var length = lengthOfArrayLike$4(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$1(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$1(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var getBuiltIn = getBuiltIn$d;
  var definePropertyModule$1 = objectDefineProperty;
  var wellKnownSymbol$2 = wellKnownSymbol$o;
  var DESCRIPTORS$1 = descriptors;

  var SPECIES = wellKnownSymbol$2('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$1.f;

    if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var isCallable$1 = isCallable$o;
  var isObject$1 = isObject$l;
  var setPrototypeOf$1 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$1 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable$1(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject$1(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var $ = _export;
  var global$7 = global$11;
  var call$3 = functionCall;
  var DESCRIPTORS = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var ArrayBufferModule = arrayBuffer;
  var anInstance = anInstance$2;
  var createPropertyDescriptor = createPropertyDescriptor$6;
  var createNonEnumerableProperty = createNonEnumerableProperty$b;
  var isIntegralNumber = isIntegralNumber$1;
  var toLength$3 = toLength$9;
  var toIndex = toIndex$2;
  var toOffset$1 = toOffset$2;
  var toPropertyKey = toPropertyKey$3;
  var hasOwn = hasOwnProperty_1;
  var classof = classof$c;
  var isObject = isObject$l;
  var isSymbol = isSymbol$3;
  var create = objectCreate;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach = arrayIteration.forEach;
  var setSpecies = setSpecies$1;
  var definePropertyModule = objectDefineProperty;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var InternalStateModule = internalState;
  var inheritIfRequired = inheritIfRequired$1;

  var getInternalState = InternalStateModule.get;
  var setInternalState = InternalStateModule.set;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var round = Math.round;
  var RangeError$1 = global$7.RangeError;
  var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer$1.prototype;
  var DataView$1 = ArrayBufferModule.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_CONSTRUCTOR$1 = ArrayBufferViewCore$n.TYPED_ARRAY_CONSTRUCTOR;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore$n.TypedArray;
  var TypedArrayPrototype = ArrayBufferViewCore$n.TypedArrayPrototype;
  var aTypedArrayConstructor$1 = ArrayBufferViewCore$n.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    aTypedArrayConstructor$1(C);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty(it, key, { get: function () {
      return getInternalState(this)[key];
    } });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return isPrototypeOf$1(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && !isSymbol(key)
      && key in target
      && isIntegralNumber(+key)
      && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey(key);
    return isTypedArrayIndex(target, key)
      ? createPropertyDescriptor(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey(key);
    if (isTypedArrayIndex(target, key)
      && isObject(descriptor)
      && hasOwn(descriptor, 'value')
      && !hasOwn(descriptor, 'get')
      && !hasOwn(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!hasOwn(descriptor, 'writable') || descriptor.writable)
      && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (DESCRIPTORS) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
      definePropertyModule.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype, 'buffer');
      addGetter(TypedArrayPrototype, 'byteOffset');
      addGetter(TypedArrayPrototype, 'byteLength');
      addGetter(TypedArrayPrototype, 'length');
    }

    $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+$/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = global$7[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState(that);
        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
      };

      var addElement = function (that, index) {
        nativeDefineProperty(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };

      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer$1(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset$1(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
            } else {
              byteLength = toLength$3($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return call$3(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView$1(buffer)
          });
          while (index < length) addElement(that, index++);
        });

        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired(function () {
            if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
              : typedArrayOffset !== undefined
                ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
                : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return call$3(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });

        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR$1, TypedArrayConstructor);

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

      $({
        global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
      }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies(CONSTRUCTOR_NAME);
    };
  } else typedArrayConstructor.exports = function () { /* empty */ };

  var createTypedArrayConstructor = typedArrayConstructor.exports;

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var toObject$3 = toObject$d;
  var toAbsoluteIndex$1 = toAbsoluteIndex$6;
  var lengthOfArrayLike$3 = lengthOfArrayLike$a;

  var min$2 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject$3(this);
    var len = lengthOfArrayLike$3(O);
    var to = toAbsoluteIndex$1(target, len);
    var from = toAbsoluteIndex$1(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$2((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];
      else delete O[to];
      to += inc;
      from += inc;
    } return O;
  };

  var uncurryThis$8 = functionUncurryThis;
  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $ArrayCopyWithin = arrayCopyWithin;

  var u$ArrayCopyWithin = uncurryThis$8($ArrayCopyWithin);
  var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var $every = arrayIteration.every;

  var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
    return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var call$2 = functionCall;
  var $fill = arrayFill$1;

  var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    return call$2(
      $fill,
      aTypedArray$j(this),
      value,
      length > 1 ? arguments[1] : undefined,
      length > 2 ? arguments[2] : undefined
    );
  });

  var arrayFromConstructorAndList$1 = function (Constructor, list) {
    var index = 0;
    var length = list.length;
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var ArrayBufferViewCore$j = arrayBufferViewCore;
  var speciesConstructor = speciesConstructor$6;

  var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$j.TYPED_ARRAY_CONSTRUCTOR;
  var aTypedArrayConstructor = ArrayBufferViewCore$j.aTypedArrayConstructor;

  // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create
  var typedArraySpeciesConstructor$4 = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
  };

  var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
  var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

  var typedArrayFromSpeciesAndList = function (instance, list) {
    return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
  };

  var ArrayBufferViewCore$i = arrayBufferViewCore;
  var $filter = arrayIteration.filter;
  var fromSpeciesAndList = typedArrayFromSpeciesAndList;

  var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
  var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return fromSpeciesAndList(this, list);
  });

  var ArrayBufferViewCore$h = arrayBufferViewCore;
  var $find = arrayIteration.find;

  var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
  var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
    return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$g = arrayBufferViewCore;
  var $findIndex = arrayIteration.findIndex;

  var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
  var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$f = arrayBufferViewCore;
  var $forEach = arrayIteration.forEach;

  var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
  var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$e = arrayBufferViewCore;
  var $includes = arrayIncludes.includes;

  var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
    return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var $indexOf = arrayIncludes.indexOf;

  var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var global$6 = global$11;
  var uncurryThis$7 = functionUncurryThis;
  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$1 = wellKnownSymbol$o;

  var ITERATOR = wellKnownSymbol$1('iterator');
  var Uint8Array$2 = global$6.Uint8Array;
  var arrayValues = uncurryThis$7(ArrayIterators.values);
  var arrayKeys = uncurryThis$7(ArrayIterators.keys);
  var arrayEntries = uncurryThis$7(ArrayIterators.entries);
  var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
  var nativeTypedArrayIterator = Uint8Array$2 && Uint8Array$2.prototype[ITERATOR];

  var PROPER_ARRAY_VALUES_NAME = !!nativeTypedArrayIterator && nativeTypedArrayIterator.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$c(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries(aTypedArray$c(this));
  });
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys(aTypedArray$c(this));
  });
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$d('values', typedArrayValues, PROPER_FUNCTION_NAME$1 && !PROPER_ARRAY_VALUES_NAME);
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$d(ITERATOR, typedArrayValues, PROPER_FUNCTION_NAME$1 && !PROPER_ARRAY_VALUES_NAME);

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var uncurryThis$6 = functionUncurryThis;

  var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
  var $join = uncurryThis$6([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$c('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  var fails$7 = fails$D;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$7(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */
  var apply$3 = functionApply;
  var toIndexedObject = toIndexedObject$7;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$9;
  var lengthOfArrayLike$2 = lengthOfArrayLike$a;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;

  var min$1 = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
  var FORCED$3 = NEGATIVE_ZERO || !STRICT_METHOD;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$3 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return apply$3($lastIndexOf$1, this, arguments) || 0;
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike$2(O);
    var index = length - 1;
    if (arguments.length > 1) index = min$1(index, toIntegerOrInfinity$1(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var apply$2 = functionApply;
  var $lastIndexOf = arrayLastIndexOf;

  var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return apply$2($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var ArrayBufferViewCore$9 = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

  var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
    return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor$2(O))(length);
    });
  });

  var global$5 = global$11;
  var aCallable$1 = aCallable$a;
  var toObject$2 = toObject$d;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$1 = lengthOfArrayLike$a;

  var TypeError$1 = global$5.TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable$1(callbackfn);
      var O = toObject$2(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$1(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError$1('Reduce of empty array with no initial value');
        }
      }
      for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod(true)
  };

  var ArrayBufferViewCore$8 = arrayBufferViewCore;
  var $reduce = arrayReduce.left;

  var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$7 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;

  var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRicht` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$6 = arrayBufferViewCore;

  var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
  var floor$2 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$7('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$6(that).length;
    var middle = floor$2(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    } return that;
  });

  var global$4 = global$11;
  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var lengthOfArrayLike = lengthOfArrayLike$a;
  var toOffset = toOffset$2;
  var toObject$1 = toObject$d;
  var fails$6 = fails$D;

  var RangeError = global$4.RangeError;
  var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

  var FORCED$2 = fails$6(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).set({});
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var length = this.length;
    var src = toObject$1(arrayLike);
    var len = lengthOfArrayLike(src);
    var index = 0;
    if (len + offset > length) throw RangeError('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, FORCED$2);

  var ArrayBufferViewCore$4 = arrayBufferViewCore;
  var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
  var fails$5 = fails$D;
  var arraySlice$2 = arraySlice$9;

  var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

  var FORCED$1 = fails$5(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = arraySlice$2(aTypedArray$4(this), start, end);
    var C = typedArraySpeciesConstructor$1(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$1);

  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var $some = arrayIteration.some;

  var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var arraySlice$1 = arraySlice$9;

  var floor$1 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySlice$1(array, 0, middle), comparefn),
      mergeSort(arraySlice$1(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent;

  var firefox = userAgent$1.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;

  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent = engineUserAgent;

  var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var global$3 = global$11;
  var uncurryThis$5 = functionUncurryThis;
  var fails$4 = fails$D;
  var aCallable = aCallable$a;
  var internalSort = arraySort;
  var ArrayBufferViewCore$2 = arrayBufferViewCore;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;

  var Array$1 = global$3.Array;
  var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
  var Uint16Array = global$3.Uint16Array;
  var un$Sort = Uint16Array && uncurryThis$5(Uint16Array.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails$4(function () {
    un$Sort(new Uint16Array(2), null);
  }) && fails$4(function () {
    un$Sort(new Uint16Array(2), {});
  }));

  var STABLE_SORT = !!un$Sort && !fails$4(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 74;
    if (FF) return FF < 67;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 602;

    var array = new Uint16Array(516);
    var expected = Array$1(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    un$Sort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$3('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);
    if (STABLE_SORT) return un$Sort(this, comparefn);

    return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var toLength$2 = toLength$9;
  var toAbsoluteIndex = toAbsoluteIndex$6;
  var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

  var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

  // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex(begin, length);
    var C = typedArraySpeciesConstructor(O);
    return new C(
      O.buffer,
      O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
      toLength$2((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
    );
  });

  var global$2 = global$11;
  var apply$1 = functionApply;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var fails$3 = fails$D;
  var arraySlice = arraySlice$9;

  var Int8Array$1 = global$2.Int8Array;
  var aTypedArray = ArrayBufferViewCore.aTypedArray;
  var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$3(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });

  var FORCED = fails$3(function () {
    return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$3(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return apply$1(
      $toLocaleString,
      TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
      arraySlice(arguments)
    );
  }, FORCED);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$2 = fails$D;
  var global$1 = global$11;
  var uncurryThis$4 = functionUncurryThis;

  var Uint8Array$1 = global$1.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join = uncurryThis$4([].join);

  if (fails$2(function () { arrayToString.call({}); })) {
    arrayToString = function toString() {
      return join(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var uncurryThis$3 = functionUncurryThis;
  var toObject = toObject$d;

  var floor = Math.floor;
  var charAt = uncurryThis$3(''.charAt);
  var replace = uncurryThis$3(''.replace);
  var stringSlice$1 = uncurryThis$3(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$1(str, 0, position);
        case "'": return stringSlice$1(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$1(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var apply = functionApply;
  var call$1 = functionCall;
  var uncurryThis$2 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$1 = fails$D;
  var anObject$2 = anObject$k;
  var isCallable = isCallable$o;
  var toIntegerOrInfinity = toIntegerOrInfinity$9;
  var toLength$1 = toLength$9;
  var toString$1 = toString$a;
  var requireObjectCoercible$1 = requireObjectCoercible$8;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getMethod$1 = getMethod$5;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol = wellKnownSymbol$o;

  var REPLACE = wellKnownSymbol('replace');
  var max$1 = Math.max;
  var min = Math.min;
  var concat = uncurryThis$2([].concat);
  var push = uncurryThis$2([].push);
  var stringIndexOf = uncurryThis$2(''.indexOf);
  var stringSlice = uncurryThis$2(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible$1(this);
        var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE);
        return replacer
          ? call$1(replacer, searchValue, O, replaceValue)
          : call$1(nativeReplace, toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$2(this);
        var S = toString$1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec$1(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max$1(min(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var uncurryThis$1 = functionUncurryThis;
  var redefine$1 = redefine$a.exports;

  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING$1 = 'toString';
  var un$DateToString = uncurryThis$1(DatePrototype[TO_STRING$1]);
  var getTime = uncurryThis$1(DatePrototype.getTime);

  // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring
  if (String(new Date(NaN)) != INVALID_DATE) {
    redefine$1(DatePrototype, TO_STRING$1, function toString() {
      var value = getTime(this);
      // eslint-disable-next-line no-self-compare -- NaN check
      return value === value ? un$DateToString(this) : INVALID_DATE;
    });
  }

  var uncurryThis = functionUncurryThis;
  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var redefine = redefine$a.exports;
  var anObject$1 = anObject$k;
  var isPrototypeOf = objectIsPrototypeOf;
  var $toString = toString$a;
  var fails = fails$D;
  var regExpFlags = regexpFlags$1;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var n$ToString = RegExpPrototype[TO_STRING];
  var getFlags = uncurryThis(regExpFlags);

  var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$1(this);
      var p = $toString(R.source);
      var rf = R.flags;
      var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var call = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$k;
  var toLength = toLength$9;
  var toString = toString$a;
  var requireObjectCoercible = requireObjectCoercible$8;
  var getMethod = getMethod$5;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
        return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regExpExec(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = toString(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var State;

  (function (State) {
    State[State["stop"] = 0] = "stop";
    State[State["play"] = 1] = "play";
    State[State["pause"] = 2] = "pause";
  })(State || (State = {}));
  /**
   * 类
   */


  var Animate = /*#__PURE__*/function () {
    /**
     * 构造方法
     * @param callback 回调
     * @param option 选项
     */
    function Animate(callback) {
      var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

      _classCallCheck(this, Animate);

      _defineProperty(this, "callback", void 0);

      _defineProperty(this, "duration", void 0);

      _defineProperty(this, "currentTime", 0);

      _defineProperty(this, "accumulateTime", 0);

      _defineProperty(this, "lastTime", 0);

      _defineProperty(this, "state", State.stop);

      _defineProperty(this, "timer", 0);

      this.callback = callback;
      this.duration = Math.floor(1000 / rate);
    }
    /**
     * 运行
     */


    _createClass(Animate, [{
      key: "run",
      value: function run() {
        var _this6 = this;

        if (this.state === State.play) {
          this.timer = window.requestAnimationFrame(function (time) {
            if (_this6.lastTime !== 0) {
              var delta = time - _this6.lastTime;
              _this6.currentTime += delta;
              _this6.accumulateTime += delta;

              if (_this6.accumulateTime >= _this6.duration) {
                _this6.accumulateTime %= _this6.duration;

                _this6.callback(_this6.currentTime);
              }
            }

            _this6.lastTime = time;

            _this6.run();
          });
        }
      }
      /**
       * 开始
       */

    }, {
      key: "play",
      value: function play() {
        this.state = State.play;
        this.run();
      }
      /**
       * 暂停
       */

    }, {
      key: "pause",
      value: function pause() {
        this.state = State.pause;
        window.cancelAnimationFrame(this.timer);
      }
      /**
       * 停止
       */

    }, {
      key: "stop",
      value: function stop() {
        this.state = State.stop;
        window.cancelAnimationFrame(this.timer);
        this.currentTime = 0;
        this.accumulateTime = 0;
        this.lastTime = 0;
      }
    }]);

    return Animate;
  }();

  var PI = Math.PI;
  var ease = {
    /**
     * @name 线性
     * @param p 相位。[0,1]
     * @return 输出
     */
    linear: function linear(p) {
      return p;
    },

    /**
     * @name 正弦缓入
     * @param p 相位。[0,1]
     * @return 输出。[0,1]
     */
    sineIn: function sineIn(p) {
      return -Math.cos(p * PI / 2) + 1;
    },

    /**
     * @name 正弦缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    sineOut: function sineOut(p) {
      return Math.sin(p * PI / 2);
    },

    /**
     * @name 正弦缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    sineInOut: function sineInOut(p) {
      return -0.5 * (Math.cos(PI * p) - 1);
    },

    /**
     * @name 2次方缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    quadIn: function quadIn(p) {
      return Math.pow(p, 2);
    },

    /**
     * @name 2次方缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quadOut: function quadOut(p) {
      return -p * (p - 2);
    },

    /**
     * @name 2次方缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quadInOut: function quadInOut(p) {
      return p < 0.5 ? 0.5 * Math.pow(p * 2, 2) : -0.5 * ((p * 2 - 1) * (p * 2 - 3) - 1);
    },

    /**
     * @name 3次方缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    cubicIn: function cubicIn(p) {
      return Math.pow(p, 3);
    },

    /**
     * @name 3次方缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    cubicOut: function cubicOut(p) {
      return Math.pow(p - 1, 3) + 1;
    },

    /**
     * @name 3次方缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    cubicInOut: function cubicInOut(p) {
      return p < 0.5 ? 0.5 * Math.pow(p * 2, 3) : 0.5 * (Math.pow(p * 2 - 2, 3) + 2);
    },

    /**
     * @name 4次方缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    quartIn: function quartIn(p) {
      return Math.pow(p, 4);
    },

    /**
     * @name 4次方缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quartOut: function quartOut(p) {
      return -Math.pow(p - 1, 4) + 1;
    },

    /**
     * @name 4次方缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quartInOut: function quartInOut(p) {
      return p < 0.5 ? 0.5 * Math.pow(p * 2, 4) : -0.5 * (Math.pow(p * 2 - 2, 4) - 2);
    },

    /**
     * @name 5次方缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    quintIn: function quintIn(p) {
      return Math.pow(p, 5);
    },

    /**
     * @name 5次方缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quintOut: function quintOut(p) {
      return Math.pow(p - 1, 5) + 1;
    },

    /**
     * @name 5次方缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    quintInOut: function quintInOut(p) {
      return p < 0.5 ? 0.5 * Math.pow(p * 2, 5) : 0.5 * (Math.pow(p * 2 - 2, 5) + 2);
    },

    /**
     * @name 指数缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    expoIn: function expoIn(p) {
      return p === 0 ? 0 : Math.pow(2, 10 * (p - 1));
    },

    /**
     * @name 指数缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    expoOut: function expoOut(p) {
      return p === 1 ? 1 : -Math.pow(2, -10 * p) + 1;
    },

    /**
     * @name 指数缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    expoInOut: function expoInOut(p) {
      return p === 0 || p === 1 ? p : p < 0.5 ? 0.5 * Math.pow(2, 10 * (p * 2 - 1)) : -0.5 * Math.pow(2, -10 * (p * 2 - 1)) + 1;
    },

    /**
     * @name 圆缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    circIn: function circIn(p) {
      return -Math.sqrt(1 - Math.pow(p, 2)) + 1;
    },

    /**
     * @name 圆缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    circOut: function circOut(p) {
      return Math.sqrt(1 - Math.pow(p - 1, 2));
    },

    /**
     * @name 圆缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    circInOut: function circInOut(p) {
      return p < 0.5 ? -0.5 * Math.sqrt(1 - 4 * Math.pow(p, 2)) + 0.5 : 0.5 * Math.sqrt(1 - Math.pow(p * 2 - 2, 2)) + 0.5;
    },

    /**
     * @name 回归缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    backIn: function backIn(p) {
      return 2.70158 * Math.pow(p, 3) - 1.70158 * Math.pow(p, 2);
    },

    /**
     * @name 回归缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    backOut: function backOut(p) {
      return 1 + 2.70158 * Math.pow(p - 1, 3) + 1.70158 * Math.pow(p - 1, 2);
    },

    /**
     * @name 回归缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    backInOut: function backInOut(p) {
      return p < 0.5 ? 2 * Math.pow(p, 2) * (7.189819 * p - 2.5949095) : 0.5 * (Math.pow(2 * p - 2, 2) * (3.5949095 * (2 * p - 2) + 2.5949095) + 2);
    },

    /**
     * @name 弹性缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    elasticIn: function elasticIn(p) {
      return p === 0 || p === 1 ? p : -Math.pow(2, 10 * p - 10) * Math.sin((10 * p - 10.75) * (PI * 2 / 3));
    },

    /**
     * @name 弹性缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    elasticOut: function elasticOut(p) {
      return p === 0 || p === 1 ? p : Math.pow(2, -10 * p) * Math.sin(10 * p - 0.75) * (PI * 2 / 3) + 1;
    },

    /**
     * @name 弹性缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    elasticInOut: function elasticInOut(p) {
      return p === 0 || p === 1 ? p : p < 0.5 ? -0.5 * (Math.pow(2, 20 * p - 11.125) * Math.sin((20 * p - 11.125) * (PI * 2 / 4.5))) : 0.5 * Math.pow(2, -20 * p + 10) * Math.sin((20 * p - 11.125) * (PI * 2 / 4.5)) + 1;
    },

    /**
     * @name 反弹缓入
     * @param p 相位。[0,1]
     * @return  输出。[0,1]
     */
    bounceIn: function bounceIn(p) {
      return 1 - ease.bounceOut(1 - p);
    },

    /**
     * @name 反弹缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    bounceOut: function bounceOut(p) {
      if (p < 1 / 2.75) return 7.5625 * Math.pow(p, 2);else if (p < 2 / 2.75) return 7.5625 * Math.pow(p - 1.5 / 2.75, 2) + 0.75;else if (p < 2.5 / 2.75) return 7.5625 * Math.pow(p - 2.25 / 2.75, 2) + 0.9375;else return 7.5625 * Math.pow(p - 2.625 / 2.75, 2) + 0.984375;
    },

    /**
     * @name 反弹缓入缓出
     * @param p 相位。[0,1]
     * @return 输出
     */
    bounceInOut: function bounceInOut(p) {
      return p < 0.5 ? 0.5 * (1 - ease.bounceOut(1 - 2 * p)) : 0.5 * (1 + ease.bounceOut(2 * p - 1));
    }
  };

  /**
   * 波纹
   */
  const preset$1 = {
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
  class Unit {
      option;
      color;
      time = 0;
      get finished() {
          return this.time >= this.option.period;
      }
      get phase() {
          return Math.min(this.time / this.option.period, 1);
      }
      constructor(option, color) {
          this.option = option;
          this.color = color;
      }
      /**
       * 更新
       */
      update() {
          this.time++;
      }
      /**
       * 数据
       */
      get() {
          let phase = this.phase;
          if (this.option.ease) {
              if (typeof this.option.ease === 'string') {
                  phase = ease[this.option.ease](phase);
              }
              else {
                  phase = this.option.ease(phase);
              }
          }
          let radius = (this.option.maxRadius - this.option.minRadius) * phase + this.option.minRadius;
          let color = this.color +
              Math.floor(255 * (1 - phase))
                  .toString(16)
                  .padStart(2, '0');
          return {
              radius,
              color
          };
      }
  }
  /**
   * 类
   */
  class Ripple extends Graph {
      units = new Set();
      count = 0;
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio, option) {
          super(context, visualize, audio);
          this.config(Object.assign({}, preset$1, { period: context.rate, interval: context.rate, maxRadius: Math.min(this.context.width, this.context.height) / 2 }, option));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          super.config(option);
          let brush = this.visualize.brush;
          brush.lineWidth = this.option.width;
      }
      /**
       * 更新
       */
      update() {
          this.count++;
          let brush = this.visualize.brush;
          if (this.count >= this.option.interval) {
              let data = this.audio?.get() ?? [];
              let average = mean(data);
              if (average >= this.option.threshold) {
                  this.count = 0;
                  let color = this.option.color;
                  if (this.option.dynamicColor?.length === 2) {
                      color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average);
                  }
                  this.units.add(new Unit(this.option, color));
              }
          }
          this.visualize.update(() => {
              for (let a of this.units.values()) {
                  let { radius, color } = a.get();
                  brush.beginPath();
                  brush.moveTo(radius, 0);
                  brush.arc(0, 0, radius, 0, 360);
                  brush.closePath();
                  if (this.option.fill) {
                      brush.fillStyle = color;
                      brush.fill();
                  }
                  else {
                      brush.strokeStyle = color;
                      brush.stroke();
                  }
                  a.update();
                  if (a.finished) {
                      this.units.delete(a);
                  }
              }
          });
      }
  }

  /**
   * 轮环
   */
  const preset = {
      color: '#000000',
      gradientColor: null,
      dynamicColor: null,
      width: 1,
      mirror: false,
      period: context.rate * 10,
      base: Math.min(context.width, context.height) / 4,
      amplitude: Math.min(context.width, context.height) / 4,
      smooth: false,
      clockwise: true,
      rotate: 0
  };
  /**
   * 类
   */
  class Round extends Graph {
      time = 0;
      /**
       * 构造方法
       * @param context 上下文
       * @param audio 音频
       * @param visualize 可视化
       */
      constructor(context, visualize, audio, option) {
          super(context, visualize, audio);
          this.config(Object.assign({}, preset, {
              period: context.rate * 10,
              base: Math.min(this.context.width, this.context.height) / 4,
              amplitude: Math.min(this.context.width, this.context.height) / 4
          }, option));
      }
      /**
       * 配置
       * @param option 选项
       */
      config(option) {
          super.config(option);
          let brush = this.visualize.brush;
          brush.strokeStyle = this.option.color;
          brush.lineWidth = this.option.width;
          if (this.option.gradientColor?.length) {
              let gradient = brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0);
              for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
                  gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i]);
              }
              brush.strokeStyle = gradient;
          }
      }
      /**
       * 更新
       */
      update() {
          let data = this.audio?.get() ?? [];
          let d = Array.from(data);
          if (this.option.mirror) {
              d = d.concat(Array.from(d).reverse());
          }
          let brush = this.visualize.brush;
          this.visualize.update(() => {
              let offset = Math.PI * 2 * (this.time / this.option.period);
              let delta = (Math.PI * 2) / d.length;
              let direction = 1;
              let points = d.map((a, i) => {
                  let radian = i * delta * (this.option.clockwise ? 1 : -1) + offset * this.option.rotate;
                  let radius = a * this.option.amplitude * direction + this.option.base;
                  let x = Math.cos(radian) * radius;
                  let y = Math.sin(radian) * radius;
                  direction *= -1;
                  return [x, y];
              });
              let path = pathCurve(points, this.option.smooth ? 'bezier' : undefined, { close: true });
              if (this.option.dynamicColor?.length === 2) {
                  let color = calcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], mean(data));
                  brush.strokeStyle = color;
              }
              brush.stroke(path);
          });
          this.time++;
          if (this.time >= this.option.period) {
              this.time = 0;
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
      context;
      c;
      offscreen;
      o;
      canvas;
      get wrap() {
          return [-this.context.width / 2, -this.context.height / 2, this.context.width, this.context.height];
      }
      get brush() {
          return this.o;
      }
      /**
       * 构造方法
       * @param context 上下文
       */
      constructor(context) {
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
      update(draw) {
          this.o.clearRect(...this.wrap);
          if (this.context.effect.trace < 1) {
              this.o.globalAlpha = this.context.effect.trace;
              this.o.drawImage(this.canvas, ...this.wrap);
              this.o.globalAlpha = 1;
          }
          draw(this.o);
          this.c.clearRect(...this.wrap);
          this.c.drawImage(this.offscreen, ...this.wrap);
      }
  }

  /**
   * 分析
   */
  const max = 256; // 2**8
  /**
   * 类
   */
  class Audio {
      context;
      _context;
      source; // 头结点
      analyser; // 尾结点
      second; // 最后第二个结点
      last; // 最后第一个结点
      /**
       * 构造方法
       * @param _context 上下文
       */
      constructor(_context) {
          this.context = _context;
          this._context = new AudioContext();
          this.source = this._context.createMediaElementSource(_context.audio);
          this.source.connect(this._context.destination);
          this.analyser = this._context.createAnalyser();
          this.analyser.fftSize = _context.size * 2; // *2
          this.source.connect(this.analyser);
          this.second = this.source;
          this.last = this.analyser;
          if (_context.gain !== 1) {
              this.addGain();
          }
      }
      /**
       * 获取数据
       * @return 数据
       */
      get() {
          let data = new Uint8Array(this.analyser.fftSize);
          if (this.context.time) {
              this.analyser.getByteTimeDomainData(data);
          }
          else {
              this.analyser.getByteFrequencyData(data);
          }
          let d = Array.from(data)
              .slice(0, Math.floor(data.length / 2)) // /2
              .slice(...this.context.slice)
              .map(a => a / max);
          if (this.context.db) {
              d = d.map(a => Math.min(1 + Math.log10(a), 1));
          }
          return d;
      }
      /**
       * 添加结点
       * @param node 结点
       */
      add(node) {
          this.second.disconnect(this.last);
          this.second.connect(node);
          node.connect(this.last);
          this.second = node;
      }
      /**
       * 添加增益
       * @param value 值
       */
      addGain(value = this.context.gain) {
          let gain = this._context.createGain();
          gain.gain.value = value;
          this.add(gain);
      }
      /**
       * 添加滤波器
       */
      addFilter(type, frequency, q, gain = 1) {
          let filter = this._context.createBiquadFilter();
          filter.type = type;
          filter.frequency.value = frequency;
          filter.Q.value = q;
          filter.gain.value = gain;
          this.add(filter);
      }
  }

  /**
   * index
   */
  /**
   * 类
   */
  class WebAudioWave {
      context;
      animate;
      visualize;
      audio;
      graph;
      get canvas() {
          return this.visualize.canvas;
      }
      /**
       * 构造方法
       * @param type 类型
       * @param audio 音频组件
       * @param option 选项
       */
      constructor(type, audio, option, graphOption) {
          if (!type) {
              throw new Error('Missing parameter: type');
          }
          if (!type) {
              throw new Error('Missing parameter: audio');
          }
          this.context = merge$2({}, context, option);
          this.context.type = type;
          this.context.audio = audio;
          this.animate = new Animate(this.callback.bind(this), this.context.rate);
          this.visualize = new Visualize(this.context);
          this.audio = new Audio(this.context);
          if (this.context.filter.type) {
              this.audio.addFilter(this.context.filter.type, this.context.filter.frequency, this.context.filter.q, this.context.filter.gain);
          }
          if (this.context.type === 'bar') {
              this.graph = new Bar(this.context, this.visualize, this.audio, graphOption);
          }
          else if (this.context.type === 'curve') {
              this.graph = new Curve(this.context, this.visualize, this.audio, graphOption);
          }
          else if (this.context.type === 'circle') {
              this.graph = new Circle(this.context, this.visualize, this.audio, graphOption);
          }
          else if (this.context.type === 'ripple') {
              this.graph = new Ripple(this.context, this.visualize, this.audio, graphOption);
          }
          else if (this.context.type === 'round') {
              this.graph = new Round(this.context, this.visualize, this.audio, graphOption);
          }
          audio.addEventListener('play', () => {
              this.play();
          });
          audio.addEventListener('pause', () => {
              this.stop();
          });
      }
      /**
       * 回调方法
       */
      callback() {
          this.graph?.update();
      }
      /**
       * 播放
       */
      play() {
          this.audio._context.resume();
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
          this.graph?.config(option);
      }
  }

  exports.Audio = Audio;
  exports.Visualize = Visualize;
  exports["default"] = WebAudioWave;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
