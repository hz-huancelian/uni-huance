<template>
	<view class="sample-term-wrap">
		<view class="sample-term">
			<uni-file-picker style="width:77%;"
				:auto-upload="false"
				:value="submitDatas" 
				fileMediatype="image" 
				:del-icon="true"
				@select="selecta"  
				@delete="deletea"
			/>
			<view class="upload-button">
				<image class="icon" src="/static/camera.svg"></image>
			</view>
		</view>	

	</view>
</template>

<script>
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	export default {
		components:{
			uniFilePicker
			},
		props:{
			fileList: {
				type: Array,
				default:[]
			}
		},
		watch:{
			fileList() {
				this.submitDatas = [...this.fileList];
			}
		},
		data() {
			return {
				submitDatas:[...this.fileList],
			}
		},
		options: { styleIsolation: 'shared' }, 
		computed:{
		},
		mounted() {
		},

		methods: {
			selecta(val){
				const tempFiles = JSON.parse(JSON.stringify(val.tempFiles));
				// 调用接口保存图片
				for(let i = 0; i < tempFiles.length; i++) {
					const file = JSON.parse(JSON.stringify(tempFiles[i]));
					this.$api.cyFileUpload(file.url, res => {
						if(res.success) {
							const succImg = res.result.split(",")[0];
							file.succImg = succImg;
							this.submitDatas = [...this.submitDatas, ...[file]];
						}
					});
				}
			},
			deletea(val) {
				this.submitDatas = this.submitDatas.filter((item) => {
					return item.uuid !== val.tempFile.uuid;
				});
			},
			getData(){
				return this.submitDatas;
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
		position: relative;
		border-radius: 19rpx;
		/* background:#fff; */
		padding-top:0rpx;
/* 		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16); */
		margin-top: 20rpx;
		height: 120rpx;
		display:flex;
		align-items: center;
		justify-content: space-between;
	}
.upload-button{
	width: 120rpx;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 19rpx;
	background:#fff;
	box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
}
::v-deep .uni-file-picker{
	height: 120rpx;
	width: 100%;
	overflow-x: scroll!important;
	overflow-y: hidden!important;
	border-radius: 19rpx;
	background:#fff;
	box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
}
::v-deep .uni-file-picker__container {
	height: 120rpx!important;
	margin: 0!important;
	width: max-content;
}
::v-deep .file-picker__box{
	width: 120rpx!important;
	padding-top: 120rpx!important;
	display: inline-block;
	float: left;
}
::v-deep .file-picker__box:last-child{
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
	opacity: 0;
}
/* ::v-deep .file-picker__box-content.is-add {
	display: none;
} */
::v-deep .file-picker__progress{
	display: none;
}
::v-deep .icon-del-box{
	width: 15px;
	height: 15px;
}
/* ::v-deep .file-picker__box{
	width: 110rpx!important;
	height: 110rpx!important;
	padding-top: 0!important;
	position: relative;
}
::v-deep .is-add{
	position: absolute;
	right: 0;
	top: 0;
} */
.icon{
	width:64rpx;
	height: 64rpx;
}
</style>
