<template>
	<view class="sample-term-wrap">
		<view class="sample-term">
			<view class="icon-wrap" @click="getPos">
				<image class="icon" src="/static/position.svg"></image>	
			</view>
			<view class="position-text">
				<view class="pos-text" v-if="!editable">{{detailTip}}</view>
				<template v-else>
					<view class="pos-text">{{getPosSucc ? defaultTip : failTip}}</view>
				</template>
				<view style="position:relative">
					<input 
						class="write-addr"
						type="text" 
						:clearable="false"
						v-model="position" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						:placeholder="getPosSucc ? '' : '您可以手动输入'"
					/>
					<!-- 详情页或者 拉取地址成功，展示遮罩，不允许编辑 -->
					<view v-if="!editable || getPosSucc" class="writeAddr-cover"></view>
				</view>
				
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		components:{
			},
		props:{
			address: {
				type: String,
				default:''
			},
			editable: {
				type: Boolean,
				default:true
			},
		},
		watch:{
			address(){
				this.position = this.address || '';
				// 如果默认有地址，展示 点击左侧定位
				if(this.address) {
					this.getPosSucc = true;
				}
			}
		},
		data() {
			return {
				// 获取地址成功
				getPosSucc: false,
				detailTip:"地址信息",
				defaultTip:'点击左侧定位',
				failTip:'定位失败',
				position: this.address || '',
			}
		},
		options: { styleIsolation: 'shared' }, 
		computed:{
		},
		mounted() {
		},

		methods: {
			getPos(){
				if(!this.editable) {
					return;
				}
				// 
				uni.chooseLocation({
					success: (res) => {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this.position = res.address;
						this.getPosSucc = true;
					},
					fail:() => {
						if(!this.position) {
							this.getPosSucc = false;
						}
						
					},
				});
				// uni.getLocation({ 
				// 	type: 'wgs84',
				// 	success: function (res) {
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 	}
				// });
			}
		}
	}
</script>

<style scoped>
	.sample-term-wrap{
		width:calc(100%-70rpx);
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.sample-term{
		position: relative;
		padding-top:0rpx;
		margin-top: 20rpx;
		height: 120rpx;
		width: 100%;
		overflow-x: scroll!important;
		overflow-y: hidden!important;
		border-radius: 19rpx;
		background:#fff;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-wrap{
		width:120rpx;
		height: 120rpx;
		display: inline-block;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon{
		width:80rpx;
		height: 80rpx;
		display: inline-block;
	}
	.position-text{
		padding-left: 10px;
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.pos-text{
		width: 100%;
		height: 60rpx;
		font-size: 30rpx;
		color: #2E2E2E;
		display: flex;
		align-items: flex-end;
		font-weight: bolder;
	}
	.write-addr{
		width: 100%;
		height: 50rpx;
		margin-top: 6rpx;
	}
	::v-deep .position-text .uni-easyinput__content{
		min-height: 0;
		border:0;
	}
	::v-deep .position-text .uni-easyinput__content-input{
		padding-left: 0!important;
	}
	.writeAddr-cover{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
</style>