import { GOODS_LIST_SORT } from '../types';

/**
 * 状态存储对象，存储商品列表页面相关所有状态
 * @type {Object}
 */
const state = {
    // 排序状态，{field,asc},不给默认状态，第一次进入就会触发查询动作
    sort: {}
};

/**
 * 变更管理对象，状态只能通过mutations进行修改,状态的变化会触发相应的action
 * @type {Object}
 */
const mutations = {
    [GOODS_LIST_SORT](state, sort) {
        state.sort = sort;
    }
};

export default {
    state,
    mutations
};
