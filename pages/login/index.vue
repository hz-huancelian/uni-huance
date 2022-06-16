<template>
	<view class="wrapper">
		<!-- BOTTOM TREE IMG -->
		<view class="bg-tree" style="background-image: url(http://www.huancelian.com/wxStatic/bg-tree.svg)"></view>
		<view class="content" style="background-image: url(http://www.huancelian.com/wxStatic/bg-top.svg);">
			<view class="header">
				<image class="login-logo" src="/static/logo.svg"></image>
				<text class="title">{{title}}</text>	
			</view>	
			<text class="welcome">Welcome</text>	
			<text class="please-login">{{pleaseLogin}}</text>	
			<view class="inputs">
				<input type="text" v-model="loginForm.username" maxlength="35" :placeholder="accountPlaceholder" />
			</view>
			<view class="inputs">
				<input type="text" v-model="loginForm.password" maxlength="35" :password="true" :placeholder="passwordPlaceholder" />
			</view>
			<button class="button_login" @click="switchTabToTask">{{login}}</button>
			<view class="wx-login">
				<text class="wx-login-text" @click="navigateBack">{{wxLogin}}</text>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '环测链',
				login: '登录',
				pleaseLogin: '请登录',
				wxLogin: '微信登录',
				accountPlaceholder:'请输入您的账号',
				passwordPlaceholder:'请输入您的密码',
				loginForm: {
					username: '',
					password: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			switchTabToTask() {
				if(this.loginForm.username !== '' && this.loginForm.password !== '') {
					this.$api.login(this.loginForm, async res => {
						if(res.success) {
							this.$common.successToShow("登录成功")
							this.$db.set('userToken', res.result);
							uni.removeStorage('SIGN');
							await this.getUserInfo(); 
						} else {
							this.$common.errorToShow("登录条件不满足")
						}
					})
				} else {
					this.$common.errorToShow("请录入登录信息...");
				}
			},
			getUserInfo() {
				this.$api.getUserInfo(res => {
					if(res.success && res.result) {
						this.$store.commit('SAVE_CUR_USER', res.result);
						if(res.result.appRoles.length > 0) {
							this.$store.commit('SAVE_ROLE_LISTS', res.result.appRoles);
							switch(res.result.appRoles[0]) {
								 case '2':
									this.$store.commit('SAVE_CUR_ROLE', {roleId: 2, roleName: '采样员'});
									break
								 case '1':
									this.$store.commit('SAVE_CUR_ROLE', {roleId: 1, roleName: '采样组长'});
									break
								 default:
									this.$store.commit('SAVE_CUR_ROLE', {});
							}
						} else {
							this.$store.commit('SAVE_ROLE_LISTS', res.result.appRoles);
						}
						uni.switchTab({
							url: '/pages/task/index'
						});
					} else {
						this.$common.errorToShow(res.result)
					}
				})
			},
			navigateBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.wrapper{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #F0F2FA;
	}
	.wrapper .login-logo {
		height: 140rpx;
		width: 140rpx;
	}
	.content {
		position: relative;
		top: 0;
		left: 0;
		/* background-image: url(../../static/bg-top.svg); */
		background-position: 40% 50%;
		width: 100%;
		height: 0;
		padding-bottom: 205%;
		background-repeat: no-repeat;
		background-size: 175% 175%;
	}
	.header{
		padding-top: 17%;
		width: 100%;
		height: 84rpx;
		margin-bottom: 72rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title{
		font-size: 47rpx;
		color: #193566;
	}
	.welcome{
		width: 100%;
		display: block;
		padding-left: 100rpx;
		font-size: 70rpx;
		font-weight: 500;
		color: #193566;
	}
	.please-login{
		margin-top: 5rpx;
		display: block;
		width: 100%;
		padding-left: 100rpx;
		font-size: 35rpx;
		font-weight: 400;
		color: #193566;
	}
	.inputs{
		margin-top: 48rpx;
		height: 110rpx;
		line-height: 110rpx;
		padding: 0 100rpx;
	}
	.inputs input{
		height: 110rpx;
		line-height: 110rpx;
		padding: 0rpx 0rpx 0rpx 70rpx;
		background: #F0F2FA;
		box-shadow: inset 5rpx 0rpx 11rpx 2rpx rgba(0,0,0,0.16);
		border-radius: 65rpx 65rpx 65rpx 65rpx;
	}
	/deep/ .uni-input-wrapper{
		display: flex;
		flex: 1;
		width: auto;
		height: 130rpx;
	
	}
	/deep/ .uni-input-input{
		margin-left: 56rpx;
	}
	.input-placeholder{
		width: 100%;
		height: 100%;
		color: #A9B6C9;
		font-size: 33rpx;
		margin-left: 56rpx;
	}
	.button_login{
		margin-top: 61rpx;
		display: block;
		width: 390rpx;
		height: 115rpx;
		padding-left: 40rpx;
		padding-top: 0rpx;
		font-size: 45rpx;
		background-color: #193566;
		color: #fff;
		box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.16);
		border-radius: 65px 65px 65px 65px;
		letter-spacing: 8rpx;
	}
	.wx-login{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 63rpx;
		color: #193566;
		opacity: 0.8;
	}
	.wx-login-text{
		font-size: 37rpx;
		color: #193566;
		text-decoration: underline;
		letter-spacing: 0rpx;
		font-weight: 400;
		/* opacity: 0.7; */
	}
	.bg-tree{
		position: absolute;
		bottom: 9%;
		left: 5%;
		/* background-image: url(../../static/bg-tree.svg); */
		/* background-position: 40% 50%; */
		width: 100%;
		height: 0;
		padding-top: 69%;
		background-repeat: no-repeat;
		background-size: 140% 140%;
	}
</style>
