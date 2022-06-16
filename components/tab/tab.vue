<template>
	<view class="uni-tabbar">
		<scroll-view scroll-x>
			<block v-for="(i,n) in tabItem" :key="n">
				<view class="tab-list" :class="{active:tabIndex == n}" :style="{width:width+'px','--textColor':textColor,'--activeColor':activeColor}" @tap="tabClick(n)">
					{{i}}
				</view>
				<view class="tab-line" v-if="isLine" :style="{transform:'translateX('+left+'px','--lineColor':lineColor}"></view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			tabItem: Array,
			tabIndex: Number,
			isLine: {
				type: Boolean,
				default: true
			},
			textColor:{
				type:String,
				default:'#333333'
			},
			lineColor:{
				type:String,
				default:'#193566'
			},
			activeColor:{
				type:String,
				default:'#193566'
			},
		},
		data() {
			return {
				width: 0,
				left: 0,
				initLeft: 0
			};
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					this.width = e.windowWidth / this.tabItem.length
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				if (this.isLine) {
					const query = uni.createSelectorQuery().in(this);
					query.select('.tab-line').boundingClientRect(data => {
						const {
							width
						} = data
						this.left = (this.width - width) / 2 + this.width * this.tabIndex
						this.initLeft = (this.width - width) / 2
					}).exec();
				}
			})
		},
		methods: {
			tabClick(index) {
				if (index == this.tabIndex) return
				const {
					initLeft
				} = this
				this.left = initLeft + this.width * index
				this.$emit('tabClick', index)
			}
		}
	}
</script>

<style scoped>
	.uni-tabbar {
		border-bottom: 1px solid #EDEDED;
		width: 100%;
	}

	.tab-list {
		color: var(--textColor);
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		float: left;
		transition: all.3s
	}

	.tab-list.active {
		color: var(--activeColor);
	}

	.tab-line {
		position: absolute;
		width: 50upx;
		height: 4upx;
		background-color: var(--lineColor);
		bottom: 0;
		transition: all.3s
	}
</style>
