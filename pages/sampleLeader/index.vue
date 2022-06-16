<template>
	<view class="task-wrap">
		<view class="project-info">
			<view class="sample-detail">
				<text class="title">项目名称：</text>
				<text class="value">{{sampleTaskInfo.projectName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">任务单号：</text>
				<text class="value">{{sampleTaskInfo.jobId}}</text>
			</view>
			<view class="sample-detail" style="position: relative;">
				<text class="title">联系人：</text>
				<text class="value">{{sampleTaskInfo.inspectionLinker}}</text>
				<template v-if="sampleTaskInfo.singImageUrl">
					<image style="width: 120rpx;height: 120rpx;" src="https://www.huancelian.com/wxStatic/signed.png"></image>
				</template>
				<template v-else>
					<text v-if="sampleTaskInfo.sampleItemVos && sampleTaskInfo.sampleItemVos.length > 0" class="signature" @click="goToHandWriting(sampleTaskInfo.sampleItemVos[0].sampItemId)">厂方签字</text>
				</template>
			</view>
			<view class="sample-detail">
				<text class="title">样品数量：</text>
				<text class="value">{{sampleTaskInfo.sampleCount}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">调度备注：</text>
				<text class="value">{{sampleTaskInfo.dispatchRemark}}</text>
			</view>
		</view>
		<view class="scroll-wrap">
			<view class="tabContainer">
				<!-- 样品列表 -->
				<template v-for="(item, index) in sampleTaskInfo.sampleItemVos">
					<sampleTerm :status="true" :sampleData="item" title="详情" :editable="false" detailStatus="0"></sampleTerm>
				</template>
			</view>
		</view>
    </view>
</template>

<script>
	import sampleTerm from '@/components/sample/sample-term.vue'
	export default {
		components:{
			sampleTerm,
		},
		data() {
			return {
				taskId: '',
				sampleTaskInfo: {
					projectName: '',
					consignorName: '',
					inspectionName: '',
					sampleCount: '',
					jobId: '',
					inspectionLinker: '',
					singImageUrl: '',
					sampleVos:[],
				}
			}
		},
		onLoad (e) {
			debugger
			if(e.taskId) {
				this.taskId = e.taskId
			}
		},
		onShow() {
			this.getSampleVos()
		},
		methods: {
			getSampleVos() {
				this.$api.getSamplerList('sample/items/' + this.taskId,res => {
				    if (res.code === 200) {
				        this.sampleTaskInfo = res.result	|| []			
				    }
				})
			},
			goToHandWriting(sampItemId){
				this.$common.navigateTo('/pages/handWriting/index?sampItemId='+sampItemId);
			}
		}
	}
</script>

<style scoped>
		uni-page-body{
			height: 100%;
		}
	.task-wrap{
		background: #F0F2FA;
		height: 100vh;
		display: flex;
		flex-direction: column;
		
	}
	.project-info{
		height: 280rpx;
		width:calc(100%-98rpx);
		background-color: #D6D8DF;
		padding-left: 49rpx;
		padding-right: 49rpx;
	}
	.sample-detail{
		margin-top: 20rpx;
		font-size: 25rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
		
	}
	.sample-detail .title{
		color:#193566;
		font-weight: bolder;
		opacity: 0.8;
		display: inline-block;
		width: 140rpx;
		text-align: right;
	}
	.sample-detail .value{
		color:#193566;
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
	.scroll-wrap{
		flex: 1;
		overflow: scroll;
		padding-bottom: 50rpx;
	}
	.tabContainer{
		height: auto;
	}
	.signature{
		position: absolute;
		top: 0;
		right: 0;
		width: 167rpx;
		height: 61rpx;
		color: #fff;
		background-color: #193566;
		border-radius: 19rpx 19rpx 19rpx 19rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
	}
	.signatureImg image{
		position: absolute;
		top: 0;
		right: 0;
		width: 61rpx;
		height: 61rpx; 
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
	}
</style>
