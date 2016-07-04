'use strict';
/*!
 * muiUitls.js v1.0.0
 * 基于mui进行封装的工具类<br>
 *
 * Author: liaoxm
 * Date: 2016-06-16
 * 使用方法：
 *        import muiUitls from 'muiUitls.js'
 *        muiUitls.openWindow(url,id,opts)
 */
import merge from 'webpack-merge';
import logger from './logUtils';
import propUtils from './propUtils';
import utils from './utils';
import cacheUtils from './cacheUtils';
import pageUrl from 'api';
import CONSTS from './consts';

/**
 * 打开新窗口
 * @param {string} url 要打开的页面地址
 * @param {string} id 指定页面ID
 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{},isValidLogin,isClose}
 * 通过isValidLogin来确定是否做登录验证，true|false
 * 通过isClose来确定是否需要关闭当前webview，默认不关闭
 * 默认是从右边划出，动画时间是500ms
 * @public
 */
const openWindow = (url, id, options) => {
    id = id || url;
    options = options || {};

    if (typeof id === 'object') {
        options = id;
        id = url;
    }
    // 处理默认值
    options = merge({
        show: {
            autoShow: true,
            aniShow: 'slide-in-right',
            duration: 500
        },
        waiting: {
            autoShow: false // 自动显示等待框，默认为true
        }
    }, options || {});
    // 是否需要验证登录
    options.isValidLogin = options.isValidLogin || false;
    options.isClose = options.isClose || false;
    if (options.isValidLogin) {
        if (loginValid() === false) {
            return false;
        }
    }
    // 延迟一秒关闭当前webview
    if (options.isClose) {
        setTimeout(function() {
            plus.webview.currentWebview().close();
        }, 1000);
    }
    var webview = mui.openWindow(url, id, options);
    // 缓存调整页面数据（涵盖参数：url和id，动画可以使用默认的），剔除黑名单页面
    var blacklist = propUtils.getProperty('open.url.blacklist', 'urlprops');
    //  console.log('blacklist:' + blacklist);
    blacklist.forEach(v => {
        if (url.indexOf(v) === -1) {
            cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).setObject(CONSTS.LOGIN_FORWORD, {
                url: webview.getURL(),
                id: id
            });
        }
    });
//  logger.log('login forword:' + cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.LOGIN_FORWORD).url, 'muiUtils.js  openWindow()');
};

/**
 * 登录跳转打开上一次打开的窗口，需要刷新webview
 * 默认是从右边划出，动画时间是500ms
 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{}}
 * @public
 */
const openPreWindow = (options) => {
    // 缓存读取id。通过id来开页面，如果没有就跳首页
    var o = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).getObject(CONSTS.LOGIN_FORWORD);
    var id = o === 'undefined' ? pageUrl.PAGE_URL.buyer_index.id : o.id;
    var url = o === 'undefined' ? pageUrl.PAGE_URL.buyer_index.url : o.url;
    // 计算正确的路径，路径分三种情况，同级目录./index.html,跨一级目录，../supplier/itemdetail.html,跨两级目录../../seller/index/sellerindex.html目前就这样的三种情况
    options = options || {};
    // 处理默认值
    options = merge({
        show: {
            autoShow: true,
            aniShow: 'slide-in-right',
            duration: 500
        }
    }, options || {});
    //  options.createNew = true;//重复新开一个webview，解决刷新数据刷新问题
    var webview = mui.openWindow(url, id, options);
    webview.reload();
};

/**
 * 打开首页
 * @param {string} type 打开的首页类型
 * buyer(买家首页) seller(卖家首页)
 * @public
 */
const openIndexWindow = (type, options) => {
    var id = pageUrl.PAGE_URL.buyer_index.id;
    var url = pageUrl.PAGE_URL.buyer_index.url;
    if (type === 'seller') {
        id = pageUrl.PAGE_URL.seller_index.id;
        url = pageUrl.PAGE_URL.seller_index.url;
    }
    // 延迟一秒关闭当前webview
    setTimeout(function() {
        plus.webview.currentWebview().close();
    }, 1000);
    openWindow(url, id);
};

/**
 * 手机网络状态
 * CONNECTION_UNKNOW: 网络连接状态未知  0
 * CONNECTION_NONE: 未连接网络 1
 * CONNECTION_ETHERNET: 有线网络 2
 * CONNECTION_WIFI: 无线WIFI网络 3
 * CONNECTION_CELL2G: 蜂窝移动2G网络 4
 * CONNECTION_CELL3G: 蜂窝移动3G网络 5
 * CONNECTION_CELL4G: 蜂窝移动4G网络 6
 * @return { Number} 连接状态数值
 * @public
 */
const getNetworkType = () => {
    var types = {};
    types[plus.networkinfo.CONNECTION_UNKNOW] = 'Unknown connection';
    types[plus.networkinfo.CONNECTION_NONE] = 'None connection';
    types[plus.networkinfo.CONNECTION_ETHERNET] = 'Ethernet connection';
    types[plus.networkinfo.CONNECTION_WIFI] = 'WiFi connection';
    types[plus.networkinfo.CONNECTION_CELL2G] = 'Cellular 2G connection';
    types[plus.networkinfo.CONNECTION_CELL3G] = 'Cellular 3G connection';
    types[plus.networkinfo.CONNECTION_CELL4G] = 'Cellular 4G connection';

    //  logger.log("Network Type: " + types[plus.networkinfo.getCurrentType()],'getNetworkType muiUitls.js 93');
    return plus.networkinfo.getCurrentType();
};

/**
 * ajax方法的封装
 * @param {object} options 配置的参数
 * @public
 */
