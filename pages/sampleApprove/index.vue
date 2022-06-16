<template>
	<view class="task-wrap">
		<view class="project-info">
			<view class="sample-detail">
				<text class="title">项目名称：</text>
				<text class="value">{{taskInfo.projectName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">受检单位：</text>
				<text class="value">{{taskInfo.inspectionName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">样品数量：</text>
				<text class="value">{{taskInfo.sampleCount}}</text>
			</view>

			<!-- 采样组长 待办 - 待审批展示 -->
			<template v-if="sampleStatus === '0'">
				<view class="sample-detail" style="display: flex;justify-content: space-between;">
					<view style="width: 50%;display: flex;">
						<text class="title">待确认样品数：</text>
						<text class="value" style="width:30%">{{taskInfo.toConfirmSampleCount}}</text>
					</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;">
						<text class="title">已确认样品数：</text>
						<text class="value" style="width:30%">{{taskInfo.confirmedSampleCount}}</text>
					</view>
				</view>
			</template>
			
			<!-- 采样组长 待办 - 待入库展示 -->
			<template v-else-if="sampleStatus === '1'">
				<view class="sample-detail" style="display: flex;justify-content: space-between;">
					<view style="width: 50%;display: flex;">
						<text class="title">待入库样品数：</text>
						<text class="value" style="width:30%">{{taskInfo.toStockSampleCount}}</text>
					</view>
					<view style="width: 50%;display: flex;justify-content: flex-end;">
						<text class="title">已入库样品数：</text>
						<text class="value" style="width:30%">{{taskInfo.stockedSampleCount}}</text>
					</view>
				</view>
			</template>
			<!-- 采样员 任务 待复核 展示 -->
			<view class="sample-detail" v-if="sampleStatus === '4'">
				<text class="title">待复核样品数：</text>
				<text class="value">{{taskInfo.toReviewSampleCount}}</text>
			</view>
			<!-- 采样组长 已完成 不展示 -->
			<view class="sample-detail" v-if="sampleStatus !== '2'">
				<text class="title">待采集样品数：</text>
				<text class="value">{{taskInfo.toCollectSampleCount}}</text>
			</view>
		</view>
		<view class="scroll-wrap">
			<view class="tabContainer">
				<sampleTerm 
					v-for="(item, index) in taskInfo.vos" 
					:key="index"  
					:sampleData="item" 
					:title="sampleStatus==='4'?'复核':'详情'" 
					:editable="false" 
					:detailStatus="DETAIL_STOKEN[sampleStatus]" 
					/>
				<!-- 样品列表 -->
				<!-- 样品员 任务 待复核 -->
				<!-- <sampleTerm v-if="sampleStatus === '0'" :sampleData="sampleData" title="复核" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '0'" :sampleData="sampleData" title="复核" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '0'" :sampleData="sampleData" title="复核" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '0'" :sampleData="sampleData" title="复核" :editable="false" detailStatus="2"></sampleTerm>-->
				
				<!-- 样品组长 待办 待审批 -->
				<!-- <sampleTerm v-if="sampleStatus === '1'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '1'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '1'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="2"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '1'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="2"></sampleTerm>-->
				<!-- 样品组长 待办 待入库 -->
				<!-- <sampleTerm v-if="sampleStatus === '2'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="3"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '2'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="3"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '2'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="3"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '2'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="3"></sampleTerm>-->
				<!-- 样品组长 待办 已完成 -->
				<!-- <sampleTerm v-if="sampleStatus === '3'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="0"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '3'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="0"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '3'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="0"></sampleTerm>
				<sampleTerm v-if="sampleStatus === '3'" :sampleData="sampleData" title="详情" :editable="false" detailStatus="0"></sampleTerm> -->
			</view>
		</view>
		<view class="approve-all" v-if="taskInfo.vos.length > 0 && sampleStatus !== '3'" @click="handleApprove">{{approveText}}</view>
    </view>
</template>

<script>
	import sampleTerm from '@/components/sample/sample-term.vue'
	const DETAIL_STOKEN = {
		'4': '2',
		'0': '5',
		'1': '3',
		'2': '0',
		'3': '2'
	}
	export default {
		components:{
			sampleTerm,
		},
		data() {
			return {
				DETAIL_STOKEN,
				taskId: '',
				sampleStatus: '',	 // 组长代办(0:待确认 1:待入库 2:已完成) 4:采样员 
				router:{},
				// 页面标题
				pageTitle: '',
				// 底部按钮文案
				approveText: '',
				taskInfo: {
					projectName: '',
					consignorName: '',
					inspectionName: '',
					sampleCount: '',
					jobId: '',
					toCollectSampleCount: '',   //待采集样品数
					toConfirmSampleCount: '',   //待确认样品数
					confirmedSampleCount: '',   //已确认样品数
					toStockSampleCount: '',	   	//待入库样品数
					stockedSampleCount: '',   	//已入库样品数
					toReviewSampleCount: '',  	//待复核样品数
					toCollectSampleCount: '', 	// 待采集样品数
					vos: []
				}
			}
		},
		onLoad(e) {
			if(e.taskId) {
				this.sampleStatus = e.sampleStatus
				this.taskId = e.taskId
			}
		},
		onShow() {
			// let pagearr = getCurrentPages();//获取应用页面栈
			// let currentPage = pagearr[pagearr.length - 1];//获取当前页面信息
			// console.log('option:' , currentPage.options)//获取页面传递的信息
			// this.router.query = currentPage.options;
			debugger
			if(this.sampleStatus === '4') {
				this.getSapmleApproveList()
			} else {
				this.getSampleList()
			}
		},
		mounted(){
			switch (this.sampleStatus) {
			    case '4':
			        this.pageTitle = "样品复核";
					this.approveText="一键复核通过";
			        break;
			    case '0':
			        this.pageTitle = "样品确认";
					this.approveText="一键确认通过";
			         break;
			    case '1':
			        this.pageTitle = "样品入库申请";
					this.approveText="一键申请入库";
			         break;
			    case '2':
			        this.pageTitle = "任务样品";
					this.approveText="";
			         break;
				 default:
					this.pageTitle = "样品复核";
					this.approveText="一键复核通过";
			}
			// 设置页面title
			uni.setNavigationBarTitle({
			　　title: this.pageTitle
			});
		},
		methods: {
			getSampleList() {
				const param = {
					taskId: this.taskId,
					sampleStatus: this.sampleStatus
				}
				this.$api.getSampleListByCondition(param, res=> {
					if(res.code === 200) {
						this.taskInfo = res.result || {}
					}
				})
			},
			getSapmleApproveList() {
				debugger
				this.$api.getSampleItemsByTaskId({ taskId: this.taskId }, res=> {
					if(res.code === 200) {
						this.taskInfo = res.result || {}
					}
				})
				
			},
			handleApprove() {
				const sampleIds = this.taskInfo.vos.map(i => i.sampItemId)
				if(this.sampleStatus === '0') { // 一键确认
					const data = {
						sampItemId: sampleIds.toString(),
						auditFlag: 1,
						auditReason: ''
					}
					this.$api.auditSampleItem(data, res => {
						if(res.code == 200) {
							this.$common.successToShow("审批通过")
							uni.navigateBack({delta:1})
						} else {
							this.$common.errorToShow(res.message)
						}
					})
				}  else if(this.sampleStatus === '1') { // 一键入库
					const data = {
						sampleItemId:  sampleIds.toString()
					}
					this.$api.sampStoreApply(JSON.stringify(data), res => {
						if(res.code == 200) {
							this.$common.successToShow("入库成功")
							uni.navigateBack({delta:1})
						} else {
							this.$common.errorToShow(res.message)
						}
					})
				} else if(this.sampleStatus === '4') { // 一键复核 -- 采样员操作
					const data = {
						sampleItemId:  sampleIds.toString()
					}
					this.$api.batchReviewSampleItem(JSON.stringify(data), res => {
						if(res.code == 200) {
							this.$common.successToShow("复核成功")
							uni.navigateBack({delta:1})
						} else {
							this.$common.errorToShow(res.message)
						}
					})
				}
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
		/* height: 280rpx; */
		width:calc(100%-98rpx);
		background-color: #D6D8DF;
		padding-left: 49rpx;
		padding-right: 49rpx;
		padding-bottom: 25rpx;
	}
	.sample-detail{
		margin-top: 20rpx;
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
		color:#555555;
		font-weight: 400;
		opacity: 0.7;
		width: 65%;
		display: inline-block;
		padding-left:30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}
	.scroll-wrap{
		flex: 1;
		/* height: calc(100vh-); */
		overflow: scroll;
	}
	.tabContainer{
/* 		flex: 1;
		overflow: scroll; */
		padding-bottom: 30rpx;
	}
	.approve-all{
		width: 100%;
		height: 105rpx;
		background: #2F3A89;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		/* border: 2px solid #FFFFFF; */
		color: #fff;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bolder;
		letter-spacing: 1px;
		
	}
</style>
