<template>
	<view class="task-wrap">
		<!-- tab切换 -->
		<u-tabs v-if="isSampler" :list="tabItem" @click="tabClick" :current="tabIndex" @change="changeIndex" :scrollable="false" activeColor="#2F3A89" barWidth="60"></u-tabs>
		<!-- 任务容器 -->
		<view class="tabContainer">
			<view class="scroll-wrap">
			<!-- 无内容 -->
			<template v-if="!datas.length">
				<image class="nodata" src="/static/nodata.svg"></image>
			</template>
			<!-- 有内容 -->
			<template v-else>
				<template v-if="isSampler">
					<!-- 待提交 - 样品列表 -->
					<template v-if="tabIndex === 0">
						<sampleTerm :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
					</template>
					<!-- 待复核 - 项目列表 -->
					<template v-if="tabIndex === 1">
						<approveTerm></approveTerm>
						<approveTerm></approveTerm>
						<approveTerm></approveTerm>
						<approveTerm></approveTerm>
					</template>
					<!-- 已驳回 - 已驳回列表 和样品列表一样的组件，多了审批历史DOM -->
					<template v-if="tabIndex === 2">
						<sampleTerm :collapse="true" :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :collapse="true" :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :collapse="true" :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
						<sampleTerm :collapse="true" :sampleData="sampleData" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
					</template>
				</template>
				<!-- 采样组长 任务列表-->
				<template v-else>
					<template v-for="(item, index) in leaderTaskList">
						<group-leader-term :taskDetail="item"></group-leader-term>
					</template>
				</template>
			</template>
			</view>
		</view>
		<tabBar ></tabBar>
    </view>
	
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import sampleTerm from '@/components/sample/sample-term.vue'
	import approveTerm from '@/components/sample/approve-term.vue'
	import groupLeaderTerm from '@/components/sample/group-leader-term.vue'  
	
	export default {
		components:{
			sampleTerm,
			approveTerm,
			groupLeaderTerm
		},
		data() {
			return {
				// 采样组长 任务列表
				leaderTaskList: [],
				sampleData:{
					sampleNo: "RNJSB21120304A001",
					position: '胡同山路西侧300m--',
					type: "环境空气",
					factor: "苯系物",
					operater: "慕容复",
					date: "2022-03-04 10:25:25",
					confirmedBy: '王宝强',
					reviewedBy:'的发生'
				},
				tabItem: [{
					name: '待提交',
				}, {
					name: '待复核',
				}, {
					name: '已驳回'
				}],
				tabIndex:0,
				datas: [1]
			}
		},
		computed:{
		  ...mapGetters([
			'userType'
		  ]),
		  // 是否是采样员
		  isSampler() {
			  if(this.userType == 2) { // 采样员
				return true
			  } else {
				return false
			  }
		  }
		},
		onShow() {
			// 校验是否有用户TOKEN信息 否则跳转登录
			if(this.$db.get('userToken')) {
				uni.switchTab({
					url: '/pages/index/index'
				});
				// return;
			}
			// 查询采样组长 任务列表
			if(!this.isSampler) {
				this.getTeamLeaderTaskList();
			} else {
				
			}
			
		},
		mounted() {},
		methods: {
			tabClick(e){
				this.tabIndex = e
				console.log(`当前切换下标是${this.tabIndex}`)
			},
			changeIndex(val){
				this.tabIndex = val;
			},
			// 采样组长 任务列表
			getTeamLeaderTaskList(){
				this.$api.getTeamLeaderTaskList(res => {
					if(res.success && res.result) {
						res.result = [
							{
								id:"",
								taskStatus:"2",
								createTime:"",
								updateTime:"",
								projectName:"项目名称",
								consignorName:"南京静态产业交通技术研究院",
								inspectionName:"南京环测链环境治理技术有限公司",
								inspectionLinker:"",
								inspectionLinkerPhone:"",
								jobId:"RNJSB21120304A001",
								startDate:"2022-04-12 12:00:00",
								endDate:"2022-04-12",
								taskAddress:"",
								dispatchRemark:"",
								SingImageUrl:"",
								SampleCount:"",
							},
							{
								id:"",
								taskStatus:"2",
								createTime:"",
								updateTime:"",
								projectName:"项目名称",
								consignorName:"南京静态产业交通技术研究院",
								inspectionName:"南京环测链环境治理技术有限公司",
								inspectionLinker:"",
								inspectionLinkerPhone:"",
								jobId:"RNJSB21120304A001",
								startDate:"2022-04-12 12:00:00",
								endDate:"2022-04-12",
								taskAddress:"",
								dispatchRemark:"",
								SingImageUrl:"",
								SampleCount:"",
							},
							{
								id:"",
								taskStatus:"3",
								createTime:"",
								updateTime:"",
								projectName:"项目名称",
								consignorName:"南京静态产业交通技术研究院",
								inspectionName:"南京环测链环境治理技术有限公司",
								inspectionLinker:"",
								inspectionLinkerPhone:"",
								jobId:"RNJSB21120304A001",
								startDate:"2022-04-12 12:00:00",
								endDate:"2022-04-12",
								taskAddress:"",
								dispatchRemark:"",
								SingImageUrl:"",
								SampleCount:"",
							},
							{
								id:"",
								taskStatus:"2",
								createTime:"",
								updateTime:"",
								projectName:"项目名称",
								consignorName:"南京静态产业交通技术研究院",
								inspectionName:"南京环测链环境治理技术有限公司",
								inspectionLinker:"",
								inspectionLinkerPhone:"",
								jobId:"RNJSB21120304A001",
								startDate:"2022-04-12 12:00:00",
								endDate:"2022-04-12",
								taskAddress:"",
								dispatchRemark:"",
								SingImageUrl:"",
								SampleCount:"",
							},
						];
						this.leaderTaskList = res.result;
					}
				})
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
	.tabContainer{
		flex: 1;
		overflow: scroll;
		padding-bottom: 30rpx;
		height: 100%;
	}
	.nodata{
		max-width: 436rpx;
		margin: 200rpx auto;
		display: flex;
		align-self: center;
	}
</style>
