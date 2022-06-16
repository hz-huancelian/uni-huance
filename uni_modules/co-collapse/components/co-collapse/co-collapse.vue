<template>
	<view class='co-collapse' :class="{border:border}">
		<view class='title' @click="down">
			<view v-if='title'>
				{{title}}
			</view>
			<view v-else>
				<slot name="title"></slot>
			</view>	
			<u-icon class='sw-icon' :style='iconStyle' name="arrow-down"></u-icon>
		</view>
		<view class='content' :style="{'max-height':show?height:'0px',overflow:'hidden',transition:'all .3s'}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{//标题
				type:String,
				default:''
			},
			border:{ //边框
				type:Boolean,
				default:false
			},
			height:{ //默认高度
				type:String,
				default:'999px'
			},
			check:{//表示是否默认展开
				type:Boolean, 
				default:false
			}
		},
		data(){
			return {
				show:false,
				iconStyle:{
					transform:'rotate(0deg)',
					transition:'all .3s'
				}
			}
		},
		methods:{
			down() {
				if(!this.show) {
					this.iconStyle.transform = 'rotate(180deg)'
				}else{
					this.iconStyle.transform = 'rotate(0deg)'
				}
				this.show = !this.show;
			}
		},
		mounted() {
			if(this.check) {
				this.down()
			}
		}
	}
</script>

<style lang="scss">
	.co-collapse{
		padding: 5px 10px;
	}
	.border{
		border: 1px solid #dcdfe6;
	}
	.title{
		display: flex;
		justify-content: space-between;
	}
	.content{
		
	}
	
</style>
