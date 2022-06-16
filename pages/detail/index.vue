<template>
	<view class="task-wrap">
		<view class="clomn-wrap">
			<view class="tabContainer">
				<!-- 项目信息 -->
				<view class="project-info">
					<view class="sample-detail">
						<text class="title">项目名称：</text>
						<text class="value">{{projectInfo.projectName }}</text>
					</view>
					<view class="sample-detail">
						<text class="title">委托单位：</text>
						<text class="value">{{projectInfo.consignorName}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">检测类型：</text>
						<text class="value">{{sampleInfo.secdClassName}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">项目地址：</text>
						<text class="value">{{projectInfo.taskAddress}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">受检单位：</text>
						<text class="value">{{projectInfo.inspectionName}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">委托联系人：</text>
						<text class="value">{{projectInfo.inspectionLinker}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">联系电话：</text>
						<text class="value">{{projectInfo.inspectionLinkerPhone}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">任务完成时间：</text>
						<text class="value">{{projectInfo.endDate}}</text>
					</view>
				</view>
				
				<!-- 样品信息 -->
				<view class="project-info">
					<view class="sample-detail">
						<text class="title">样品编码：</text>
						<text class="value">{{sampleInfo.sampleNo }}</text>
					</view>
					<view class="sample-detail">
						<text class="title">检测因子：</text>
						<text class="value">{{sampleInfo.factorName}}</text>
					</view>
					<view class="sample-detail">
						<text class="title">点位：</text>
						<text class="value">{{sampleInfo.factorPoint}}</text>
					</view>
				</view>
				<!-- 固定内容 ： 采样日期，采样时间 -->
				
				
				<!-- 普通栏目 -->
				<template v-for="(item, index) in sampleDataVo">
					<column :ref="'column_'+item.groupKey" :data="item" :key="index" :saveSampleDate="frequency" :editable="editable === 'true'"></column>
				</template>
				
				<!-- 检测因子栏目 -->
				<template v-if="factorDataVos.length > 0 && factorShow" v-for="(item, index) in factorDataVos">
					<column-factor 
						:ref="'factor_column_'+index" 
						:key="index" 
						:checkEquipments="checkEquipments" 
						:data="item" 
						:itemIndex="index" 
						:editable="editable === 'true'"
						:checkShow="checkShow"
						>
					</column-factor>
				</template>
				
				<!-- 特别说明 -->
				<specialRemark v-if="specialNote.specialNoteFlag"
					ref="specialNote"
					:editable="editable === 'true'" 
					:specialNote="specialNote.specialNote">
				</specialRemark>
				
				<!-- 污染物信息-有组织废气/锅炉 -->
				<template v-if="showPollist && pollist.length > 0" v-for="(item, index) in pollist">
					<pollistView :ref="'pollistRef_' + index" :item="item" :editable="editable === 'true'" />
					<view class="sample-btn" v-if="editable === 'true'">
						<view class="dialog-btns-wrap" v-if="index==0" @click="addResult()">添加</view>
						<view class="dialog-btns-wrap" v-if="index>0"  @click="deleResult(index)">删除</view>
					</view>
				</template>
				
				<!-- 采样复核人 -->
				<reviewUser
					:key="Math.random()"
					ref="reviewUser"
					:editable="editable === 'true'" 
					:datas="allReviewers"
					:reviewUserId.sync = "reviewUserId"
					:reviewUser="reviewUser">
				</reviewUser>
				
				<!-- 上传图像栏目 -->
				<upload v-if="editable === 'true'" :fileList="fileList" ref="upload"></upload>
				<template v-else>
					<upload-detail v-if="fileList.length" :fileList="fileList"></upload-detail>
				</template>
				
				<!-- 地址信息 --> 
				<position :editable="editable === 'true'" :address="address" ref="position"></position>
			</view>
		</view>
		<!-- detailStatus 等于0 的场景是 不展示底部按钮 -->
		<template v-if="detailStatus !== '0'">
			<!-- 保存  提交  样品员 （待提交、已驳回）-->
			<view class="approve-all" v-if="detailStatus === '1' || detailStatus === '4'">
				<button class="save-btn" type="primary" :disabled="butDisabled" @click="saveSample">保存</button>
				<button class="submit-btn" type="primary" :disabled="butDisabled" @click="submit">提交</button>
			</view>
			<!-- 驳回  通过 样品员 （待复核）-->
			<view class="approve-all" v-if="detailStatus === '2'">
				<button class="reject-btn" type="primary" @click="reviewBack">驳回</button>
				<button class="submit-btn" type="primary" :disabled="butDisabled" @click="reviewSubmit">通过</button>
			</view>
			
			<view class="approve-all" v-if="detailStatus === '5'">
				<button class="reject-btn" type="primary" @click="auditSampleBack">驳回</button>
				<button class="submit-btn" type="primary" :disabled="butDisabled" @click="auditSampleSubmit">确认</button>
			</view>
			
			<!-- 取消  申请入库 样品组长 （待入库）-->
			<view class="approve-all" v-if="detailStatus === '3'">
				<button class="save-btn" type="primary" @click="backPage">返回</button>
				<button class="submit-btn" type="primary" :disabled="butDisabled" @click="applySubmit">申请入库</button>
			</view>
			
			<uni-popup ref="backResult" type="dialog" :animation="false">
				<view class="remark-dilog">
					<view class="remark-dilog-title">
						<text>驳回原因</text>
					</view>
					<view class="remark-dilog-body">
						<uni-easyinput type="textarea" v-model="backReason" :maxlength="36" placeholder="请输入内容">
						</uni-easyinput>
					</view>
					<view class="dialog-btns">
						<view class="dialog-btns-left" @click="cancleResult">取消</view>
						<view class="dialog-btns-right" :disabled="butDisabled" @click="confirmResult()">确定</view>
					</view>
				</view>
			</uni-popup>
		</template>
    </view>
</template>

<script>
	import detail from './detail.js'
	// 检测因子栏目
	import columnFactor from './column-factor.vue'
	// 普通栏目
	import column from './column.vue'
	// 上传图片 可编辑
	import upload from './upload.vue'
	// 上传图片 仅展示
	import uploadDetail from './upload-detail.vue'
	// 上传图片 可编辑
	import position from './position.vue'
	// 特别说明
	import specialRemark from './specialRemark.vue'
	// 采样复核人
	import reviewUser from './reviewUser.vue'
	// 污染物
	import pollistView from './pollist.vue'
	
	export default {
		components:{
			columnFactor,
			column,
			upload,
			uploadDetail,
			position,
			specialRemark,
			reviewUser,
			pollistView
		},
		data() {
			return {
				sampItemId: '',
				sampleNo: '',
				editable: '',
				frequency: '',
				title: '',
				detailStatus: '', // 1展示 2提交 3保存 4按钮
				sampleInfo: {},
				// 页面标题
				pageTitle: '',
				// 底部按钮文案
				approveText: 'fdsf',
				name: "",
				unit: "",
				sampleNums: "",
				reviewedNums: "",
				waitingConfirmedNums: "",
				hasConfirmedNums: "",
				collectedNums: "",
				fileList:[],
				address:"",
				detailStatus: '',
				currentfactorDataVos: [],
				checkEquipments: [],
				allReviewers: [],
				checkShow: [],
				showBackVisible: false,
				errorResult: '',
				backReason: '',
				opType: '',
				butDisabled: false,
				isScanOper: false,
				factorShow: false,
				showPollist: false,
				pollist: []
			}
		},
		computed:{
			// 项目想信息
			projectInfo() {
				return this.sampleInfo.sampleJobVo || {};
			},
			// 检测因子栏目
			factorDataVos(){
				// 该处需要做处理 因子列表会根据不同的二级类别 做不同操作处理
				const nFactors = this.sampleInfo.factorDataVos?this.sampleInfo.factorDataVos.filter(i => i.dataEntryStep === '1') : []
				return nFactors || [];
			},
			// 特别说明
			specialNote() {
				return {
					specialNoteFlag: this.sampleInfo.sampleDataVo && this.sampleInfo.sampleDataVo.specialNoteFlag || false,
					specialNote: this.sampleInfo.sampleDataVo && this.sampleInfo.sampleDataVo.specialNote || ''
				}
			},
			
			// 复核人
			reviewUser() {
				return this.sampleInfo.sampleDataVo && this.sampleInfo.sampleDataVo.reviewUser || '';
			},
			// 复核人
			reviewUserId() {
				return this.sampleInfo.sampleDataVo && this.sampleInfo.sampleDataVo.reviewUserId || '';
			},
			// 普通栏目
			sampleDataVo(){
				let structure = null
				if(this.sampleInfo.sampleDataVo && this.sampleInfo.sampleDataVo.sampleData){
					debugger
					structure = this.sampleInfo.sampleDataVo.sampleData
					// 回塞采样日期
					structure.forEach(i => {
						const nParams = i.params || []
						nParams.forEach(j => {
							if(j.key === "collectDate"){
								j.value = this.sampleInfo.sampleDataVo.collectDate
							}
						})
					})
				}
				return structure || [];
			},
			
		},
		onLoad(e) {
			this.butDisabled = false
			if(e.sampleNo) {
				this.sampleNo = e.sampleNo 
				this.editable = e.editable || ''
				this.title = e.title || ''
				this.detailStatus = e.detailStatus || ''
				this.isScanOper = true
			}
			if(e.sampItemId) {
				this.sampItemId = e.sampItemId
				this.editable = e.editable || ''
				this.title = e.title || ''
				this.detailStatus = e.detailStatus || ''
				this.isScanOper = false
				this.getCheckEquip()
			}
		},
		onShow() {
			debugger
			this.getReviewUsers()
			if(this.isScanOper) { // 录入的时候 根据sampleNo 获取详情
				// 查询样品详情
				this.getSampleForNo();
			} else {
				// 不为录入的时候 根据sampleId 获取详情
				this.queryDetail();
			}
		},
		mounted(){
			// 设置页面title
			uni.setNavigationBarTitle({
			　　title: this.title
			});
		},
		methods: {
			getCheckEquip() {
				this.$api.commonForGet('sample/listCheckEquipments/' + this.sampItemId,res => {
					if(res.code === 200) {
						this.checkEquipments = res.result || []
					}
				}) 
			},
			tabClick(e){
				this.tabIndex = e
				console.log(`当前切换下标是${this.tabIndex}`)
			},
			getSampleForNo() {
				// 获取样品动态结构
				this.$api.getSampleForNo('sample/getSampleDetailBySampleNo/' + this.sampleNo, res => {
					if(res.code ===200) {
						this.sampleInfo = res.result || {}
						this.sampItemId = res.result.sampItemId
						this.address = res.result.sampleDataVo.collectLocation || ''
						this.frequency = res.result.frequency || ''
						const images = res.result.sampleDataVo.imageList || []
						if(images) {
							this.fileList = images.map(item => {
								const img = {
									name:item,
									extname: item.split(".")[1],
									url: `http://www.huancelian.com/cyImg/${item}`
								};
								return img;
							});
						}
						if(res.result.sampleDataVo.pollutantInfo && res.result.sampleDataVo.pollutantInfo.length > 0){
							this.pollist = JSON.parse(res.result.sampleDataVo.pollutantInfo) || []
						}
						debugger
						this.getFactorInfo(res.result)
						this.getCheckEquip()
					}
				})
			},
			queryDetail() {
				debugger
				this.$api.getSampleForId('sample/detail/' + this.sampItemId, res => {
					if(res.code ===200) {
						this.sampleInfo = res.result || {}
						this.address = res.result.sampleDataVo.collectLocation || ''
						this.frequency = res.result.frequency || ''
						const images = res.result.sampleDataVo.imageList || []
						if(images) {
							this.fileList = images.map(item => {
								const img = {
									name:item,
									extname: item.split(".")[1],
									url: `http://www.huancelian.com/cyImg/${item}`
								};
								return img;
							});
						}
						if(res.result.sampleDataVo.pollutantInfo && res.result.sampleDataVo.pollutantInfo.length > 0){
							this.pollist = JSON.parse(res.result.sampleDataVo.pollutantInfo) || []
						}
						debugger
						this.getFactorInfo(res.result)
					}
				})
			},
			getFactorInfo(data) {
				this.checkShow = []
				// this.pollist = [] 
				this.factorShow = false
				let showLabel = []
				debugger
				const secdClassId = data.secdClassId
				if (secdClassId === '001001' || secdClassId === '001004') { // 废水【雨水】
					showLabel = ['isPop','checkEquipment','positioningTwo','positioningThree', 'positioningOne']
					this.factorShow = true
				} else if (secdClassId === '002002' || secdClassId === '0020022') { // 有组织废气/锅（窑）炉废气
				 	showLabel = ['isFactor']
					if(this.pollist && this.pollist.length <= 0){
						this.pollist = [{
							pollutant: '',      // 污染物名称
							gasProduction: '',  // 采气时段
							gasFlow: '',        // 采气流量（L/min）
							gasVolume: '',      // 采气体积（L）
							standardVolume: '', // 标态采气体积（L）
							thermometers: '',   // 计温(℃)
							pressureGauge: '',  // 计压(kPa)
						}]
					}
					this.showPollist = true
					this.factorShow = true
				} else if (secdClassId === '001002') {	// 地表水
					showLabel = ['isPop','checkEquipment','groundConditions']
					this.factorShow = true
				} else if (secdClassId === '001003') {	// 地下水
					showLabel = ['isPop','checkEquipment','groundConditions']
					this.factorShow = true
				} else if (secdClassId === '002005' || secdClassId === '002003' || secdClassId === '002004' || secdClassId === '002001') {	// 地下水
					showLabel = ['isFactor']
					this.factorShow = true
				} 
				// if (secdClassId === '006001' || secdClassId === '005001') { // 固废/污泥和生活垃圾
				// 	showLabel = []
				// } else if (secdClassId === '001001' || secdClassId === '001004') { // 废水【雨水】
				// 	showLabel = ['isPop','checkEquipment','positioningOne','positioningTwo','positioningThree']
				// } else if (secdClassId === '002002' || secdClassId === '0020022') { // 有组织废气/锅（窑）炉废气
				// 	showLabel = []
				// } else if (secdClassId === '0020021') { // 饮食类油烟
				// 	showLabel = []
				// } else if (secdClassId === '003001') {  // 土壤
				// 	showLabel = []
				// } else if (secdClassId === '003002') { // 底泥
				// 	showLabel = []
				// } else if (secdClassId === '002005' || secdClassId === '002003' || secdClassId === '002004' || secdClassId === '002001') { // 环境空气、厂届无组织废气、车间无组织废气、室内空气
				// 	showLabel = []
				// } else if (secdClassId === '001002') {	// 地表水
				// 	showLabel = ['isPop','checkEquipment','groundConditions']
					
				// } else if (secdClassId === '001003') {	// 地下水
				// 	showLabel = ['isPop','checkEquipment','groundConditions']
					
				// } else if (secdClassId === '004001' || secdClassId === '004002' || secdClassId === '004003' || ) {	// 区域环境噪声 / 工业企业厂界噪声 / 社会生活环境噪声
				// 	showLabel = []
				// } else if (secdClassId === '004004') {  // 城市环境振动
				// 	showLabel = []
				// } else if (secdClassId === '004005') {	// 道路交通噪声
				// 	showLabel = []
				// }
				this.checkShow = showLabel
			},
			// factorType 1:多值录入 2:input 3:radio 4:现场检测设备 
			formCheck(sampleData) {	// 结果集校验
				let nSampleData = []
				sampleData.forEach(i => {
					if(i.params) {
						nSampleData = nSampleData.concat(i.params)
					}
				})
				const obj = nSampleData.find(i => {
					if(i.required && (!i.value || i.value === '' || i.value.length == 0)) {
						return i
					}
				})
				if(obj && obj !== undefined) {
					return true
				}else {
					return false
				}
			},
			getSampItemDetail() {
				// 所有groupKey
				const columnKeys = this.sampleDataVo.map((item)=>{
					return item.groupKey;
				});
				
				// 动态栏目信息
				const columnDatas = columnKeys.map((groupKey) => {
					const columnInstance = this.$refs['column_' + groupKey][0];
					return columnInstance.formData;
				});
				let nCollectDate = ''
				let nSampleProperties = ''
				let nSampleFixative = ''
				// 获取采样日期
				if(columnDatas){
					columnDatas.forEach(i => {
						if(i.collectDate){
							nCollectDate = i.collectDate
						}
						if(i.sampleProperties){
							nSampleProperties = i.sampleProperties
						}
						if(i.sampleFixative){
							nSampleFixative = i.sampleFixative
						}
					})
				}
				// 特别说明信息
				const specialNote = this.$refs.specialNote && 
					this.$refs.specialNote.specialRemark || '';
				
				// 构造样品信息数据
				const sampleData = this.constructorSampleData(columnDatas);
				// 上传图片数据
				let upload = []
				if(this.$refs.upload && this.$refs.upload.getData()){
					upload = this.$refs.upload.getData().map((item)=>{
						return item.succImg;
					});
				}
				// 地址信息
				const position = this.$refs.position?this.$refs.position.position:'';
				// 采样复核人 id
				const reviewUserId = this.$refs.reviewUser?this.$refs.reviewUser.userId:'';
				
				const factorInfos = this.getFactorList()
				
				// 获取污染物数据
				const pollutantInfo = this.getPollutants()
				
				// 构造大对象
				// 构造请求参数
				const MobileSampItemDetailTdo = {};
				// 设置外层采样相关的参数
				this.setOuterCollectParams(MobileSampItemDetailTdo, sampleData, specialNote);
				// 样品id
				MobileSampItemDetailTdo.sampleItemId = this.sampleInfo.sampItemId;
				// 位置信息
				MobileSampItemDetailTdo.collectLocation = position;
				// 样品栏目信息
				MobileSampItemDetailTdo.sampleData = JSON.stringify(sampleData);
				// 保存栏目数据-用户单据生成
				MobileSampItemDetailTdo.sampleDataValue = this.constructorSampleDataValue(sampleData, specialNote);
				debugger
				// 样品图片信息
				MobileSampItemDetailTdo.imageList = upload;
				// 采样复核人id
				MobileSampItemDetailTdo.reviewUserId = reviewUserId;
				// 采样日期
				MobileSampItemDetailTdo.collectDate = nCollectDate;
				
				// 样品性状
				MobileSampItemDetailTdo.sampleProperties = nSampleProperties;
				// 样品固定剂
				MobileSampItemDetailTdo.sampleFixative = nSampleFixative;
				// 检测因子信息
				MobileSampItemDetailTdo.factorDataVos = factorInfos;
				
				// 污染物信息
				MobileSampItemDetailTdo.pollutantInfo = pollutantInfo;
				return MobileSampItemDetailTdo;
			},
			submit() {
				this.butDisabled = true
				const saveForm = this.getSampItemDetail();
				if(!this.$refs.reviewUser || this.$refs.reviewUser.userId === ''){
					this.$common.errorToShow("复核人不能为空!")
					this.butDisabled = false
					return
				}
				const fl = this.formCheck(JSON.parse(saveForm.sampleData))
				if(fl) {
					this.$common.errorToShow("当前有必填项未录入信息!")
					this.butDisabled = false
					return
				}
				try{
					this.$api.saveSampItemDetail(saveForm, res => {
						if(res.code == 200) {
							this.goToSubmit()
						} else {
							this.$common.errorToShow(res.message)
							this.butDisabled = false
						}
					})
				}catch{
					this.butDisabled = false
					this.$common.errorToShow("提交操作异常!")
				}
			},
			goToSubmit(){
				this.$api.submitSampItemDetail({"sampleItemId": this.sampItemId}, res => {	
					if(res.code === 200) {
						this.$common.successToShow("提交成功")
						uni.switchTab({
							url: '/pages/task/index',
						});
					} else {
						this.$common.errorToShow(res.result || res.message)
					}
					this.butDisabled = false
				}, error => {
					debugger
					this.butDisabled = false
					this.$common.errorToShow(error)
				});
				setTimeout(() =>{
					this.butDisabled = false
				},3000)
			},
			// 保存
			saveSample() {
				this.butDisabled = true
				const saveForm = this.getSampItemDetail();
				if(this.frequency === '1' && (!saveForm.collectDate || saveForm.collectDate==='')){
					this.$common.errorToShow("当天第一个样品的采样日期不能为空")
					return
				}
				this.saveSampItemDetail(saveForm);
			},
			getPollutants(){
				const poll = []
				if(this.pollist && this.pollist.length > 0){
					this.pollist.forEach((item,index) => {
						if(this.$refs['pollistRef_' + index] && this.$refs['pollistRef_' + index].length > 0){
							const poItem = this.$refs['pollistRef_' + index]
							if(poItem){
								poll.push(poItem[0].item)
							}
						}
					})
					return JSON.stringify(poll)
				} 
				return ''
				
			},
			getFactorList() {
				const fas = []
				this.factorDataVos.forEach((item,index) => {
					if(this.$refs['factor_column_' + index] && this.$refs['factor_column_' + index].length > 0){
						let nfactorInfo  = this.$refs['factor_column_' + index][0].factorInfo
						if(JSON.parse(nfactorInfo.factorData) == nfactorInfo.factorData){
							const val = [{
								'desc': '结果值',
								'val': nfactorInfo.factorData
							}]
							nfactorInfo.factorDataValue = JSON.stringify(val)
						} else {
							nfactorInfo.factorDataValue = nfactorInfo.factorData
						}
						fas.push(nfactorInfo)
					}
				})
				return fas
			},
			constructorSampleDataValue(datas, specialNote) {
				const nFormData = {}
				const sampleDataVo = JSON.parse(JSON.stringify(this.sampleDataVo));
				let sampleData = sampleDataVo.map((sample) => {
					const key = sample.groupKey;
					for(let m = 0; m < datas.length; m++) {
						if(datas[m].groupKey === key) {
							for(let i = 0; i < sample.params.length; i++) {
								const o = datas[m].params.find(d => d.key === sample.params[i].key)
								sample.params[i].value = o.value || '';
							}
						}
					}
					return sample;
				});
				sampleData.forEach(item => {
					item.params = item.params.forEach((param) => {
						const iVal = {
							"numericType": param.numericType, 
							"value":[{
								"desc": param.name,
								"val": param.value
							 }]
						}
						nFormData[param.key] = iVal
					});
				})
				if(specialNote && specialNote!== ''){
					const objNote = JSON.parse(specialNote) 
					nFormData.heatBox = {
							"numericType": "0", 
							"value":[{
								"desc": "保温箱是否完整",
								"val": objNote.heatBox || ""
							 }]
						}
					nFormData.temperature = {
							"numericType": "1", 
							"value":[{
								"desc": "接收时保温箱内温度",
								"val": objNote.temperature || ""
							 }]
						}
					nFormData.sampleComplete = {
							"numericType": "0", 
							"value":[{
								"desc": "样品瓶是否完整",
								"val": objNote.sampleComplete || ""
							 }]
						}
				}
				return JSON.stringify(nFormData)
			},
			// 构造样品信息 请求参数
			constructorSampleData(data) {
				const datas = JSON.parse(JSON.stringify(data));
				const sampleDataVo = JSON.parse(JSON.stringify(this.sampleDataVo));
				let sampleData = sampleDataVo.map((sample) => {
					const key = sample.groupKey;
					for(let m = 0; m < datas.length; m++) {
						if(datas[m].columnKey === key) {
							for(let i = 0; i < sample.params.length; i++) {
								// 另存采样日期
								sample.params[i].value = datas[m][sample.params[i].key];
							}
						}
					}
					return sample;
				});
				
				// 删除原始数据中的 selectValue 和 radioValue 
				// 后端让删除
				sampleData = sampleData.map((item) => {
					item.params = item.params.map((param) => {
						if(param.selectValue) {
							delete param.selectValue;
						}
						if(param.radioValue) {
							delete param.radioValue;
						}
						return param
					});
					return item;
				})
				return sampleData;
			},
			
			// 设置外层采样数据
			setOuterCollectParams(originObj, sampleData, specialNote) {
				// 找出采样日期，采样时间的栏目
				const collectColumn = sampleData.filter((column) => {
					const paramsKeys = column.params.map((item) => {
						return item.key;
					});
					return paramsKeys.includes("collectDate");
				});
				const column = collectColumn[0] && collectColumn[0].params || [];
				for(let i = 0; i < column.length; i++) {
					originObj[column[i]["key"]] = column[i]["value"];
				};
				
				// 特别说明 信息
				if(specialNote) {
					originObj.specialNote = specialNote
				}
			},
			// 保存 接口
			saveSampItemDetail(data) {
				this.$api.saveSampItemDetail(data, res => {
					this.butDisabled = false
					if(res.code === 200) {
						this.$common.successToShow("操作成功！")
						uni.switchTab({
							url: '/pages/task/index'
						})
					} else {
						this.$common.errorToShow(res.message)
					}
				});
			},
			getReviewUsers() {
				this.$api.getReviewUsers(res => {
					const users = []
					res.result.forEach((item) => {
						if(this.$store.getters.userInfo.userId !== item.userId) {
							const nitem = {
								"value": item.userId,
								"label": item.empName
							}
							users.push(nitem)
						}
					});
					this.allReviewers = users;
					
				});
			},
			reviewBackDialog(){
				this.$refs.backResult.open()
			},
			cancleResult() {
				this.$refs.backResult.close()
			},
			confirmResult() {
				this.butDisabled = true
				this.$refs.backResult.close()
				this.butDisabled = true
				if(this.opType == 1) {	// 复核驳回
					const data = {
						sampItemId: this.sampItemId,
						auditFlag: '2',
						auditReason: this.backReason
					}
					this.$api.reviewSampleItem(data, res=> {
						this.butDisabled = false
						if(res.code === 200) {
							this.$common.successToShow("操作成功！")
							uni.switchTab({
								url: '/pages/task/index',
							});
						} else {
							this.$common.errorToShow(res.message)
						}
					})
				} else if(this.opType == 2) {	// 审批驳回
					const data = {
						sampItemId: this.sampItemId,
						auditFlag: 2,
						auditReason: this.backReason
					}
					this.$api.auditSampleItem(data, res => {
						this.butDisabled = false
						if(res.code == 200) {
							this.$common.successToShow("操作成功！")
							uni.switchTab({
								url: '/pages/task/index',
							});
						} else {
							this.$common.errorToShow(res.message)
						}
					})
				} 
			},
			reviewBack() {	// 复核驳回
				this.opType = 1
				this.backReason = ''
				this.$refs.backResult.open()
			},
			reviewSubmit() { // 复核通过
				this.butDisabled = true
				const data = {
					sampItemId: this.sampItemId,
					auditFlag: '1',
					auditReason: ''
				}
				this.$api.reviewSampleItem(data, res=> {
				this.butDisabled = false
					if(res.code === 200) {
						this.$common.successToShow("操作成功！")
						uni.switchTab({
							url: '/pages/task/index',
						});
					} else {
						this.$common.errorToShow(res.message)
					}
				})
			},
			backPage() {
				uni.switchTab({
					url: '/pages/task/index',
				});
			},
			auditSampleBack() {
				this.opType = 2
				this.backReason = ''
				this.$refs.backResult.open()
			},
			auditSampleSubmit() {
				this.butDisabled = true
				const data = {
					sampItemId: this.sampItemId,
					auditFlag: 1,
					auditReason: ''
				}
				this.$api.auditSampleItem(data, res => {
					this.butDisabled = false
					if(res.code == 200) {
						this.$common.successToShow("操作成功！")
						uni.switchTab({
							url: '/pages/task/index',
						});
					} else {
						this.$common.errorToShow(res.message)
					}
				})
			},
			applySubmit() {
				this.butDisabled = true
				const data = {
					sampleItemId:  this.sampItemId
				}
				this.$api.sampStoreApply(JSON.stringify(data), res => {
					this.butDisabled = false
					if(res.code == 200) {
						this.$common.successToShow("操作成功！")
						uni.switchTab({
							url: '/pages/task/index',
						});
					} else {
						this.$common.errorToShow(res.message)
					}
				})
			},
			addResult(){
				const pos = []
				this.pollist.forEach((item,index) => {
					if(this.$refs['pollistRef_' + index] && this.$refs['pollistRef_' + index].length > 0){
						const poItem = this.$refs['pollistRef_' + index]
						if(poItem){
							pos.push(poItem[0].item)
						}
					}
				})
				pos.push({
					pollutant: '',      // 污染物名称
					gasProduction: '',  // 采气时段
					gasFlow: '',        // 采气流量（L/min）
					gasVolume: '',      // 采气体积（L）
					standardVolume: '', // 标态采气体积（L）
					thermometers: '',   // 计温(℃)
					pressureGauge: '',  // 计压(kPa)
				})
				this.pollist = pos
			},
			deleResult(num){
				const pos = []
				this.pollist.forEach((item,index) => {
					if(index !== num){
						const poItem = this.$refs['pollistRef_' + index]
						if(poItem){
							pos.push(poItem[0].item)
						}
					}
				})
				this.pollist = pos
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
		/* padding-bottom: 105rpx; */
	}
	.clomn-wrap{
		flex: 1;
		overflow: scroll;
	}
	.tabContainer{
		overflow-x: hidden;
		width: 100%;
		/* height: 100%; */
		padding-bottom: 30rpx;
		padding-left: 27rpx;
		padding-right: 27rpx;
	}
	.project-info{
		/* height: 280rpx; */
		width:calc(100%-98rpx);
		background-color: #D6D8DF;
		margin-top: 20rpx;
		padding-top: 5rpx;
		padding-left: 49rpx;
		padding-right: 49rpx;
		padding-bottom: 20rpx;
		border-radius: 19rpx;
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

	.approve-all{
/* 		position: fixed;
		bottom: 0;
		left: 0; */
		width: 100%;
		height: 105rpx;
		background: #D3DDF9;
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
	.save-btn{
		height: 70%;
		width: 43%;
		color: #2F3A89;
		font-size: 25rpx;
		background-color: #D3DDF9;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 15rpx;
		border: 1px solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	}
	.reject-btn{
		height: 70%;
		width: 43%;
		color: #2F3A89;
		font-size: 25rpx;
		background-color: #FFDA94;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 15rpx;
		border: 1px solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		float: left;
	}
	.submit-btn{
		height: 70%;
		width: 43%;
		color: #fff;
		font-size: 25rpx;
		background-color: #2F3A89;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 15rpx;
		border: 1px solid #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		float: right;
	}
	
	.remark-dilog {
		width: 692rpx;
		height: 400rpx;
		background: #F0F2FA;
		box-shadow: 0px 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-top:30rpx;
	}
	.remark-dilog-title {
		padding: 0rpx 20rpx 15rpx;
	}
	.remark-dilog-body {
		padding: 0rpx 20rpx 15rpx;
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
	.sample-btn{
		margin-top: 5px;
		width: 100%;
		height: 50px;
		align-items: center;
		text-align: center;
	}
	.input-wrap{
		width: 100%;
		height: 72rpx;
		display: flex;
		align-items: center;
	}
	.dialog-btns-wrap{
		height: 95%;
		width: 99%;
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
	
	
</style>
