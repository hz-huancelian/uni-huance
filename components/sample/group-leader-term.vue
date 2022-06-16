<template>
	<view class="sample-term-wrap">
		<view class="sample-term" @click="leaderTaskList" :class="collapse?'radius':''">
			<view class="sample-code">
				<view class="header-title">
					<text class="title">开始时间：</text>
					<text class="value">{{taskObj.startDate}}</text>
				</view>
				<!-- 项目状态 采样中 已完成 -->
				<view class="header-status">
					<text class="title">{{taskObj.taskStatusCn}}</text>
				</view>
			</view>
			<view class="sample-detail">
				<text class="title">项目名称：</text>
				<text class="value">{{taskObj.projectName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">任务单号：</text>
				<text class="value">{{taskObj.jobId}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">委托单位：</text>
				<text class="value">{{taskObj.consignorName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">受检单位：</text>
				<text class="value">{{taskObj.inspectionName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">完成时间：</text>
				<text class="value">{{taskObj.endDate}}</text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		props:{
			collapse:{
				type: Boolean,
				default: false
			},
			taskDetail:{
				type: Object,
				default: {}
			},
		},
		components:{
			
		},
		computed:{
			taskObj(){
				const taskObj = this.taskDetail;
				taskObj.taskStatusCn = taskObj.taskStatus === '2' ? '采样中' : taskObj.taskStatus === '3' ? '已完成' : '';
				return taskObj;
			}
		},
		data() {
			return {		
			}
		},
		methods: {
			leaderTaskList(){
				// 跳转 任务-> 样品列表
				this.$common.navigateTo('/pages/sampleLeader/index?taskId=' + this.taskObj.taskId);
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
		/* align-items: center; */
		padding-left: 35rpx;
		padding-right: 35rpx;
	}
	.sample-term{
		/* width: 90%; */
		height:390rpx;
		/* height:370rpx; */
		border-radius: 19rpx;
		background:#fff;
		padding-top:30rpx;
		padding-bottom:30rpx;
		padding-top:0rpx;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		margin-top: 30rpx;
	}
	.radius{
		border-bottom-left-radius:0;
		border-bottom-right-radius:0;
	}
	.sample-code{
		display: block;
		height: 84rpx;
		width: 100%;
		border-bottom: 1px solid #ECECEC;;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 25rpx;
		font-weight: bolder;
		color: #2E2E2E;
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
		padding-left:30rpx;
		padding-right:30rpx;
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
	.header-title{
		margin-left: 30rpx;
	}
	.header-status{
		background-color: #2F3A89;
		float: right;
		color: #fff;
		height: 100%;
		width: 147rpx;
		border-top-right-radius: 19rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
