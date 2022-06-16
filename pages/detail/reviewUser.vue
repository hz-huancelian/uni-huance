<template>
	<view class="sample-term-wrap">
		<view class="sample-term">
			<uni-forms-item label="采样复核人" :required="true">
				<view class="input-wrap">
					<text v-if="reviewer || reviewUser" class="input-f">{{reviewer?reviewer:reviewUser}}</text>
					<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
					<text class="input-p" v-if="!reviewer && !reviewUser">{{'请输入采样复核人信息'}}</text>
				</view>
				<view @click="visible5=true" class="select-cover" v-if="editable"></view>
				<w-picker
					:visible.sync="visible5"
					mode="selectorPick"
					:options="datas"
					:value="reviewer"
					@confirm="onConfirm($event)"
					@cancel="onCancel"
					style="touch-action: none;"
					ref="selectorPick"
				></w-picker>
			</uni-forms-item>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
			},
		props:{
			// 默认值
			reviewUser:{
				type: String,
				default:''
			},
			reviewUserId:{
				type: String,
				default:''
			},
			editable: {
				type: Boolean,
				default:false
			},
			datas: {
				type: Array,
				default: []
			}
		},
		watch:{
			reviewUser() {
				this.reviewer = this.reviewUser;
			},
			reviewUserId() {
				this.userId = this.reviewUserId;
			}
		},
		data() {
			return {
				visible5:false,
				reviewer: this.reviewUser,
				userId: this.reviewUserId,
			}
		},
		options: { styleIsolation: 'shared' }, 
		computed:{
		},
		mounted() {
		},

		methods: {
			// 点击拉起弹窗
			selectVal() {
				this.$api.getReviewUsers(res => {
					const users = []
					res.result.forEach((item) => {
						if(this.$store.getters.userInfo.userId !== item.userId) {
							const nitem = {
								"value": item.userId,
								"label": item.empName
							}
							users.push(nitem)
						}
					});
					this.allReviewers = users;
					debugger
					setTimeout(() => {
						this.visible5 = true;
					}, 0); 
					
				});

			},
			// 确定
			onConfirm(selectData){
				debugger
				const result = selectData.result;
				setTimeout(() => {
					this.$nextTick(function(){
						this.userId = selectData.value;
						this.reviewer = result;
						this.visible5 = false;
					})
				}, 400); 
			},
			// 取消
			onCancel(){
				this.visible5 = false;
			},
			
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
		border-radius: 19rpx;
		background:#fff;
		/* padding-bottom:30rpx; */
		padding-top:0rpx;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		margin-top: 20rpx;
	}
	.radius{
		border-bottom-left-radius:0 ;
		border-bottom-right-radius:0 ;
	}
	.sample-code{
		display: block;
		height: 53rpx;
		padding-left: 33rpx;
		border-bottom: 1px solid #ECECEC;;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		font-weight: bolder;
		color: #2F3A89 ;
		background-color: #D3DDF9;
		border-top-left-radius: 19rpx;
		border-top-right-radius: 19rpx;
	}
	.sample-line{
		display: block;
		height: 34rpx;
		width: 100%;
		border-bottom: 1px solid #ECECEC;;
		color: #2E2E2E;
	}
	.sample-detail{
		margin-top: 25rpx;
		font-size: 25rpx;
		height: 32rpx;
		padding-left: 33rpx;
	}
	.sample-detail .title{
		color:#2E2E2E;
		font-weight: bolder;
		opacity: 0.8;
		display: inline-block;
		width: 125rpx;
		text-align: right;
	}
	.sample-detail .value{
		color:#555555;
		font-weight: 400;
		opacity: 0.7;
		width: 70%;
		display: inline-block;
		padding-left:5%;
	}
::v-deep .uni-forms-item{
		padding-left: 33rpx;
		padding-right: 33rpx;
	}
::v-deep .uni-forms-item__inner{
	height: 92rpx;
	display: flex;
	align-items: center;
	padding-bottom:0rpx;
	border-bottom: 1px solid #ECECEC;
}
::v-deep .uni-forms-item__label {
	width: auto!important;
	max-width: 40%!important;
	margin-right: 30px;
	font-weight: bolder;
	color: #2E2E2E;
	opacity: 0.8;
}
::v-deep .uni-forms-item__content{
	/* margin-left: 50px; */
	width: 60%!important;
	/* display: flex; */
	
}
::v-deep .uni-easyinput__content{
	border: 0!important;
}
::v-deep .checklist-box{
	margin-right: 8px!important;
}
.select-cover{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
}
.input-wrap{
	width: 100%;
	height: 72rpx;
	display: flex;
	align-items: center;
}
.input-f {
	padding-left: 10px;
	padding-right: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.input-p {
	color: #999;
	font-size: 12px;
	font-weight: 200;
	padding-left: 10px;
}
.input-f-icon {
	position: absolute;
	right: 0;
}
.remark-dilog {
	width: 692rpx;
	height: 493rpx;
	background: #F0F2FA;
	box-shadow: 0px 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
	border-radius: 20rpx 20rpx 20rpx 20rpx;
	padding-top:30rpx;
}

::v-deep .remark-dilog .uni-forms-item__label {
	width: 200rpx!important;
}
::v-deep .remark-dilog-box .uni-forms-item__label {
	width: 400rpx!important;
}
::v-deep .remark-dilog-box .uni-forms-item__content {
	width: 40%!important;
	display: flex;
	align-items: center;
	justify-content: center;
}

::v-deep .remark-dilog .label-text {
	color: #2E2E2E!important;
}
::v-deep .remark-dilog .uni-forms-item {
	padding-left: 62rpx;
	padding-right: 62rpx;
}
.tips{
	font-size: 24rpx;
	color: #2F3A89;
	padding-left:62rpx;
	display: block;
	margin-top: 12rpx;
	font-weight: bolder;
}
.dialog-btns{
	margin-top:20rpx;
	padding-left:62rpx;
	padding-right:62rpx;
		width: 100%;
		height: 105rpx;
		opacity: 1;
		color: #fff;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: bolder;
		letter-spacing: 1px;
		
	}
	.dialog-btns-left{
		height: 70%;
		width: 44%;
		color: #2F3A89;
		font-size: 25rpx;
		background-color: #D3DDF9;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
		border-radius: 18rpx 18rpx 18rpx 18rpx;
	}

	.dialog-btns-right{
		height: 70%;
		width: 44%;
		color: #fff;
		font-size: 25rpx;
		background-color: #2F3A89;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		display: flex;
		align-items: center;
		justify-content: center;
		float: right;
		border-radius: 18rpx 18rpx 18rpx 18rpx;
	}
	.label-wrap{
		width: 100%;
		display: block;
		height: 72rpx;
/* 		display: flex;
		align-items: center; 
		justify-content: center; */
	}
</style>
