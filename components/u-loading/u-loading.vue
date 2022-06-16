<template>
	 <view>
		 <view class="empty" v-if="empty">
		 	 <view class="img"><image :src="emptyImg" mode="widthFix"></image></view>
		 	 <view class="text">{{emptyText}}</view>
		 </view>
		 <view class="load-text" v-else>		 
			 <view class="loading" v-if="!nomore"></view>
			 <view class="text row-center" v-else><label></label>{{text}}<label></label></view>
		 </view>
	 </view>
</template>

<script>	
	export default{
		props:{
			nomore:{ //没有更多
				type:Boolean,
				default:false,
			},
			empty:{ //是否为空
				type:Boolean,
				default:false,
			},
			emptyText:{ //为空是显示的文字
				type:String,
				default:'暂无数据~'
			},
			emptyImg:{ //为空时显示的点位图
				type:String,
				default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABgFBMVEUAAACbt+i7zfCfsO+dt+udt+qftuqet+qft+idt+qduOqdt+qduOucuOydt+mdt+udt+qdt+qdt+qet+uct+qet+qfueudt+udt+qfueudt+qdt+qfueudt+qhwe6duOudt+qdt+ubtemft+udt+qdt+qdt+qcuOqdt+qguuuguOydt+igt+uctuapwO6dt+udt+qct+qdtuqlveynv+2et+ufuOudt+qtxO6duOqguuulvu2jvOypwe2dt+urwe6pwO2duOqxx++guuudt+met+qduOulve2uxO+nwO2duOqfueuctuqzyfGyyO+et+yowO2uxO6euOuux+yhs+z////L3fedt+re6vu2ye+pwO3N2vW/1PTm7fqxxe+4zPGguuvH2PW9z/GzyPDE1vW7z/LN3ferwu7X5Pm0yvGmvuyjvOzb5vnS4fjA0fK4zPDR3/fI2vfD1POtxO+nv+2hu+vd6fuxx+/W4vft8vvJ2vW90fP09/3B0/S1yfH8/f+YhEQ6AAAAVXRSTlMAQPAPX4AvvyDw79+wQE9w0cGkj1WgNOF3S8afWUgF/LeMgBn269vPZDkkFhIJ0smZiG303Muyqacp9e3m5by1nZKLg2pR1crAva2Wk3hpQ/rHfl8bVWJ37AAACE1JREFUeNrs3ElP21AUBeBjPT/PdiYyJ0ACoZRBDBIgNpVQSxdtpUrdnP//T2pnHgyFjL6o3yLKKsqR37tvkK7x32sMrU0H4pk+E4H0KE0OeRYk06RrOioskJ6CXI7HqkKiTGrIlSND9KkqPcgV0MVQiRQ8SwosYCgkQ4gVTMaTFv1EJnMENquQS7n01SCS7KqFHOmZljICMi95HQHKHKpaWD8D22O6TJQV1u70BlsVah1tIEbNv2lBvht+qvEIwqlfZOEbryCbUyR53yJvIJl1yFixTbINuYwGE9efSR7sQ6ooz77OGWOHEMo84YC+8BirQaTbKodyGCSqQKA/PY6c4oqJHsS57Bxz5KCFQ/YVIczRNSfcOorjJyPKY5FTqiGeOHQGQT7/4LTvFjSHTiBH+5Azrs5xy5EnSNEqcNYXoMWxZ8hwesU5AdDmhIyD822e84qAxYkGBKidcME1cMQxCVcyF7rKRR1gv8cpBrLN6bhM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'
			},
			text:{ //没能更多文字
				type:String,
				default:'没有更多数据了'
			}
		},		
	}
</script>

<style lang="scss" scoped>
.empty{ padding:250rpx 0; width:100%; text-align: center;
	.img{ width:262rpx; display:block; margin:0 auto; image{width:100%;}}
	.text{ color:#a8a8a8; font-size:26rpx; padding-top:10rpx;}
}
.load-text{ padding:30rpx 0; text-align: center;
	.loading{ width: 50rpx; height: 50rpx; border: 8rpx solid #fff; margin:0 auto;	border-left-color: $uni-color-primary; border-radius: 50%;
		border-radius: 50%;	animation:loading2 1.2s infinite;
	}
	@keyframes loading2 {
		0%{
			transform:rotate(0);
		} 100% {
			transform:rotate(360deg);
		}
	}
	.text{ font-size:26rpx; color:#ccc;
		label{ height:1px; width:40rpx; background:#ddd; opacity:0.7; margin:0 12rpx;}
	}
}
</style>