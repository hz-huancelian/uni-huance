<template>
	<view class="mine-role-change-wrap">
		<!-- 提示文案 TIPS -->
		<text class="tips">{{tips}}</text>
		<!-- 角色切换 列表 -->
		<view class="roles">
			<view class="role-change" v-for="(item, index) in roles" :key="index" :style="{ background: ROLE_COLOR[item] }" @click="changeRole(item)">
				<text class="role-change-text" >{{ROLE_NAME[item]}}</text>
				<image class="role-change-img" :src="ROLE_IMG[item]"></image>
			</view>
		</view>
	</view>
	
</template>

<script>
	const ROLE_NAME = {
		"1": "采样组长",
		"2": "采样员",
		"3": "样品管理员",
		"4": "检测员"
	}
	const ROLE_COLOR = {
		"1": "#E3DFA5",
		"2": "#9FB4F6",
		"3": "#9FB4F6",
		"4": "#9FB4F6"
	}
	const ROLE_IMG = {
		"1": "http://www.huancelian.com/wxStatic/caiyangzuzhang.png",
		"2": "http://www.huancelian.com/wxStatic/caiyangyuan.png",
		"3": "http://www.huancelian.com/wxStatic/caiyangyuan.png",
		"4": "http://www.huancelian.com/wxStatic/caiyangyuan.png"
	}
	export default {
		components:{
		},
		data() {
			return {
				ROLE_NAME,
				ROLE_COLOR,
				ROLE_IMG,
				tips:'请选择您的身份',
				roles: this.$store.getters.roleList||[]
			}
		},
		
		methods: {
			// 切换角色
			changeRole(roleId) {
				const roleObj = {
					'roleId': roleId,
					'roleName': this.ROLE_NAME[roleId]
				}
				// 改变角色
				this.$store.commit('SAVE_CUR_ROLE', roleObj);
				// 修改底部tabBar
				// this.changeTabBar(roleObj);
				// 返回我的页面
				uni.navigateBack();
			},
			LogOut(){
				// 
			},
			changeTabBar(roleObj) {
				const tab = document.querySelectorAll(".uni-tabbar .uni-tabbar__item");
				if(roleObj)
				console.log(tab)
			},
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.mine-role-change-wrap{
		width: 100%;
		height: 100vh;
		background-color: #F0F2FA;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.tips{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 266rpx;
		background-color: #D3DDF9;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		color: #2F3A89;
		font-weight: bolder;
		letter-spacing: 2rpx;
	}
	.roles{
		/* width: 100%; */
		background-color: #F0F2FA;
		align-items: center;
		flex-direction: column;
		padding-top: 28rpx;
		padding-left: 35rpx;
		padding-right: 35rpx;
		flex: 1;
		overflow: auto;
	}
	.name{
		margin-top: 46rpx;
		font-size: 28rpx;
		font-family: .AppleSystemUIFont-Semibold, AppleSystemUIFont;
		font-weight: 600;
		color: #767676;
		line-height: 0px;
	}
	.role{
		margin-top: 52rpx;
		font-size: 28rpx;
		font-family: .AppleSystemUIFont-Semibold, AppleSystemUIFont;
		font-weight: 600;
		color: #767676;
		line-height: 0px;
	}
	.role-change{
		position: relative;
		margin-bottom:51rpx;
		width: 100%;
		height: 140rpx;
		border-radius: 9rpx;
		background: #D3DDF9;
		display: flex;
		align-items: center;
		justify-content:space-around;
	}
	.role-change-text{
		color: #2F3A89;
		font-size: 32rpx;
		font-weight: bolder;
		width: 200rpx;
	}

	.role-change-img{
		width: 64rpx;
		height: 64rpx;
	}


</style>
