<template>
	<view class="task-wrap">
        <u-tabs :list="tabItem" @click="tabClick" :current="currentIndex" @change="changeIndex" :scrollable="false" activeColor="#2F3A89" barWidth="60"></u-tabs>
		<view class="tabContainer">
			<view class="scroll-wrap">
				<!-- 0 待审批 1 待入库 2 已完成 - 任务列表 -->
				<template v-if="currentIndex === 0 || currentIndex === 2 || currentIndex === 3">
					<template v-if="taskDatas.length > 0">
						<approveTerm v-for="(item,index) in taskDatas" :key="index" :item="item" :pageStatus="CHOSE_TOKEN[currentIndex]"></approveTerm>
					</template>
					<template v-else>
						<image class="nodata" src="http://www.huancelian.com/wxStatic/nodata.svg"></image>
					</template>
				</template>
				<!-- 已驳回 - 已驳回列表 和样品列表一样的组件，多了审批历史DOM -->
				<template v-if="currentIndex === 1">
					<template v-if="taskDatas.length > 0">
						<sampleTerm v-for="(item, index) in sampleDatas" :key="index" :collapse="true" :sampleData="item" title="编辑" :editable="true" detailStatus="1"></sampleTerm>
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
	import tabbar from '@/components/tab/tab.vue'
	import sampleTerm from '@/components/sample/sample-term.vue'
	import approveTerm from '@/components/sample/approve-term.vue'
	const CHOSE_TOKEN = {
		'0':'0',
		'1':'3',
		'2':'1',
		'3':'2',
	}
	export default {
		components:{
			tabbar,
			sampleTerm,
			approveTerm
		},
		data() {
			return {
				CHOSE_TOKEN,
				// tabItem:['待审批','已驳回','待入库','已完成'],
				tabItem: [{
					name: '待审批',
				}, {
					name: '已驳回',
				}, {
					name: '待入库'
				},{
					name: '已完成'
				}],
				tabIndex:0,
				currentIndex: 0,
				loadingType: 'more',
				datas: [1],
				taskDatas:[],
				sampleDatas:[],
				showNoData: false
			}
		},
		computed:{
			getChose(){
				
			}
		},
		// 加载更多
		onReachBottom() {
			if (this.loadingType === 'nomore') return;
			this.pageNumber++;
			if(this.tabIndex != 3) {
				this.getLeaderTodoList('onBottom')
			} else {
				this.getRejectList('onBottom')
			}
		},
		onShow() {
			this.showNoData = false
			this.pageNumber = 1
			this.loadingType = 'more';
			this.changeIndex(this.currentIndex)
		},
		methods: {	
			changeIndex(val){
				this.currentIndex = val
				if(val == 0) {
					this.tabIndex = 0
				} else if(val == 1) {
					this.tabIndex = 3
				} else if(val == 2) {
					this.tabIndex = 1
				} else if(val == 3) {
					this.tabIndex = 2
				}
				this.taskDatas = [];
				this.sampleDatas = [];
				if(this.tabIndex != 3) {
					this.getLeaderTodoList()
				} else {
					this.getRejectList()
				}
			},
			getLeaderTodoList(type) {
				if (type === 'refresh') uni.stopPullDownRefresh();
				if (type !== 'onBottom') {
					this.leaderTaskList = []
					this.loadingType = 'nomore'
				}
				const param = {
					sampleStatus: this.tabIndex,
					pageNumber: this.pageNumber,
					pageSize: 8
				}
				this.$api.getSamplerTodoList(param ,res => {
					if(res.success && res.result.records.length > 0) {
						this.loadingType = res.result.records.length === 8 ? 'more' : 'nomore';
						this.taskDatas = [...this.taskDatas, ...res.result.records];
					} 
					if(!this.taskDatas || this.taskDatas.length == 0) {
						this.loadingType = 'nomore';
					}
				})
			},
			getRejectList(type) {
				if (type === 'refresh') uni.stopPullDownRefresh();
				if(type !== 'onBottom') {
					this.leaderTaskList = []
					this.loadingType = 'nomore'
				}
				const param = {
					pageNumber: this.pageNumber,
					pageSize: 8
				}
				this.$api.getRejectedSampleList(param ,res => {
					if(res.success && res.result.records.length > 0) {
						this.loadingType = res.result.records.length === 8 ? 'more' : 'nomore';
						this.sampleDatas = [...this.sampleDatas, ...res.result.records];
					} 
					if(!this.sampleDatas || this.sampleDatas.length == 0) {
						this.loadingType = 'nomore';
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
