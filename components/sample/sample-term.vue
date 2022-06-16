<template>
	<view class="sample-term-wrap">
		<view class="sample-term" @click="editTask" :class="collapse?'radius':''">
			<view class="sample-code">
				<text >样品编号：{{sampleData.sampleNo}}</text>
				<text v-if="status"  
				:class="'sample-status color_'+ sampleData.sampleStatus">{{sampleStatusMap[sampleData.sampleStatus]}}</text>
			</view>
			
			<view class="sample-detail">
				<text class="title">检测位置：</text>
				<text class="value">{{sampleData.factorPoint}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">检测类别：</text>
				<text class="value">{{sampleData.secdClassName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">检测因子：</text>
				<text class="value">{{sampleData.factorName}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">采样人：</text>
				<text class="value">{{sampleData.collectUser?sampleData.collectUser:''}}</text>
			</view>
			<view class="sample-detail">
				<text class="title">采样时间：</text>
				<text class="value">{{sampleData.collectTime?sampleData.collectTime:''}}</text>
			</view>
			<!-- 底部分割线条 -->
			<!-- <view class="sample-line" v-if="collapse"></view> -->

		</view>	
		<uni-collapse ref="collapse" v-model="value" @change="change" v-if="collapse" class="collapse-wrap">
			<uni-collapse-item >
				<view class="collapse-content" v-if="showCont"  v-for="(item, index) in collapseList" :key="index">
					
					<view class="sample-detail" >
						<text class="title">{{STOKEN_STUTES[item.auditType]}}：</text>
						<view class="value-collapse">
							<span>{{item.auditUser}}</span>
							<span :class="item.auditStatus==='1'?'status':'status reject'">{{ item.auditStatus==='1'?'通过':'驳回'}}</span>
						</view>
					</view>
					<view v-if="item.auditStatus==='2'" class="sample-detail">
						<text class="title reject">驳回原因：</text>
						<view class="value-collapse">
							<span class="reject">{{item.auditReason}}</span>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<button v-if="collapse" class="button" type="primary" @click="add(sampleData.sampItemId)" >
		<span>审核历史</span>
		<uni-icons v-if="showCont" type="top" size="18" class="icon-taggle"></uni-icons>
		<uni-icons v-else type="bottom" size="18" class="icon-taggle"></uni-icons>
		</button>
	</view>
</template>

<script>
	import uniCollapse from '@/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue'
	const STOKEN_STUTES = {
		'0': '复核人',
		'1': '确认人',
		'2': '审核人'
	}
	export default {
		props:{
			collapse:{
				type: Boolean,
				default: false
			},
			status:{
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: "编辑"
			},
			editable:{
				type: Boolean,
				default: false
			},
			detailStatus:{
				type: String,
				default: "1"
			},
			sampleData: {
				type: Object,
				default: {}
			}
		},
		computed: {
		},
		components:{
			uniCollapse
		},
		data() {
			return {
				STOKEN_STUTES,
				sampleStatusMap:{
					'0':'待采样',
					'1':'已采样',
					'2':'待组长审核',
					'3':'待负责人审核',
					'4':'审核通过',
					'5':'审核失败',
					'6':'已入库',
					'7':'部分出库',
					'8':'已出库',
					'9':'入库中',
					'10':'待复核'
				},
				showCont: false,
				value:['0'],
				collapseList: []
			}
		},
		options: { styleIsolation: 'shared' },
		created() {
				this.getApproveInfo(this.sampleData.sampItemId)
		},
		methods: {
			editTask(){
				console.log("点击进入样品编辑页面 / 详情页");
				// 跳转 任务 -> 样品 -> 详情页
				this.$common.navigateTo('/pages/detail/index?sampItemId=' + this.sampleData.sampItemId + 
				'&editable=' + this.editable + '&title=' + this.title + '&detailStatus=' + this.detailStatus);
			},
			add(sampItemId) {
				this.showCont = !this.showCont;
				// #ifdef MP-WEIXIN
				this.$nextTick(() => {
					this.$refs.collapse.resize()
				})
				// #endif
			},
			getApproveInfo(sampItemId) {
				if(!this.collapseList || this.collapseList.length === 0 ){
					this.$api.commonForGet('sample/getSampleAuditRecordBySampItemId/' + sampItemId,res => {
						if(res.code === 200) {
							this.$nextTick(() => {
								this.collapseList = res.result || []
							})
						}
					})
				} 
			},
			onClick(e) {
				uni.showToast({
					title: '列表被点击'
				})
			},
			change(e) {
				console.log(e);
			}
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
		min-height:390rpx;
		/* height:370rpx; */
		border-radius: 19rpx;
		background:#fff;
		padding:30rpx;
		padding-top:0rpx;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		margin-top: 30rpx;
	}
	.radius{
		border-bottom-left-radius:0 ;
		border-bottom-right-radius:0 ;
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
		height: 14rpx;
		width: 100%;
		border-bottom: 1px solid #ECECEC;;
		color: #2E2E2E;
	}
	.sample-detail{
		margin-top: 25rpx;
		font-size: 25rpx;
		min-height: 32rpx;
		display: flex;
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
	.sample-detail .value-collapse{
		color:#555555;
		font-weight: 400;
		opacity: 0.7;
		width: 70%;
		display: inline-block;
		padding-left:5%;
	}
	.status{
		float: right;
		font-weight: bolder;
		font-size: 25rpx;
	}
	.reject{

		color: #FFDA94 ;
	}
	.confirm{
		color: #2F3A89 ;
	}
	::v-deep .collapse-wrap{
		/* width: 90%!important; */
	
	}
	.collapse-content {
		max-height: 140rpx;
		padding:30rpx;
		padding-top:0rpx;
		padding-bottom:0rpx;
		
	}
	.collapse-content:last-child{
		height: 140rpx;
		padding:30rpx;
		padding-top:0rpx;
		padding-bottom:0rpx;
		
	}
	::v-deep .uni-collapse-item__title{
		display: none!important;
	}
	::v-deep .uni-collapse-item__wrap{
		border-top: 1px solid #ECECEC;
	}
	::v-deep .uni-collapse-item__wrap-content.uni-collapse-item--border{
		border-bottom-width: 0px!important;
	}
	.button{
		height:61rpx;
		width: 100%;
		border-top-left-radius:0 ;
		border-top-right-radius:0 ;
		background-color: #2F3A89;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* 待采样 色号 */
	.color_0{
		color: #60D8FF;
	}
	/* 待复核 色号 */
	.color_10{
		color: #749EF4;
	}
	/* 已采样 色号 */
	.color_1{
		color: #81ACBD;
	}
	.sample-status{
		font-size: 25rpx;
		padding-right: 20rpx;
	}
	.icon-taggle{
		color:#fff;
		margin-left: 5px;
	}
	::v-deep .uniui-bottom{
		color:#fff!important;
	}
	::v-deep .uniui-top{
		color:#fff!important;
	}
</style>
