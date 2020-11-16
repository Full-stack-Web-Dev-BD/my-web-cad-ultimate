// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLORS = exports.OPERATIONS = exports.SNAP_GRID = exports.CANVAS_DIMENSIONS = void 0;
var CANVAS_DIMENSIONS = {
  WIDTH: 4000,
  HEIGHT: 3000
};
exports.CANVAS_DIMENSIONS = CANVAS_DIMENSIONS;
var SNAP_GRID = {
  'XS': 10,
  'S': 20,
  'M': 25,
  'L': 50
};
exports.SNAP_GRID = SNAP_GRID;
var OPERATIONS = {
  // view
  PAN: "PAN",
  ZOOM: "ZOOM",
  SELECT: "SELECT",
  DELETE: "DELETE",
  // MODIFICA
  MOVE: 'MOVE',
  ROTATE: "ROTATE",
  PULL: "PULL",
  SCALE: 'SCALE',
  COPY: 'COPY',
  // SHAPES
  LINE: 'LINE',
  RECT: 'RECT',
  CIRCLE: 'CIRCLE',
  ARC: 'ARC',
  // STYLE
  FILL: 'FILL'
};
exports.OPERATIONS = OPERATIONS;
var COLORS = {
  shapes_fill: 'rgba(0,190,0,0.35)',
  shapes_stroke: 'white'
};
exports.COLORS = COLORS;
},{}],"src/keyboards_events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://css-tricks.com/snippets/javascript/javascript-keycodes/
var KeyboardEvents = /*#__PURE__*/function () {
  function KeyboardEvents(main) {
    _classCallCheck(this, KeyboardEvents);

    this.main = main; // DEFAULTS

    this.choosenCommand = _constants.OPERATIONS.SELECT;
    this.currentSnap = _constants.SNAP_GRID.M;
    this.hasSnap = true;
    this.startListenDocumentKeyup();
  }

  _createClass(KeyboardEvents, [{
    key: "startListenDocumentKeyup",
    value: function startListenDocumentKeyup() {
      var _this = this;

      document.onkeyup = function (e) {
        if (e.key == 'Escape' || e.key == 's') {
          _this.choosenCommand = _constants.OPERATIONS.SELECT;
          /* } else if (e.key == 'd') {
              this.choosenCommand = OPERATIONS.DELETE;
          } else if (e.key == 'c') {
              this.choosenCommand = OPERATIONS.COPY;
          } else if (e.key == 'm') {
              this.choosenCommand = OPERATIONS.MOVE;
          } else if (e.key == 'r') {
              this.choosenCommand = OPERATIONS.ROTATE;
          } else if (e.key == 'p') {
              this.choosenCommand = OPERATIONS.PULL;
          } else if (e.key == 's') {
              this.choosenCommand = OPERATIONS.SCALE;
          } else if (e.key == 'l') {
              this.choosenCommand = OPERATIONS.LINE;
          } else if (e.key == 'q') {
              this.choosenCommand = OPERATIONS.RECT;
          } else if (e.key == 'o') {
              this.choosenCommand = OPERATIONS.CIRCLE;
          } else if (e.key == 'a') {
              this.choosenCommand = OPERATIONS.ARC;
          } else if (e.key == 'f') {
              this.choosenCommand = OPERATIONS.FILL; */
        } else if (e.key == 'l') {
          _this.choosenCommand = _constants.OPERATIONS.LINE;
        } else if (e.key == 'r') {
          _this.choosenCommand = _constants.OPERATIONS.RECT;
        } else if (e.key == 'c') {
          _this.choosenCommand = _constants.OPERATIONS.CIRCLE;
        } else if (e.key == 'p') {
          _this.choosenCommand = _constants.OPERATIONS.PAN;
        } else if (e.key == 0) {
          _this.hasSnap = false;
        } else if (e.key == "1") {
          _this.hasSnap = true;
          _this.currentSnap = _constants.SNAP_GRID.L;
        } else if (e.key == "2") {
          _this.hasSnap = true;
          _this.currentSnap = _constants.SNAP_GRID.M;
        } else if (e.key == "3") {
          _this.hasSnap = true;
          _this.currentSnap = _constants.SNAP_GRID.S;
        } else if (e.key == "4") {
          _this.hasSnap = true;
          _this.currentSnap = _constants.SNAP_GRID.XS;
        } else if (e.ctrlKey && e.key == 'z') {
          // alert("Ctrl + Z shortcut combination was pressed");
          _this.main.HM.undo();
        } else if (e.ctrlKey && e.key == 'y') {
          // alert("Ctrl + Y shortcut combination was pressed");
          _this.main.HM.redo();
        }
      };
    }
  }]);

  return KeyboardEvents;
}();

