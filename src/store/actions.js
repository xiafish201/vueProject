import * as types from './types';
import muiUtils from 'common/muiUtils';

// action 会收到 store 作为它的第一个参数
// 在 store 里我们只需要 dispatch （在有些情况下需要 state）
// 我们可以利用 ES6 的解构（destructuring）语法来简化参数的使用
export const incrementCounter = function({dispatch}) {
    dispatch(types.INCREMENT, 1);
};

export const increment = ({dispatch}) => dispatch(types.INCREMENT);
export const decrement = ({dispatch}) => dispatch(types.DECREMENT);

export const incrementIfOdd = ({dispatch, state}) => {
    if ((state.counter.count + 1) % 2 === 0) {
        dispatch(types.INCREMENT);
    // } else {
    //   dispatch('DECREMENT')
    }
};

export const incrementAsync = ({dispatch}) => {
    setTimeout(() => {
        dispatch(types.INCREMENT);
    }, 1000);
};

/**
 * 刷新时获取数据
 * @param  {Object} params   主要是页码
 * @return {void}
 */
export const getdataPull = ({dispatch, state}, params) => {
    var _params = JSON.parse((state => {
        return JSON.stringify(state.goodlist.params);
    })(state));
    _params.row_start_number++;
    _params.isAdd = true;
    updateDataParams({
        dispatch,
        state
    }, _params);
    getdata({
        dispatch,
        state
    });
};

export const getdata = ({dispatch, state}) => {
    var params = state.goodlist.params;
    // 页码++
    // params.row_start_number++;//不能直接修改状态
    var apiUrl = 'http://192.168.2.98:8000/goods/mobile/search/v10';
    muiUtils.muiAjax(apiUrl, {
        type: 'get',
        data: params,
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            if (data.code === '200000') {
                dispatch(types.GOODS_LIST_GETDATA, data.items);
            } else {
                mui.toast(data.msg);
            }
        },
        error: function(xhr, type, errorThrown) {
            mui.toast('数据请求失败！');
        }
    });
};

export const updateDataParams = ({dispatch, state}, params) => {
    dispatch(types.GOODS_LIST_UPDATAPARAMS, params);
};

/**
 * [description]
 * @param  {[type]} {dispatch [description]
 * @param  {[type]} state}    [description]
 * @return {[type]}           [description]
 */
export const sortTab = ({dispatch, state}, sort) => {
    console.log('sort', sort);
    if (state.sorttab.field === sort.field && state.sorttab.asc === sort.asc) {
        // 没有发生变化，则不动
        console.log('sort', sort);
        return;
    }
    // 修改状态
    dispatch(types.GOODS_LIST_SORT, sort);
    // 查询数据
    var params = {
        row_start_number: 1, // 页数
        sort_kind: sort.field, // 排序字段
        sort_arrow: sort.asc // 排序规则
    };
    updateDataParams({
        dispatch,
        state
    }, params);
    if (sort.field === 3) {
        getdataPull({
            dispatch,
            state
        }, params);
    } else {
        getdata({
            dispatch,
            state
        });
    }
};
