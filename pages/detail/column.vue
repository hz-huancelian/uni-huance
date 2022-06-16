<template>
	<view class="sample-term-wrap">
		<view class="sample-term">
			<view class="sample-code" v-if="data.groupName">
				<text >{{data.groupName}}</text>
			</view>
			<uni-forms ref="baseForm" :modelValue="formData" :rules="formRules">
				<template v-for="(item,index) in data.params">
					<!-- 级联选择-->
					<template v-if="item.labelType === '0'">
						<uni-forms-item :key="index" :label="item.name" :required="item.required">
							<view class="input-wrap">
								<text v-if="formData[item.key]" class="input-f">{{formData[item.key]}}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-if="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							<template v-if="item.key === 'sampEquipment'">
								<w-picker
									:visible.sync="visible"
									:datas="item.selectValue?transformSelectDatas(item.selectValue):[]"
									mode="region"
									:value="item.value?item.value:[]"
									default-type="value"
									:hide-area="false"
									@confirm="onConfirm($event, item.key)"
									@cancel="onCancel"
									ref="region" 
								></w-picker>
							</template>
							<template v-else>
								<w-picker
									:visible.sync="visible6"
									:datas="item.selectValue?transformSelectDatas(item.selectValue):[]"
									mode="region"
									:value="item.value?item.value:[]"
									default-type="value"
									:hide-area="false"
									@confirm="onConfirm($event, item.key)"
									@cancel="onCancel"
									ref="region" 
								></w-picker>
							</template>
						</uni-forms-item>
					</template>
					<!-- 日期选择 年-月-日 -->
					<template v-if="item.labelType === '4'">
						<uni-forms-item :key="index"  :label="item.name" :required="item.required">
							<view class="input-wrap">
								<text v-if="formData[item.key]" class="input-f">{{formData[item.key]}}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-if="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<template v-if="item.key==='collectDate'&&saveSampleDate!=='1'">
							</template>
							<template v-else>
								<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							</template>
							<w-picker
								:visible.sync="visible2"
								mode="date" 
								startYear="2017" 
								endYear="2029"
								:value="item.value?item.value:''"
								:current="true"
								fields="day"
								@confirm="onConfirm($event, item.key)"
								@cancel="onCancel"
								:disabled-after="false"
								ref="date" 
							></w-picker>
						</uni-forms-item>
					</template>
					
					<!-- 时间选择 时-分-秒 -->
					<template v-if="item.labelType === '5'">
						<uni-forms-item :key="index"  :label="item.name" :required="item.required">
							<view class="input-wrap">
								<text v-if="formData[item.key]" class="input-f">{{(formData[item.key] && formData[item.key]!='') ?formData[item.key]:''}}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-if="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							<w-picker
								:visible.sync="visible3"
								mode="time" 
								:value="item.value?item.value:''"
								:current="false"
								@confirm="onConfirm($event, item.key)"
								@cancel="onCancel"
								ref="time" 
							></w-picker>
						</uni-forms-item>
					</template>
					
					<!-- 时段 开始-结束时间 -->
					<template v-if="item.labelType === '6'">
						<uni-forms-item :key="index"  :label="item.name" :required="item.required">
							<view class="input-wrap">
								<text v-if="formData[item.key]" class="input-f">{{formData[item.key]}}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-if="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							<!-- <view @click="selectVal(item.labelType, item.key)" class="select-cover" ></view> -->
							<w-picker
								:visible.sync="visible4"
								mode="rangeTime" 
								startYear="0" 
								endYear="23"
								:value="item.value?item.value:''"
								:current="false"
								:second ="false"
								@confirm="onConfirm($event,item.key)"
								@cancel="onCancel"
								ref="range" 
							></w-picker>
						</uni-forms-item>
					</template>
					
					<!-- 单选 -->
					<template v-if="item.labelType === '7'">
						<uni-forms-item :key="index"  :label="item.name" :required="item.required">
							<view class="input-wrap">
								<text v-if="formData[item.key]" class="input-f">{{formData[item.key]}}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-if="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							<w-picker
								:visible.sync="visible5"
								mode="selectorPick"
								:options="item.selectValue?item.selectValue.map((item)=>{
									return {
										label: item,
										value:item
									}
								}):[]" 
								:value="item.value?item.value:''"
								@confirm="onConfirm($event,item.key)"
								@cancel="onCancel"
								ref="selectorPick"
							></w-picker>
						</uni-forms-item>
					</template>
					<!-- 测定值 -->
					<template v-if="item.labelType === '8'">
						<uni-forms-item :key="index"  :label="item.name" :required="item.required">
							<view class="input-wrap">
								<!-- <text v-show="formData[item.key]" class="input-f">{{formData[item.key]}}</text> -->
								<text class="dialog-text" v-show="formData[item.key]">{{ measured }}</text>
								<uni-icons class="input-f-icon" type="forward" size="16" color="#c0c4cc"></uni-icons>
								<text class="input-p" v-show="!formData[item.key]">{{'请输入'+item.name+'信息'}}</text>
							</view>
							<view @click="selectVal(item.labelType, item.key)" class="select-cover" v-if="editable"></view>
							<!-- 测定值弹窗 labelType 8 -->
							<uni-popup ref="measured" :animation="true" type="dialog">
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
										<view class="dialog-btns-right" @click="onConfirmMeasured(item.key)">确定</view>
									</view>
								</view>
							</uni-popup>
						</uni-forms-item>
					</template>
					
					<!-- input 框-->
					<template v-if="item.labelType === '1'">
						<uni-forms-item  :key="index" :name="item.key" :label="item.name" :required="item.required">
							<!-- <uni-data-easyinput 
								:type="item.numericType ==='1'? 'text': 'number'"
								v-model="formData[item.key]"
								:name="item.key"
								:modelValue="item.value" 
								:disabled="!editable"
								:placeholder="'请输入'+item.name+'信息'" 
							/> -->
							<input 
								:type="item.numericType ==='1'? 'text': 'digit'" 
								:disabled="!editable" 
								v-model="formData[item.key]" 
								placeholder-style="color: #999;font-size: 12px;font-weight: 200;padding-left: 2px;"
								class="input-wrap" 
								:placeholder="'请输入'+item.name+'信息'" 
							/>
							
							
						</uni-forms-item>
					</template>
					
					<!-- radio 单选 -->
					<template v-if="item.labelType === '2'">
						<uni-forms-item :key="index" :name="item.key"  :label="item.name" :required="item.required">
							<uni-data-checkbox 
								:disabled="!editable" 
								v-model="formData[item.key]" 
								:modelValue="item.value?item.value:''"
								:localdata="item.radioValue?item.radioValue.map((item)=>{
								return {
									text: item,
									value:item
								}
							}):[]" />
						</uni-forms-item>
					</template>
					
				</template>
			</uni-forms>
		</view>	
	</view>
