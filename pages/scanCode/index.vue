<template>
	<view class="task-wrap">
		<view class="form-aera">
			<!-- 自定义表单校验 -->
			<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
				<uni-forms-item label="" name="sampleNo">
					<uni-easyinput v-model="customFormData.sampleNo" placeholder="请输入样品编号"  class="_input"/>
				</uni-forms-item>
			</uni-forms>
			<view class="buttons">
				<button class="scan-btn" type="primary" @click="backScanCode">
					<image class="icon" src="/static/scan-btn.svg"></image>
					<text style="margin-left: 5px;">扫一扫</text>
				</button>
				<button class="confirm-btn" type="primary" @click="submit">确定</button>
			</view>
		</view>
		<tabBar></tabBar>
    </view>
</template>

<script>
	import uniForms from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uniFormsItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uniEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	export default {
		components:{
			uniForms, 
			uniFormsItem,
			uniEasyinput
		},
		data() {
			return {
				// 表单数据
				customFormData: {
					sampleNo: '',
				},
				// 表单校验规则
				customRules: {
					sampleNo: {
						rules: [{
							required: true,
							// validateFunction: function(rule, value, data, callback) {
							// 	if (value.length > 12) {
							// 		callback('')
							// 	}
							// 	return true
							// },
							errorMessage: '无效样品编号，请输入正确的样品编号'
						}]
					},
				},
			}
		},
		onShow() {
			// this.customFormData.sampleNo = ''
		},
		mounted(){

		},
		methods: {
			backScanCode() {
				this.customFormData.sampleNo = ''
				// uni.navigateBack();
				// 调起条码扫描
				uni.scanCode({
					scanType: ['barCode'],
					success: (res) => { 
						this.customFormData.sampleNo = res.result;
						if(this.customFormData.sampleNo !== ''){
							// 跳转页面
							this.checkSampleNo()
						}
					},
					fail: (error) => {
						this.$common.errorToShow("条码信息获取失败!")
					}
				});
			},
			submit() {
				this.$refs.customForm.validate().then(res => {
					this.checkSampleNo()
				}).catch(err => {
					console.log('err', err);
				})
			},
			checkSampleNo() {
				this.$api.checkSampleNo('sample/checkSampleNo/' + this.customFormData.sampleNo ,res => {
					if(res.code == 200) {
						this.navigateToCreate(res.result);
					} else {
						setTimeout(()=>{
							this.$common.errorToShow(res.message);
						},1000);
						
					}
				})
			},
			// 调转到创建页面 --- 可编辑详情页详情页
			navigateToCreate(type) {
				debugger
				let editable = "true";
				let title = "录入";
				// 0:编辑 1:新录入 提交 保存 按钮
				let status = "1";
				if(type == '0'){	// 不可编辑
					editable = "false";
					title = "详情";
					// 0:查看 1:新录入 提交 保存 按钮
					status = "0";
				} 
				// 跳转页面
				let sampleNo = this.customFormData.sampleNo
				const url = '/pages/detail/index?sampleNo='+sampleNo+'&editable='+editable+'&title='+title+'&detailStatus='+status;
				this.$common.navigateTo(url)
			},
		}
	}
</script>

<style scoped>
	uni-page-body{
		height: 100%;
	}
	.task-wrap{
		background: #F0F2FA;
		height: 100%;
		width: calc(100%-116rpx);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		padding-left: 58rpx;
		padding-right: 58rpx;
	}
	.form-aera{
		width: 100%;
		margin-top: 350rpx;
	}
	::v-deep .uni-easyinput__content{
		height: 107rpx;
		background: #FFFFFF;
		box-shadow: inset 0rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 0rpx 0rpx 0rpx 0rpx;
		opacity: 1;
		border: 2px solid #FFFFFF
	}
	::v-deep .uni-easyinput__placeholder-class {
        font-size: 32rpx;
        font-weight: 400;
        color: #B7B7B7;
    }
	.buttons{
		margin-top: 5px;
		width: 100%;
		height: 75rpx;
/* 		display: flex;
		align-items: center;
		justify-content: space-between; */
	}
	.scan-btn{
		height: 100%;
		width: 43%;
		color: #2F3A89;
		font-size: 32rpx;
		background-color: #D3DDF9;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 9rpx;
		border: 1px solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	}
	.confirm-btn{
		height: 100%;
		width: 43%;
		color: #fff;
		font-size: 32rpx;
		background-color: #2F3A89;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 9rpx;
		border: 1px solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		float: right;
	}
	::v-deep .uni-forms-item__label{
		display: none!important;
	}
	.icon{
		width: 48rpx;
		height: 48rpx;
	}
</style>
