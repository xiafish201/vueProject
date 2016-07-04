'use strict';
/*!
 * utils v1.0.0
 * 工具类,提供各种工具方法，会陆续添加
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */
import nodeUuid from 'node-uuid';
import crypto from 'crypto';
/**
 * 选择器
 * @param {String} sel   是一个字符串，包含一个或是多个 CSS 选择器 ，多个则以逗号分隔
 * @return {DomObject} 一个 element 对象（DOM 元素）
 * @public
 */
const query = sel => {
    return document.querySelector(sel);
};

/**
 * 选择器
 * @param {String} sel 一个由逗号连接的包含一个或多个CSS选择器的字符串
 * @return {NodeList} 一个non-live的 NodeList 类型的对象
 * @public
 */
const queryAll = sel => {
    return document.querySelectorAll(sel);
};

/**
 * 产生一个 v1 (基于时间的) id
 * @return {String} uuid 36位带四个中划线
 * @public
 */
const uuid = () => {
    return nodeUuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
};

/**
 * 产生一个 v4 (基于时间的) id
 * @return {String} uuid 36位带四个中划线
 * @public
 */
const uuidV4 = () => {
    return nodeUuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1’
};

/**
 * hash方法
 *
 * @param {String} e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} 编码值
 * @private
 */
const hash = (method, s, format) => {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s));
    }
    sum.update(s, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format || 'hex');
};

/**
 * md5 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
const md5 = (s, format) => {
    return hash('md5', s, format);
};

/**
 * sha1 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
const sha1 = (s, format) => {
    return hash('sha1', s, format);
};

/**
 * sha256 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format]  'hex'，'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
const sha256 = (s, format) => {
    return hash('sha256', s, format);
};

/**
 * Base64编码.
 *
 * @param {String|Buffer} s 需要编码的字符串
 * @param {Boolean} [urlsafe=false] E是否是url类型，暂时屏蔽.
 * @return {String} base64编码.
 * @public
 */
const base64encode = (s /*, urlsafe*/) => {
    if (!Buffer.isBuffer(s)) {
        s = new Buffer(s);
    }
    var encode = s.toString('base64');
    var urlsafe = false;
    if (urlsafe) {
        encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
    }
    return encode;
};

/**
 * Base64字符串解码.
 *
 * @param {String} encode, 需要解码的字符串.
 * @param {Boolean} [urlsafe=false] 是否是url类型，暂时屏蔽.
 * @param {encoding} [encoding=utf8] 字符编码，默认utf8,可选参数
 * @return {String|Buffer}
 * @public
 */
const base64decode = (encodeStr /*, urlsafe*/, encoding) => {
    var urlsafe = false;
    if (urlsafe) {
        encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
    }
    var buf = new Buffer(encodeStr, 'base64');
    if (encoding === 'buffer') {
        return buf;
    }
    return buf.toString(encoding || 'utf8');
};

/**
 * 对象排序
 * @param {Object} o, 需要排序的对象.
 * @return {Object} 安装key进行排序的对象
 * @public
 */
const sortObject = o => {
    if (!o || Array.isArray(o) || typeof o !== 'object') {
        return o;
    }
    var keys = Object.keys(o);
    keys.sort();
    var values = [];
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        values.push([k, sortObject(o[k])]);
    }
    return values;
};

/**
 * @desc 对象克隆
 * @Author yupeng
 * @param {Object} obj  需要克隆的对象.
 * @return {Object} 克隆出来的对象
 * @public
 */
const clone = obj => {
    var o;
    switch (typeof obj) {
    case 'undefined':
        break;
    case 'string':
        o = obj + '';
        break;
    case 'number':
        o = obj - 0;
        break;
    case 'boolean':
        o = obj;
        break;
    case 'object':
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var k in obj) {
                    o[k] = clone(obj[k]);
                }
            }
        }
        break;
    default:
        o = obj;
        break;
    }
    return o;
};

/**
 * 分开导出，用哪个取哪个，引用时需要大括号 ，eg:import {md5,uuid} from 'common/utils',md5('333')
 */
export { query, queryAll, uuid, uuidV4, sortObject, base64decode, base64encode, sha256, sha1, md5, clone };

/**
 * 打包导出，会全部引入 ，eg:import utils from 'common/utils'，utils.md5('3333')
 */
export default {
    query,
    queryAll,
    uuid,
    uuidV4,
    sortObject,
    base64decode,
    base64encode,
    sha256,
    sha1,
    md5,
    clone
};
