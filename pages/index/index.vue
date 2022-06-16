<template>
	<view class="wrapper">
		<!-- BOTTOM TREE IMG -->
		<view class="bg-tree" style="background-image: url(http://www.huancelian.com/wxStatic/bg-tree.svg)"></view>
		<view class="content" style="background-image: url(http://www.huancelian.com/wxStatic/bg-top.svg);">
			<!-- LOGO -->
			<view class="img-wrap">
				<image class="logo" src="/static/logo.svg"></image>
			</view>
			
			<!-- LOGO TEXT -->
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<!-- 按钮区 -->
			<view class="button-area">
				<view class="button-wrap">
					<!-- 微信登录 -->
					<button class="button-login" open-type="getPhoneNumber" @getphonenumber="getUserPhone">
						<text class="wx-login loginText">{{wxLogin}}</text>
					</button>
					<!-- <view class="button-login">
						<text class="wx-login loginText" @click="wxToAccountLogin">{{wxLogin}}</text>
					</view> -->
					<!-- 账号登录 -->
					<button class="button-login" @click="navigateToAccountLogin">
						<text class="wx-login loginText">{{accountLogin}}</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '环测链',
				wxLogin: '微信登录',
				accountLogin: '账号登录'
			}
		},
		onLoad() {
				uni.login({
				   provider: 'weixin',
				   success: (data) => {
					   this.$api.doSlientLogin({code: data.code}, res => {
						   if(res.code === 200) {
							   const { Authorization, sign } = res.result
							   if(+sign === 0) {
									this.$db.set('userToken', Authorization);
									this.$db.set("TOKEN", Authorization)
									this.$db.set("SIGN", sign)
									this.getUserInfo()
									return false
							   }
							   uni.login({
							      provider: 'weixin',
							      success: (nres) => {
									  // 新用户
									  this.$api.auth({code: nres.code}, res => {
									  	debugger
									  	if(res.success) {
									  		const { openid, session_key } = res.result
									  		this.$db.set('userToken', Authorization);
									  		this.$db.set("openid", openid)
									  		this.$db.set("session_key", session_key)
									  		this.$db.set("SIGN", 1)
									  		return false
									  	} 
									  })
								  },
							    })
							   
						    }
					   })
				   },
				});
		},
		methods: {
			navigateToAccountLogin() {
				uni.navigateTo({
				    url: '/pages/login/index',
				});
			},
			getUserPhone(e){
				debugger
				if(e.detail.code){
					const { encryptedData, iv, code } = e.detail; 
					const openId = this.$db.get('openid')
					const sessionKey = this.$db.get('session_key')
					const params = {
						encryptedData,
						iv,
						openId,
						sessionKey
					} 
					debugger
					this.$api.doLogin(params, async res =>{
						if(res.success) {
							this.$db.set('userToken', res.result);
							this.$db.set('TOKEN', res.result);
							await this.getUserInfo();
						} else {
							uni.showToast({
								title:res.message,
								icon:'none',
							})
						}
					})
				} else {
					uni.showToast({
						title:'登录授权失败',
						icon:'none',
					})
				}
				 
			},
			wxToAccountLogin(e) {
				debugger
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '登录',
					success: infoRes => {
						debugger
						const { encryptedData, iv } = infoRes; //用户信息，微信头像，昵称等等
						const openId = this.$db.get('openid')
						const sessionKey = this.$db.get('session_key')
						const params = {
							encryptedData,
							iv,
							openId,
							sessionKey
						} 
						debugger
						this.$api.doLogin(params, async res =>{
							if(res.success) {
								this.$db.set('userToken', res.result);
								this.$db.set('TOKEN', res.result);
								await this.getUserInfo();
							} else {
								uni.showToast({
									title:res.message,
									icon:'none',
								})
							}
						})
					},
					fail(res) {
						uni.showToast({
							title:'登录授权失败',
							icon:'none',
						})
					}
				})
				// this.$db.wxHandleLogin()
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
		}
	}
</script>

<style>
	uni-page-wrapper{
		height: 100%;
	}
	uni-page-body{
		height: 100%;
	}
	.wrapper{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #F0F2FA;
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
	.img-wrap{
		padding-top: 17%;
		width: 100%;
		height: auto;
		text-align: center;
	}
	.logo {
		height: 275rpx;
		height: 275rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 67rpx;
		color: #193566;
		letter-spacing: 10rpx;
	}
	
	.button-area{
		width: 100%;
		height: 137rpx;
		margin-top: 74rpx;
		display: flex;
	}
	.button-wrap{
		height: 137rpx;
		padding-left:74rpx;
		padding-right: 74rpx;
		display: flex;
		flex: 1;
		justify-content: space-between;
	}
	.button-login{
		width: 243rpx;
		height: 110rpx;
		border-radius: 9rpx;
		background: #193566;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loginText{
		margin-left: 6rpx;
		color: #fff;
		font-size: 35rpx;
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
