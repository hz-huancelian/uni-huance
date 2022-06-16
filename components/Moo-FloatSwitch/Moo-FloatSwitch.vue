<!--
 * @Description: 悬浮开关，两档
 -->
<template >
  <view
    class="switch-container"
    :style="{
      backgroundColor: bgColor,
      width: width+'rpx',
      height: height+'rpx',
      borderRadius: (height/2)+'rpx'}"
  >
    <view
      class="slider"
      :style="{left: index===0?'9rpx':`${width/2-7}rpx`,
        backgroundColor: actSliderColor,
        width: (width/2)+'rpx',
        height: (height-13)+'rpx',
        borderRadius: (height/2)+'rpx'}"
    ></view>
    <view class="btn-container">
      <view class="btn" :style="{color: index===0?actColor:inactColor, fontSize: fontSize}" @click="clickSwitch(0)">{{data.leftName}}</view>
      <view class="btn" :style="{color: index===1?actColor:inactColor, fontSize: fontSize}" @click="clickSwitch(1)">{{data.rightName}}</view>
    </view>
  </view>
</template>

<script>

export default {
  props: {
    data: {type: Object, default: {leftName: '', rightName: ''}},//开关数据，两档
    show: {type: Boolean, default: true},//初始化是否显示
    defaultIndex: {type: Number, default: 0},//初始化索引
    bgColor: {type: String, default: "#E6E6E6"},//背景色
    actSliderColor: {type: String, default: "#2F3A89"},//活动滑块颜色
    actColor: {type: String, default: "#FFFFFF"},//活动字体颜色
    inactColor: {type: String, default: "#666666"},//非活动字体颜色
    bottom: {type: String, default: "50rpx"},//距离底部距离
    fontSize: {type: String, default: "26rpx"},//按钮字体大小
    width: {type: Number, default: 170},//组件宽度 单位rpx
    height: {type: Number, default: 60},//组件高度 单位rpx
  },
  data() {
    return {
      index: 0,
      mScrollTop: 0,
      switchShow: true,
      timer: null,
    };
  },

  mounted() {
    this.$nextTick(()=>{
      this.index = this.defaultIndex;
      this.switchShow = this.show;
    });
  },

  methods: {
    clickSwitch(mIndex){
      if (this.index === mIndex){
        return;
      }
      this.index = mIndex;
      this.$emit("onChange", {index: mIndex, name: mIndex===0?this.data.leftName:this.data.rightName});
    },

    switchPageScroll(scrollTop){
      let self = this;
      if (scrollTop <= 200) {
        this.switchShow = true;
        return;
      }

      clearTimeout(this.timer); // 每次滚动前 清除一次
      if (this.switchShow && scrollTop - this.mScrollTop > 25) {
        this.switchShow = false;
      } else if (!this.switchShow && this.mScrollTop - scrollTop > 25) {
        this.switchShow = true;
      }
      this.timer = setTimeout(function() {
        self.mScrollTop = scrollTop;
      }, 500);
    },

    setShown(bool){
      this.switchShow = bool;
    }
  },
};
</script>
<style lang="scss" scoped>
  .switch-container{
    box-shadow: 0 8rpx 32rpx 0 rgba(65, 87, 105, 0.2);
    position: fixed;
    // bottom: 50rpx;
    // left:0;
    // right:0;
    // margin: 0 auto;
    z-index: 900;
	border: 1px solid #fff;
    transition: bottom 0.5s ease-in-out;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(20%, -50%);
    -ms-transform: translate(20%, -50%);
    .slider{
      position: absolute;
      top: 6rpx;
      left: 8rpx;
      transition: left 0.5s ease-in-out;
    }
    .btn-container{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
    }
    .btn{
      width: calc(50% - 16rpx);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

</style>
