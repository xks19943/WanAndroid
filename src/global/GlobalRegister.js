

/*var {$http, $vx, Sha256, OtherUtils, Md5, $log, $ui, $listeners, LSN, $cookie, $store, $filter} = require('../services');
var { $config } = require('../settings');*/
var {COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio} = require('../constants/index');

//var GLOBAL = typeof window === 'undefined' ? global : window;
var GLOBAL = global;

//GLOBAL._ = _;

/*// register global methods 注册最常用的全局通用方法
GLOBAL.$http = $http;
GLOBAL.$log = $log;
GLOBAL.$cookie = $cookie;
GLOBAL.$store = $store;
GLOBAL.$filter = $filter;

// broadcast center 注册全局时间中心
GLOBAL.$listeners = $listeners;
GLOBAL.LSN = LSN;

// ui 注册ui组件
GLOBAL.$ui = $ui;
// GLOBAL.alert = $ui.alert;

// setting 注册配置文件
GLOBAL.$config = $config;*/

// CONSTANT 注册全局常量
GLOBAL.COLOR = COLOR;
GLOBAL.STYLE = STYLE;
GLOBAL.FONTSIZE = FONTSIZE;
GLOBAL.URL = URL;

GLOBAL.ScreenWidth = ScreenWidth;
GLOBAL.ScreenHeight = ScreenHeight;
GLOBAL.GlobalPixelRatio = GlobalPixelRatio;
GLOBAL.getSmallDP = (dp) => {
    if (dp * GlobalPixelRatio < 1) {
        return 1.0 / GlobalPixelRatio;
    } else {
        return dp;
    }
}

module.exports = {};
