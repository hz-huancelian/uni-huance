<template>
	<uni-popup ref="popup" type="center" class="comm-alert" @maskClick="close">
		<view class="cabox">
			 <view class="title center">{{title}}</view>
			 <view class="text" v-if="type==3">
				 <textarea class="intxt" :placeholder="plod" v-model.trim="input" placeholder-style="color:#a8a8a8;"></textarea>
			 </view>
			 <view class="text"  :class="bold?'bold':''" v-else>{{content}}</view>
			 <view class="hm between" v-if="type!=1">
				 <view class="btn none center" @tap="cancel">取消</view>
				 <view class="btn center" @tap="save">{{saveText}}</view>
			 </view>
			 <view class="hm" v-if="type==1">
				 <view class="btn one center" @tap="save">{{saveText}}</view>
			 </view>
		</view>
	</uni-popup>
</template>

<script>
	/**
	 * 通用弹窗
	 */
	export default{		
		props:{
			showAlert:{ //显示
				type:Boolean,
				default:false,
			},
			type:{ //类型
				type:Number,
				default:1, //11普通提示 2询问 3输入
			},
			title:{ //标题
				type:String,
				default:'温馨提示'
			},
			content:{ //内容文字
				type:String,
				default:'内容文字'
			},
			bold:{ //是否加粗
				type:Boolean,
				default:false
			},
			plod:{ //输入框提示文字
				type:String,
				default:'请输入内容',
			},
			saveText:{ //确定文字
				type:String,
				default:'确定'
			}
		},
		data(){
			return{
				input:''
			}
		},
		watch:{
			 showAlert(v){
				 if(v){
					 this.input = this.content;
					 this.$refs.popup.open()
				 }
			 } 
		},
		methods:{
			 open(){
				 this.$refs.popup.open();
			 },
			 close(){				 
				 this.$refs.popup.close();

			 },
			 //取消按钮
			 cancel(){
				 	this.$emit("cancel");
			 },
			 //确定按钮
			 save(){
				 let that = this
				 if(this.type==3 && this.input==""){
					  uni.showToast({
					  	title:that.plod,
							icon:'none'
					  })		
						return;
				 }
				 this.$emit("confirm",this.input);
			 }
		}		
	}
</script>

<style lang="scss" scoped>
.comm-alert{
	.cabox{ background:#fff; width:650rpx; border-radius:20rpx; padding:0 40rpx; box-sizing: border-box; }
	.title{ height:120rpx; font-size:36rpx; font-weight: bold;}
	.text{ font-size:28rpx; color:#666; text-align: center; padding:30rpx 0;
		&.bold{ font-weight: bold; font-size: 36rpx;}
		.intxt{ text-align: left; border-radius:10rpx; box-sizing: border-box; padding:20rpx; border:1px solid #f2f2f2; font-size:28rpx; height:180rpx; background:none; width:100%; }
	}
	.hm{  padding:20rpx 0 50rpx 0;
		.btn{ border-radius:60rpx; background:$uni-color-primary; width:240rpx; height:80rpx; border:1px solid $uni-color-primary; color:#fff; font-size:30rpx;
			&.none{ background:none; color:$uni-color-primary; box-shadow: none;}
			&.one{ width:100%;}
		}
	}
}
</style>