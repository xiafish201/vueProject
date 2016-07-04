'use strict';
/*!
 * consts.js v1.0.0
 * 常量列表js，主要是用来存一些常量，避免大家都各自在各个地方定义常量，便于统一管理<br>
 * 缓存的前缀和key需要注意，不能重复，所以，缓存的前缀，大家尽量按照模块名称来取，保证前缀不重复，例如登录的相关信息，前缀都用login
 * key也都在这里统一定义，这样就可以很明确的知道那些名字已经被占用了，已经存在了。
 * Author: liaoxm
 * Date: 2016-06-21
 * 使用方法：
 *        import CONSTS from 'common/consts.js'
 *        CONSTS.PREFIX_LOGIN
 */
/** **************缓存相关start*************************/
// loing前缀
const PREFIX_LOGIN = 'login';
// forword登录成功后跳转页面
const LOGIN_FORWORD = 'forword';
// app实例id标识
const APP_INSTANCE_ID = 'instance_id';
// security_id
const SECURITY_ID = 'security_id';
// 账户的token标识
const LOGIN_ACCESS_TOKEN = 'access_token';
// 求购大厅前缀
const PREFIX_BUYINGHALL = 'buyinghall';
// 搜索历史key
const SEARCH_HISTORY_KEY = 'searchhistory';
// 买家版供应大厅
const BUYER_SUPPLIER = 'buyer_supplier';
// 操作类型-登录
const OPERATION_TYPE_LOGIN = 'login';
// 操作类型-注册
const OPERATION_TYPE_REGISTER = 'register';
// 操作类型-重置密码
const OPERATION_TYPE_RESET_PWD = 'reset_pwd';
// 操作类型-绑定
const OPERATION_TYPE_BINDING = 'binding';
//卖家版采购大厅
const SELLER_PURCHASE = 'seller_purchase';
//卖家版采购大厅前缀
const PREFIX_PURCHASE = 'purchase';

/** **************缓存相关end*************************/
export default {
    PREFIX_LOGIN,
    LOGIN_FORWORD,
    APP_INSTANCE_ID,
    LOGIN_ACCESS_TOKEN,
    PREFIX_BUYINGHALL,
    SEARCH_HISTORY_KEY,
    BUYER_SUPPLIER,
    OPERATION_TYPE_LOGIN,
    OPERATION_TYPE_REGISTER,
    OPERATION_TYPE_RESET_PWD,
    OPERATION_TYPE_BINDING,
    SECURITY_ID,
    SELLER_PURCHASE,
    PREFIX_PURCHASE
};
export {
    PREFIX_LOGIN,
    LOGIN_FORWORD,
    APP_INSTANCE_ID,
    LOGIN_ACCESS_TOKEN,
    PREFIX_BUYINGHALL,
    SEARCH_HISTORY_KEY,
    OPERATION_TYPE_LOGIN,
    OPERATION_TYPE_REGISTER,
    OPERATION_TYPE_RESET_PWD,
    OPERATION_TYPE_BINDING,
    SECURITY_ID,
    SELLER_PURCHASE,
    PREFIX_PURCHASE
};
