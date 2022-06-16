<template>
	<view class="u-circle-bar">
			<view class="circle-bar-box" :style="{background:color}"></view>
	    <view class="circle-bar-left" :style="style2"></view>
	    <view class="circle-bar-right" :style="style1"></view>
	    <view class="circle-bar-mask center">{{percent}}%</view>
	</view>
</template>

<script>
export default{
	props:{
		percent:{
			type:Number,
			default:0,
		},
		color:{
			type:String,
			default:'#61A2FD'
		}
	},	
	computed:{
		style1(){
			if(this.percent<=50){
				return  `transform:rotate(${this.percent*3.6}deg)`
			}else{
				return `transform:rotate(0deg);background:${this.color}`
			}
		},
		style2(){
			if(this.percent>50){				
				return  `transform:rotate(${(this.percent-50)*3.6}deg)`
			}
		}
	}
}
</script>

<style scoped lang="less">
.u-circle-bar { width:100rpx; height:100rpx; position: relative;
	.circle-bar-box{ position:absolute;  width:97rpx; height:97rpx; left:0; right:0; margin:auto; top:50%; transform: translateY(-50%); border-radius:50%; }
	.circle-bar-left,.circle-bar-right { transition:all 0.5s ease; position:absolute; left:0rpx; bottom:0rpx; top:0rpx; right:0rpx; border-radius:50%; margin:auto; width:100rpx; height:100rpx; background-color: #F7F7F7; }   
	.circle-bar-right { clip:rect(0,auto,auto,50rpx);  }
	.circle-bar-left { clip:rect(0,50rpx,auto,0); }
	.circle-bar-mask { position:absolute; border-radius:50%; top:50%; transform: translateY(-50%); right:0; left:0; font-size:26rpx; margin:auto; width:80rpx; height:80rpx;  background-color: #fff; color:#61A2FD; }	
}
</style>
