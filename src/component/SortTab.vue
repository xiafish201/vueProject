<template lang="html">

<div class="control">
    <p>
        <template v-for="typeData in typeDatas">
            <a value="{{typeData.code}}" @click="queryType($index)" class="mui-control-item {{curValue === typeData.code?'mui-control-item-bottom':''}}">
                            {{typeData.name}}
             </a>
            <span class="{{typeData.image === ''?'':('mui-icon '+typeData.image+(typeData.sort === 1?'up':'down'))}}"></span>
        </template>
    </p>
</div>

</template>

<script>

import {
    sortTab
}
from 'store/actions';
export default {
    vuex: {
        actions: {
            sortTab
        }
    },
    data: function() {
        return {};
    },
    props: {
        typeDatas: {
            type: Array,
            default: () => [{
                image: '',
                name: '新品',
                code: 1,
                sort: 2
            }, {
                image: 'mui-icon-arrowthin',
                name: '价格',
                code: 2,
                sort: 1,
                sortChange: true // 是否启用排序切换
            }, {
                image: '',
                name: '销量',
                code: 3,
                sort: 2
            }]
        },
        curValue: {
            type: Number,
            default: 1
        }
    },
    methods: {
        queryType: function(index) {
            this.setSortDefault(index);
            if (index !== undefined) {
                if (this.typeDatas[index].code === this.curValue && this.typeDatas[index].sortChange) {
                    this.typeDatas[index].sort = this.typeDatas[index].sort === 1 ? 2 : 1;
                }
                this.curValue = this.typeDatas[index].code;
            } else {
                this.curValue = '1'; // default 1
            }
            console.log('this.curValue', this.curValue);
            console.log('this.typeDatas[index].sort', this.typeDatas[index].sort);
            this.sortTab({
                field: this.typeDatas[index].code,
                asc: this.typeDatas[index].sort
            });
        },
        /**
         * 排序状态重置
         */
        setSortDefault: function(index) {
            var defaultSort = this.$options.props.typeDatas.default();
            defaultSort.map((item, i) => {
                if (index !== i) {
                    this.typeDatas[i].sort = item.sort;
                }
            });
        }
    },
    computed: {},
    ready: function() {
        var asc = 0;
        this.typeDatas.map(item => {
            if (item.code === this.curValue) {
                asc = item.sort;
            }
        });
        this.sortTab({
            field: this.curValue,
            asc: asc
        });
    },
    attached: function() {},
    components: {}
};

</script>

<style lang="css">

.mui-control-item {
    padding: 0 10px;
    color: #222222;
    font-size: 18px;
    display: inline-block;
}

.mui-control-item-bottom {
    border-bottom: 2px solid #f04e30;
}

.control {
    position: fixed;
    width: 100%;
    /*top: 44px;*/
    z-index: 1;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #bbb;
    background: #d7d7d7;
    line-height: 35px;
    padding-bottom: 10px;
}

.control p {
    text-align: center;
    margin: 0;
}

.mui-icon {
    position: relative;
    left: -22px;
    width: 0;
}

</style>
