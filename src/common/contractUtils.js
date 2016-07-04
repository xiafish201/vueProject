'use strict';
/**
 * @file 此js文件用于处理合同相关的公共方法
 * @Author liyubai
 * 使用方法：import contractUtils from 'common/contractUtils'
 */

/**
 * @desc 设置合同的优惠或减免
 * @param {id} 合同编号
 * @param {type} 设置类型 设置优惠（youhui）、减免（jianmian）
 * @public
 */
const setContractPrice = (id, type) => {
    var btnArray = ['取消', '提交'];
    var alertTitle = '';
    var alertInfo = '';
    if (type === 'youhui') {
        alertTitle = '设置优惠';
        alertInfo = '请输入优惠金额';
    } else if (type === 'jianmian') {
        alertTitle = '设置减免';
        alertInfo = '请输入减免金额';
    }
    mui.prompt(alertInfo, '0.00', alertTitle, btnArray, function(e) {
        if (e.index === 1) {
            mui.toast('合同编号：' + id + ' 输入金额：' + e.value);
        } else {
            mui.toast('取消');
        }
    });
};

export default {
    setContractPrice
};
