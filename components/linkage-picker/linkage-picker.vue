<template>
    <view>
        <view class="hammer-form hammer-box">
            <view class="sub-title">{{name}}</view>
            <picker @change="pickerChange" :value="index" :range="range">
                <view class="picker">{{range[index]}}</view>
            </picker>
        </view>
        <hammerPicker v-if="index > 0 && subArray.length > 0" :name="subName" :range="subArray" :num="subIndex" @subconfirm="confirm">
            <slot></slot>
        </hammerPicker>
    </view>
</template>
<script>
import hammerPicker from '@/components/linkage-picker/linkage-picker'
export default {
    name: 'hammerPicker',
    components: {
        hammerPicker
    },
    /*computed: {
        index(val) {
            return this.num
        }
    },*/
    watch: {
        index: {
            immediate: true,
            handler(val, oldVal) {
                console.log(val, oldVal);
                // this.subIndex = val;
            }
        }
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        range: {
            type: Array,
            default: []
        },
        num: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            index: 0,
            subName: '',
            subArray: [],
            subIndex: 0
        }
    },
    methods: {
        pickerChange(e) {
            console.log('picker发送选择改变，携带值为', e.target.value);
            this.index = e.target.value;
            console.log(this.index);

            /* 此处写请求接口，下级联动数据内容展示，返回是否有children停止 */
			/* 一般传入id 接口方法固定 返回为空结束 */
            this.subName = `${Math.floor(Math.random()*100)}级联动`;
            this.subIndex = 0;
            this.subArray = [`请选择`,`威海${Math.floor(Math.random()*100)}`, `海淀${Math.floor(Math.random()*100)}`, `成都${Math.floor(Math.random()*100)}`];
			
            this.$emit('subconfirm', {emitIndex: this.index});
        },
        /* 父组件方法 */
        confirm(emitIndex) {
            console.log(emitIndex);
            this.subIndex = emitIndex.emitIndex;
        }
    }
}
</script>
<style>
.hammer-box {
    background: #00ab98;
    color: #fff;
}
/* ==================
   容器 - 边距 - 间隔
 ==================== */
.hammer-box {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    padding: 0 20upx;
}

.hammer-box .title {
    display: flex;
    min-height: 100rpx;
    align-items: center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    text-align: justify;
    font-size: 20px;
}
.hammer-box .sub-title {
    display: flex;
    min-height: 80rpx;
    align-items: center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    text-align: justify;
    line-height: 100%;
    margin-right: 20rpx;
    font-size: 18px;
}
// picker选择器 - 箭头指示
.hammer-form picker {
    flex: 1;
    padding-right: 40rpx;
    overflow: hidden;
    position: relative;
}

.hammer-form picker .picker {
    line-height: 100rpx;
    font-size: 28rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: right;
}

.hammer-form picker::after {
    font-family: iconfont;
    display: block;
    content: "\e6a3";
    position: absolute;
    font-size: 34rpx;
    color: #fff;
    line-height: 100rpx;
    width: 60rpx;
    text-align: center;
    top: 0;
    bottom: 0;
    right: -20rpx;
    margin: auto;
}
</style>
