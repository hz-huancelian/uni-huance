import { apiBaseUrl } from './config.js'
import * as common from './common.js'
import * as db from './db.js' //引入common

const methodsToken = [
	'login/doLoginByUsername',
	'login/loadUserInfo',
	'login/doSlientLogin',
	'login/doLogin',
	'login/logout',
	'sample/teamLeader/taskList',
	'sample/getSampleItemsForCollectUser',
	'sample/auditSampleItem',
	'sample/getSampleAuditRecordBySampItemId'
]

const uploadFile = (url, filePath, success) => {
	let userToken = db.get("userToken") || uni.getStorage('TOKEN') || '';
	uni.uploadFile({
		url: apiBaseUrl + url,
		filePath:filePath,
		name:'files',
		header: {
		'Content-Type': 'multipart/form-data;',
		'satoken': userToken
		},
		success: res => {
			typeof success === "function" && success(JSON.parse(res.data));
		},
	})
};

const post = (method, data, callback, complete, fail) => {
	// uni.showLoading({
	// 	title: '加载中...'
	// })
	let userToken = db.get("userToken") || uni.getStorage('TOKEN') || '';
	debugger
	if(methodsToken.indexOf(method) >= 0 && method!=="login/doLoginByUsername" ) {
		if(!userToken || userToken === '') {
			common.jumpToLogin();
			return false;
		} 
	}
	
	uni.request({
		url: apiBaseUrl + method,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'satoken': userToken
		},
		method:'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if(!response.statusCode !== 200) {
				if(result.code === 401 || result.code === 403) {
					db.del("userToken");
					out()
					uni.showToast({
						title: result.message,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								let current =  getCurrentPages()
								current = current[current.length - 1]
								if (current.route.indexOf('/pages/index/index') > -1 ) {
									return
								}
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}, 1000)
						}
					})
				} 
			}
			callback(result);
		},
		complete: (response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000)
			complete?complete(): "";
		},
		fail: (error) => {
			uni.showLoading({
				title: '网络有点小慢'
			});
			uni.hideLoading();
			if(error && error.data) {
				showError(error.data)
			}
		}
	})
}

const get = (url,  callback) => {
	// uni.showLoading({
	// 	title: '加载中...'
	// });
	let userToken = db.get("userToken") || uni.getStorage('TOKEN')  || '';
	uni.request({
		url: apiBaseUrl + url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'satoken': userToken
		},
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			
			debugger
			if(result.code === 401 || result.code === 403){
				out()
				db.del("userToken");
				uni.showToast({
					title: result.message,
					icon: 'none',
					duration: 1000,
					complete: function() {
						setTimeout(function() {
							uni.hideToast();
							let current =  getCurrentPages()
							current = current[current.length - 1]
							if (current.route.indexOf('/pages/index/index') > -1 ) {
								return
							}
							uni.navigateTo({
								url: '/pages/index/index'
							})
						}, 1000)
					}
				})
			} 
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	})
}

const getParam = (url, params, callback) => {
	// uni.showLoading({
	// 	title: '加载中...'
	// });
	debugger
	let userToken = db.get("userToken") || uni.getStorage('TOKEN') || '';
	uni.request({
		url: apiBaseUrl + url,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'satoken': userToken
		},
		data: params,
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if(response.statusCode === 200) {
				if(result.code === 401) {
					out()
					uni.showToast({
						title: result.message,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								let current =  getCurrentPages()
								current = current[current.length - 1]
								if (current.route.indexOf('/pages/index/index') > -1 ) {
									return
								}
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}, 1000)
						}
					})
				} 
			}
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			debugger
			if (error && error.response) {
				showError(error.response);
			}
			this.$common.errorToShow(error)
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	})
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.message
			break
	};
	
	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}

const out = () => {
	uni.clearStorage()
	// uni.navigateTo({
	// 	url: '/pages/index/index'
	// })
	// db.wxHandleLogin()
}


export const login = (data, callback) => post('login/doLoginByUsername', data, callback);
// 微信一键登录
export const doSlientLogin = (data, callback) => post('login/doSlientLogin', data, callback);
// 微信一键登录
export const doLogin = (data, callback) => post('login/doLogin', data, callback);
// 微信一键登录
export const auth = (params, callback) => getParam('login/auth', params, callback);

export const logout = ( data,callback) => post('login/logout', data, callback);

export const getUserInfo = (callback) => get('login/loadUserInfo', callback);

// 采样组长 任务列表
export const getTeamLeaderTaskList = (params, callback) =>  getParam('sample/teamLeader/taskList', params, callback);

// 采样组长 代办列表
export const getSamplerTodoList = (params, callback) => getParam('sample/teamLeader/getSampleTasksByCondition', params, callback);

// 采样组长 代办 - 样品列表
export const getSampleListByCondition = (params, callback) => getParam('sample/teamLeader/getSampleListByCondition', params, callback);

// 采样组长 代办驳回列表
export const getRejectedSampleList = (params, callback) => getParam('sample/teamLeader/getRejectedSampleList', params, callback);

// 采样员工 任务列表 - 0:待提交 1:已驳回
export const getSamplerTaskList = (params, callback) => getParam('sample/getSampleItemsForCollectUser', params, callback);

// 采样员工 任务列表 - 待复核
export const getSampleTasksForCollectUser = (params, callback) => getParam('sample/getSampleTasksForCollectUser', params, callback);

// 单个/批量确认样品
export const auditSampleItem = (data, callback) => post('sample/auditSampleItem', data, callback);

// 单个/批量申请入库
export const sampStoreApply = (data, callback) => post('sample/sampStoreApply', data, callback);

// 采样员一键复核
export const batchReviewSampleItem = (data, callback) => post('sample/batchReviewSampleItem', data, callback);

// 采样员 复核 - 样品列表
export const getSampleItemsByTaskId = (params, callback) => getParam('sample/getSampleItemsForCollectUserByTaskId', params, callback);

// 任务下样品列表
export const getSamplerList = (url, callback) =>  get(url, callback);

// 条码号校验
export const checkSampleNo = (url, callback) =>  get(url, callback);

// 样品详情
export const getSampleForId = (url, callback) =>  get(url, callback);

// 根据样品编号获取样品信息 -- 样品第一次录入时候引用
export const getSampleForNo = (url, callback) =>  get(url, callback);

// 保存图片
export const cyFileUpload = (filePath, callback) => uploadFile('file/cyFileUpload', filePath,callback);

// 保存签名
export const qzFileUpload = (filePath, callback) => uploadFile('file/qzFileUpload', filePath,callback);

// 采样复核人员
export const getReviewUsers = (callback) =>  get('sample/listReviewUsers', callback);

// 
export const submitSampItemDetail = (data, callback) => post('sample/submitSampItemDetail', data, callback);


// 录入页面 保存
export const saveSampItemDetail = (data, callback) => post('sample/saveSampItemDetail', data, callback);

// 样品复核 （驳回、通过）
export const reviewSampleItem = (data, callback) => post('sample/reviewSampleItem', data, callback);

// 保存签名
export const doSignForSamp = (data, callback) => post('sample/doSignForSamp', data, callback);


// 通用GET请求
export const commonForGet = (url, callback) => get(url, callback);