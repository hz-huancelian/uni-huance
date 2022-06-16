<template>
	<view class="mine-wrap">
		<!-- 头像 -->
	    <image class="head" :src="avatarPath"></image>
		<!-- 姓名 -->
		<text class="name">{{nameLabel}}{{CUR_USER_INFO.empName}}</text>
		<!-- 角色 -->
		<text class="role">{{roleLabel}}{{CUR_ROLE_NAME}}</text>
		<!-- 角色切换 按钮 -->
		<view class="role-change" @click="navigateToRoleChange">
			<svg t="1648388019913" class="icon role-change-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1479" width="40" height="40"><path d="M769.2 594.4c-17.7-19.2-37.4-36.7-58.5-52.5l0.6-1c-30-22.5-64.4-39.9-99.7-52.1 38.8-28 69.4-65.2 88.2-109.1-2.1 15.7 12.1-32 12.1-79.8 0-63.7-27.1-125.8-74-168.5S526 65.9 462.3 72.2c-40.3 4.3-77 17.9-108.6 38.7-12.9 6.9-36 28.9-55.5 54.7-38.7 52.1-51 120-38.4 182.5 11.4 57 47.6 107.9 94.9 141-112.3 39.6-201 130.4-240 242.9-12.9 36.8-20.3 79.4-20.3 123.8 0 15.3 12.1 28.7 27.1 30.3h344.3C469 724.4 601 594.2 763.5 594.2c1.9 0 3.7 0.1 5.7 0.2z" p-id="1480" fill="#ffffff"></path><path d="M609.2 775h305.5c1.1 0 2.2-0.1 3.3-0.2h0.1c1.1-0.1 2.1-0.3 3.2-0.5h0.2c1-0.2 2-0.5 3-0.8 0.1 0 0.2-0.1 0.3-0.1 0.9-0.3 1.8-0.7 2.7-1 0.1-0.1 0.3-0.1 0.4-0.2l2.4-1.2 0.6-0.3c0.7-0.4 1.4-0.9 2.1-1.4 0.2-0.2 0.4-0.3 0.6-0.5 0.6-0.5 1.3-1 1.9-1.5 0.2-0.2 0.4-0.3 0.6-0.5l1.8-1.8 0.3-0.3 0.2-0.2c0.6-0.6 1.1-1.3 1.6-2 0.1-0.2 0.2-0.3 0.3-0.5 0.5-0.7 1-1.4 1.4-2.2 0.1-0.1 0.2-0.3 0.3-0.4 0.4-0.8 0.8-1.5 1.2-2.3 0.1-0.1 0.1-0.2 0.2-0.4 0.4-0.8 0.7-1.6 1-2.5 0-0.1 0.1-0.2 0.1-0.3 0.3-0.8 0.5-1.7 0.7-2.5 0-0.1 0.1-0.2 0.1-0.4 0.2-0.8 0.3-1.6 0.4-2.5 0-0.2 0.1-0.3 0.1-0.5 0.1-0.8 0.2-1.6 0.2-2.3v-0.7-0.8c0-0.5-0.1-1-0.1-1.5v-0.7c-0.1-0.8-0.1-1.6-0.3-2.4 0-0.2-0.1-0.4-0.1-0.6-0.1-0.8-0.3-1.6-0.5-2.4 0-0.2-0.1-0.4-0.1-0.5-0.2-0.8-0.4-1.6-0.7-2.3-0.1-0.2-0.1-0.4-0.2-0.6-0.3-0.7-0.6-1.5-0.9-2.2-0.1-0.2-0.2-0.4-0.3-0.7-0.3-0.7-0.7-1.3-1.1-1.9-0.1-0.2-0.3-0.5-0.4-0.7l-1.2-1.8c-0.2-0.2-0.4-0.5-0.5-0.7-0.4-0.6-0.9-1.1-1.4-1.7l-0.6-0.6c-0.5-0.6-1.1-1.1-1.7-1.6l-0.3-0.3-81.8-72.3c-12.8-11.3-32.4-10.1-43.7 2.7-11.3 12.8-10.1 32.4 2.7 43.7l20.5 18.1H609.2c-17.1 0-31 13.9-31 31 0.1 17 13.9 30.8 31 30.8zM916.1 811H610.5c-0.4 0-0.7 0-1.1 0.1-0.4 0-0.9 0-1.3 0.1-0.6 0-1.2 0.1-1.9 0.2-0.4 0.1-0.7 0.1-1.1 0.2-0.6 0.1-1.3 0.2-1.9 0.4-0.3 0.1-0.7 0.2-1 0.3-0.6 0.2-1.3 0.4-1.9 0.6-0.3 0.1-0.7 0.2-1 0.4-0.6 0.2-1.2 0.5-1.8 0.7-0.3 0.2-0.7 0.3-1 0.5-0.5 0.3-1.1 0.6-1.6 0.9-0.4 0.2-0.7 0.4-1 0.6-0.5 0.3-1 0.7-1.5 1-0.3 0.2-0.7 0.5-1 0.7-0.5 0.4-1 0.8-1.4 1.2-0.3 0.2-0.6 0.5-0.8 0.8-0.5 0.5-1 1-1.4 1.5-0.1 0.2-0.3 0.3-0.4 0.5-0.1 0.1-0.1 0.2-0.2 0.3-0.5 0.5-0.9 1.1-1.3 1.7-0.2 0.3-0.4 0.5-0.6 0.8-0.4 0.6-0.8 1.1-1.1 1.7-0.2 0.3-0.4 0.6-0.5 0.9l-0.9 1.8c-0.2 0.3-0.3 0.6-0.5 1-0.3 0.6-0.5 1.2-0.7 1.8-0.1 0.3-0.3 0.7-0.4 1-0.2 0.6-0.3 1.2-0.5 1.8l-0.3 1.2c-0.1 0.6-0.2 1.1-0.3 1.7-0.1 0.4-0.2 0.9-0.2 1.3-0.1 0.5-0.1 1.1-0.1 1.6s-0.1 1-0.1 1.5v1.6c0 0.5 0 1 0.1 1.5 0 0.5 0.1 1.1 0.2 1.6s0.1 0.9 0.2 1.4c0.1 0.6 0.2 1.1 0.3 1.6 0.1 0.4 0.2 0.9 0.3 1.3 0.2 0.5 0.3 1.1 0.5 1.6 0.2 0.4 0.3 0.9 0.5 1.3 0.2 0.5 0.4 1 0.6 1.4 0.2 0.5 0.4 0.9 0.7 1.4 0.2 0.4 0.4 0.8 0.7 1.2 0.3 0.5 0.6 0.9 0.9 1.4 0.2 0.4 0.5 0.7 0.7 1.1 0.3 0.5 0.7 0.9 1 1.4 0.3 0.4 0.6 0.7 0.9 1.1 0.4 0.4 0.7 0.8 1.1 1.2 0.3 0.4 0.7 0.7 1.1 1.1l0.7 0.7L672 938c5.7 5 13 7.8 20.5 7.8 8.9 0 17.3-3.8 23.2-10.5 11.3-12.8 10.1-32.4-2.7-43.7L692.4 873h223.7c17.1 0 31-13.9 31-31s-13.9-31-31-31z" p-id="1481" fill="#ffffff"></path></svg>
			<text class="role-change-text" >{{changeRole}}</text>
		</view>
		<!-- 退出登录 按钮 -->
		<view class="logout-wrap">
			<button class="button_logout" @click="LogOut">{{LogOutText}}</button>
		</view>
		<tabBar></tabBar>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		components:{
		},
		data() {
			return {
				avatarPath: this.$store.getters.userInfo.avatarPath,
				nameLabel:'姓名：',
				roleLabel:'角色：',
				name:'肚子疼',
				changeRole:'角色切换',
				LogOutText:'退出登录'
			}
		},
		computed:{
		  ...mapState([
			'CUR_ROLE_NAME',
			'CUR_USER_INFO'
		  ]),
		},
		methods: {
			navigateToRoleChange(){
				uni.navigateTo({
				    url: '/pages/mine/role',
					// animationType: 'pop-in',
					// animationDuration: 200
				});
			},
			LogOut(){
				// 
				const data = {}
				this.$api.logout(data, res => {
					this.$common.successToShow("登出成功")
					this.$db.logout()
					debugger
					uni.navigateTo({
						url: '/pages/index/index',
					});
				})
			}
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.mine-wrap{
		/* width: 100 */
		height: 100vh;
		background-color: #F0F2FA;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 175rpx;
		padding-left: 35rpx;
		padding-right: 35rpx;
		flex: 1;
	}
	.head{
		width: 175rpx;
		height: 175rpx;
		border-radius: 50%;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
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
		margin-top:51rpx;
		width: 100%;
		height: 140rpx;
		border-radius: 9rpx;
		background: #D3DDF9;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.role-change-icon{
		position: absolute;
		top:50%;
		left:25%;
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		transform:translate(-50%,-50%);
	}
	.role-change-text{
		color: #2F3A89;
		font-size: 32rpx;
		font-weight: bolder;
	}
	.logout-wrap{
		position: absolute;
		left: 0;
		bottom: 300rpx;
		height: 96rpx;
		width: calc(100% - 80rpx);
		margin:0 40rpx;
	}
	.button_logout{
		display: block;
		width: 100%;
		height: 100%;
		font-size: 32rpx;
		background-color: #2F3A89;
		color: #fff;
		font-weight: bolder;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 5rpx 5rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 18rpx 18rpx 18rpx 18rpx;
		letter-spacing: 5rpx;
	}
</style>