exports.default = KeyboardEvents;
},{"./constants":"src/constants.js"}],"src/history_management.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HistoryManagement = /*#__PURE__*/function () {
  function HistoryManagement(main) {
    _classCallCheck(this, HistoryManagement);

    this.main = main;
    this.history = [[]];
    this.position = 0;
  }

  _createClass(HistoryManagement, [{
    key: "set",
    value: function set(value) {
      if (this.position < this.history.length - 1) {
        this.history = this.history.slice(0, this.position + 1);
      }

      this.history.push(_toConsumableArray(value));
      this.position += 1;
    }
  }, {
    key: "undo",
    value: function undo() {
      if (this.position > 0) {
        this.position--;
        this.main.shapes = _toConsumableArray(this.value);
      } else {
        console.log('No more undo ...');
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.position < this.history.length - 1) {
        this.position++;
        this.main.shapes = _toConsumableArray(this.value);
      } else {
        console.log('No more redo ...');
      }
    } // toString function to aid in illustrating

  }, {
    key: "toString",
    value: function toString() {
      console.log("Currnent Value: ", this.value);
      console.log("History: ", this.history);
      console.log("Position: ", this.position);
    }
  }, {
    key: "value",
    get: function get() {
      return this.history[this.position];
    }
  }]);

  return HistoryManagement;
}();

exports.default = HistoryManagement;
},{}],"src/commands/command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function Command(main) {
  _classCallCheck(this, Command);

  // ref to main class istance
  this.main = main;
};

exports.default = Command;
},{}],"src/commands/pan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PanCommand = /*#__PURE__*/function (_Command) {
  _inherits(PanCommand, _Command);

  var _super = _createSuper(PanCommand);

  function PanCommand(state) {
    var _this;

    _classCallCheck(this, PanCommand);

    _this = _super.call(this, state); // this.mouse drag related variables

    _this.isDown = false;
    _this.startX, _this.startY; // the accumulated horizontal(X) & vertical(Y) panning the user has done in total

    _this.main.netPanningX = 0;
    _this.main.netPanningY = 0;
    return _this;
  }

  _createClass(PanCommand, [{
    key: "mousemove",
    value: function mousemove(e) {
      // tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();
      var x = e._x;
      var y = e._y; // if the this.mouse is being dragged

      if (this.isDown) {
        // dx & dy are the distance the this.mouse has moved since the last this.mousemove event
        var dx = x - this.startX;
        var dy = y - this.startY; // reset the vars for next this.mousemove

        this.startX = x;
        this.startY = y; // accumulate the net panning done

        this.main.netPanningX += dx;
        this.main.netPanningY += dy;
        console.clear();
        console.log("Net change in panning: x:".concat(this.main.netPanningX, "px, y:").concat(this.main.netPanningY, "px"));
      }

      this.main.mouse.x = x;
      this.main.mouse.y = y;
      this.main.mouse.event = e;
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      e.preventDefault();
      e.stopPropagation(); // calc the starting this.mouse X,Y for the drag

      this.startX = e._x;
      this.startY = e._y; // set the isDragging flag

      this.isDown = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(e) {
      console.log('PanCommand: mouseup', e, this);
      e.preventDefault();
      e.stopPropagation(); // clear the isDragging flag

      this.isDown = false;
    }
  }, {
    key: "mouseout",
    value: function mouseout(e) {
      console.log('PanCommand: mouseout', e, this);
      e.preventDefault();
      e.stopPropagation(); // clear the isDragging flag

      this.isDown = false;
    }
  }]);

  return PanCommand;
}(_command.default);

