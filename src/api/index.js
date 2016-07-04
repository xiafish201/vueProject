'use strict';
/*!
 * api.js v1.0.0
 * api配置类
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */
import { API_ROOT, STATIC_DOMAIN, SSO_DOMAIN } from './domain';

/**
 * api的版本，鉴于api的版本可能会出现不统一的情况，所以还是在url里面进行拼接
 */
/* eslint-disable no-unused-vars */
const API_VERSION = 'v10';
/**
 * 登录相关api集合
 */
const API_LOGIN = {
    /* 1.  /account/mobile/sms_code/send
     描述：发送手机验证码。

     输入参数：
     输入参数    位置  为空  描述
     instance_id HEAD    N
     access_token    HEAD    Y
     mobile_number   BODY    N
     security_id BODY    Y
     operation_type  BODY    Y   操作类型。如果security_id = null，不能为空；如果security_id不为空，此参数忽略。
     可选值：login, register, reset_pwd, binding
     返回结果：
     返回参数    位置  为空  描述
     access_token    HEAD    Y   如果renew，则此项有值。
     error_code  BODY    N   错误代码
     error_message   BODY    N   错误描述
     security_id BODY    Y

     错误：
     错误代码    描述
     1000    验证码发送成功
     1001    参数错误
     1002    参数缺失
     1003    Access token不存在
     1004    Security_id不存在
     1011    instance_id和security_id不匹配。
     */
    sms_code_send: SSO_DOMAIN + '/account/'+API_VERSION+'/mobile/sms_code/send',
    /* 2.  /account/mobile/sms_code/check
     描述：手机号登录/注册时验证短信验证码。

     输入参数：
     输入参数    位置  为空  描述
     instance_id HEAD    N
     access_token    HEAD    Y
     security_id BODY    N
     sms_code    BODY    N   用户输入的短信验证码，不区分大小写

     返回结果：
     返回参数    位置  为空  描述
     access_token    HEAD    Y   如果renew，则此项有值。
     error_code  BODY    N   错误代码
     error_message   BODY    N   错误描述
     security_id BODY    N

     错误：
     错误代码    描述
     1000    验证成功。
     1002    参数缺失：需要具体的参数。
     1003    Access token不存在
     1004    Security_id不存在
     1017    验证码不正确
     1011    instance_id和security_id不匹配。*/
    sms_code_check: SSO_DOMAIN + '/account/'+API_VERSION+'/mobile/sms_code/check',
    /* 3.  /account/mobile/is_used
     描述：检查手机号是否已经绑定。

     输入参数：
     输入参数    位置  为空  描述
     instance_id HEAD    N
     mobile_number   BODY    N

     返回结果：
     返回参数    位置  为空  描述
     error_code  BODY    N   错误代码
     error_message   BODY    N   错误描述
     is_used BODY    N   0：未被绑定；1：已被绑定

     错误：
     错误代码    描述
     1000    调用成功
     1001    参数错误
     1002    参数缺失*/
    mobile_is_used: SSO_DOMAIN + '/account/'+API_VERSION+'/mobile/is_used',

    /**
     * 4.描述：登陆最后一步。
     * 输入参数：
     * @param instance_id
     * @param security_id
     *
     * @reture access_token
     * @reture result_code
     * @reture user_info
     */
    login: SSO_DOMAIN + '/account/'+API_VERSION+'/login/login',
    /**
     * 账号密码登录判断用户名是否存在
     *          输入参数                位置          为空
     * @param instance_id   HEAD    N
     * @param account_name  BODY    N
     *          返回参数                位置          为空
     * @param result_code   BODY    N
     * 错误代码描述
     *  200000   帐户名不存在
     200003  帐户名已存在
     500002  参数缺失：需要具体的参数。
     500001  参数错误：帐号名称错误。

     */
    user_is_exist: SSO_DOMAIN + '/account/'+API_VERSION+'/account_name/is_used',
    /**
     * 用户名登录检查
     * 输入参数 位置  为空  描述
     *  instance_id  HEAD    N
     security_id BODY    Y
     account_name    BODY    N
     timestamp   BODY    N
     user_ticket body    N   user_ticket=MD5(lower(MD5(lower(account_name)+password))+lower(timestamp)+lower(instance_id))
     服务器会比较客户端传过来的timestamp和服务器的timestamp，如果客户端和服务器端时间偏差很大（大于10分钟），服务端将返回服务器时间，客户端需要使用服务器时间重新计算user_ticket后再次发送
     返回结果：
     返回参数    位置  为空  描述
     result_code BODY    N   结果代码
     security_id BODY    Y
     server_timestamp    BODY    Y
     错误：
     错误代码    描述
     200000  检查成功
     500004  security_id不存在
     500010  时间偏差过大
     500002  参数缺失：需要具体的参数。
     500001  参数错误：帐号名称错误。
     500011  instance_id和security_id不匹配。

     */
    check_user_psd: SSO_DOMAIN + '/account/'+API_VERSION+'/account_name/check'
};

