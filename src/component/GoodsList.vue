<template lang="html">

<sorttab v-if="hassorttab">
</sorttab>
<!-- <listctrl v-if="haspullrefresh" :childlist="childlist" @getlistdata="getdata"></listctrl> -->
<!-- <itemlist v-else></itemlist> -->
<itemlist class="test"></itemlist>

</template>

<script>

/**
 * @file 商品列表展示组件
 * @Author liaoxm
 * 组件使用：
 * 引入：import goodslist from 'bizcomponent/goodlist/GoodsList';
 * 标签示例：<goodslist :haspullrefresh="true" :hassorttab="true"></goodslist>
 * 参数：
 * @param {Boolean} haspullrefresh 是否需要上下拉加载功能
 * @param {Boolean} hassorttab 是否显示排序tab
 * @public
 */
// import listctrl from 'component/list/ListCtrl';
import sorttab from './SortTab';
import itemlist from './GoodsItemList';
import muiUtils from 'common/muiUtils';
import log from 'common/logUtils';
import store from 'store/store';
var api = '';
export default {
    store,
    data: function() {
        return {
            childlist: itemlist
        };
    },
    props: {
        /**
         * [haspullrefresh 是否需要使用上下拉刷新加载功能]
         * @type {Boolean} 默认值false;
         */
        haspullrefresh: {
            type: Boolean,
            default: false
        },
        /**
         * [hassorttab 是否需要排序tab]
         * @type {Object} 默认值false
         */
        hassorttab: {
            type: Boolean,
            default: true
        },
        /**
         * [params 查询条件参数，ajax使用]
         * @type {JSONObject}
         */
        params: {}
    },
    computed: {},
    ready: function() {
    },
    attached: function() {},
    methods: {
        getdata: function(pager, callback) {
            var params = {};
            log.info('statusValue:' + this.statusValue);
            var apiUrl = api.CONTRACT_API.contract_info_list;
            if (this.statusValue !== 0) {
                apiUrl = apiUrl + this.statusValue;
            }
            log.info('apiUrl:' + apiUrl);
            muiUtils.muiAjax(apiUrl, {
                type: 'get',
                data: JSON.stringify(params),
                contentType: 'application/json',
                dataType: 'json',
                success: function(data) {
                    log.info(data);
                    if (data.header.code === '200000') {
                        callback(data);
                    } else {
                        callback(data);
                        mui.toast(data.header.msg);
                    }
                },
                error: function(xhr, type, errorThrown) {
                    log.info(type + ' ' + errorThrown, 'buyinghallcontent App.vue line:76');
                    mui.toast('数据请求失败！');
                    callback(null);
                }
            });
        },
        itemtap: function(item) {
            muiUtils.openWindow('./contractdetail.html', './contractdetail.html', {
                extras: {
                    'contractInfo': item
                }
            });
        }
    },
    created: function() {
        // ajax请求数据
    },
    components: {
        // listctrl,
        sorttab,
        itemlist
    }
};

</script>

<style lang="css">
    .test {
        position: absolute;;
        top: 55px;
    }


</style>
