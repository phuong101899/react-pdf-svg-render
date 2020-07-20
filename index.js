"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _webpack = _interopRequireDefault(require("pdfjs-dist/webpack"));

require("pdfjs-dist/web/pdf_viewer.css");

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Index(_ref) {
  var url = _ref.url;
  var root = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    render();
    window.addEventListener('resize', resizeRender);
  }, []);

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var pdf, container, containerWith, _loop, i;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _webpack.default.getDocument(url).promise;

            case 2:
              pdf = _context2.sent;
              // Get div#container and cache it for later use
              container = root.current;

              if (container) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return");

            case 6:
              while (container.firstChild) {
                container.removeChild(container.firstChild);
              }

              containerWith = container.clientWidth; // Loop from 1 to total_number_of_pages in PDF document

              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                var page, viewport, scale;
                return regeneratorRuntime.wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return pdf.getPage(i);

                      case 2:
                        page = _context.sent;
                        viewport = page.getViewport({
                          scale: 1
                        });
                        scale = containerWith / viewport.width;
                        viewport = page.getViewport({
                          scale: scale
                        });
                        container.style.maxWidth = '100%';
                        container.style.background = '#ccc';
                        page.getOperatorList().then(function (opList) {
                          var svgGfx = new _webpack.default.SVGGraphics(page.commonObjs, page.objs);
                          return svgGfx.getSVG(opList, _objectSpread({}, viewport));
                        }).then(function (svg) {
                          svg.style.background = '#fff';
                          container.appendChild(svg);
                        });

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });
              i = 1;

            case 10:
              if (!(i <= pdf.numPages)) {
                _context2.next = 15;
                break;
              }

              return _context2.delegateYield(_loop(i), "t0", 12);

            case 12:
              i++;
              _context2.next = 10;
              break;

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var resizeRender = _.debounce(render, 500);

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "container",
    ref: root
  });
}

var _default = Index;
exports.default = _default;
