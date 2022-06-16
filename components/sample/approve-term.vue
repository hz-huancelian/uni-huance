<template>
	<view class="sample-term-wrap">
	<view class="sample-term" @click="sampleApprove">
		<text class="sample-code">项目名称：{{item.projectName}}</text>
		<view class="sample-detail">
			<text class="title">任务单号：</text>
			<text class="value">{{item.jobId}}</text>
		</view>
		<view class="sample-detail">
			<text class="title">受检单位：</text>
			<text class="value">{{item.inspectionName}}</text>
		</view>
		<view class="sample-detail">
			<text class="title">样品数量：</text>
			<text class="value">{{item.sampleCount}}</text>
		</view>

		<!-- 采样组长 待审批样品数-->
		<view class="sample-detail" v-if="pageStatus === '0'">
			<text class="title">待审批样品数：</text>
			<text class="value">{{item.toApproveSampleCount}}</text>
		</view>
		<!-- 采样组长 待入库样品数-->
		<view class="sample-detail" v-else-if="pageStatus === '1'">
			<text class="title">待入库样品数：</text>
			<text class="value">{{item.toStockSampleCount}}</text>
		</view>
		<!-- 采样员 待复核样品数-->
		<view class="sample-detail" v-else-if="pageStatus === '4' || !pageStatus">
			<text class="title">待复核样品数：</text>
			<text class="value">{{item.toReviewSampleCount}}</text>
		</view>
		<!-- 采样组长 已完成 不展示-->
		<view class="sample-detail" v-if="pageStatus !== '2'">
			<text class="title">待采集样品数：</text>
			<text class="value">{{item.toCollectSampleCount}}</text>
		</view>
	</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		props:{
			// 组件使用场景标识：4：采样员 - 任务 - 待复核  5：采样组长 - 待办 - 待审批(待确认)  2：采样组长 - 待办 - 待入库  3：采样组长 - 待办 - 已完成
			pageStatus: {
				type: String,
				default: '3'
			},
			item: {
				type: Object,
				default: {}
			}
		},
		components:{
		},
		data() {
			return {	
			}
		},
		methods: {
			sampleApprove(){
				
				let url = `/pages/sampleApprove/index?sampleStatus=${this.pageStatus}&taskId=${this.item.taskId}`;
				// if(this.isSampler) {
				// 	url = `/pages/sampleApprove/index?isSampler=1`;
				// } else {
				// 	url = `/pages/sampleApprove/index`;
				// }
				// 跳转样品复核页面
				this.$common.navigateTo(url);
			}
		}
	}
</script>

<style scoped>
	.sample-term-wrap{
		width:calc(100%-70rpx);
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
		padding-left: 35rpx;
		padding-right: 35rpx;

	}
	.sample-term{
		/* width: 90%; */
		/* height:370rpx; */
		border-radius: 19rpx;
		background:#fff;
		padding:30rpx;
		padding-top:0rpx;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		margin-top: 30rpx;
	}
	.sample-code{
		display: block;
		height: 84rpx;
		width: 100%;
		border-bottom: 1px solid #ECECEC;;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		font-weight: bolder;
		color: #2E2E2E;
/* 		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block; */
	}
	.sample-detail{
		margin-top: 25rpx;
		font-size: 25rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
	}
	.sample-detail .title{
		color:#2E2E2E;
		font-weight: bolder;
		opacity: 0.8;
		display: inline-block;
		width: 175rpx;
		text-align: right;
	}
	.sample-detail .value{
		padding-top: 0px;
		color:#555555;
		font-weight: 400;
		opacity: 0.7;
		width: 65%;
		display: inline-block;
		padding-left:5%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}
</style>
