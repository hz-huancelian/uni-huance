<template>
	<view class="task-wrap">
		<view class="scanAera">
			<!-- <view v-if="scanError" class="scanError">{{scanErrorText}}</view> -->
			<ws-carema ref="carema" isContinuous="false" @scanItem="scanItem" @scanList="scanList"></ws-carema>
		</view>
		
		<view class="buttonAera">
			<view class="file btn" @click="scanCode">
				<image class="icon" src="/static/scan-img.svg"></image>
			</view>
			<view class="file btn" @click="writeCode">
				<image class="icon" src="/static/key-board.svg"></image>
			</view>
		</view>
		<tabBar ></tabBar>
    </view>
	
</template>

<script>
	import WsCarema from "@/components/ws-carema/index.vue"
	export default {
		components:{
			WsCarema
		},
		data() {
			return {
				sampleCode:'',
				scanError:false,
				scanErrorText:'条形码识别失败！请重新操作或者转为手动录入！',
			}
		},
		computed:{
		  
		},
		methods: {
			scanItem(val) {
				this.$common.successToShow("scanItem:" + val)
				debugger
			},
			scanList(val) {
				this.$common.successToShow("scanList:" + val)
				debugger
			},
			scanCode() {
				// 调起条码扫描
				uni.scanCode({
					scanType: ['barCode'],
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.sampleCode = res.result;
						this.scanError = false;
						// 跳转页面
						this.navigateToCreate();
					},
					fail: (error) => {
						this.scanErrorText = '条码信息获取错误'
						this.scanError = true;
					}
				});
			},
			// 调转到创建页面 --- 可编辑详情页详情页
			navigateToCreate() {
				const editable = "true";
				const title = "录入";
				// 展示 提交 保存 按钮
				const status = "1";
				// 跳转页面
				const url = `/pages/detail/index?sampleNo=${this.sampleCode}&editable=${editable}&title=${title}&detailStatus=${status}`
				this.$common.navigateTo(url)
			},
			writeCode(){
				
				// 跳转手动输入样品编码页面
				uni.navigateTo({
				    url: '/pages/scanCode/writeCode',
					// animationType: 'pop-in',
					// animationDuration: 200
				});
			}
		}
	}
</script>

<style>
uni-page-body,page{ height: 100%; }
	.task-wrap{
		background: #F0F2FA;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.scanAera{
		height: 70%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;

	}
	.scanError{
		margin-top: 20px;
		text-align: center;
		line-height: 30px;
		width: 70%;
		height: 200rpx;
		color: #2F3A89;
		opacity: 0.9;
	}
	.buttonAera{
		height: 30%;
		width: calc(100%-144rpx);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 72rpx;
		padding-right: 72rpx;
		z-index: 9999;
	}
	.buttonAera .btn{
		width: 109rpx;
		height: 109rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		background-color: #2F3A89;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon{
		width:64rpx;
		height: 64rpx;
	}
</style>
