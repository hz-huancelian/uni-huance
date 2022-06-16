<template>
	<view class="w-picker-view">
		<picker-view  class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
			<picker-view-column class="w-picker-flex2">
				<view class="w-picker-item" v-for="(item,index) in range.fhours" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex2">
				<view class="w-picker-item" v-for="(item,index) in range.fminutes" :key="index">{{item}}分</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex2" v-if="second">
				<view class="w-picker-item" v-for="(item,index) in range.fseconds" :key="index">{{item}}秒</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex1">
				<view class="w-picker-item">-</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex2">
				<view class="w-picker-item" v-for="(item,index) in range.thours" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex2">
				<view class="w-picker-item" v-for="(item,index) in range.tminutes" :key="index">{{item}}分</view>
			</picker-view-column>
			<picker-view-column class="w-picker-flex2" v-if="second">
				<view class="w-picker-item" v-for="(item,index) in range.tseconds" :key="index">{{item}}秒</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickVal:[],
				range:{},
				checkObj:{}
			};
		},
		props:{
			itemHeight:{
				type:String,
				default:"44px"
			},
			value:{
				type:[String,Array],
				default(){
					return []
				}
			},
			current:{//是否默认选中当前日期
				type:Boolean,
				default:false
			},
			startHours:{
				type:[String,Number],
				default:0
			},
			endHours:{
				type:[String,Number],
				default:23
			},
			second:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(val){
				this.initData();
			}
		},
		created() {
			this.initData();
		},
		methods:{
			formatNum(n){
				return (Number(n)<10?'0'+Number(n):Number(n)+'');
			},
			checkValue(value){
				let strReg=/^\d{2}:\d{2}:\d{2}$/,example="18:00:05";
				if(!strReg.test(value)){
					console.log(new Error("请传入与mode、fields匹配的value值，例value="+example+""))
				}
				return strReg.test(value[0])&&strReg.test(value[1]);
			},
			resetData(fhour,fminute,fsecond,thour,tminute,tsecond){
				let fhours=[],fminutes=[],fseconds=[],thours=[],tminutes=[],tseconds=[];
				
				for(let hour=0;hour<24;hour++){
					fhours.push(this.formatNum(hour));
				}
				for(let minute=0;minute<60;minute++){
					fminutes.push(this.formatNum(minute));
				}
				for(let second=0;second<60;second++){
					fseconds.push(this.formatNum(second));
				}
				for(let hour=0;hour<24;hour++){
					thours.push(this.formatNum(hour));
				}
				for(let minute=0;minute<60;minute++){
					tminutes.push(this.formatNum(minute));
				}
				for(let second=0;second<60;second++){
					tseconds.push(this.formatNum(second));
				}
				return{
					fhours,
					fminutes,
					fseconds,
					thours,
					tminutes,
					tseconds
				}
			},
			getData(dVal){
				//用来处理初始化数据
				let fhours=[],fminutes=[],fseconds=[],thours=[],tminutes=[],tseconds=[],pickVal=[];
				let curFlag=this.current;
				let disabledAfter=this.disabledAfter;
				let fields=this.fields;
				let value=dVal;
				for(let hour=0;hour<24;hour++){
					fhours.push(this.formatNum(hour));
				}
				for(let minute=0;minute<60;minute++){
					fminutes.push(this.formatNum(minute));
				}
				for(let second=0;second<60;second++){
					fseconds.push(this.formatNum(second));
				}
				for(let hour=0;hour<24;hour++){
					thours.push(this.formatNum(hour));
				}
				for(let minute=0;minute<60;minute++){
					tminutes.push(this.formatNum(minute));
				}
				for(let second=0;second<60;second++){
					tseconds.push(this.formatNum(second)); 
				}
				if(this.second){
					pickVal=[
						fhours.indexOf(value[0])==-1?0:fhours.indexOf(value[0]),
						fminutes.indexOf(value[1])==-1?0:fminutes.indexOf(value[1]),
						fseconds.indexOf(value[2])==-1?0:fseconds.indexOf(value[2]),
						0,
						thours.indexOf(value[4])==-1?0:thours.indexOf(value[4]),
						tminutes.indexOf(value[5])==-1?0:tminutes.indexOf(value[5]),
						tseconds.indexOf(value[6])==-1?0:tseconds.indexOf(value[6])
					];
					return {
						fhours,
						fminutes,
						fseconds,
						thours,
						tminutes,
						tseconds,
						pickVal
					}
				} else {
					
					pickVal=[
						fhours.indexOf(value[0])==-1?0:fhours.indexOf(value[0]),
						fminutes.indexOf(value[1])==-1?0:fminutes.indexOf(value[1]),
						0,
						thours.indexOf(value[3])==-1?0:thours.indexOf(value[3]),
						tminutes.indexOf(value[4])==-1?0:tminutes.indexOf(value[4])
					];
					return {
						fhours,
						fminutes,
						thours,
						tminutes,
						pickVal
					}
				}
			},
			getDval(){
				let fields=this.fields;
				let dVal=null;
				let aDate=new Date();
				let value=dVal;
				
				let fhour=this.formatNum(aDate.getHours());
				let fminute=this.formatNum(aDate.getMinutes());
				let fsecond=this.formatNum(aDate.getSeconds());
				
				let thour=this.formatNum(aDate.getHours());
				let tminute=this.formatNum(aDate.getMinutes());
				let tsecond=this.formatNum(aDate.getSeconds());
				if(this.second){
					if(value&&value.length>0){
						let flag=this.checkValue(value);
						if(!flag){
							dVal=[fhour,fminute,fsecond,"-",thour,tminute,tsecond]
						}else{
							dVal=[...value[0].split(":"),"-",...value[1].split(":")];
						}
					}else{
						dVal=[fhour,fminute,fsecond,"-",thour,tminute,tsecond]
					}
				} else {
					if(value&&value.length>0){
						let flag=this.checkValue(value);
						if(!flag){
							dVal=[fhour,fminute,"-",thour,tminute]
						}else{
							dVal=[...value[0].split(":"),"-",...value[1].split(":")];
						}
					}else{
						dVal=[fhour,fminute,"-",thour,tminute]
					}
				}
				return dVal;
			},
			initData(){
				let range=[],pickVal=[];
				let result="",full="",obj={};
				let dVal=this.getDval();
				let dateData=this.getData(dVal);
				let fhours=[],fminutes=[],fseconds=[],thours=[],tminutes=[],tseconds=[];
				let fhour,fminute,fsecond,thour,tminute,tsecond;
				pickVal = dateData.pickVal;
				fhours = dateData.fhours;
				fminutes = dateData.fminutes;
				fseconds = dateData.fseconds;
				thours = dateData.thours;
				tminutes = dateData.tminutes;
				tseconds = dateData.tseconds;
				range = {
					fhours,
					fminutes,
					fseconds,
					thours,
					tminutes,
					tseconds
				}
				debugger
				
				if(this.second){
					fhour=range.fhours[pickVal[0]];
					fminute=range.fminutes[pickVal[1]];
					fsecond=range.fseconds[pickVal[2]];
					thour=range.thours[pickVal[4]];
					tminute=range.tminutes[pickVal[5]];
					tsecond=range.tseconds[pickVal[6]];
					obj={
						fhour,
						fminute,
						fsecond,
						thour,
						tminute,
						tsecond
					}
					result=`${fhour+':'+fminute+':'+fsecond+'至'+thour+':'+tminute+':'+tsecond}`;
				} else {
					fhour=range.fhours[pickVal[0]];
					fminute=range.fminutes[pickVal[1]];
					thour=range.thours[pickVal[3]];
					tminute=range.tminutes[pickVal[4]];
					obj={
						fhour,
						fminute,
						thour,
						tminute
					}
					result=`${fhour+':'+fminute+'至'+thour+':'+tminute}`;
				}
				this.range=range;
				this.checkObj=obj;
				this.$nextTick(()=>{
					this.pickVal=pickVal;
				});
				this.$emit("change",{
					result:result,
					value:result.split("至"),
					obj:obj
				})
			},
			handlerChange(e){
				let arr=[...e.detail.value];
				let result="",full="",obj={};
				let year="",month="",day="",hour="",minute="",second="",note=[],province,city,area;
				let checkObj=this.checkObj;
				let minutes=[],seconds=[],endHours=[],endMinutes=[],endSeconds=[],startHours=[];
				let mode=this.mode;
				let col1,col2,col3,d,a,h,m;
				let xDate=new Date().getTime();
				let range=this.range;
				let fhour= ''
				let fminute= ''
				let fsecond= ''
				let thour= ''
				let tminute= ''
				let tsecond= ''
				let resetData = {}
				if(this.second){
					 fhour=range.fhours[arr[0]]||range.fhours[range.fhours.length-1];
					 fminute=range.fminutes[arr[1]]||range.fminutes[range.fminutes.length-1];
					 fsecond=range.fseconds[arr[2]]||range.fseconds[range.fseconds.length-1];
					 
					 thour=range.thours[arr[4]]||range.thours[range.thours.length-1];
					 tminute=range.tminutes[arr[5]]||range.tminutes[range.tminutes.length-1];
					 tsecond=range.tseconds[arr[6]]||range.tseconds[range.tseconds.length-1];
					 resetData=this.resetData(fhour,fminute,fsecond,thour,tminute,tsecond);
					 
					 if(fhour!=checkObj.fhour||fminute!=checkObj.fminute||fsecond!=checkObj.fsecond){
					 	arr[4]=0;
					 	arr[5]=0;
					 	arr[6]=0;
					 	range.fhours=resetData.fhours;
					 	range.fminutes=resetData.fminutes;
					 	range.fseconds=resetData.fseconds;
					 	thour=range.thours[0];
					 	checkObj.thours=range.thours[0];
					 	tminute=range.tminutes[0];
					 	checkObj.tminutes=range.tminutes[0];
					 	
					 	tsecond=range.tseconds[0];
					 	checkObj.tseconds=range.tseconds[0];
					 }
					 if(fhour!=checkObj.fhour||fminute!=checkObj.fminute){
					 	range.fseconds=resetData.fseconds;
					 };
					 if(thour!=checkObj.thour){
					 	arr[5]=0;
					 	arr[6]=0;
					 	let toData=this.resetToData(fminute,fsecond,thour,tminute);
					 	range.tminutes=toData.tminutes;
					 	range.tseconds=toData.tseconds;
					 	tminute=range.tminutes[0];
					 	checkObj.tminutes=range.tminutes[0];
					 	tsecond=range.tseconds[0];
					 	checkObj.tseconds=range.tseconds[0];
					 };
					 if(tminute!=checkObj.tminute){
					 	arr[6]=0;
					 	let toData=this.resetToData(fminute,fsecond,thour,tminute);
					 	range.tseconds=toData.tseconds;
					 	tsecond=range.tseconds[0];
					 	checkObj.tseconds=range.tseconds[0];
					 };
				} else {
					 fhour=range.fhours[arr[0]]||range.fhours[range.fhours.length-1];
					 fminute=range.fminutes[arr[1]]||range.fminutes[range.fminutes.length-1];
					 fsecond=[];
					 
					 thour=range.thours[arr[3]]||range.thours[range.thours.length-1];
					 tminute=range.tminutes[arr[4]]||range.tminutes[range.tminutes.length-1];
					 tsecond=[];
					 resetData=this.resetData(fhour,fminute,fsecond,thour,tminute,tsecond);
					 
					 if(fhour!=checkObj.fhour||fminute!=checkObj.fminute){
					 	arr[3]=fhour;
					 	arr[4]=fminute;
					 	range.fhours=resetData.fhours;
					 	range.fminutes=resetData.fminutes;
						
					 	// thour=range.thours[area
					 	// checkObj.thours=range.thours[0];
					 	// tminute=range.tminutes[0];
					 	// checkObj.tminutes=range.tminutes[0];
						thour = fhour
					 	checkObj.thours= fhour;
						
					 	tminute=fminute;
					 	checkObj.tminutes=fminute;
					 	
					 }
					 if(thour!=checkObj.thour){
					 	arr[4]=0;
					 	let toData=this.resetToData(fminute,fsecond,thour,tminute);
					 	range.tminutes=toData.tminutes;
					 	range.tseconds=toData.tseconds;
					 	tminute=range.tminutes[0];
					 	checkObj.tminutes=range.tminutes[0];
					 	tsecond=range.tseconds[0];
					 	checkObj.tseconds=range.tseconds[0];
					 };
				}
				
				if(this.second){
					result=`${fhour+':'+fminute+':'+fsecond+'至'+thour+':'+tminute+':'+tsecond}`;
					obj={
						fhour,
						fminute,
						fsecond,
						thour,
						tminute,
						tsecond
					}
				} else {
					
					result=`${fhour+':'+fminute+'至'+thour+':'+tminute}`;
					obj={
						fhour,
						fminute,
						thour,
						tminute
					}
				}
				this.checkObj=obj;
				this.$nextTick(()=>{
					this.pickVal=arr;
				})
				this.$emit("change",{
					result:result,
					value:result.split("至"),
					obj:obj
				})
			},
			resetToData(fminute,fsecond,thour,tminute){
				let range=this.range;
				let tminutes=[],tseconds=[];
				let yearFlag=thour!=range.thours[0];
				let monthFlag=thour!=range.thours[0]||tminute!=range.tminutes[0];
				for(let i=0;i<=60;i++){
					tminutes.push(this.formatNum(i))
				}
				for(let i=0;i<=60;i++){
					tseconds.push(this.formatNum(i))
				}
				return{
					tminutes,
					tseconds
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "./w-picker.css";
</style>
