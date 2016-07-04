import { INCREMENT, DECREMENT } from '../types';
// 创建一个 object 存储应用启动时的状态
const state = {
    // TODO: 设置启动状态
    // 应用启动时，count 置为0
    count: 0
};

// 创建一个 object 存储 mutation 函数
const mutations = {
    // TODO: set up our mutations
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    // INCREMENT (state, amount) {
    //   state.count = state.count + amount
    // }
    [INCREMENT](state) {
        state.count++;
    },
    [DECREMENT](state) {
        state.count--;
    }
};


export default {
    state,
    mutations
};
