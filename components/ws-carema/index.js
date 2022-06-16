export default {
	name: 'ws-carema',
	props: {
		getPhoto: { // 是否返回图片
			type: Boolean,
			default: true
		},
		isContinuous: { // 是否连续扫码
			type: Boolean,
			default: true
		},
		scanInterval: { // 连续扫码间隔
			type: Number,
			default: 1000
		},
		checkRepeat: { // 是否判断重复扫码
			type: Boolean,
			default: true
		},
		showList: { // 是否显示连续扫码列表
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			flash: false,
			caremaHeight: 0,
			scanItem: {
				text: '', // 扫码内容
				url: '' // 扫码图片
			},
			listener: null,
			beignGetPhoto: false,
			photoWidth: 350,
			photoHeight: 350,
			beginScan: true,
			showDetail: false,
			scanList: [], // 连续扫码记录
			audio: null
		}
	},
	mounted() {
		if (this.getPhoto) {
			this.startTacking()	
		}
		this.drawCanvas()
	},
	methods: {
		delItem(index) {
			uni.showModal({
			    title: '温馨提示',
			    content: '确认删除此条扫码记录?',
			    showCancel: true,
			    confirmColor: '#51A830',
			    cancelColor: '#ababab',
			    success: res => {
			        if (res.confirm) {
						this.scanList.splice(index, 1)
			        }
			    }
			})
		},
		clearList() {
			uni.showModal({
			    title: '温馨提示',
			    content: '确认删除所有扫码记录?',
			    showCancel: true,
			    confirmColor: '#51A830',
			    cancelColor: '#ababab',
			    success: res => {
			        if (res.confirm) {
						this.scanList = []
			        }
			    }
			})
		},
		reset() {
			this.scanItem = {
				text: '',
				url: ''
			}
			this.beignGetPhoto = false
			this.showDetail = false
			this.$emit('scanItem', this.scanItem)
		},
		checkIsRepeat(text) {
			const index = this.scanList.findIndex(v => v.text === text)
			return index > -1
		},
		audioPlayFuc() {
			if (!this.audio) {
				this.audio = uni.createInnerAudioContext()	
			}
		    this.audio.src = 'https://ws-box-1305179832.cos.ap-nanjing.myqcloud.com/ok.mp3'
		    this.audio.play()
		    // 音频自然播放结束
		    this.audio.onEnded(() => {
		        console.log('播放结束')
		    })
		    // 音频播放错误处理
		    this.audio.onError(() => {
		        console.log('播放出错')
		    })
		},
		scanCode(e) {
			const text = e.detail.result
			if (this.isContinuous) {
				if (!this.beginScan || this.showDetail) {
					return
				}
				
				this.beginScan = false
				setTimeout(() => {
					this.beginScan = true
				}, this.scanInterval)
				
				const isHave = this.checkIsRepeat(text)
				console.log(isHave)
				if (isHave) {
					uni.showToast({
						title: '重复扫码!',
						icon: 'none'
					})
					return
				}
				
				this.audioPlayFuc()
				
				this.scanItem = {
					text,
					url: ''
				}
				
				if (!this.getPhoto) {
					this.scanList.unshift(this.scanItem)
					this.$emit('scanItem', this.scanItem)
					this.$emit('scanList', this.scanList)	
				}
				
			} else {
				// 单个扫码：如果已扫码则停止扫码，重新扫码调用this.reset()方法
				if (this.scanItem.text !== '') {
					return
				}
				
				this.audioPlayFuc()
					
				this.scanItem = {
					text,
					url: ''
				}
				
				if (!this.getPhoto) {
					this.$emit('scanItem', this.scanItem)	
				}
			}
			
			this.beignGetPhoto = true
		},
		drawCanvas() {
			const res = uni.getSystemInfoSync()
			this.caremaHeight = 460
			// 画布绘画区域
			const width = res.windowWidth
			const height = 200
			
			// 画布清除部分(中间扫描透明框)
			const left = uni.upx2px(20)
			const top = uni.upx2px(20)
			const clearWidth = width - 2 * left
			const clearHeight = height - 2 * top
			
			// 拐角尺寸(长度，粗细, 颜色)
			const length = uni.upx2px(40)
			const stoke = uni.upx2px(6)
			const color = '#ffffff'
			
			const ctx = uni.createCanvasContext('scanCanvas', this)
			
			// 扫描区域
			ctx.setGlobalAlpha(0.3)
			ctx.setFillStyle('black')
			ctx.fillRect(0, 0, width, height)
			ctx.clearRect(left, top, clearWidth, clearHeight)
			
			// 扫描拐角(左上)
			ctx.setGlobalAlpha(1)
			ctx.rect(left, top - (stoke / 2), length, stoke)
			ctx.setFillStyle(color)
			ctx.fill()
			ctx.rect(left - (stoke / 2), top - (stoke / 2), stoke, length)
			ctx.setFillStyle(color)
			ctx.fill()
			
			// 扫描拐角(右上)
			ctx.rect(left + clearWidth - length, top - (stoke / 2), length, stoke)
			ctx.setFillStyle(color)
			ctx.fill()
			ctx.rect(left + clearWidth - (stoke / 2), top - (stoke / 2), stoke, length)
			ctx.setFillStyle(color)
			ctx.fill()
			
			// 扫描拐角(左下)
			ctx.rect(left - (stoke / 2), top + clearHeight - (stoke / 2), length, stoke)
			ctx.setFillStyle(color)
			ctx.fill()
			ctx.rect(left - (stoke / 2), top + clearHeight - length, stoke, length)
			ctx.setFillStyle(color)
			ctx.fill()
			
			// 扫描拐角(右下)
			ctx.rect(left + clearWidth - length + (stoke / 2), top + clearHeight - (stoke / 2), length, stoke)
			ctx.setFillStyle(color)
			ctx.fill()
			ctx.rect(left + clearWidth - (stoke / 2), top + clearHeight - length, stoke, length)
			ctx.setFillStyle(color)
			ctx.fill()
			
			ctx.draw()
		},
		// 图片帧数据
		startTacking() {
			const that = this
			const context = uni.createCameraContext()
			if (!context.onCameraFrame) {
			    uni.showToast({
			       title: '基础库 2.7.0 开始支持.',
			       icon: 'none'
			    })
			    return
			}
			this.listener = context.onCameraFrame(async function (res) {
			      if (that.beignGetPhoto && that.getPhoto) {
					uni.showLoading({
						title: '获取图片中'
					})
					that.photoWidth = res.width
					that.photoHeight = res.height
			        that.beignGetPhoto = false
					console.log(res.data)
			        const data = new Uint8Array(res.data)
			        const clamped = new Uint8ClampedArray(data)
			        uni.canvasPutImageData({
						canvasId: 'scanPhoto',
						x: 0,
						y: 0,
						width: res.width,
						height: res.height,
						fileType: 'jpg',
						quality: 0.9,
						data: clamped,
						success (res) {
							uni.canvasToTempFilePath({
								canvasId: 'scanPhoto',
								success: function(data) {
									console.log('图片地址：')
									console.log(data.tempFilePath)
									that.scanItem.url = data.tempFilePath
									that.$emit('scanItem', that.scanItem)
									if (that.isContinuous) {
										that.scanList.unshift(that.scanItem)
										that.$emit('scanList', that.scanList)	
									}
									uni.hideLoading()
								},
								fail: () => {
									uni.hideLoading()
								}
							}, that)
						},
						fail(e) {
							console.log('失败')
							console.log(e)
							uni.hideLoading()
						}
			        }, that)
			    }
			}, that)
			this.listener.start()
		},
		showDetailFunc(item) {
			this.showDetail = true
			this.scanItem = item
		}
	}
}
