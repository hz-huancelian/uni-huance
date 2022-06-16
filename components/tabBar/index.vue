<template>
	<view class="content">
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<u-tabbar
			height="120rpx"
			:list="tabBarList"
			:mid-button="midBtn"
			:active-color="activeColor"
			:inactive-color="inactiveColor"
			mid-button-size= "90rpx"
			:before-switch="beforeSwitch"
			:border-top="borderTop"
		></u-tabbar>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				choseValue: 0,
				borderTop: false,
				inactiveColor: '#909399',
				activeColor: '#5098FF'
			}
		},
		computed: {
			...mapGetters([
				'tabBarList',
				'midBtn'
			])
		},
		created() {
			const barList = this.tabBarList
			console.log(barList)
		},
		methods: {
			beforeSwitch(val) {
				if(val == 1) {
					this.$store.commit('SAVE_SCAN', true);
				}
				return true
			}
		}
	}
</script>

<style scoped lang="scss">
	::v-deep .u-tabbar__content__item__button {
		top: 14rpx !important
	}
</style>

