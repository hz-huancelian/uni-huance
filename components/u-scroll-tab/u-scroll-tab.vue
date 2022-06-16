<template>
	<view class="tab-box">
		<scroll-view :scroll-with-animation="true" id="tab-scroll-view" :scroll-left="scrollLeft" scroll-x>
			<view class="tab-scroll" :class="{'scroll':scroll}">
				<view class="tab-item" :style="{color:isindex==index?color:''}" :id="'tab-item-' + index" v-for="(item,index) in tabs" :key="index" v-on:click="tabClick" :data-index="index">
					{{item}}
				</view>
				<view :style="[{ left: market_left, width: market_width + 'px'}]" class="market-underline"><view :style="[{backgroundColor: color}]" class="line"></view></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft:0,
				market_left: 0,
				market_width:0,
				isindex:0
			}
		},
		props: {
			tabs: {
				type: Array,
				default: () => ["全部","待付款","待发货","待收货","待评价"]
			},
			current: {
				type: Number,
				default: 0
			},
			color:{
				type:String,
				default:'#1479FC'
			},
			scroll:{ //是否滚动
				type:Boolean,
				default:false
			}
		},
		mounted(){
			this.isindex = this.current
			uni.createSelectorQuery().in(this).select('#tab-item-'+ this.current).boundingClientRect().exec((res)=>{
				this.market_left = res[0].left + 'px';
				this.market_width = res[0].width
			});
		},
		methods: {
			tabClick(e){
				let target = e.target;
				this.isindex = target.dataset.index;
				this.activeAction(target);
				this.$emit('click',{index: target.dataset.index})
			},
			activeAction(target){
				let index = Number(target.dataset.index);
				this.market_left = target.offsetLeft + 'px';
				uni.createSelectorQuery().in(this).select('#tab-item-'+ this.current).boundingClientRect().exec((res)=>{					
					this.market_width = res[0].width
				});
				uni.createSelectorQuery().in(this).select("#tab-scroll-view").boundingClientRect().exec((res)=>{					 
					 this.scrollLeft = target.offsetLeft - Math.round(res[0].width) / 2
				})
			}
		}
	}
</script>

<style scoped>
	
	.tab-box{
		position: relative;
		width: 100%;
		height: 98rpx;
		z-index: 10;
		background-color: white;
		font-size: 28rpx;		
		color: #333333;
		border-bottom:1px solid #f1f1f1;
	}
	.tab-scroll{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.tab-scroll.scroll{
		position: relative;
		display: block;
		white-space: nowrap;
	}
	.tab-scroll.scroll .tab-item{
		min-width:170rpx;		
		display: inline-block;
	}
	.tab-item{
		line-height: 98rpx;
		height: 100%;
		flex: 1;
		text-align: center;
		overflow:hidden;
		white-space: nowrap;
	}
	.market-underline{
		height: 6rpx;
		transition: 0.5s;
		width: 100%;
		position: absolute;
		bottom: 0;		
	}
	.market-underline .line{ width:80rpx; height:6rpx; background:#1479FC; position: absolute; left:0; right:0; margin:auto; content:'';}
	.tab-item.cur{color:#1479FC;}
</style>