exports.default = PanCommand;
},{"./command":"src/commands/command.js"}],"src/commands/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SelectCommand = /*#__PURE__*/function (_Command) {
  _inherits(SelectCommand, _Command);

  var _super = _createSuper(SelectCommand);

  function SelectCommand(state) {
    _classCallCheck(this, SelectCommand);

    return _super.call(this, state);
  }

  _createClass(SelectCommand, [{
    key: "mousemove",
    value: function mousemove(e) {
      // console.log('SelectCommand: mousemove', e, this)
      this.main.mouse.x = e._x;
      this.main.mouse.y = e._y;
      this.main.mouse.event = e;
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {// console.log('SelectCommand: mousedown', e, this)
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {// console.log('SelectCommand: mouseup', event, this)
    }
  }, {
    key: "mouseout",
    value: function mouseout(event) {// console.log('SelectCommand: mouseout', event, this)
    }
  }]);

  return SelectCommand;
}(_command.default);

exports.default = SelectCommand;
},{"./command":"src/commands/command.js"}],"src/commands/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LineCommand = /*#__PURE__*/function (_Command) {
  _inherits(LineCommand, _Command);

  var _super = _createSuper(LineCommand);

  function LineCommand(state) {
    var _this;

    _classCallCheck(this, LineCommand);

    _this = _super.call(this, state);
    _this.started = false;
    _this.start = {};
    return _this;
  }

  _createClass(LineCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      if (this.started) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      /*         this.main.ctx.beginPath(); */
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          color: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
      }
    }
  }, {
    key: "mouseout",
    value: function mouseout(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          color: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
      }
    }
  }]);

  return LineCommand;
}(_command.default);

exports.default = LineCommand;
},{"./command":"src/commands/command.js","../constants":"src/constants.js"}],"src/commands/rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RectCommand = /*#__PURE__*/function (_Command) {
  _inherits(RectCommand, _Command);

  var _super = _createSuper(RectCommand);

  function RectCommand(state) {
    var _this;

    _classCallCheck(this, RectCommand);

    _this = _super.call(this, state);
    _this.started = false;
    _this.start = {};
    _this.x, _this.y;
    _this.width, _this.height;
    return _this;
  }

  _createClass(RectCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      if (this.started) {
        this.x = Math.min(event._x, this.start.x), this.y = Math.min(event._y, this.start.y), this.w = Math.abs(event._x - this.start.x), this.h = Math.abs(event._y - this.start.y);

        if (!this.w || !this.h) {
          return;
        }

        this.main.tempShape = [{
          x: this.x - this.main.netPanningX,
          y: this.y - this.main.netPanningY,
          w: this.w,
          h: this.h
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.main.ctx.beginPath();
      this.start.x = event._x;
      this.start.y = event._y;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          x: this.x - this.main.netPanningX,
          y: this.y - this.main.netPanningY,
          w: this.w,
          h: this.h,
          color: _constants.COLORS.shapes_fill,
          stroke: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
      }
    }
  }, {
    key: "mouseout",
    value: function mouseout(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          x: this.x - this.main.netPanningX,
          y: this.y - this.main.netPanningY,
          w: this.w,
          h: this.h,
          color: _constants.COLORS.shapes_fill,
          stroke: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
      }
    }
  }]);

  return RectCommand;
}(_command.default);

exports.default = RectCommand;
},{"./command":"src/commands/command.js","../constants":"src/constants.js"}],"src/commands/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CircleCommand = /*#__PURE__*/function (_Command) {
  _inherits(CircleCommand, _Command);

  var _super = _createSuper(CircleCommand);

  function CircleCommand(state) {
    var _this;

    _classCallCheck(this, CircleCommand);

    _this = _super.call(this, state);
    _this.started = false;
    _this.start = {};
    _this.radius = 0;
    return _this;
  }

  _createClass(CircleCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      if (this.started) {
        var dx = this.start.x - (event._x - this.main.netPanningX);
        var dy = this.start.y - (event._y - this.main.netPanningY);
        this.radius = Math.sqrt(dx * dx + dy * dy);
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          radius: this.radius
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      /* this.main.ctx.beginPath(); */
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          start_x: this.start.x,
          start_y: this.start.y,
          radius: this.radius,
          color: _constants.COLORS.shapes_fill,
          stroke: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
        this.radius = 0;
      }
    }
  }, {
    key: "mouseout",
    value: function mouseout(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push({
          start_x: this.start.x,
          start_y: this.start.y,
          radius: this.radius,
          color: _constants.COLORS.shapes_fill,
          stroke: _constants.COLORS.shapes_stroke
        });
        this.main.HM.set(this.main.shapes);
        this.radius = 0;
      }
    }
  }]);

  return CircleCommand;
}(_command.default);

