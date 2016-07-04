import { GOODS_LIST_GETDATA, GOODS_LIST_UPDATAPARAMS } from '../types';

/**
 * 状态存储对象，存储商品列表页面相关所有状态
 * @type {Object}
 */
const state = {
    // 列表数据，用于界面呈现
    itemdata: [],
    // 查询条件
    params: {}
};

/**
 * 变更管理对象，状态只能通过mutations进行修改,状态的变化会触发相应的action
 * @type {Object}
 */
const mutations = {
    // 通知查数据
    [GOODS_LIST_GETDATA](state, itemdata) {
        if (state.params.isAdd) {
            state.itemdata = state.itemdata.concat(itemdata);
        } else {
            state.itemdata = itemdata;
        }
    },
    // 更新查询条件
    [GOODS_LIST_UPDATAPARAMS](state, params) {
        state.params = params;
    }
};

export default {
    state,
    mutations
};