const forwordError = (options) => {
    options = options || {};
    var url = pageUrl.PAGE_URL.error_connect.url;
    var id = pageUrl.PAGE_URL.error_connect.id;
    openWindow(url, id);
};

/**
 * ajax方法的封装
 * @param {string} url 要打开的页面地址
 * @param {string} options 配置的参数，具体的参数配置同mui的ajax参数
 * @public
 */
const muiAjax = (url, options) => {
    console.log(url);
    //  mui.ajaxSettings.beforeSend = ajaxBeforeSend;
    mui.ajaxSettings.inspect = ajaxInspect;
    mui.ajaxSettings.success = ajaxSuccess;
    mui.ajaxSettings.error = ajaxError;
    mui.ajaxSettings.complete = ajaxComplete;
    if (ajaxBeforeSend(options) === false) {
        logger.log('ajaxBeforeSend has return false', 'muiAjax ajaxBeforeSend');
        return false;
    }
    // 调用mui的ajax
    mui.ajax(url, options);
};

/**
 * 登录验证
 * @return {void} 无
 * @private
 */
const loginValid = () => {
    var accessToken = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.LOGIN_ACCESS_TOKEN);
    // 测试时直接写死一个值，保证ajax请求直接过去
    accessToken = 'test';
    if (accessToken === 'undefined' || accessToken == null || accessToken === '' || accessToken === 'null') {
        // 未登录，打开登录页面
        var ops = {
            show: {
                autoShow: true,
                aniShow: 'slide-in-right',
                duration: 100
            }
        };
        openWindow(pageUrl.PAGE_URL.login_index.url, pageUrl.PAGE_URL.login_index.id, ops);
        return false;
    }
    var instanceId = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.APP_INSTANCE_ID);
    if (instanceId === 'undefined' || instanceId == null || instanceId === '') {
        instanceId = instanceId || utils.uuidV4();
        cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).set(CONSTS.APP_INSTANCE_ID, instanceId);
    }
};

/**
 * 开始,return false 就会终止ajax请求
 * 1.判断网络状态
 * 2.set头部信息
 * @param {XMLHttpRequest} xhr XMLHttpRequest对象
 * @param {Object} setting 参数
 * @private
 */
const ajaxBeforeSend = (options) => {
    //  logger.log('ajaxBeforeSend', 'muiUtils.js');
    if (getNetworkType === 2) {
        forwordError();
        return false;
    }
    if (loginValid() === false) {
        return false;
    }
    // 设置头部认证信息
    options.headers = options.headers || {};
    options.headers.instance_id = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.APP_INSTANCE_ID);
    options.headers.access_token = cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.LOGIN_ACCESS_TOKEN);
    options.headers.reqStartTime = new Date().getTime(); // 请求开始时间
};

/**
 * 拦截器，拦截ajax回调，处理权限等
 * @param {Object} data api给的结果
 * @param {String} xhr  XMLHttpRequest对象
 * @param {XMLHttpRequest} setting  传入的参数对象
 * @private
 */
const ajaxInspect = (data, xhr, setting) => {
    var reqTime = new Date().getTime() - setting.headers.reqStartTime;
//  logger.log('ajaxInspect reqStartTime:' + setting.headers.reqStartTime + 'reqEndTime:' + new Date().getTime(), 'ajaxInspect()');
    logger.log('ajaxInspect reqTime:' + reqTime, 'ajaxInspect()');
    if (data === 'error') { // 异常处理

    } else { // 正常处理
        var instanceId = xhr.getResponseHeader(CONSTS.APP_INSTANCE_ID);
        if (instanceId === cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.APP_INSTANCE_ID)) {
            logger.log("it's my require!!!!", 'valid instanceId is ok');
        } else {
            logger.log('it is not  my require!!!!,the token is no safe,please login again and change password,' + instanceId, 'valid instanceId is nok');
        // 测试阶段，直接忽略，上线了可以开启
        //          return false;
        }
        // 更新token
        var token = xhr.getResponseHeader(CONSTS.LOGIN_ACCESS_TOKEN) || cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).get(CONSTS.LOGIN_ACCESS_TOKEN);
        //      logger.log(token, 'CONSTS.LOGIN_ACCESS_TOKEN ajaxInspect');
        cacheUtils.localStorage(CONSTS.PREFIX_LOGIN).set(CONSTS.LOGIN_ACCESS_TOKEN, token);
    }
    // 返回true就是放过，false就拦截后面的请求，目前拦截了error和sucess
    return true;
};

/**
 * 成功
 * @param {Object} data api给的结果
 * @param {String} xhr  XMLHttpRequest对象
 * @param {XMLHttpRequest} setting  传入的参数对象
 * @private
 */
const ajaxSuccess = (data, xhr, setting) => {
    logger.log('ajaxSuccess' + data, 'muiUtils.js');
};

/**
 * 出错
 * @private
 */
const ajaxError = (error, type, xhr, setting) => {
    logger.log('ajaxError' + error + type, 'muiUtils.js');
};

/**
 * 结束
 * @private
 */
const ajaxComplete = (status, xhr, setting) => {
    var reqTime = new Date().getTime() - setting.headers.reqStartTime;
//  logger.log('ajaxComplete reqStartTime:' + setting.headers.reqStartTime + 'reqEndTime:' + new Date().getTime(), 'ajaxComplete()');
    logger.log('ajaxComplete reqTime:' + reqTime, 'ajaxComplete()');
//  logger.log('ajaxComplete', 'ajaxComplete()');
};

export default {
    openWindow,
    openPreWindow,
    openIndexWindow,
    getNetworkType,
    forwordError,
    muiAjax
};
