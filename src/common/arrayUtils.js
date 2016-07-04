'use strict';
/**
 * @file 此js文件用于放置所有的js数组相关操作的工具方法
 * @Author yupeng
 * 使用方法：import arrayUtils from 'common/arrayUtils'
 */

/**
 * @desc 获取某个值在数组中的位置
 * @param {Array} array
 * @param {Object} key
 * @return {Number} 返回对象key在array中的位置，如果没有就返回-1
 * @public
 */
const arrayIndex = (array, key) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === key) {
            return i;
        }
    }
    return -1;
};

export default {
    arrayIndex
};
