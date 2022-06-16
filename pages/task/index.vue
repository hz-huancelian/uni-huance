<template>
	<view class="task-wrap">
		<!-- tab切换 -->
		<u-tabs v-if="isSampler" :list="tabItem" @click="tabClick" :current="tabIndex" @change="changeIndex" :scrollable="false" activeColor="#2F3A89" barWidth="60"></u-tabs>
		
		<!-- 任务容器 -->
		<view class="tabContainer">
			<view class="scroll-wrap">
				<template v-if="isSampler">
					<!-- 待提交 - 样品列表 -->
					<!-- 已驳回 - 已驳回列表 和样品列表一样的组件，多了审批历史DOM -->
					<template v-if="tabIndex === 0 || tabIndex === 2">
						<template v-if="sampleDatas && sampleDatas.length > 0">
							<sampleTerm 
								v-for="(item, index) in sampleDatas" 
								:key="index" 
								:collapse="tabIndex === 2"
								:sampleData="item" 
								title="编辑" 
								:editable="true" 
								detailStatus="4">
							</sampleTerm>
						</template>
						<template v-else>
							<image class="nodata" src="http://www.huancelian.com/wxStatic/nodata.svg"></image>
						</template>
					</template>
					<!-- 待复核 - 项目列表 -->
					<template v-if="tabIndex === 1">
						<template v-if="sampleDatas && sampleAppData.length > 0">
							<approveTerm
								v-for="(item, index) in sampleAppData"
								:key="index"
								:item="item"
								pageStatus="4"
							></approveTerm>
						</template>
						<template v-else>
							<image class="nodata" src="http://www.huancelian.com/wxStatic/nodata.svg"></image>
						</template>
					</template>
				</template>
				<!-- 采样组长 任务列表-->
				<template v-else>
					<template v-if="leaderTaskList && leaderTaskList.length > 0">
						<template v-for="(item, index) in leaderTaskList" >
							<group-leader-term :taskDetail="item" :key="index"></group-leader-term>
						</template>
					</template>
					<template v-else>
						<image class="nodata" src="http://www.huancelian.com/wxStatic/nodata.svg"></image>
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
				pageNumber: 1,
				leaderTaskList: [],
				sampleDatas: [],
				sampleAppData:[],
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
				loadingType: 'more',
				showNoData: false
			}
		},
		computed:{
		  ...mapGetters([
			'tabBarList',
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
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			this.leaderTaskList = []
			this.sampleAppData = []
			this.sampleDatas = []
			if(!this.isSampler) {
				this.getTeamLeaderTaskList();
			} else {
				this.changeIndex(this.tabIndex);
			}
		},
		// 加载更多
		onReachBottom() {
			if (this.loadingType === 'nomore') return;
			this.pageNumber++;
			if(!this.isSampler) {
				this.getTeamLeaderTaskList('onBottom');
			} else {
				this.changeIndex(this.tabIndex);
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.loadingType === 'nomore') return;
			this.pageNumber = 1;
			this.leaderTaskList = []
			if(!this.isSampler) {
				this.getTeamLeaderTaskList();
			} else {
				this.changeIndex(this.tabIndex);
			}
		},
		onShow() {
			this.pageNumber = 1
			if(this.tabBarList.length > 0) {
				this.getShowData()
			} else {
				this.getCurrentUserInfo()
			}
		},
		methods: {
			getShowData() {
				this.showNoData = false
				// 查询采样组长 任务列表
				if(!this.isSampler) {
					this.getTeamLeaderTaskList();
				} else {
					this.changeIndex(this.tabIndex)
				}
			},
			tabClick(e){
				this.tabIndex = e
				console.log(`当前切换下标是${this.tabIndex}`)
			},
			changeIndex(val){
				this.tabIndex = val;
				if(val != 1) {	 // 提交、复合 查询
					this.getSamplerTaskList();
				} else {
					this.getSampleTasksForCollectUser()
				}
			},
			// 采样组长 任务列表
			getTeamLeaderTaskList(type){
				if (type === 'refresh') uni.stopPullDownRefresh();
				if(type !== 'onBottom') {
					this.leaderTaskList = []
					this.loadingType = 'nomore'
				}
				const param = {
					pageNumber: this.pageNumber,
					pageSize: 8,
					order: '',
					sort: ''
				}
				this.$api.getTeamLeaderTaskList(param ,res => {
					if(res.success &&  res.result.records.length > 0) {
						this.loadingType = res.result.records.length === 8 ? 'more' : 'nomore';
						this.leaderTaskList = [...this.leaderTaskList, ...res.result.records];
					} 
					if(!this.leaderTaskList || this.leaderTaskList.length == 0) {
						this.loadingType = 'nomore';
					}
				})
			},
			getSamplerTaskList(type) { 	// 待提交、已驳回
				if (type === 'refresh') uni.stopPullDownRefresh();
				if(type !== 'onBottom') {
					this.sampleDatas = []
					this.loadingType = 'nomore'
				}
				const param = {
					sampleStatus: this.tabIndex == 0?0:1,
					pageNumber: this.pageNumber,
					pageSize: 8,
				}
				this.$api.getSamplerTaskList(param, res => {
					if(res.code === 200 && res.result.records.length > 0) {
						this.loadingType = res.result.records.length === 8 ? 'more' : 'nomore';
						this.sampleDatas = [...this.sampleDatas, ...res.result.records];
					}
					if(!this.sampleDatas || this.sampleDatas.length == 0) {
						this.loadingType = 'nomore';
					}
				})
			},
			getSampleTasksForCollectUser(type) {	// 待复核
				if (type === 'refresh') uni.stopPullDownRefresh();
				if(type !== 'onBottom') {
					this.sampleAppData = []
					this.loadingType = 'nomore'
				}
				const param = {
					pageNumber: this.pageNumber,
					pageSize: 8,
				}
				this.$api.getSampleTasksForCollectUser(param, res => {
					if(res.code === 200 && res.result.records.length > 0) {
						this.loadingType = res.result.records.length === 8 ? 'more' : 'nomore';
						this.sampleAppData = [...this.sampleAppData, ...res.result.records];
					}
					if(!this.sampleAppData || this.sampleAppData.length == 0) {
						this.loadingType = 'nomore';
					}
				})
			},
			getCurrentUserInfo() {
				this.$api.getUserInfo(res => {
					if(res.success && res.result) {
						this.$store.commit('SAVE_CUR_USER', res.result);
						if(res.result.appRoles.length > 0) {
							this.$store.commit('SAVE_ROLE_LISTS', res.result.appRoles);
							switch(res.result.appRoles[0]) {
								 case '2':
									this.$store.commit('SAVE_CUR_ROLE', {roleId: 2, roleName: '采样员'});
									break
								 case '1':
									this.$store.commit('SAVE_CUR_ROLE', {roleId: 1, roleName: '采样组长'});
									break
								 default:
									this.$store.commit('SAVE_CUR_ROLE', {});
							}
						} else {
							this.$store.commit('SAVE_ROLE_LISTS', res.result.appRoles);
						}
						this.getShowData()
					} else {
						this.$common.errorToShow(res.result)
					}
				})
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
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.tabContainer{
		flex: 1;
		/* overflow: scroll; */
		padding-bottom: 140rpx;
		height: 100%;
	}
	.scroll-wrap {
		margin-bottom: 140rpx;
	}
	.nodata{
		max-width: 436rpx;
		margin: 200rpx auto;
		display: flex;
		align-self: center;
	}
</style>
