<template>
	<view class="sample-term-wrap" >
		<view class="sample-term">
			<view class="sample-code" >
				<text >固定污染物</text>
			</view>
			<uni-forms ref="factorForm">
				<uni-forms-item name="pollutant" label="污染物名称" >
					<input
						type="text" 
						:disabled="!editable" 
						v-model="item.pollutant" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				
				<uni-forms-item name="gasProduction" label="采气时段" >				
					<input
						type="text" 
						:disabled="!editable"  
						v-model="item.gasProduction" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				
				<uni-forms-item  name="gasFlow" label="采气流量（L/min）" >
					<input
						type="digit" 
						:disabled="!editable" 
						v-model="item.gasFlow" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				
				<uni-forms-item  name="gasVolume" label="采气体积（L）" >
					<input
						type="digit" 
						:disabled="!editable" 
						v-model="item.gasVolume" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				<uni-forms-item  name="standardVolume" label="标态采气体积（L）" >
					<input
						type="digit" 
						:disabled="!editable" 
						v-model="item.standardVolume" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				<uni-forms-item  name="thermometers" label="计温(℃)" >
					<input
						type="digit" 
						:disabled="!editable" 
						v-model="item.thermometers" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				<uni-forms-item  name="pressureGauge" label="计压(kPa)" >
					<input
						type="digit" 
						:disabled="!editable" 
						v-model="item.pressureGauge" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
			</uni-forms>
			
		</view>	
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import uniDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	export default {
		components:{
			uniDataCheckbox,
			wPicker,
			},
		props:{
			item:{
				type: Object,
				default: []
			},
			editable:{
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				measured: "",
				// 三级联动 选择器 标识
				visible: false,
				// 日期 年月日 选择器 标识
				visible2: false,
				// 时间 时分秒 选择器 标识
				visible3: false,
				// 时段
				visible4: false,
				// 单选
				visible5: false,
				defaultRegion: [],//["110000","110100","110102"],
				measuredFormData:{
					firstVal:'',
					secondVal:'',
					avgVal:''
				},
				
			}
		},
		options: { styleIsolation: 'shared' },
		created() {
		},
		methods: {
			// 表单数据 联动下拉
			
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
	width: 37%!important;
	margin-right: 30px;
	font-weight: bolder;
	color: #2E2E2E;
	opacity: 0.8;
}
::v-deep .uni-forms-item__content{
	/* margin-left: 50px; */
	width: 67%!important;
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
	width: 33%!important;
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
	
	.sample-btn{
		height: 40px;
		line-height: 40px;
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
