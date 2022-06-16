<template>
	<view class="syui-anim" :class="classs" v-if="showani" @click="click"><slot></slot></view>
</template>

<script>
	//动画封装组件
	export default{
		 props:{
			 show:{
				 type:Boolean,
				 default:false
			 },
			 type:{
				 type:String,
				 default:'fade' //动画 fade渐显, up向上 down 向下 scale 放大
			 }
		 },
		 
		 data(){
			 return{
				 classs:'',
				 showani:false
			 }
		 },
		 
		 watch:{
			  show(v){					
					if(v){
						this.classs = `syui-enter-${this.type}`
						this.showani = true						
					}else{
						this.classs = `syui-leave-${this.type}`
						setTimeout(res=>{							
							this.showani = false
						},350)
					}
				}
		 },
		 
		 methods:{
			 click(){
				 this.$emit('click')
			 }
		 }
		 
	}
</script>

<style lang="less" scoped>
/***动画部份样式 ***/
.syui-anim{ -webkit-animation-duration: .35s; animation-duration: .35s; -webkit-animation-fill-mode: both; animation-fill-mode: both;}
/**渐显**/
.syui-enter-fade {-webkit-animation-name:syui-enter-fade; animation-name: syui-enter-fade;}	
@-webkit-keyframes syui-enter-fade { from {	opacity:0} to { opacity: 1 }  }
.syui-leave-fade {-webkit-animation-name:syui-leave-fade; animation-name:syui-leave-fade;}	
@-webkit-keyframes syui-leave-fade { from {	opacity:1} to { opacity: 0 }  }
/**向上**/
.syui-enter-up {-webkit-animation-name:syui-enter-up; animation-name: syui-enter-up;}	
@-webkit-keyframes syui-enter-up { from {	-webkit-transform:translate3d(0, 50px, 0);	opacity:0} to { -webkit-transform: translate3d(0, 0, 0); opacity: 1 }  }
.syui-leave-up {-webkit-animation-name:syui-leave-up; animation-name:syui-leave-up;}	
@-webkit-keyframes syui-leave-up { from {	-webkit-transform:translate3d(0, 0px, 0);	opacity:1} to { -webkit-transform: translate3d(0, 50px, 0); opacity: 0 }  }
/**向下**/
.syui-enter-down {-webkit-animation-name:syui-enter-down; animation-name: syui-enter-down;}	
@-webkit-keyframes syui-enter-down { from {	-webkit-transform:translate3d(0, -50px, 0);	opacity:0} to { -webkit-transform: translate3d(0, 0, 0); opacity: 1 }  }
.syui-leave-down {-webkit-animation-name:syui-leave-down; animation-name:syui-leave-down;}	
@-webkit-keyframes syui-leave-down { from {	-webkit-transform:translate3d(0, 0px, 0);	opacity:1} to { -webkit-transform: translate3d(0, -50px, 0); opacity: 0 }  }
/**向上二**/
.syui-enter-up2 {-webkit-animation-name:syui-enter-up2; animation-name: syui-enter-up2;}	
@-webkit-keyframes syui-enter-up2 { from {	transform: translateY(-100%);	opacity:0} to { transform: translateY(0); opacity: 1 }  }
.syui-leave-up2 {-webkit-animation-name:syui-leave-up2; animation-name:syui-leave-up2;}	
@-webkit-keyframes syui-leave-up2 { from {	transform: translateY(0);	opacity:1} to { transform: translateY(100%); opacity: 0 }  }

/**放大**/
.syui-enter-scale {-webkit-animation-name:syui-enter-scale; animation-name: syui-enter-scale;}
@-webkit-keyframes syui-enter-scale { from {	-webkit-transform:scale(0.8);	opacity:0} to { -webkit-transform:scale(1); opacity: 1 }  }			
.syui-leave-scale {-webkit-animation-name:syui-leave-scale; animation-name: syui-leave-scale;}
@-webkit-keyframes syui-leave-scale { from {	-webkit-transform:scale(1);	opacity:1} to { -webkit-transform:scale(0.8); opacity: 0 }  }			
</style>
