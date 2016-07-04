'use strict';
/*!
 * logUtils.js v1.0.0
 * 日志工具类
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */
import dateFormat from './dateFormat';
import prop from './propUtils';

let logLevel = 0; // 日志级别，0:'log',1:'debug',2:'info',3:'error',4:'warn'
let logonoff = 0; // 默认是开启日志的
/**
 * 日志工具类封装
 * @param {Object} sMethod
 * @param {Object} aArgs
 * @private
 */
function doLog(sMethod, aArgs) {
    if (logonoff === 1) {
        return;
    }
    //  if(navigator.userAgent.toLowerCase().indexOf('msie') > -1){
    //      Function.apply.apply(console[sMethod], [console, aArgs]);
    //  }else{
    //      console[sMethod].apply(console,aArgs);
    //  }
    // 往控制台输出日志，上面代码在手机端执行有点问题，直接console处理了
    console.log(aArgs);
}
/**
 * 日志工具类
 * @param {String} sModule
 */
const Logger = function(sModule) {
    // 读取配置文件，配置日志情况
    logonoff = prop.getLogProp('logonoff');
    logLevel = prop.getLogProp('loglevel');
    let _name = sModule;
    var methods = ['log', 'debug', 'info', 'error', 'warn'];
    for (var i = 0, len = methods.length; i < len; i++) {
        (function(method) {
            Logger.prototype[method] = function() {
                var sDate = '[' + dateFormat.dateFormat(new Date()) + ']';
                var aArgs = Array.prototype.slice.call(arguments, 0);
                aArgs.unshift(sDate);
                aArgs.push('(' + method + ' ' + _name + ')');
                doLog(method, aArgs);
            };
        })(methods[i]);
    }
};

/**
 * 日志工具类log
 * @param {String} log 需要输出的内容
 * @param {String} moduleName 模块名称，这里因为没有办法自动获取，所以就请手动添加，一般就写文件名称和行数
 * @public
 */
const log = (log, moduleName) => {
    if (logLevel >= 0) {
        (new Logger(moduleName)).log(log);
    }
};
/**
 * 日志工具类debug
 * @param {String} log 需要输出的内容
 * @param {String} moduleName 模块名称，这里因为没有办法自动获取，所以就请手动添加，一般就写文件名称和行数
 * @public
 */
const debug = (log, moduleName) => {
    if (logLevel >= 1) {
        (new Logger(moduleName)).debug(log);
    }
};
/**
 * 日志工具类info
 * @param {String} log 需要输出的内容
 * @param {String} moduleName 模块名称，这里因为没有办法自动获取，所以就请手动添加，一般就写文件名称和行数
 * @public
 */
const info = (log, moduleName) => {
    if (logLevel >= 2) {
        (new Logger(moduleName)).info(log);
    }
};
/**
 * 日志工具类error
 * @param {String} log 需要输出的内容
 * @param {String} moduleName 模块名称，这里因为没有办法自动获取，所以就请手动添加，一般就写文件名称和行数
 * @public
 */
const error = (log, moduleName) => {
    if (logLevel >= 3) {
        (new Logger(moduleName)).error(log);
    }
};
/**
 * 日志工具类warn
 * @param {String} log 需要输出的内容
 * @param {String} moduleName 模块名称，这里因为没有办法自动获取，所以就请手动添加，一般就写文件名称和行数
 * @public
 */
const warn = (log, moduleName) => {
    if (logLevel >= 4) {
        (new Logger(moduleName)).warn(log);
    }
};

export default {
    log,
    debug,
    info,
    error,
    warn
};
