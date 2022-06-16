<template>
	<view>
		<view v-if="show" class="u-duoselect-mask" @click="closeDuo"></view>
		<view class="u-duoselect" :class="show?'show':''">		
			<view class="u-duoselect-tit between">{{title}} <label @tap="returnDuo" v-if="duoListS.length!=0">返回上级</label></view>
			<view class="u-duoselect-list">
					<view class="item between" @tap.stop="selectNext(item,index)" v-for="(item,index) in duoList" :key="index">
						<radio class="ra" :checked="duoId==item.id" @tap.stop="changeDuo(item,index)"></radio>
						<view class="text line1">{{item[name]}}</view>
						<uni-icons type="arrowright" v-if="(item.childList && item.childList.length) || (act && duoListS.length==0)" color="#ccc" size="15"></uni-icons>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 无限层级弹窗选择器
 * 通过this.$refs.duo.open() 方法唤起
 */

export default{	
	data(){
		return{
			title:'', //标题
			show:false, //显示
			duoId:'',   //当前选中ID
			name:'',
			act:false, //默认空 get请求
			type:'', //类型
			duoListS:[],//已选择
			duoList:[], //当前列表
		}
	},
	methods:{
		
		/**
		 * @param {String} title 标题
		 * @param {Array} list 数据源
		 * @param {String} name 显示字段
		 * @param {String} act 请求 true表示请求
		 * @param {String} type 类型 
		 */
		open(title,list,name,act=false,type=''){
			this.title = title
			this.duoId = ''
			this.duoListS = []
			this.name = name
			this.act = act
			this.type = type
			this.duoList = list
			this.show = true
		},
		
		//获取地址
		async getCountry(pid){
			const json = await getCountryData({pid})
			return json.data
		},
		
		//选择多
		async selectNext(item,index){
			if(this.act && this.type=="dz"){ //请求的方式获取
				//let childList = await this.getCountry(item.id)
				let childList = []
				if(childList && childList.length!=0){					
					this.duoListS.push({index:index, list:this.duoList});
					childList.forEach(res=>{ this.$set(res,"childList",[{}]) })
					this.duoList = childList
				}else{
					item.childList = []
				}
			}else{
				if(item.childList && item.childList.length!=0){
					this.duoListS.push({index:index, list:this.duoList});
					this.duoList = item.childList					
				}
			}
		},
		
		//选中多
		changeDuo(item,index){
			this.duoListS.push({index:index, list:this.duoList});
			this.duoId = item.id;
			this.show = false			
			this.$emit("select",this.duoListS)
		},
		
		//返回上级
		returnDuo(index){
			if(this.duoListS.length>1){
				this.duoList = this.duoListS[this.duoListS.length-1].list
				this.duoListS.pop();
			}else{
				this.duoList = this.duoListS[0].list
				this.duoListS = []
			}
		},
		
		//隐藏多选
		closeDuo(){
			this.duoList = []
			this.duoListS = []
			this.duoId = ''
			this.show = false;
		},
	}
}
</script>

<style lang="less" scoped>	
.u-duoselect-mask{ position: fixed; left:0; top:0; background:rgba(0,0,0,0.7); width:100%; height:100%; z-index:999}
.u-duoselect{ z-index:1000; overflow:hidden; transition: all 0.3s ease; transform: translateY(100%); position:fixed; left:0; right:0; margin:auto; bottom:0; width:100%; 
	&.show{ transform: translateY(0);}
	.u-duoselect-tit{ padding:0 40rpx; color:#333; font-size:32rpx; font-weight:bold; background:#fff; height:100rpx; border-bottom:1px solid #f1f1f1;
		label{ color:#1479FC; font-weight: normal;}
	}
	.u-duoselect-list{ height:600rpx; background:#fff; overflow-y:auto;
		.item{ position: relative; height:90rpx; padding:0 40rpx; border-bottom:1px solid #f7f7f7;
			.ra{position:absolute; left:30rpx; top:15rpx; transform: scale(0.7);}
			.text{ flex:1; font-size:30rpx; color:#333; margin-left:60rpx;}
			&:active{ background:#eee;}
		}
	}
}
</style>
