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

/**
 * 打开新窗口
 * @param {string} url 要打开的页面地址
 * @param {string} id 指定页面ID
 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{}}
 * 默认是从右边划出，动画时间是500ms
 * @public
 */
const openWindow = (url, id, options) => {
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
        }
    }, options || {});
    mui.openWindow(url, id, options);
};

/**
 * ajax方法的封装
 * @param {string} url 要打开的页面地址
 * @param {string} options 配置的参数，具体的参数配置同mui的ajax参数
 * @public
 */
const muiAjax = (url, options) => {
    mui.ajaxSettings.beforeSend = ajaxBeforeSend;
    mui.ajaxSettings.success = ajaxSuccess;
    mui.ajaxSettings.success = ajaxSuccess;
    mui.ajaxSettings.error = ajaxError;
    mui.ajaxSettings.complete = ajaxComplete;
    // 调用mui的ajax
    mui.ajax(url, options);
};

/**
 * 开始,return false 就会终止ajax请求
 * 1.验证是否登录
 * @private
 */
const ajaxBeforeSend = (xhr, setting) => {
    logger.log('ajaxBeforeSend', 'muiUtils.js');
};

/**
 * 成功
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
    logger.log('ajaxComplete' + setting, 'muiUtils.js');
};

export default {
    openWindow,
    muiAjax
};
