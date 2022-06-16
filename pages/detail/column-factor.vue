<template>
	<view class="sample-term-wrap">
		<view class="sample-term">
			<view class="sample-code" >
				<text >现场检测因子</text>
			</view>
			<uni-forms ref="factorForm" :modelValue="factorInfo" >
				<uni-forms-item name="formData" :label="factorInfo.factorName" :required="true">
					<template v-if="checkShow.indexOf('isPop') > -1">
						<view class="input-wrap">
							<!-- <text class="dialog-text">{{ factorInfo.factorData }}</text> -->
							<text class="dialog-text" v-if="measured">{{measured}}</text>
							<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
							<text class="input-p" v-if="!measured || measured===''" >{{'请输入'+factorInfo.factorName+'信息'}}</text>
						</view>
						<view @click="openDialog" class="select-cover" v-if="editable"></view>
						<!-- 测定值弹窗 labelType 8 -->
						<uni-popup :ref="'measured' + itemIndex" :animation="false" type="dialog">
							<view class="remark-dilog">
								<uni-forms :modelValue="measuredFormData">
								<uni-forms-item label="第一次测定值:" :required="false">
									<uni-easyinput 
										type="digit" 
										v-model="measuredFormData.firstVal"
										placeholder="请输入测定值" 
									/>
								</uni-forms-item>
								<uni-forms-item label="第二次测定值:" :required="false">
									<uni-easyinput 
										type="digit" 
										v-model="measuredFormData.secondVal"
										placeholder="请输入测定值" 
									/>
								</uni-forms-item>
								<uni-forms-item label="均值:" :required="false">
									<uni-easyinput 
										type="digit" 
										v-model="measuredFormData.avgVal"
										placeholder="请输入测定值" 
									/>
								</uni-forms-item>
								</uni-forms>
								<text class="tips">注：如只输入一次测定值，请在【均值】框中输入结果</text>
								<view class="dialog-btns">
									<view class="dialog-btns-left" @click="closeMeasured">取消</view>
									<view class="dialog-btns-right" @click="onConfirmMeasured()">确定</view>
								</view>
							</view>
						</uni-popup>
					</template>
					<template v-else>
						<input
							type="text" 
							:disabled="!editable" 
							v-model="factorInfo['factorData']" 
							placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
							class="input-wrap"
							:placeholder="'请输入'+factorInfo.factorName+'信息'" 
						/>
					</template>
				</uni-forms-item>
				<!-- 透明度不做展示 -->
				<uni-forms-item v-if="checkShow.indexOf('checkEquipment') > -1 && factorInfo.checkStandardId!=='100001-0053'" name="checkEquipment" label="检测设备" >
					<view class="input-wrap">
						<text v-if="factorInfo.checkEquipment!==null" class="input-f">{{showEquipment(factorInfo.checkEquipment)}}</text>
						<uni-icons v-if="factorInfo.checkEquipment===''||factorInfo.checkEquipment===null" class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
						<text v-if="factorInfo.checkEquipment===''||factorInfo.checkEquipment===null" class="input-p" >{{'请选择现场设备信息'}}</text>
					</view>
					<view @click="visible=true" class="select-cover" v-if="editable"></view>
					<w-picker
						:visible.sync="visible"
						mode="selectorPick"
						:options="equipments" 
						:value="item.value!=null?item.value:''"
						@confirm="onConfirm($event)"
						@cancel="onCancel"
						ref="selectorPick"
					></w-picker>
					
				</uni-forms-item>
				
				<uni-forms-item v-if="checkShow.indexOf('groundConditions') > -1" name="groundConditions" label="测定值" >
					<input
						type="number" 
						:disabled="!editable" 
						v-model="factorInfo['groundConditions']" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入测定值信息'" 
					/>
				</uni-forms-item>
				
				
				<!-- 透明度不做展示，PH值存在理论值 -->
				<uni-forms-item v-if="checkShow.indexOf('theoreticalVal') > -1 && factorInfo.checkStandardId==='100001-0050' && factorInfo.checkStandardId!=='100001-0053'" name="theoreticalVal" label="理论值" >
					<uni-data-checkbox
						:disabled="!editable" 
						v-model="factorInfo['theoreticalVal']"
						:modelValue="item.value"
						:localdata="[
							{
								text: '4.00',
								value:'4.00'
							},
							{
								text: '9.18',
								value:'9.18'
							}
						]" />
				</uni-forms-item>
				
				<uni-forms-item v-if="checkShow.indexOf('positioningOne') > -1" name="positioningOne" label="标准缓冲液I定位值" >				
					<input
						type="number" 
						:disabled="!editable" 
						v-model="factorInfo['positioningOne']" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>

				</uni-forms-item>
				
				<uni-forms-item v-if="checkShow.indexOf('positioningTwo') > -1" name="positioningTwo" label="标准缓冲液II定位值" >
					<input
						type="number" 
						:disabled="!editable" 
						v-model="factorInfo['positioningTwo']" 
						placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
						class="input-wrap" 
						:placeholder="'请输入信息'" 
					/>
				</uni-forms-item>
				
				<uni-forms-item v-if="checkShow.indexOf('positioningThree') > -1" name="positioningThree" label="标准缓冲液II理论值" >
					<input
						type="number" 
						:disabled="!editable" 
						v-model="factorInfo['positioningThree']" 
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
			data:{
				type: Object,
				default: {}
			},
			itemIndex: {
				type: String,
				default: ''
			},
			checkEquipments: {
				type: Array,
				default: []
			},
			editable:{
				type: Boolean,
				default: true
			},
			checkShow: {
				type: Array,
				default: []
			},
		},
		data() {
			return {
				// factorInfo: {
				// 	id: '',
				// 	factorName: '',
				// 	checkStandardId: '',
				// 	factorData: '',
				// 	checkEquipment: '',
				// 	calibrationEquipment: '',
				// 	positioningOne: '',
				// 	positioningTwo: '',
				// 	positioningThree: '',
				// 	theoreticalVal: '',
				// 	groundConditions: '',
				//	measuredFormVal: ''
				// },
				
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
		computed: {
			factorInfo() {
				const nForm = this.data
				if(nForm.measuredFormVal && nForm.measuredFormVal.length > 0) {
					this.measuredFormData = JSON.parse(nForm.measuredFormVal);
					this.measured =  this.measuredFormData.avgVal || ''
				} 
				// else if(nForm.factorData.length > 0){
				// 	debugger
				// 	const nVal = JSON.parse(nForm.factorData)
				// 	if(nVal instanceof Array){
				// 		nForm.factorData = nVal[0].val || ''
				// 	} else if(nVal instanceof Object){
				// 		nForm.factorData = nVal.val || ''
				// 	}
				// }
				return nForm
			},
			equipments() {
				const nEquip = this.checkEquipments.map(item => {
					item.value = item.equipmentName + '^_^'+item.equipmentNumber+'^_^' + item.equipmentModel;
					item.label = item.equipmentName + '('+item.equipmentNumber+') ' + item.equipmentModel;
					return item
				})
				return nEquip
			}
		},
		methods: {
			// 表单数据 联动下拉
			transformSelectDatas(originData) {
				const nOriginData = originData || []
				const selectDatas = nOriginData.map((item) => {
					debugger
					item.value = item.name || item.equipmentNumber;
					item.label = item.name || item.equipmentNumber;
					if(item.children && item.children.length) {
						this.transformSelectDatas(item.children);
					}
					return item;
				});
				return selectDatas;
			},
			change(e) {
				console.log(e);
			},
			openDialog() {
				this.$refs['measured' + this.itemIndex].open();
			},
			
			onConfirm(selectData){
				debugger
				const formVal = selectData.value;
				this.factorInfo['checkEquipment'] = formVal;
			},
			onConfirmMeasured(){
				this.$refs['measured' + this.itemIndex].close();
				const val = [
					{
						'desc': '第一测定值',
						'val': this.measuredFormData.firstVal,
					},
					{
						'desc': '第二测定值',
						'val': this.measuredFormData.secondVal,
					},
					{
						'desc': '均值',
						'val': this.measuredFormData.avgVal,
					},
				]
				this.factorInfo['factorData'] = JSON.stringify(val);
				this.factorInfo['measuredFormVal'] = JSON.stringify(this.measuredFormData);
				debugger
				this.measured = this.measuredFormData.avgVal;
			},
			closeMeasured(){
				this.$refs['measured' + this.itemIndex].close();
			},
			
			showEquipment(val){
				let showVal = ""
				if(val && val.length > 0){
					showVal = val.replaceAll('^_^', '-')
				}
				return showVal
			},
			// 获取栏目数据
			getData() {
				return this.formData;
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
