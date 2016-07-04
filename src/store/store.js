import Vue from 'vue';
import Vuex from 'vuex';
import middlewares from './middlewares';
import goodlist from './modules/goodslist';
import sorttab from './modules/sorttab';
import counter from './modules/counter';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
Vue.config.debug = debug;
Vue.config.warnExpressionErrors = false;

// 通过 new Vuex.Store 结合初始 state 和 mutations，创建 store
// 这个 store 将和我们的 vue 应用链接起来
export default new Vuex.Store({
    modules: {
        goodlist,
        sorttab,
        counter
    },
    strict: debug,
    middlewares
});