exports.default = CircleCommand;
},{"./command":"src/commands/command.js","../constants":"src/constants.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebCAD = void 0;

var _keyboards_events = _interopRequireDefault(require("./keyboards_events"));

var _history_management = _interopRequireDefault(require("./history_management"));

var _constants = require("./constants");

var _pan = _interopRequireDefault(require("./commands/pan"));

var _select = _interopRequireDefault(require("./commands/select"));

var _line = _interopRequireDefault(require("./commands/line"));

var _rect = _interopRequireDefault(require("./commands/rect"));

var _circle = _interopRequireDefault(require("./commands/circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.onload = function () {
  var cad = new WebCAD();
  document.getElementById('canvas').replaceWith(cad.canvas);
  cad.start();
  window.cad = cad;
};

var WebCAD = /*#__PURE__*/function () {
  function WebCAD() {
    _classCallCheck(this, WebCAD);

    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    this.keys = new _keyboards_events.default(this);
    this.commands = {
      'PAN': new _pan.default(this),
      'SELECT': new _select.default(this),
      'LINE': new _line.default(this),
      'RECT': new _rect.default(this),
      'CIRCLE': new _circle.default(this)
    };
    this.mouse = {
      x: 0,
      y: 0,
      event: null
    };
    this.shapes = [];
    this.tempShape = [];
    this.HM = new _history_management.default(this);
    this.startListening();
    this.resizeCanvas();
  }

  _createClass(WebCAD, [{
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.cursor = "none";
      this.drawAll();
    }
  }, {
    key: "startListening",
    value: function startListening() {
      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', this.resizeCanvas.bind(this), false);
      this.canvas.addEventListener('mousemove', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mousedown', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mouseup', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mouseout', this.globalHandler.bind(this), false);
    }
  }, {
    key: "globalHandler",
    value: function globalHandler(ev) {
      this.currentCommand = this.commands[this.keys.choosenCommand];
      var x = parseInt(ev.clientX);
      var y = parseInt(ev.clientY);
      /* ----------------- SNAP 2 GRID ----------------- */

      if (this.keys.hasSnap) {
        var restoH = x % this.keys.currentSnap;

        if (restoH >= this.keys.currentSnap) {
          x = x - restoH + this.keys.currentSnap;
        } else {
          x -= restoH;
        }

        var restoV = y % this.keys.currentSnap;

        if (restoV >= this.keys.currentSnap) {
          y = y - restoV + this.keys.currentSnap;
        } else {
          y -= restoV;
        }
      }

      ev._x = x;
      ev._y = y;
      var func = this.currentCommand[ev.type].bind(this.currentCommand);

      if (func) {
        func(ev);
      }
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this = this;

      this.drawAll();
      requestAnimationFrame(function () {
        _this.loop();
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.loop();
    }
    /* --------------------------------------------------------- */

  }, {
    key: "drawPointer",
    value: function drawPointer() {
      this.ctx.strokeStyle = "rgb(0,103,28)"; // green

      this.ctx.strokeRect(this.mouse.x - 4.5 - this.netPanningX, this.mouse.y - 5.5 - this.netPanningY, 10, 10);
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(this.mouse.x - this.netPanningX, 0);
      this.ctx.lineTo(this.mouse.x - this.netPanningX, _constants.CANVAS_DIMENSIONS.HEIGHT);
      this.ctx.moveTo(0, this.mouse.y - this.netPanningY);
      this.ctx.lineTo(_constants.CANVAS_DIMENSIONS.WIDTH, this.mouse.y - this.netPanningY);
      this.ctx.stroke();
      this.ctx.fillStyle = "grey";
      this.ctx.fillText("".concat(this.keys.choosenCommand.toUpperCase()), this.mouse.x + 12.5 - this.netPanningX, this.mouse.y - 4.5 - this.netPanningY);
      this.ctx.fillText("x: ".concat(this.mouse.x - this.netPanningX, " - y: ").concat(this.mouse.y - this.netPanningY), this.mouse.x + 12.5 - this.netPanningX, this.mouse.y + 12.5 - this.netPanningY);
      this.ctx.closePath();
    }
  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      this.ctx.fillStyle = "rgb(31,40,49)";
      this.ctx.fillRect(0, 0, _constants.CANVAS_DIMENSIONS.WIDTH, _constants.CANVAS_DIMENSIONS.HEIGHT); // colonne

      for (var i = 0; i < _constants.CANVAS_DIMENSIONS.WIDTH; i += this.keys.currentSnap) {
        if (this.keys.hasSnap) {
          this.ctx.beginPath();
          this.ctx.moveTo(i + 0.5, 0);
          this.ctx.lineTo(i + 0.5, _constants.CANVAS_DIMENSIONS.HEIGHT);

          if (i % 100 === 0) {
            this.ctx.strokeStyle = "rgb(48,55,71)";
          } else {
            this.ctx.strokeStyle = "rgb(36,45,56)";
          }

          this.ctx.lineWidth = 0.5;
          this.ctx.closePath();
          this.ctx.stroke();
        }

        if (i % 100 === 0) {
          this.ctx.font = "11px Arial";
          this.ctx.fillStyle = "grey"; // this.ctx.textAlign = "center";

          this.ctx.fillText(i.toString(), i + 2.5, 10 - (this.netPanningY > 0 ? 0 : this.netPanningY));
        }
      } // righe


      for (var _i = 0; _i < _constants.CANVAS_DIMENSIONS.HEIGHT; _i += this.keys.currentSnap) {
        if (this.keys.hasSnap) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, _i + 0.5);
          this.ctx.lineTo(_constants.CANVAS_DIMENSIONS.WIDTH, _i + 0.5);

          if (_i % 100 === 0) {
            this.ctx.strokeStyle = "rgb(48,55,71)";
          } else {
            this.ctx.strokeStyle = "rgb(36,45,56)";
          }

          this.ctx.lineWidth = 0.5;
          this.ctx.closePath();
          this.ctx.stroke();
        }

        if (_i % 100 === 0) {
          this.ctx.font = "11px Arial";
          this.ctx.fillStyle = "grey"; // this.ctx.textAlign = "center";

          this.ctx.fillText(_i.toString(), 2.5 - (this.netPanningX > 0 ? 0 : this.netPanningX), _i - 2.5);
        }
      }
    }
  }, {
    key: "drawShapes",
    value: function drawShapes() {
      var _this2 = this;

      [].concat(_toConsumableArray(this.HM.value), _toConsumableArray(this.tempShape)).forEach(function (item) {
        if (item.w) {
          _this2.ctx.save();

          _this2.ctx.fillStyle = item.color;
          _this2.ctx.strokeStyle = item.stroke;

          _this2.ctx.beginPath();

          _this2.ctx.rect(item.x, item.y, item.w, item.h);

          _this2.ctx.fill();

          _this2.ctx.stroke();

          _this2.ctx.restore();
        } else if (item.radius) {
          _this2.ctx.save();

          _this2.ctx.strokeStyle = item.stroke;
          _this2.ctx.fillStyle = item.color; // x, y, radius, startAngle, endAngle, antiClockwise = false by default

          _this2.ctx.beginPath();

          _this2.ctx.arc(item.start_x, item.start_y, item.radius, 0, 2 * Math.PI, false); // full circle


          _this2.ctx.fill();

          _this2.ctx.stroke();

          _this2.ctx.restore();
        } else {
          _this2.ctx.save();

          _this2.ctx.strokeStyle = item.color;

          _this2.ctx.beginPath();

          _this2.ctx.moveTo(item.start_x, item.start_y); // sets our starting point


          _this2.ctx.lineTo(item.end_x, item.end_y); // create a line from start point to X: 100, Y: 200


          _this2.ctx.closePath(); // left side and closes the pat


          _this2.ctx.stroke();

          _this2.ctx.restore();
        }
      });
    }
  }, {
    key: "drawAll",
    value: function drawAll() {
      // this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // CANVAS_DIMENSIONS.WIDTH, CANVAS_DIMENSIONS.HEIGHT

      this.ctx.save();
      this.ctx.scale(1, 1
      /* this.viewport.scale[0], this.viewport.scale[1] */
      ); // apply scale

      this.ctx.translate(this.netPanningX, this.netPanningY); // apply translation

      this.drawCanvas();
      this.drawPointer();
      this.drawShapes();
      this.ctx.restore();
    }
  }]);

  return WebCAD;
}();

exports.WebCAD = WebCAD;
},{"./keyboards_events":"src/keyboards_events.js","./history_management":"src/history_management.js","./constants":"src/constants.js","./commands/pan":"src/commands/pan.js","./commands/select":"src/commands/select.js","./commands/line":"src/commands/line.js","./commands/rect":"src/commands/rect.js","./commands/circle":"src/commands/circle.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53087" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map