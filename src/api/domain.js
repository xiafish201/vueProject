'use strict';
/*!
 * domain.js v1.0.0
 * 域名配置类,分成测试和上线两种情况
 * 可以在properties.js里面进行配置，这里进行读取
 * 这些url最后不要带/，不然跟api拼接时会多
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */

import prop from 'common/propUtils';

export const API_ROOT = (process.env.NODE_ENV === 'production')
//  ? 'http://192.168.10.61:8081/Site-api/rest'
    ? 'http://192.168.2.98:8000'
    : 'http://192.168.2.98:8000';

export const COOKIEDOMAIN = (process.env.NODE_ENV === 'production')
    ? '.jxdd.com'
    : '';
export const STATIC_DOMAIN = (process.env.NODE_ENV === 'production')
    ? prop.getProperty('site.static.url')
    : 'http://localhost:8080/suppliers';

    // 其他的api头部继续添加
