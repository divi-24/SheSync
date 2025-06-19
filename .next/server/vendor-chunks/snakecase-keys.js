"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/snakecase-keys";
exports.ids = ["vendor-chunks/snakecase-keys"];
exports.modules = {

/***/ "(rsc)/./node_modules/snakecase-keys/index.js":
/*!**********************************************!*\
  !*** ./node_modules/snakecase-keys/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(rsc)/./node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(rsc)/./node_modules/snake-case/dist.es2015/index.js\")\n\nmodule.exports = function (obj, options) {\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsd0VBQVk7O0FBRTFDO0FBQ0EsNEJBQTRCLDZDQUE2Qzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXE11bmVlciBBbGkgU3ViendhcmlcXERlc2t0b3BcXHNoZXN5bmNcXFNoZVN5bmNcXG5vZGVfbW9kdWxlc1xcc25ha2VjYXNlLWtleXNcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtYXAgPSByZXF1aXJlKCdtYXAtb2JqJylcbmNvbnN0IHsgc25ha2VDYXNlIH0gPSByZXF1aXJlKCdzbmFrZS1jYXNlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgZGVlcDogdHJ1ZSwgZXhjbHVkZTogW10sIHBhcnNpbmdPcHRpb25zOiB7fSB9LCBvcHRpb25zKVxuXG4gIHJldHVybiBtYXAob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbWF0Y2hlcyhvcHRpb25zLmV4Y2x1ZGUsIGtleSkgPyBrZXkgOiBzbmFrZUNhc2Uoa2V5LCBvcHRpb25zLnBhcnNpbmdPcHRpb25zKSxcbiAgICAgIHZhbFxuICAgIF1cbiAgfSwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybnMsIHZhbHVlKSB7XG4gIHJldHVybiBwYXR0ZXJucy5zb21lKGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJ1xuICAgICAgPyBwYXR0ZXJuID09PSB2YWx1ZVxuICAgICAgOiBwYXR0ZXJuLnRlc3QodmFsdWUpXG4gIH0pXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/snakecase-keys/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/snakecase-keys/index.js":
/*!**********************************************!*\
  !*** ./node_modules/snakecase-keys/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(ssr)/./node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(ssr)/./node_modules/snake-case/dist.es2015/index.js\")\n\nmodule.exports = function (obj, options) {\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosWUFBWSxtQkFBTyxDQUFDLHNEQUFTO0FBQzdCLFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsd0VBQVk7O0FBRTFDO0FBQ0EsNEJBQTRCLDZDQUE2Qzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXE11bmVlciBBbGkgU3ViendhcmlcXERlc2t0b3BcXHNoZXN5bmNcXFNoZVN5bmNcXG5vZGVfbW9kdWxlc1xcc25ha2VjYXNlLWtleXNcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtYXAgPSByZXF1aXJlKCdtYXAtb2JqJylcbmNvbnN0IHsgc25ha2VDYXNlIH0gPSByZXF1aXJlKCdzbmFrZS1jYXNlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgZGVlcDogdHJ1ZSwgZXhjbHVkZTogW10sIHBhcnNpbmdPcHRpb25zOiB7fSB9LCBvcHRpb25zKVxuXG4gIHJldHVybiBtYXAob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbWF0Y2hlcyhvcHRpb25zLmV4Y2x1ZGUsIGtleSkgPyBrZXkgOiBzbmFrZUNhc2Uoa2V5LCBvcHRpb25zLnBhcnNpbmdPcHRpb25zKSxcbiAgICAgIHZhbFxuICAgIF1cbiAgfSwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybnMsIHZhbHVlKSB7XG4gIHJldHVybiBwYXR0ZXJucy5zb21lKGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJ1xuICAgICAgPyBwYXR0ZXJuID09PSB2YWx1ZVxuICAgICAgOiBwYXR0ZXJuLnRlc3QodmFsdWUpXG4gIH0pXG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/snakecase-keys/index.js\n");

/***/ })

};
;