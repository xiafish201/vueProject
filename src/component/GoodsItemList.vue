<template lang="html">

<ul class="mui-table-view mui-grid-view columns4">
    <template v-for="item in itemdata">
        <li class="mui-table-view-cell mui-media mui-col-xs-6">
            <a href="#">
                <img class="mui-media-object" :src="item.image_url">
                <div class="goodsitem">
                    <p class="goodsname"><span>{{*item.goods_name}}</span></p>
                    <p class="goodsprice">
                        <span class="price"><i>￥</i>{{*item.goods_price | mycurrency 0}}<i class="dot">.{{*item.goods_price | mycurrency 1}}</i></span>
                        <span class="salse">成交{{*item.goods_volumes | myvolumes}}件</span>
                    </p>
                </div>
            </a>
        </li>
    </template>

</template>

<script>

/**
 * 商品列表
 */
// import muiUtils from 'common/muiUtils';
export default {
    vuex: {
        getters: {
            itemdata: ({goodlist}) => goodlist.itemdata
        },
        actions: {}
    },
    data: function() {
        return {};
    },
    props: {
        itemdata: Array
    },
    filters: {
        mycurrency: (value, mark) => {
            var str = (value + '').split('.');
            var array = [];
            for (var i = 0; i < str.length; i++) {
                array[i] = str[i];
            }
            if (str.length === 1) {
                array[1] = '00';
            }
            return array[mark];
        },
        myvolumes: value => {
            if (value > 10000) {
                return parseInt(value / 10000) + '万';
            } else {
                return value;
            }
        }
    },
    computed: {},
    ready: function() {},
    attached: function() {},
    methods: {},
    components: {},
    created: function() {
        // var that = this;
        // var apiUrl = 'http://192.168.2.98:8000/goods/mobile/search/v10';
        // var data = {
        //     row_start_number: 1, // 页数
        //     sort_kind: 'goods_volumes', // 排序字段
        //     sort_arrow: 0// 排序规则
        // };
        // muiUtils.muiAjax(apiUrl, {
        //     type: 'get',
        //     data: data,
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     success: function(data) {
        //         if (data.code === '200000') {
        //             that.itemdata = data.items;
        //         } else {
        //             mui.toast(data.msg);
        //         }
        //     },
        //     error: function(xhr, type, errorThrown) {
        //         mui.toast('数据请求失败！');
        //     }
        // });
    }
};

</script>

<style lang="css" scoped>

.goodsitem {
    height: 40px;
}

.goodsname {
    font-size: 14px;
    font-weight: 600;
    padding-left: 5px;
    text-align: left;
}

.goodsprice {}

.price {
    /*font-size: 12;*/
    color: rgb(238, 13, 13);
    float: left;
}

.dot {
    font-size: 12px;
}

.salse {
    font-size: 12px;
    float: right;
}

.goodsname span {
    width: 155px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

</style>