// 买家首页API
const BUYER_HOME_API = {
    activity_list: 'http://192.168.2.61:8888/zqb/api/facade/home/activity'
};

// 合同API
const CONTRACT_API = {
    contract_info_list: 'http://192.168.2.61:8888/zqb/api/facade/testlist/contractlist'
};

const BUYER_CONTRACT_API = {
    submit_contract: API_ROOT + '/market/purchasing/submitcontract/v10'
};

const BUYHALL_API = {
    buying_info_list: API_ROOT + '/market/purchasing/hall/v10',
    release_buying: API_ROOT + '/market/purchasing/publish/v10',
    buying_info_detail: API_ROOT + '/market/purchasing/item/details/v10'
};

const SELLHALL_API = {
    supplier_info_list: API_ROOT + '/market/supplying/list/v10'
};

const ADDRESS_API = {
    address_list: API_ROOT + '/market/purchasing/address/v10',
    address_edit: API_ROOT + '/market/purchasing/address/edit/v10'
};

const PUBLIC_API = {
    category_g1: API_ROOT + '/common/category/g1/v10',
    category_g23: API_ROOT + '/common/category/g23/v10'
};
/* eslint-disable no-unused-vars */
const STATIC_API = {
    get_icons: STATIC_DOMAIN + '/get_icons'
};

const ORDER_API = {
    order_list: 'http://192.168.2.84:8000/order/order_list'
};

// 商品相关api
const GOODS_API = {
    goods_list: API_ROOT + '/goods/goods_list'
};
// 其他模块的api继续添加
// 我的测试
// const TEL_API = {
//     tel_num: API_ROOT + '/account/mobile/is_used'
// }

// const SEND_CODE = {
//     send_code: API_ROOT + '/account/mobile/sms_code/send'
// }

// const SEND_CODE_CHECK = {
//     sms_code_send: API_ROOT + '/account/mobile/sms_code/check'
// }
// 页面跳转URL
const PAGE_URL = {
    // 买家首页
    buyer_index: {
        id: 'HBuilder',
        url: '../../buyer/index/index.html'
    },
    // 卖家首页
    seller_index: {
        id: 'SellerIndex',
        url: '../../seller/index/sellerindex.html'
    },
    // 登录入口页(用户名登录)
    login_index: {
        id: 'loginIndex',
        url: '../../commonpage/login/index.html'
    },
    // 登录入口页(手机号登录)
    phone_login_index: {
        id: 'phoneLoginIndex',
        url: '../../commonpage/login/phoneLogin.html'
    },
    // 无网络连接页面
    error_connect: {
        id: 'loginIndex',
        url: '../../commonpage/error/error_connect.html'
    },
    // 忘记密码页面
    forgot_password: {
        id: 'forgotPassword',
        url: '../../commonpage/login/forgotPassword.html'
    },
    // 服务协议界面
    protocol: {
        id: 'protocol',
        url: '../../commonpage/login/protocol.html'
    },
    // 设置用户名,密码界面
    set_login: {
        id: 'setLogin',
        url: '../../commonpage/login/setlogin.html'
    }
};

const BUYER_SUPPLIER = {
    supplier_list: API_ROOT + '/market/supplying/hall/v10'
//  release_buying: API_ROOT + '/market/purchasing/publish/v10',
//  buying_info_detail: API_ROOT + '/market/purchasing/item/details/v10'
};

const BUYER_PURCHASE = {
    purchase_list: API_ROOT + '/market/purchasing/list/v10'
//  release_buying: API_ROOT + '/market/purchasing/publish/v10',
//  buying_info_detail: API_ROOT + '/market/purchasing/item/details/v10'
};

export default {
    API_LOGIN, /* ，其他的api集合*/
    PAGE_URL,
    BUYHALL_API,
    SELLHALL_API,
    PUBLIC_API,
    BUYER_SUPPLIER,
    CONTRACT_API,
    ADDRESS_API,
    ORDER_API,
    BUYER_CONTRACT_API,
    BUYER_PURCHASE,
    BUYER_HOME_API
// TEL_API,
// SEND_CODE,
// SEND_CODE_CHECK
};
