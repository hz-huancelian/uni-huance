<template>
	 <view class="u-checkbox center" :class="{'checked':checked}" @tap="change">
		 <image :src="src"></image>
	 </view>
</template>

<script>
	export default{
		props:{
			checked:{
				type:Boolean,
				default:false
			},			
		},
		
		data(){
			return{
				src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADbElEQVRoQ+1ZTYiNURh+ng2KoqQskISahQ1FlEk0MSM/hdnZmN0kQ9JIrKgpJEIsyMZGo/wMzUwpSaMmSRQhmcUUFhb+I/HovZ1b1+c733e+e7+5PzXv8n7Ped/nOe8573nPuUSDGxucP8YF1CqDkk6R7Gq4DEhqAXAGwEIAGxpKgKTjAPaWZL2vIQRIWgXAyC+JLNmhuhcg6TCAgzF77QXJproVIGkFACO/Oob8CMl59ntdCpC0z5GfGEN+lOSc4u91JUDSNAAXAGzxlOf3AJpIfqw7AZLmA7gIoNlD/gOAZSTflH6viwxIWg7gCoDZHvKfALSQfBj9XnMBkjYCuJFwon8DsJXkQBympgIkdbg17+P/E8A2kn0+QM0ESDoJoCth5v+4mb+W1G/VRICkewmbtch3O8nLac1i1QVI+gJgSgqxIyQPpZGv+kEmSQGkekm2B+AKkNgMSJpE8keokxBcIPmnAFpJvg3xGStAUieAdQD2k3we6igJF0jeKo6Rv5sl5j8ZkNRjxJ2DZwC6Sd7O4jCKDSRvwzpJnssaqyBA0gwAZ63mRhx8dyLsBpTZMpC36+HuzAFsD0ha7I5x60V8dsItqV+hQTKQHyDZGuo3ijMBvXZgBDi47rLxKg0rydbzhDQcgBG37l8GYGMhxSVkp93mACdPnIhBH1aSkZob4Msgm0jeDMT6Bbh9cAvA+gBnn52I8zEb9gEA6yxDzArE0RBgEiZahazjWxvo9JgTUjicJF1NuIhEXfaTbAuMkwj77yCTdAfAmkDnRrobwB4AOwPHGKyZ5P0MeC/UdxKHNFtFp49injuSuPWQPJAHefPhbeYkDQGwl4E87bGb/a95OU3sRiUNA1iaVzAA7SStbOdmqe20JFsidthVapdI7qjUSXR8qgBXYaxLXFRBcHsOWUnydQU+YocGCXAirDNtKpPALpKnyxybOCxYgBNhbcSCjERyq/lxcTMJcCKytAo2JLean4sAJ2IUwKyATIzJxi2NmzkDxcGS3gGYmSJiTGffYpctwGXC3iune0RkupwHZLOyKuQLIMleiqfGfG8j2V8usdBxFWWgZDlZazC5JOggSXsYGHPLRYBbTqW3sNxbBt9M5CbAifgNYJhk3k2gN5O5CnAiOkjaHxVVsdwFVIV1SZBxAdWe8Wi8vyMzD/mBQfIeAAAAAElFTkSuQmCC'
			}
		},
				
		methods:{
			 change(){
				 let val = !this.checked ? 1 : 0
				 this.$emit("change",val)
			 }
		}
	}
</script>

<style lang="less" scoped>
	.u-checkbox{ width:32rpx; height:32rpx; border-radius:5rpx; border:1px solid #ddd; transition:all 0.3s ease;
	  image{ width:20rpx; height:20rpx; opacity:0; transform: scale(0); transition:all 0.3s ease; }
		&.checked{ border:1px solid #1479FC; background-size:10rpx center; background:#1479FC;
			image{opacity:1; transform: scale(1);}
		}
	}
</style>