</template>

<script>
	import areaData from "@/components/w-picker/areadata/areadata.js"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import uniDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	import uniDataEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	export default {
		components:{
			uniDataCheckbox,
			uniDataEasyinput,
			wPicker,
			},
		props:{
			data:{
				type: Object,
				default: {}
			},
			editable:{
				type: Boolean,
				default: true
			},
			saveSampleDate: {
				type: String,
				default: '',
			}
			
		},
		data() {
			return {
				// 测定值 保存字段
				measured: "",
				mode: '',
				key: '',
				// 三级联动 选择器 标识 通用
				visible: false,
				// 三级联动 选择器 标识 采样
				visible6: false,
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
				currentCollectTime: '',
				currentKey : ''
				
			}
		},
		options: { styleIsolation: 'shared' },
		computed:{
			// 表单数据
			formData() {
				const data = JSON.parse(JSON.stringify(this.data));
				const form = {};
				// 保存 二级对象 groupKey
				form.columnKey = data.groupKey;
				// 添加表单字段
				if(data.params){
					for(let i = 0; i < data.params.length; i++) {
						const key = data.params[i]["key"];
						// 添加值
						form[key] = data.params[i]["value"] || '';
					}
				}
				return form;
			},
			
			// 表单校验规则
			formRules() {
				const data = JSON.parse(JSON.stringify(this.data));
				const rules = {};
				if(data.params){
					for(let i = 0; i < data.params.length; i++) {
						const key = data.params[i]["key"];
						const label = data.params[i]["name"];
						const isRequired = data.params[i]["required"];
						if(isRequired) {
							rules[key] = {};
							rules[key]["rules"] = [{
								required: true,
								errorMessage: `${label}不能为空`
							}];
						}
					}
				}
				return rules;
			},
		},
		created() {
		},
		mounted() {
			
		},
		methods: {
			// 表单数据 联动下拉
			transformSelectDatas(originData) {
				const nOriginData = originData || []
				const selectDatas = nOriginData.map((item) => {
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
			checkTime(val) {
				debugger
				if(val.split(' ').length > 1) {
					return val.split(' ')[1]
				} 
				return val
			},
			selectVal(labelType, key){
				this.currentKey = key
				// 三级联动 选择 labelType  0
				if(labelType === '0' ) {
					if(key === 'sampEquipment'){
						this.visible= true;
					} else {
						this.visible6= true;
					}
				}
				// 年月日 选择 labelType  4
				if(labelType === '4') {
					this.visible2= true;
				}
				// 时分秒 选择 labelType  5
				if(labelType === '5') {
					this.visible3= true;
				}
				// 时段 labelType  6
				if(labelType === '6') {
					this.visible4= true;
				}
				// 单选 labelType  7
				if(labelType === '7') {
					this.visible5= true;
				}
				// 测定值 labelType  8
				if(labelType === '8') {
					this.$refs.measured[0].open();
				}
				
			},
			onConfirm(selectData, key){
				debugger
				console.log(this.currentKey)
				this.$nextTick(function(){
					const formVal = selectData.result;
					this.formData[this.currentKey] = formVal;
				})
				
				// if(key === 'collectTime' ){
				// 	this.formData[key] = formVal;
				// }
				
				// TODO 临时把采样时间 加上采样日期的数据
				// if(key === 'collectTime' ){
				// 	this.currentCollectTime = formVal
				// 	if(this.formData['collectDate'] && this.formData['collectDate'].length > 0) {
				// 		this.formData[key] = this.formData['collectDate'] + ' ' + formVal;
				// 	} else {
				// 		this.$common.errorToShow("请先选择日期，在选择对应时间")
				// 		this.formData[key] = ""
				// 	}
				// }
				 
				 
				 
			},
			onConfirmMeasured(key){
				this.$refs.measured[0].close();
				const val = `${this.measuredFormData.firstVal}-${this.measuredFormData.secondVal}-${this.measuredFormData.avgVal}`;
				this.formData[key] = val;
				this.measured = val;
			},
			closeMeasured(){
				this.$refs.measured[0].close();
			},
			
			onCancel(){
				
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
	width: 33%!important;
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
	font-size: 12px;
}
.input-f {
	padding-left: 10px;
	padding-right: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
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
	width: 40%!important;
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
	.placeholder-style {
	  color: green;
	  padding-left: 88rpx;
	}
</style>
