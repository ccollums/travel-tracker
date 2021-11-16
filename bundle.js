/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "addData": () => (/* binding */ addData)
/* harmony export */ });
const getData = (property) => {
  return fetch(`http://localhost:3001/api/v1/${property}`)
    .then(response => response.json())
}

const addData = (object, property) => {
  return fetch(`http://localhost:3001/api/v1/${property}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
    .then(response => response.json())
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 4 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n* {\n  font-family: \"Roboto\", sans-serif;\n}\n\nbody {\n  background: white;\n}\n\nh1 {\n  font-size: 200%;\n  font-weight: 500;\n  margin: 1%;\n}\n\nh2 {\n  color: #2B2B2B;\n  margin: 1%;\n}\n\nh3 {\n  margin: 4%;\n}\n\nimg {\n  height: 17vh;\n  margin: 1%;\n}\n\n.main-dashboard {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: none;\n}\n\n.nav-bar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 12vh;\n  padding: 2% 0 1% 0;\n}\n\n.middle-image {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n  background-image: url(\"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  height: 60vh;\n}\n\n.estimated-trip-cost {\n  font-size: 150%;\n  font-weight: 700;\n  width: max-content;\n}\n\n.current-trip {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: RGBA(140, 64, 46, 0.22);\n  height: 20vh;\n  width: 100%;\n  margin: 1%;\n}\n\n.trips {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: none;\n}\n\n.trips-title {\n  margin: 4%;\n  width: max-content;\n}\n\n.upcoming-trips,\n.pending-trips,\n.past-trips {\n  display: flex;\n  flex-direction: column;\n  justify-content: none;\n  align-items: center;\n  border-radius: 14px;\n  height: 60vh;\n  width: 40vw;\n  overflow: scroll;\n  margin: 1.5%;\n}\n\n.user-pending-trips,\n.user-upcoming-trips,\n.user-past-trips {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.upcoming-trips {\n  background-color: #037F8C;\n}\n\n.pending-trips {\n  background-color: #B0D9D9;\n}\n\n.past-trips {\n  background-color: #03A6A6;\n}\n\n.trip-image {\n  height: 20vh;\n  width: 15vw;\n}\n\n.new-trip-inputs {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: none;\n}\n\n.date-input,\n.duration-input,\n.number-travelers-input,\n.destination-drop-down {\n  border: none;\n  border-radius: 14px;\n  cursor: pointer;\n  font-size: 120%;\n  height: 5vh;\n  width: 20vw;\n  margin: 1%;\n  padding: 1%;\n}\n\n.destination-drop-down {\n  height: 8vh;\n}\n\n.submit-button-section {\n  display: flex;\n  flex-direction: column;\n  justify-content: none;\n  align-items: center;\n}\n\n.submit-button {\n  cursor: pointer;\n  border: none;\n  background-color: #F2A88D;\n  border-radius: 14px;\n  font-size: 120%;\n  font-weight: 500;\n  height: 5vh;\n  width: 20vw;\n  margin: 2%;\n}\n.submit-button:hover {\n  transition: 0.5s ease-in-out;\n  transform: scale(1.1);\n}\n\n.label-input-boxes,\n.dashboard-image {\n  display: flex;\n  flex-direction: none;\n  justify-content: center;\n  align-items: center;\n  font-size: 150%;\n  width: 100vw;\n}\n\n.dashboard-image {\n  color: #8C402E;\n  font-size: 300%;\n  font-weight: 700;\n  opacity: 30%;\n}\n\n.no-date-found {\n  color: black;\n  font-size: 100%;\n  margin-top: 15%;\n  width: max-content;\n}\n\n.money-spent-this-year {\n  display: flex;\n  flex-direction: none;\n  justify-content: center;\n  align-items: center;\n}\n\n.total-spent {\n  font-size: 100%;\n  width: 15vw;\n}\n\n.price {\n  margin-right: 10%;\n  font-size: 300%;\n}\n\n.trip {\n  display: flex;\n  flex-direction: none;\n  justify-content: space-between;\n  align-items: center;\n  background-color: white;\n  border-radius: 14px;\n  margin: 4%;\n  min-height: 20vh;\n  width: 28vw;\n}\n\n.trip-details {\n  align-self: left;\n  color: black;\n  margin: 15%;\n}\n\n.login-page {\n  display: flex;\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-photo-left-side {\n  background-image: url(\"https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  height: 100vh;\n  width: 40vw;\n}\n\n.logo-title {\n  display: flex;\n  flex-direction: none;\n  justify-content: none;\n  align-items: center;\n  font-family: \"Abril Fatface\", cursive;\n}\n\n.application-title {\n  font-size: 250%;\n}\n\n.login-right-side {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 60vw;\n}\n\n.user-name-input,\n.password-input,\n.login-button {\n  border-radius: 14px;\n  font-size: 120%;\n  height: 5vh;\n  width: 25vw;\n  margin: 3%;\n  padding: 1%;\n}\n\n.login-button {\n  cursor: pointer;\n  border: none;\n  background-color: black;\n  color: white;\n  height: 9vh;\n  width: 27vw;\n}\n.login-button:hover {\n  transition: 0.5s ease-in-out;\n  transform: scale(1.1);\n}\n\n.user-name-input,\n.password-input {\n  border: grey 1px solid;\n}\n\n.hidden {\n  display: none !important;\n}", "",{"version":3,"sources":["webpack://./src/css/_reset.scss","webpack://./src/css/base.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_mixins.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACAD;;ADEA,gDAAA;AACA;;EAEC,cAAA;ACCD;;ADCA;EACC,cAAA;ACED;;ADAA;EACC,gBAAA;ACGD;;ADDA;EACC,YAAA;ACID;;ADFA;;EAEC,WAAA;EACA,aAAA;ACKD;;ADHA;EACC,yBAAA;EACA,iBAAA;ACMD;;AA/CA;EACE,iCAAA;AAkDF;;AA/CA;EACE,iBCVmB;AD4DrB;;AA/CA;EACE,eAAA;EACA,gBAAA;EACA,UCNY;ADwDd;;AA/CA;EACE,cCnBU;EDoBV,UCXY;AD6Dd;;AA/CA;EACE,UAAA;AAkDF;;AA/CA;EACE,YAAA;EACA,UCpBY;ADsEd;;AA/CA;EEhCE,aAAA;EACA,sBFgCiB;EE/BjB,uBF+ByB;EE9BzB,iBAJkD;AFuFpD;;AAlDA;EEpCE,aAAA;EACA,mBFoCiB;EEnCjB,8BFmCsB;EElCtB,mBFkCqC;EACrC,YAAA;EACA,kBAAA;AAwDF;;AArDA;EE1CE,aAAA;EACA,sBF0CiB;EEzCjB,yBFyCyB;EExCzB,mBFwCmC;EE3BnC,wLAAA;EACA,4BAAA;EACA,sBAAA;EF2BA,YAAA;AA6DF;;AA1DA;EACE,eAAA;EACA,gBAAA;EACA,kBAAA;AA6DF;;AA1DA;EEtDE,aAAA;EACA,mBFsDiB;EErDjB,uBFqDsB;EEpDtB,mBFoD8B;EAC9B,yCCjDU;EDkDV,YAAA;EACA,WChDoB;EDiDpB,UClDY;ADkHd;;AA7DA;EE9DE,aAAA;EACA,mBF8DiB;EE7DjB,8BF6DsB;EE5DtB,iBAJkD;AFmIpD;;AAhEA;EACE,UAAA;EACA,kBAAA;AAmEF;;AAhEA;;;EEvEE,aAAA;EACA,sBFyEiB;EExEjB,qBFwEyB;EEvEzB,mBFuE+B;EAC/B,mBCnEc;EDoEd,YAAA;EACA,WAAA;EACA,gBAAA;EACA,YAAA;AAsEF;;AAnEA;;;EElFE,aAAA;EACA,sBFoFiB;EEnFjB,uBFmFyB;EElFzB,mBFkFiC;AAyEnC;;AAtEA;EACE,yBCxFU;ADiKZ;;AAtEA;EACE,yBC3FW;ADoKb;;AAvEA;EACE,yBC7FY;ADuKd;;AAvEA;EACE,YAAA;EACA,WAAA;AA0EF;;AAvEA;EExGE,aAAA;EACA,mBFwGiB;EEvGjB,uBFuGsB;EEtGtB,iBAJkD;AFuLpD;;AA1EA;;;;EAIE,YAAA;EACA,mBCzGc;ED0Gd,eAAA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,UC7GY;ED8GZ,WC9GY;AD2Ld;;AA1EA;EACE,WAAA;AA6EF;;AA1EA;EE9HE,aAAA;EACA,sBF8HiB;EE7HjB,qBF6HyB;EE5HzB,mBF4H+B;AAgFjC;;AA7EA;EE3HE,eAAA;EACA,YAAA;EF4HA,yBC/HM;EDgIN,mBC7Hc;ED8Hd,eAAA;EACA,gBAAA;EACA,WAAA;EACA,WAAA;EACA,UAAA;AAiFF;AElNI;EACE,4BAAA;EACA,qBAAA;AFoNN;;AAlFA;;EE7IE,aAAA;EACA,oBF8IiB;EE7IjB,uBF6IuB;EE5IvB,mBF4I+B;EAC/B,eAAA;EACA,YAAA;AAwFF;;AArFA;EACE,cCjJS;EDkJT,eAAA;EACA,gBAAA;EACA,YAAA;AAwFF;;AArFA;EACE,YCtJM;EDuJN,eCnJoB;EDoJpB,eAAA;EACA,kBAAA;AAwFF;;AArFA;EElKE,aAAA;EACA,oBFkKiB;EEjKjB,uBFiKuB;EEhKvB,mBFgK+B;AA2FjC;;AAxFA;EACE,eC7JoB;ED8JpB,WAAA;AA2FF;;AAxFA;EACE,iBAAA;EACA,eAAA;AA2FF;;AAxFA;EEhLE,aAAA;EACA,oBFgLiB;EE/KjB,8BF+KuB;EE9KvB,mBF8KsC;EACtC,uBCnLmB;EDoLnB,mBC3Kc;ED4Kd,UAAA;EACA,gBAAA;EACA,WAAA;AA8FF;;AA3FA;EACE,gBAAA;EACA,YAAA;EACA,WAAA;AA8FF;;AAzFA;EACE,aAAA;EACA,aAAA;EACA,YAAA;AA4FF;;AAzFA;EEvLE,gLAAA;EACA,4BAAA;EACA,sBAAA;EFuLA,aAAA;EACA,WAAA;AA8FF;;AA3FA;EE7ME,aAAA;EACA,oBF6MiB;EE5MjB,qBF4MuB;EE3MvB,mBF2M6B;EAC7B,qCAAA;AAiGF;;AA9FA;EACE,eAAA;AAiGF;;AA9FA;EEtNE,aAAA;EACA,sBFsNiB;EErNjB,uBFqNyB;EEpNzB,mBFoNiC;EACjC,WAAA;AAoGF;;AAhGA;;;EAGE,mBCvNc;EDwNd,eAAA;EACA,WAAA;EACA,WAAA;EACA,UAAA;EACA,WC3NY;AD8Td;;AAhGA;EEhOE,eAAA;EACA,YAAA;EFiOA,uBCnOM;EDoON,YC3OmB;ED4OnB,WAAA;EACA,WAAA;AAoGF;AEvUI;EACE,4BAAA;EACA,qBAAA;AFyUN;;AArGA;;EAEE,sBAAA;AAwGF;;AArGA;EACE,wBAAA;AAwGF","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n","@use '_variables' as *;\n@use '_reset' as *;\n@use '_mixins' as *;\n\n\n* {\n  font-family: 'Roboto', sans-serif;\n}\n\nbody {\n  background: $primary-background;\n}\n\nh1 {\n  font-size: 200%;\n  font-weight: 500;\n  margin: $one-percent;\n}\n\nh2 {\n  color: $dark-grey;\n  margin: $one-percent;\n}\n\nh3 {\n  margin: 4%;\n}\n\nimg {\n  height: 17vh;\n  margin: $one-percent\n}\n\n.main-dashboard {\n  @include flexBox(column, center);\n}\n\n.nav-bar {\n  @include flexBox(row, space-between, center);\n  height: 12vh;\n  padding: 2% 0 1% 0;\n}\n\n.middle-image {\n  @include flexBox(column, flex-end, center);\n  @include backgroundImages(\"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80\");\n  height: 60vh;\n}\n\n.estimated-trip-cost {\n  font-size: 150%;\n  font-weight: 700;\n  width: max-content;\n}\n\n.current-trip {\n  @include flexBox(row, center, center);\n  background-color: $light-tan;\n  height: 20vh;\n  width: $one-hundred-percent;\n  margin: $one-percent;\n}\n\n.trips {\n  @include flexBox(row, space-between);\n}\n\n.trips-title {\n  margin: 4%;\n  width: max-content;\n}\n\n.upcoming-trips,\n.pending-trips,\n.past-trips {\n  @include flexBox(column, none, center);\n  border-radius: $border-radius;\n  height: 60vh;\n  width: 40vw;\n  overflow: scroll;\n  margin: 1.5%;\n}\n\n.user-pending-trips,\n.user-upcoming-trips,\n.user-past-trips {\n  @include flexBox(column, center, center)\n}\n\n.upcoming-trips {\n  background-color: $dark-teal;\n}\n\n.pending-trips {\n  background-color: $light-teal;\n}\n.past-trips {\n  background-color: $middle-teal;\n}\n\n.trip-image {\n  height: 20vh;\n  width: 15vw;\n}\n\n.new-trip-inputs {\n  @include flexBox(row, center);\n}\n\n.date-input,\n.duration-input,\n.number-travelers-input,\n.destination-drop-down {\n  border: none;\n  border-radius: $border-radius;\n  cursor: pointer;\n  font-size: 120%;\n  height: 5vh;\n  width: 20vw;\n  margin: $one-percent;\n  padding: $one-percent;\n}\n\n.destination-drop-down {\n  height: 8vh;\n}\n\n.submit-button-section {\n  @include flexBox(column, none, center)\n}\n\n.submit-button {\n  @include buttons;\n  background-color: $peach;\n  border-radius: $border-radius;\n  font-size: 120%;\n  font-weight: 500;\n  height: 5vh;\n  width: 20vw;\n  margin: 2%;\n}\n\n.label-input-boxes,\n.dashboard-image {\n  @include flexBox(none, center, center);\n  font-size: 150%;\n  width: 100vw;\n}\n\n.dashboard-image {\n  color: $dark-tan;\n  font-size: 300%;\n  font-weight: 700;\n  opacity: 30%;\n}\n\n.no-date-found {\n  color: $black;\n  font-size: $one-hundred-percent;\n  margin-top: 15%;\n  width: max-content;\n}\n\n.money-spent-this-year {\n  @include flexBox(none, center, center);\n}\n\n.total-spent {\n  font-size: $one-hundred-percent;\n  width: 15vw;\n}\n\n.price {\n  margin-right: 10%;\n  font-size: 300%;\n}\n\n.trip {\n  @include flexBox(none, space-between, center);\n  background-color: $primary-background;\n  border-radius: $border-radius;\n  margin: 4%;\n  min-height: 20vh;\n  width: 28vw;\n}\n\n.trip-details {\n  align-self: left;\n  color: black;\n  margin: 15%;\n}\n\n// login page styling below\n\n.login-page {\n  display: flex;\n  height: 100vh;\n  width: 100vw;\n}\n\n.login-photo-left-side {\n  @include backgroundImages(\"https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80\");\n  height: 100vh;\n  width: 40vw;\n}\n\n.logo-title {\n  @include flexBox(none, none, center);\n  font-family: 'Abril Fatface', cursive;\n}\n\n.application-title {\n  font-size: 250%;\n}\n\n.login-right-side {\n  @include flexBox(column, center, center);\n  width: 60vw;\n}\n\n\n.user-name-input,\n.password-input,\n.login-button {\n  border-radius: $border-radius;\n  font-size: 120%;\n  height: 5vh;\n  width: 25vw;\n  margin: 3%;\n  padding: $one-percent;\n}\n\n.login-button {\n  @include buttons;\n  background-color: $black;\n  color: $primary-background;\n  height: 9vh;\n  width: 27vw;\n}\n\n.user-name-input,\n.password-input, {\n  border: grey 1px solid;\n}\n\n.hidden {\n  display: none!important;\n}\n","$primary-background: white;\n$dark-grey: #2B2B2B;\n$dark-teal: #037F8C;\n$light-teal: #B0D9D9;\n$middle-teal: #03A6A6;\n$dark-tan: #8C402E;\n$peach: #F2A88D;\n$black: black;\n$light-tan: RGBA(140,64,46,0.22);\n$border-radius: 14px;\n$one-percent: 1%;\n$one-hundred-percent: 100%;\n","@mixin flexBox ($direction, $justify: none, $align: none){\n  display: flex;\n  flex-direction: $direction;\n  justify-content: $justify;\n  align-items: $align;\n}\n\n@mixin buttons {\n  cursor: pointer;\n  border: none;\n    &:hover {\n      transition: .5s ease-in-out;\n      transform: scale(1.1);\n    }\n}\n\n@mixin backgroundImages ($url) {\n  background-image: url($url);\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travel-icon.svg");

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dayjs = __webpack_require__(9)

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.trips = user.trips;
  }

  returnFirstName() {
    return this.name.split(' ')[0];
  }

  retrieveTotalSpentOnTripsThisYear(destinations) {
    return this.trips.reduce((total, trip) => {
      destinations.forEach((destination) => {
        if (trip.destinationID === destination.id && dayjs().isAfter(dayjs(trip.date)) &&
          dayjs(trip.date).isAfter(dayjs().subtract(1, 'year')) && trip.status === 'approved') {
          total += (((trip.duration * destination.estimatedLodgingCostPerDay) +
            destination.estimatedFlightCostPerPerson) * trip.travelers) * 1.1
        }
      })
      return Number(total.toFixed(2))
    }, 0)
  }

  retrieveCurrentTrips() {
    return this.trips.find((trip) => {
      const tripEndDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      return (dayjs().isBefore(dayjs(tripEndDate)) && dayjs().isAfter(dayjs(trip.date)) && trip.status === 'approved')
    })
  }

  retrievePastTrips() {
    return this.trips.filter((trip) => {
      const tripEndDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      return (dayjs().isAfter(dayjs(tripEndDate)) && trip.status === 'approved')
    })
  }

  retrieveFutureTrips() {
    return this.trips.filter((trip) => {
      return (dayjs().isBefore(dayjs(trip.date)) && trip.status === 'approved')
    })
  }

  retrievePendingTrips() {
    return this.trips.filter((trip) => {
      return trip.status === 'pending'
    })
  }
}

module.exports = User;


/***/ }),
/* 9 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 10 */
/***/ ((module) => {

class Trips {
  constructor(tripsData) {
    this.data = tripsData;
  }

  retrieveTripsForUser(id) {
    return this.data.filter((user) => {
      return user.userID === id;
    });
  }

  retrieveTripCost(destinations, trip) {
    return destinations.reduce((sum, destination) => {
      if (trip.destinationID === destination.id) {
        sum += (((trip.duration * destination.estimatedLodgingCostPerDay) +
          destination.estimatedFlightCostPerPerson) * trip.travelers) * 1.1
      }
      return sum;
    }, 0)
  }

}

module.exports = Trips;


/***/ }),
/* 11 */
/***/ ((module) => {

class Destinations {
  constructor(destinationData) {
    this.data = destinationData;
  }

  retrieveDestination(id) {
    return this.data.find((destination) => {
      return destination.id === id;
    });
  }

  retrieveDestinationNames() {
    const result = this.data.map((location) => {
      return location.destination
    }).sort((a, b) => {
      return a.localeCompare(b)
    })
    return result;
  }

  retrieveDestinationID(destinationName) {
    const result = this.data.find((destination) => {
      return destination.destination === destinationName
    })
    return result.id;
  }

}

module.exports = Destinations;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// user dashboard selectors
const totalSpentInPastYear = document.getElementById('totalSpentInPastYear');
const userGreeting = document.getElementById('userGreeting');
const estimatedCostDisplay = document.getElementById('estimatedCostOfTrip');
const pendingTripsContainer = document.getElementById('userPendingTrips');
const upcomingTripsContainer = document.getElementById('userUpcomingTrips');
const pastTripsContainer = document.getElementById('userPastTrips');
const currentTripContainer = document.getElementById('currentTrip');
const dateInput = document.getElementById('dateInput');
const durationInput = document.getElementById('durationInput');
const numberOfTravelersInput = document.getElementById('numberOfTravelersInput');
const destinationInput = document.getElementById('dropDownMenuDestinations');
// login page selectors
const loginFeedback = document.getElementById('loginFeedback');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');


const domUpdates = {

  updateTotalSpent(totalSpent) {
    totalSpentInPastYear.innerText = `$${totalSpent}`
  },

  displayUserGreeting(user) {
    userGreeting.innerText = `Hi, ${user.returnFirstName()}`
  },

  addDestinationsToDropDown(destinationNames) {
    destinationNames.forEach((destination) => {
      destinationInput.innerHTML += `<option value="${destination}">${destination}</option>`
    })
  },

  displayPendingTrips(user, destinations) {
    pendingTripsContainer.innerHTML = '';
    if (user.retrievePendingTrips().length === 0) {
      pendingTripsContainer.innerHTML += `<h2 class="no-date-found">No Pending Trips</h2>`
    }
    user.retrievePendingTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pendingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayUpcomingTrips(user, destinations) {
    upcomingTripsContainer.innerHTML = '';
    if (user.retrieveFutureTrips().length === 0) {
      upcomingTripsContainer.innerHTML += `<h2 class="no-date-found">No Upcoming Trips</h2>`
    }
    user.retrieveFutureTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          upcomingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayPastTrips(user, destinations) {
    pastTripsContainer.innerHTML = '';
    if (user.retrievePastTrips().length === 0) {
      pastTripsContainer.innerHTML += `<h2 class="no-date-found">No Past Trips</h2>`
    }
    user.retrievePastTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pastTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayCurrentTrip(user, destinations) {
    currentTripContainer.innerHTML = '';
    if (user.retrieveCurrentTrips()) {
      this.show(currentTripContainer);
      user.retrieveCurrentTrips().forEach((trip) => {
        destinations.forEach((destination) => {
          if (destination.id === trip.destinationID) {
            currentTripContainer.innerHTML += `
          <h1>I hope you are enjoying your current trip in ${destination.destination}</h1>
          <img class="trip-image" src="${destination.image}" alt="${destination.alt}"/>`
          }
        })
      })
    }
  },

  show(element) {
    element.classList.remove('hidden')
  },

  hide(element) {
    element.classList.add('hidden')
  },

  resetTripRequestInputs() {
    dateInput.value = '';
    durationInput.value = '';
    numberOfTravelersInput.value = '';
    destinationInput.value = '';
  },

  resolveTripRequestCompletedInputs(tripEstimate) {
    if (dateInput.value && durationInput.value && numberOfTravelersInput.value && destinationInput.value) {
      estimatedCostDisplay.innerText = `This trip is estimated to cost $${tripEstimate} (10% agent fee included)`;
      this.resetTripRequestInputs();
    }
  },

  tripRequestFeedback() {
    estimatedCostDisplay.innerText = 'Please fill out all fields to book your next adventure!'
    this.resetTripRequestInputs();
  },

  loginFeedback() {
    loginFeedback.innerText = `Username or password are incorrect`;
    userNameInput.value = '';
    passwordInput.value = '';
  },

  handleErrors(err) {
    estimatedCostDisplay.innerText = `Something went wrong, please try again. (${err})`
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _images_travel_icon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_User__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Trips__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Destinations__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);







const dayjs = __webpack_require__(9);

let user;
let trips;
let destinations;

const awayWeGoBtn = document.getElementById('submitButton');
const dateInput = document.getElementById('dateInput');
const durationInput = document.getElementById('durationInput');
const numberOfTravelersInput = document.getElementById('numberOfTravelersInput');
const destinationInput = document.getElementById('dropDownMenuDestinations');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const loginPage = document.getElementById('loginPage');
const mainDashboard = document.getElementById('mainDashboard');
const loginButton = document.getElementById('loginButton');

const retrieveData = (id) => {
  const allPromise = Promise.all([(0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)('trips'), (0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)('destinations'), (0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)(`travelers/${id}`)])
    .then(data => {createInitialDashboard(data)})
}

const createInitialDashboard = (data) => {
  trips = new (_Trips__WEBPACK_IMPORTED_MODULE_4___default())(data[0].trips);
  destinations = new (_Destinations__WEBPACK_IMPORTED_MODULE_5___default())(data[1].destinations);
  user = new (_User__WEBPACK_IMPORTED_MODULE_3___default())(data[2]);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.addDestinationsToDropDown(destinations.retrieveDestinationNames());
  addIndividualUserInfo();
}

const addIndividualUserInfo = () => {
  user.trips = trips.retrieveTripsForUser(user.id)
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.updateTotalSpent(user.retrieveTotalSpentOnTripsThisYear(destinations.data))
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayUserGreeting(user);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayPendingTrips(user, destinations.data);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayUpcomingTrips(user, destinations.data);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayPastTrips(user, destinations.data);
  _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.displayCurrentTrip(user, destinations.data);
}

const submitNewTripRequest = (event) => {
  event.preventDefault()
  if (dateInput.value && durationInput.value && numberOfTravelersInput.value && destinationInput.value) {
    const tripRequest = {
      id: Number(trips.data.length + 1),
      userID: Number(user.id),
      destinationID: Number(destinations.retrieveDestinationID(destinationInput.value)),
      travelers: Number(numberOfTravelersInput.value),
      date: dayjs(dateInput.value).format('YYYY/MM/DD'),
      duration: Number(durationInput.value),
      status: 'pending',
      suggestedActivities: [],
    }
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.resolveTripRequestCompletedInputs(trips.retrieveTripCost(destinations.data, tripRequest).toFixed(2));
    (0,_api__WEBPACK_IMPORTED_MODULE_0__.addData)(tripRequest, 'trips')
      .then(data => updatePendingTrips(data), 'data')
      .catch(err => _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.handleErrors(err))
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.tripRequestFeedback();
  }
}

const updatePendingTrips = (data) => {
  retrieveData(user.id)
}

const uponLogIn = () => {
  const findUserNameId = userNameInput.value.split('traveler');
  const id = Number(findUserNameId[1]);
  if (id >= 1 && id <= 50 && userNameInput.value === `traveler${id}` && passwordInput.value === 'travel') {
    mainDashboard.classList.remove('hidden');
    loginPage.classList.add('hidden');
    return retrieveData(id);
  } else {
    _domUpdates__WEBPACK_IMPORTED_MODULE_6__.default.loginFeedback();
  }
}

awayWeGoBtn.addEventListener('click', submitNewTripRequest);
loginButton.addEventListener('click', uponLogIn);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map